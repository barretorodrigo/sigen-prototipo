/* ============================================================
   SIGEN — Tela de Listagem de Consultórios
   ============================================================ */

// Estado em memória (somente para o protótipo)
let consultoriosEmMemoria = [];

const conteudoHtml = `
  <h1 class="titulo-pagina">Consultórios</h1>

  <div class="card">
    <div class="card__cabecalho">
      <h2 class="card__titulo">Meus registros de consultório</h2>
      <a class="btn btn--primario" href="./consultorio-novo.html">
        <span class="material-icons">add</span>
        Nova solicitação
      </a>
    </div>

    <div id="area-alerta"></div>

    <div class="tabela-wrapper">
      <table class="tabela" aria-label="Lista de consultórios">
        <thead>
          <tr>
            <th scope="col">Nome do consultório</th>
            <th scope="col">CPF/CNPJ</th>
            <th scope="col">Município/UF</th>
            <th scope="col">Cadastro</th>
            <th scope="col">Status</th>
            <th scope="col" style="text-align:right;">Ações</th>
          </tr>
        </thead>
        <tbody id="corpo-tabela"></tbody>
      </table>
    </div>
  </div>
`;

document.addEventListener('DOMContentLoaded', async () => {
  renderizarLayout('app', 'Consultórios', conteudoHtml);

  try {
    consultoriosEmMemoria = await carregarConsultorios();
  } catch (erro) {
    mostrarAlerta('erro', 'Erro ao carregar registros', erro.message);
    consultoriosEmMemoria = [];
  }

  renderizarTabela();
  configurarModal();
  exibirAlertaPosCadastro();
});

/**
 * Preenche a tabela com os consultórios em memória.
 */
function renderizarTabela() {
  const corpo = document.getElementById('corpo-tabela');
  corpo.innerHTML = '';

  if (consultoriosEmMemoria.length === 0) {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td colspan="6" class="tabela__vazia">Não possui registro de consultório</td>
    `;
    corpo.appendChild(linha);
    return;
  }

  consultoriosEmMemoria.forEach((c) => {
    const linha = document.createElement('tr');
    const classeBadge = classeBadgeStatus(c.status);

    const podeCancelar = c.status !== 'cancelado';
    const podeEmitirCertificado = c.status === 'ativo';
    const documento = obterDocumentoConsultorio(c);
    const documentoExibicao = documento.valor
      ? `${escaparHtml(documento.valor)} <small class="badge-doc">${documento.rotulo}</small>`
      : '—';

    linha.innerHTML = `
      <td>${escaparHtml(c.nome)}</td>
      <td>${documentoExibicao}</td>
      <td>${escaparHtml(c.municipio)}/${escaparHtml(c.uf)}</td>
      <td>${formatarData(c.dataCadastro)}</td>
      <td><span class="badge ${classeBadge}">${rotuloStatus(c.status)}</span></td>
      <td>
        <div class="tabela__acoes">
          <a class="btn--icone" href="./consultorio-visualizar.html?id=${encodeURIComponent(c.id)}"
             title="Visualizar" aria-label="Visualizar registro de ${escaparHtml(c.nome)}">
            <span class="material-icons">visibility</span>
          </a>
          ${podeEmitirCertificado ? `
            <a class="btn--icone" href="./consultorio-certificado.html?id=${encodeURIComponent(c.id)}"
               target="_blank" rel="noopener"
               title="Visualizar certificado"
               aria-label="Visualizar certificado do consultório ${escaparHtml(c.nome)}">
              <span class="material-icons">workspace_premium</span>
            </a>
          ` : ''}
          ${podeCancelar ? `
            <button class="btn--icone" type="button"
                    data-acao-cancelar="${encodeURIComponent(c.id)}"
                    title="Cancelar registro"
                    aria-label="Cancelar registro de ${escaparHtml(c.nome)}">
              <span class="material-icons">cancel</span>
            </button>
          ` : ''}
        </div>
      </td>
    `;
    corpo.appendChild(linha);
  });

  // Liga os botões de cancelamento
  corpo.querySelectorAll('[data-acao-cancelar]').forEach((botao) => {
    botao.addEventListener('click', () => {
      const id = decodeURIComponent(botao.dataset.acaoCancelar);
      abrirModalCancelamento(id);
    });
  });
}

/**
 * Modal de confirmação de cancelamento.
 */
let idParaCancelar = null;

function configurarModal() {
  const modal = document.getElementById('modal-cancelamento');
  const botaoCancelar = document.getElementById('botao-modal-cancelar');
  const botaoConfirmar = document.getElementById('botao-modal-confirmar');

  botaoCancelar.addEventListener('click', fecharModal);
  modal.addEventListener('click', (ev) => {
    if (ev.target === modal) fecharModal();
  });
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && modal.classList.contains('modal--aberto')) {
      fecharModal();
    }
  });

  botaoConfirmar.addEventListener('click', () => {
    if (!idParaCancelar) return;
    const consultorio = consultoriosEmMemoria.find((c) => c.id === idParaCancelar);
    if (consultorio) {
      consultorio.status = 'cancelado';
      consultorio.dataCancelamento = new Date().toISOString().slice(0, 10);
      salvarConsultorios(consultoriosEmMemoria);
      mostrarAlerta('sucesso', 'Cancelamento realizado',
        `O registro "${consultorio.nome}" foi cancelado.`);
    }
    fecharModal();
    renderizarTabela();
  });
}

function abrirModalCancelamento(id) {
  idParaCancelar = id;
  const consultorio = consultoriosEmMemoria.find((c) => c.id === id);
  if (consultorio) {
    document.getElementById('modal-mensagem').textContent =
      `Tem certeza de que deseja cancelar o registro "${consultorio.nome}"? ` +
      `Esta ação não poderá ser desfeita.`;
  }
  document.getElementById('modal-cancelamento').classList.add('modal--aberto');
}

function fecharModal() {
  idParaCancelar = null;
  document.getElementById('modal-cancelamento').classList.remove('modal--aberto');
}

/**
 * Exibe um alerta de sucesso quando o usuário chega à listagem
 * vindo do envio de uma nova solicitação.
 */
function exibirAlertaPosCadastro() {
  try {
    const flag = sessionStorage.getItem('sigen.prototipo.solicitacaoEnviada');
    if (flag) {
      sessionStorage.removeItem('sigen.prototipo.solicitacaoEnviada');
      mostrarAlerta('sucesso', 'Solicitação registrada',
        `O consultório "${flag}" foi adicionado à lista e está em análise.`);
    }
  } catch (_) {
    // sessionStorage pode estar indisponível; ignora.
  }
}

/**
 * Mostra um alerta visual na área dedicada (acima da tabela).
 */
function mostrarAlerta(tipo, titulo, mensagem) {
  const area = document.getElementById('area-alerta');
  area.innerHTML = `
    <div class="alerta alerta--${tipo}" role="status">
      <p class="alerta__titulo">${escaparHtml(titulo)}</p>
      <p>${escaparHtml(mensagem)}</p>
    </div>
  `;
  setTimeout(() => { area.innerHTML = ''; }, 6000);
}

/**
 * Escapa caracteres perigosos para HTML.
 */
function escaparHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
