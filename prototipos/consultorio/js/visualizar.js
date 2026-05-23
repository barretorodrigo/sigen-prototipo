/* ============================================================
   SIGEN — Tela de Visualização de Consultório (somente leitura)
   ============================================================ */

let consultorioAtual = null;
let especialidadesMap = {};

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    renderizarErro('Identificador do consultório não informado.');
    return;
  }

  try {
    const [consultorios, especialidades] = await Promise.all([
      carregarConsultorios(),
      carregarJson('especialidades.json')
    ]);
    especialidades.forEach((e) => { especialidadesMap[e.id] = e.nome; });
    consultorioAtual = consultorios.find((c) => c.id === id);
    if (!consultorioAtual) {
      renderizarErro('Registro de consultório não encontrado.');
      return;
    }
    renderizarVisualizacao();
    configurarModal();
  } catch (erro) {
    renderizarErro(erro.message);
  }
});

function renderizarErro(mensagem) {
  renderizarLayout('app', 'Visualizar consultório', `
    <div class="cabecalho-pagina">
      <a class="btn btn--texto" href="./consultorio-lista.html">
        <span class="material-icons">arrow_back</span> Voltar
      </a>
      <h1 class="titulo-pagina">Visualizar consultório</h1>
    </div>
    <div class="alerta alerta--erro" role="alert">
      <p class="alerta__titulo">Não foi possível exibir o registro</p>
      <p>${escaparHtml(mensagem)}</p>
    </div>
  `);
}

function renderizarVisualizacao() {
  const c = consultorioAtual;
  const classeBadge = c.status === 'ativo' ? 'badge--ativo'
    : c.status === 'cancelado' ? 'badge--cancelado'
    : 'badge--analise';

  const podeCancelar = c.status !== 'cancelado';

  const diasFormatados = (c.diasAtendimento || []).map(rotuloDia).join(', ');
  const listaEspecialidades = c.especialidades || (c.especialidade ? [c.especialidade] : []);
  const especialidadesNome = listaEspecialidades
    .map((id) => especialidadesMap[id] || id)
    .join(', ') || '—';

  const conteudo = `
    <div class="cabecalho-pagina">
      <a class="btn btn--texto" href="./consultorio-lista.html">
        <span class="material-icons">arrow_back</span> Voltar
      </a>
      <h1 class="titulo-pagina">${escaparHtml(c.nome)}</h1>
      <span class="badge ${classeBadge}">${rotuloStatus(c.status)}</span>
    </div>

    <div id="area-alerta"></div>

    <section class="card">
      <h2 class="card__titulo">Dados cadastrais</h2>
      <div class="grid-campos">
        <div class="col-12">
          ${dadoLeitura('Nome do consultório', c.nome)}
        </div>
        <div class="col-6">${dadoLeitura('CNPJ', c.cnpj)}</div>
        <div class="col-6">${dadoLeitura('E-mail', c.email)}</div>
        <div class="col-6">${dadoLeitura('Telefone', c.telefone)}</div>
        <div class="col-6">${dadoLeitura('Site', c.site || '—')}</div>
      </div>
    </section>

    <section class="card">
      <h2 class="card__titulo">Horário e dias de atendimento</h2>
      <div class="grid-campos">
        <div class="col-3">${dadoLeitura('Início', c.horarioInicio)}</div>
        <div class="col-3">${dadoLeitura('Término', c.horarioFim)}</div>
        <div class="col-6">${dadoLeitura('Dias', diasFormatados || '—')}</div>
      </div>
    </section>

    <section class="card">
      <h2 class="card__titulo">Endereço</h2>
      <div class="grid-campos">
        <div class="col-3">${dadoLeitura('CEP', c.cep)}</div>
        <div class="col-9">${dadoLeitura('Endereço',
          `${c.endereco}${c.numero ? ', ' + c.numero : ''}${c.complemento ? ' — ' + c.complemento : ''}`)}</div>
        <div class="col-6">${dadoLeitura('Bairro', c.bairro)}</div>
        <div class="col-4">${dadoLeitura('Município', c.municipio)}</div>
        <div class="col-2">${dadoLeitura('UF', c.uf)}</div>
      </div>
    </section>

    <section class="card">
      <h2 class="card__titulo">Atividades desenvolvidas</h2>
      ${dadoLeitura('Descrição', c.atividades)}
    </section>

    <section class="card">
      <h2 class="card__titulo">Especialidades</h2>
      ${dadoLeitura('Especialidades registradas no Coren', especialidadesNome)}
    </section>

    <section class="card">
      <h2 class="card__titulo">Anexo</h2>
      ${dadoLeitura('Alvará de funcionamento', c.alvara || '—')}
    </section>

    <section class="card">
      <h2 class="card__titulo">Status do registro</h2>
      <div class="grid-campos">
        <div class="col-6">${dadoLeitura('Status atual', rotuloStatus(c.status))}</div>
        <div class="col-6">${dadoLeitura('Data de cadastro', formatarData(c.dataCadastro))}</div>
        ${c.dataCancelamento ? `
          <div class="col-12">${dadoLeitura('Data de cancelamento', formatarData(c.dataCancelamento))}</div>
        ` : ''}
      </div>
    </section>

    <div class="acoes-formulario">
      <a class="btn btn--texto" href="./consultorio-lista.html">Voltar para a lista</a>
      ${podeCancelar ? `
        <button class="btn btn--perigo" type="button" id="botao-cancelar-registro">
          <span class="material-icons">cancel</span> Cancelar registro
        </button>
      ` : ''}
    </div>
  `;

  renderizarLayout('app', `Consultório — ${c.nome}`, conteudo);

  if (podeCancelar) {
    document.getElementById('botao-cancelar-registro')
      .addEventListener('click', abrirModalCancelamento);
  }
}

function dadoLeitura(rotulo, valor) {
  return `
    <div class="dado-leitura">
      <span class="dado-leitura__rotulo">${escaparHtml(rotulo)}</span>
      <span class="dado-leitura__valor">${escaparHtml(valor ?? '')}</span>
    </div>
  `;
}

/* ----------------------- Modal ----------------------- */

function configurarModal() {
  const modal = document.getElementById('modal-cancelamento');
  const botaoCancelar = document.getElementById('botao-modal-cancelar');
  const botaoConfirmar = document.getElementById('botao-modal-confirmar');

  botaoCancelar.addEventListener('click', fecharModal);
  modal.addEventListener('click', (ev) => { if (ev.target === modal) fecharModal(); });
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && modal.classList.contains('modal--aberto')) fecharModal();
  });
  botaoConfirmar.addEventListener('click', confirmarCancelamento);
}

function abrirModalCancelamento() {
  document.getElementById('modal-mensagem').textContent =
    `Tem certeza de que deseja cancelar o registro "${consultorioAtual.nome}"? ` +
    `Esta ação não poderá ser desfeita.`;
  document.getElementById('modal-cancelamento').classList.add('modal--aberto');
}

function fecharModal() {
  document.getElementById('modal-cancelamento').classList.remove('modal--aberto');
}

function confirmarCancelamento() {
  consultorioAtual.status = 'cancelado';
  consultorioAtual.dataCancelamento = new Date().toISOString().slice(0, 10);
  persistirCancelamentoNaLista(consultorioAtual);
  fecharModal();
  renderizarVisualizacao();
  mostrarAlerta('sucesso', 'Cancelamento realizado',
    `O registro "${consultorioAtual.nome}" foi cancelado.`);
}

async function persistirCancelamentoNaLista(consultorio) {
  try {
    const lista = await carregarConsultorios();
    const idx = lista.findIndex((c) => c.id === consultorio.id);
    if (idx >= 0) {
      lista[idx] = consultorio;
      salvarConsultorios(lista);
    }
  } catch (_) {
    // Falha silenciosa para não quebrar a UI do protótipo.
  }
}

function mostrarAlerta(tipo, titulo, mensagem) {
  const area = document.getElementById('area-alerta');
  if (!area) return;
  area.innerHTML = `
    <div class="alerta alerta--${tipo}" role="status">
      <p class="alerta__titulo">${escaparHtml(titulo)}</p>
      <p>${escaparHtml(mensagem)}</p>
    </div>
  `;
  area.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function escaparHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
