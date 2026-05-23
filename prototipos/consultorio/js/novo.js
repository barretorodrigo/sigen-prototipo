/* ============================================================
   SIGEN — Tela de Nova Solicitação de Consultório
   ============================================================ */

const LIMITE_ATIVIDADES = 5000;
const TIPOS_ANEXO_ACEITOS = ['application/pdf', 'image/jpeg', 'image/png'];
const TAMANHO_MAX_ANEXO_MB = 5;

// Lista de fallback caso o JSON não seja carregado (ex.: protocolo file://)
const ESPECIALIDADES_FALLBACK = [
  { id: 'uti', nome: 'UTI' },
  { id: 'obstetricia', nome: 'Obstetrícia' },
  { id: 'enfermagem-do-trabalho', nome: 'Enfermagem do Trabalho' },
  { id: 'feridas', nome: 'Feridas' }
];

let especialidadesCarregadas = [];
let especialidadesSelecionadas = new Set();
let enderecoPessoal = null;
let pendenciaCoren = { situacaoAtual: 'regular' };
let arquivoAlvara = null;
let enderecoPessoalConfirmado = false;

const conteudoHtml = `
  <div class="cabecalho-pagina">
    <a class="btn btn--texto" href="./consultorio-lista.html">
      <span class="material-icons">arrow_back</span> Voltar
    </a>
    <h1 class="titulo-pagina">Nova solicitação de consultório</h1>
  </div>

  <div id="area-alerta"></div>

  <form id="formulario-consultorio" novalidate>

    <!-- Seção: Dados cadastrais -->
    <section class="card">
      <h2 class="card__titulo">Dados cadastrais</h2>
      <div class="grid-campos">
        <div class="col-12">
          <label class="campo">
            <span class="campo__rotulo">Nome do consultório <abbr title="Obrigatório">*</abbr></span>
            <input class="campo__entrada" type="text" id="nome" name="nome" maxlength="120" required />
            <span class="campo__erro" id="erro-nome"></span>
          </label>
        </div>

        <div class="col-6">
          <label class="campo">
            <span class="campo__rotulo">Site (opcional)</span>
            <input class="campo__entrada" type="url" id="site" name="site"
                   placeholder="https://exemplo.com.br" />
            <span class="campo__erro" id="erro-site"></span>
          </label>
        </div>

        <div class="col-6">
          <label class="campo">
            <span class="campo__rotulo">E-mail <abbr title="Obrigatório">*</abbr></span>
            <input class="campo__entrada" type="email" id="email" name="email" required />
            <span class="campo__erro" id="erro-email"></span>
          </label>
        </div>

        <div class="col-6">
          <label class="campo">
            <span class="campo__rotulo">Telefone <abbr title="Obrigatório">*</abbr></span>
            <input class="campo__entrada" type="tel" id="telefone" name="telefone"
                   placeholder="(00) 00000-0000" maxlength="16" required />
            <span class="campo__erro" id="erro-telefone"></span>
          </label>
        </div>

        <div class="col-6">
          <label class="campo">
            <span class="campo__rotulo">CNPJ <abbr title="Obrigatório">*</abbr></span>
            <input class="campo__entrada" type="text" id="cnpj" name="cnpj"
                   placeholder="00.000.000/0000-00" maxlength="18" required />
            <span class="campo__erro" id="erro-cnpj"></span>
          </label>
        </div>
      </div>
    </section>

    <!-- Seção: Horário e dias de atendimento -->
    <section class="card">
      <h2 class="card__titulo">Horário e dias de atendimento</h2>
      <div class="grid-campos">
        <div class="col-3">
          <label class="campo">
            <span class="campo__rotulo">Horário de início <abbr title="Obrigatório">*</abbr></span>
            <input class="campo__entrada" type="time" id="horario-inicio" required />
            <span class="campo__erro" id="erro-horario-inicio"></span>
          </label>
        </div>
        <div class="col-3">
          <label class="campo">
            <span class="campo__rotulo">Horário de término <abbr title="Obrigatório">*</abbr></span>
            <input class="campo__entrada" type="time" id="horario-fim" required />
            <span class="campo__erro" id="erro-horario-fim"></span>
          </label>
        </div>

        <div class="col-12">
          <fieldset class="campo">
            <legend class="campo__rotulo">Dias de atendimento <abbr title="Obrigatório">*</abbr></legend>
            <div class="grupo-checkboxes" id="grupo-dias">
              ${['domingo','segunda','terca','quarta','quinta','sexta','sabado'].map((d) => `
                <label class="checkbox-item">
                  <input type="checkbox" name="dias" value="${d}" />
                  <span>${rotuloDia(d)}</span>
                </label>
              `).join('')}
            </div>
            <span class="campo__erro" id="erro-dias"></span>
          </fieldset>
        </div>
      </div>
    </section>

    <!-- Seção: Endereço do consultório -->
    <section class="card">
      <h2 class="card__titulo">Endereço do consultório</h2>
      <div class="grid-campos">
        <div class="col-3">
          <label class="campo">
            <span class="campo__rotulo">CEP <abbr title="Obrigatório">*</abbr></span>
            <input class="campo__entrada" type="text" id="cep" name="cep"
                   placeholder="00000-000" maxlength="9" required />
            <span class="campo__erro" id="erro-cep"></span>
          </label>
        </div>
        <div class="col-3 acao-alinhada-campo">
          <button class="btn btn--secundario" type="button" id="botao-buscar-cep">
            <span class="material-icons">search</span> Buscar CEP
          </button>
        </div>

        <div class="col-8">
          <label class="campo">
            <span class="campo__rotulo">Endereço <abbr title="Obrigatório">*</abbr></span>
            <input class="campo__entrada" type="text" id="endereco" name="endereco" required />
            <span class="campo__erro" id="erro-endereco"></span>
          </label>
        </div>

        <div class="col-2">
          <label class="campo">
            <span class="campo__rotulo">Número (opcional)</span>
            <input class="campo__entrada" type="text" id="numero" name="numero" maxlength="10" />
          </label>
        </div>

        <div class="col-6">
          <label class="campo">
            <span class="campo__rotulo">Complemento (opcional)</span>
            <input class="campo__entrada" type="text" id="complemento" name="complemento" />
          </label>
        </div>

        <div class="col-6">
          <label class="campo">
            <span class="campo__rotulo">Bairro <abbr title="Obrigatório">*</abbr></span>
            <input class="campo__entrada" type="text" id="bairro" name="bairro" required />
            <span class="campo__erro" id="erro-bairro"></span>
          </label>
        </div>

        <div class="col-8">
          <label class="campo">
            <span class="campo__rotulo">Município <abbr title="Obrigatório">*</abbr></span>
            <input class="campo__entrada" type="text" id="municipio" name="municipio" required />
            <span class="campo__erro" id="erro-municipio"></span>
          </label>
        </div>

        <div class="col-4">
          <label class="campo">
            <span class="campo__rotulo">UF <abbr title="Obrigatório">*</abbr></span>
            <input class="campo__entrada" type="text" id="uf" name="uf" maxlength="2" required />
            <span class="campo__erro" id="erro-uf"></span>
          </label>
        </div>
      </div>
    </section>

    <!-- Seção: Endereço pessoal -->
    <section class="card">
      <h2 class="card__titulo">Endereço pessoal cadastrado</h2>
      <div class="endereco-pessoal" id="bloco-endereco-pessoal">
        <div class="endereco-pessoal__cabecalho">
          <span class="material-icons">home</span>
          <span class="endereco-pessoal__titulo">Endereço pessoal de Lilian Regina De Carvalho</span>
        </div>
        <p class="endereco-pessoal__texto" id="texto-endereco-pessoal">Carregando...</p>
        <div class="endereco-pessoal__acoes">
          <button class="btn btn--secundario" type="button" id="botao-confirmar-endereco-pessoal">
            <span class="material-icons">check</span> Confirmar endereço
          </button>
          <button class="btn btn--texto" type="button" id="botao-editar-endereco-pessoal">
            <span class="material-icons">edit</span> Alterar endereço
          </button>
        </div>
        <p class="endereco-pessoal__confirmado oculto" id="confirmacao-endereco-pessoal">
          <span class="material-icons">check_circle</span> Endereço pessoal confirmado
        </p>
        <span class="campo__erro" id="erro-endereco-pessoal"></span>
      </div>
    </section>

    <!-- Seção: Atividades -->
    <section class="card">
      <h2 class="card__titulo">Atividades desenvolvidas</h2>
      <label class="campo">
        <span class="campo__rotulo">
          Descreva as atividades desenvolvidas no consultório <abbr title="Obrigatório">*</abbr>
        </span>
        <textarea class="campo__textarea" id="atividades" name="atividades"
                  rows="6" maxlength="${LIMITE_ATIVIDADES}" required></textarea>
        <span class="campo__contador" id="contador-atividades">0 / ${LIMITE_ATIVIDADES}</span>
        <span class="campo__erro" id="erro-atividades"></span>
      </label>
    </section>

    <!-- Seção: Especialidades -->
    <section class="card">
      <h2 class="card__titulo">Especialidades</h2>
      <div class="campo" id="campo-especialidades">
        <span class="campo__rotulo" id="rotulo-especialidades">
          Registro de especialidades junto ao Coren <abbr title="Obrigatório">*</abbr>
        </span>
        <div class="multiselect" id="multiselect-especialidades">
          <button type="button" class="multiselect__campo" id="multiselect-especialidades-toggle"
                  aria-haspopup="listbox" aria-expanded="false"
                  aria-labelledby="rotulo-especialidades">
            <span class="multiselect__valor" id="multiselect-especialidades-valor">
              <span class="multiselect__placeholder">Selecione...</span>
            </span>
            <span class="material-icons multiselect__seta" aria-hidden="true">expand_more</span>
          </button>
          <div class="multiselect__painel" id="multiselect-especialidades-painel"
               role="listbox" aria-multiselectable="true" aria-labelledby="rotulo-especialidades">
            <div class="multiselect__acoes">
              <button type="button" data-multiselect-acao="marcar-todas">Marcar todas</button>
              <button type="button" data-multiselect-acao="limpar">Limpar</button>
            </div>
            <div id="multiselect-especialidades-opcoes"></div>
          </div>
        </div>
        <span class="campo__erro" id="erro-especialidades"></span>
      </div>
    </section>

    <!-- Seção: Anexo -->
    <section class="card">
      <h2 class="card__titulo">Anexo obrigatório</h2>
      <div class="anexo" id="bloco-anexo">
        <label class="campo">
          <span class="campo__rotulo">
            Alvará de funcionamento <abbr title="Obrigatório">*</abbr>
          </span>
          <span class="campo__ajuda">
            Formatos aceitos: PDF, JPG, PNG. Tamanho máximo: ${TAMANHO_MAX_ANEXO_MB} MB.
          </span>
          <input class="campo__arquivo" type="file" id="alvara"
                 accept=".pdf,.jpg,.jpeg,.png" required />
          <span class="campo__arquivo-info" id="info-arquivo">Nenhum arquivo selecionado</span>
          <span class="campo__erro" id="erro-alvara"></span>
        </label>
      </div>
    </section>

    <!-- Painel de simulação de pendência Coren (apenas no protótipo) -->
    <section class="painel-simulacao" aria-labelledby="titulo-simulacao">
      <h2 class="painel-simulacao__titulo" id="titulo-simulacao">
        <span class="material-icons">science</span>
        Simulação de regularidade no Coren (apenas protótipo)
      </h2>
      <p class="painel-simulacao__descricao">
        Selecione abaixo a situação que deseja simular ao enviar o formulário.
        Em ambiente real, esta validação é automática.
      </p>
      <div class="painel-simulacao__botoes" id="botoes-simulacao">
        <button type="button" class="painel-simulacao__botao" data-situacao="regular">
          Regular
        </button>
        <button type="button" class="painel-simulacao__botao" data-situacao="financeira">
          Pendência financeira
        </button>
        <button type="button" class="painel-simulacao__botao" data-situacao="eleitoral">
          Pendência eleitoral
        </button>
        <button type="button" class="painel-simulacao__botao" data-situacao="etica">
          Pendência ética
        </button>
      </div>
    </section>

    <!-- Ações finais -->
    <div class="acoes-formulario">
      <a class="btn btn--texto" href="./consultorio-lista.html">Cancelar</a>
      <button class="btn btn--primario" type="submit">
        <span class="material-icons">send</span> Enviar solicitação
      </button>
    </div>
  </form>
`;

document.addEventListener('DOMContentLoaded', async () => {
  renderizarLayout('app', 'Nova solicitação', conteudoHtml);

  await Promise.all([
    carregarEspecialidades(),
    carregarEnderecoPessoal(),
    carregarPendenciaCoren()
  ]);

  configurarMascaras();
  configurarValidacoesEmTempoReal();
  configurarBuscaCep();
  configurarEnderecoPessoal();
  configurarAnexo();
  configurarSimulacao();
  configurarContadorAtividades();
  configurarEnvio();
});

/* ----------------------- Carga inicial ----------------------- */

async function carregarEspecialidades() {
  try {
    especialidadesCarregadas = await carregarJson('especialidades.json');
  } catch (erro) {
    // Fallback para permitir testes sem servidor HTTP
    especialidadesCarregadas = ESPECIALIDADES_FALLBACK;
  }
  inicializarMultiselectEspecialidades();
}

/* ----------------------- Componente Multiselect ----------------------- */

function inicializarMultiselectEspecialidades() {
  const opcoesContainer = document.getElementById('multiselect-especialidades-opcoes');
  opcoesContainer.innerHTML = '';

  especialidadesCarregadas.forEach((e) => {
    const opcao = document.createElement('label');
    opcao.className = 'multiselect__opcao';
    opcao.setAttribute('role', 'option');
    opcao.dataset.valor = e.id;
    opcao.innerHTML = `
      <input type="checkbox" value="${e.id}" />
      <span>${e.nome}</span>
    `;
    const checkbox = opcao.querySelector('input');
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        especialidadesSelecionadas.add(e.id);
      } else {
        especialidadesSelecionadas.delete(e.id);
      }
      atualizarMultiselectEspecialidades();
      validarCampo('especialidades');
    });
    opcoesContainer.appendChild(opcao);
  });

  // Toggle do painel
  const componente = document.getElementById('multiselect-especialidades');
  const toggle = document.getElementById('multiselect-especialidades-toggle');
  toggle.addEventListener('click', () => {
    const aberto = componente.classList.toggle('multiselect--aberto');
    toggle.setAttribute('aria-expanded', aberto ? 'true' : 'false');
  });

  // Ações do painel (marcar todas / limpar)
  componente.querySelectorAll('[data-multiselect-acao]').forEach((btn) => {
    btn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const acao = btn.dataset.multiselectAcao;
      if (acao === 'marcar-todas') {
        especialidadesCarregadas.forEach((e) => especialidadesSelecionadas.add(e.id));
      } else if (acao === 'limpar') {
        especialidadesSelecionadas.clear();
      }
      atualizarMultiselectEspecialidades();
      validarCampo('especialidades');
    });
  });

  // Fecha ao clicar fora
  document.addEventListener('click', (ev) => {
    if (!componente.contains(ev.target) && componente.classList.contains('multiselect--aberto')) {
      componente.classList.remove('multiselect--aberto');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Fecha com ESC
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && componente.classList.contains('multiselect--aberto')) {
      componente.classList.remove('multiselect--aberto');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });

  atualizarMultiselectEspecialidades();
}

function atualizarMultiselectEspecialidades() {
  const valor = document.getElementById('multiselect-especialidades-valor');
  const opcoes = document.querySelectorAll('#multiselect-especialidades-opcoes .multiselect__opcao');

  // Sincroniza estado visual das opções
  opcoes.forEach((op) => {
    const id = op.dataset.valor;
    const marcada = especialidadesSelecionadas.has(id);
    op.classList.toggle('multiselect__opcao--selecionada', marcada);
    const cb = op.querySelector('input[type="checkbox"]');
    if (cb.checked !== marcada) cb.checked = marcada;
  });

  // Atualiza o label com chips ou placeholder
  if (especialidadesSelecionadas.size === 0) {
    valor.innerHTML = '<span class="multiselect__placeholder">Selecione...</span>';
    return;
  }

  valor.innerHTML = '';
  especialidadesCarregadas
    .filter((e) => especialidadesSelecionadas.has(e.id))
    .forEach((e) => {
      const chip = document.createElement('span');
      chip.className = 'multiselect__chip';
      chip.innerHTML = `
        ${escaparHtml(e.nome)}
        <button type="button" class="multiselect__chip-remover"
                aria-label="Remover ${escaparHtml(e.nome)}" data-remover="${e.id}">
          <span class="material-icons" aria-hidden="true">close</span>
        </button>
      `;
      chip.querySelector('[data-remover]').addEventListener('click', (ev) => {
        ev.stopPropagation();
        especialidadesSelecionadas.delete(e.id);
        atualizarMultiselectEspecialidades();
        validarCampo('especialidades');
      });
      valor.appendChild(chip);
    });
}

async function carregarEnderecoPessoal() {
  try {
    enderecoPessoal = await carregarJson('endereco-pessoal.json');
    atualizarTextoEnderecoPessoal();
  } catch (erro) {
    document.getElementById('texto-endereco-pessoal').textContent =
      'Não foi possível carregar o endereço pessoal.';
  }
}

async function carregarPendenciaCoren() {
  try {
    pendenciaCoren = await carregarJson('pendencia-coren.json');
    marcarBotaoSimulacaoAtivo(pendenciaCoren.situacaoAtual);
  } catch (erro) {
    pendenciaCoren = { situacaoAtual: 'regular' };
    marcarBotaoSimulacaoAtivo('regular');
  }
}

/* ----------------------- Máscaras ----------------------- */

function configurarMascaras() {
  const cnpj = document.getElementById('cnpj');
  cnpj.addEventListener('input', () => { cnpj.value = formatarCnpj(cnpj.value); });

  const tel = document.getElementById('telefone');
  tel.addEventListener('input', () => { tel.value = formatarTelefone(tel.value); });

  const cep = document.getElementById('cep');
  cep.addEventListener('input', () => { cep.value = formatarCep(cep.value); });

  const uf = document.getElementById('uf');
  uf.addEventListener('input', () => {
    uf.value = uf.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 2);
  });
}

/* ----------------------- Validação em tempo real ----------------------- */

function configurarValidacoesEmTempoReal() {
  const campos = ['nome', 'email', 'telefone', 'cnpj', 'horario-inicio', 'horario-fim',
                  'cep', 'endereco', 'bairro', 'municipio', 'uf', 'atividades',
                  'site'];
  campos.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('blur', () => validarCampo(id));
  });

  // Checkboxes de dias
  document.querySelectorAll('input[name="dias"]').forEach((cb) => {
    cb.addEventListener('change', () => validarCampo('dias'));
  });
}

function validarCampo(id) {
  const el = document.getElementById(id);
  const limparErro = (campoId) => {
    const erroEl = document.getElementById(`erro-${campoId}`);
    if (erroEl) erroEl.textContent = '';
    if (el && el.closest('.campo')) el.closest('.campo').classList.remove('campo--invalido');
  };
  const setarErro = (campoId, mensagem) => {
    const erroEl = document.getElementById(`erro-${campoId}`);
    if (erroEl) erroEl.textContent = mensagem;
    if (el && el.closest('.campo')) el.closest('.campo').classList.add('campo--invalido');
  };

  limparErro(id);

  switch (id) {
    case 'nome':
      if (!el.value.trim()) { setarErro(id, 'Informe o nome do consultório.'); return false; }
      return true;

    case 'email':
      if (!el.value.trim()) { setarErro(id, 'Informe o e-mail.'); return false; }
      if (!validarEmail(el.value)) { setarErro(id, 'E-mail inválido.'); return false; }
      return true;

    case 'telefone':
      if (!el.value.trim()) { setarErro(id, 'Informe o telefone.'); return false; }
      if (el.value.replace(/\D/g, '').length < 10) {
        setarErro(id, 'Telefone deve ter DDD e número completos.');
        return false;
      }
      return true;

    case 'cnpj':
      if (!el.value.trim()) { setarErro(id, 'Informe o CNPJ.'); return false; }
      if (!validarCnpj(el.value)) { setarErro(id, 'CNPJ inválido.'); return false; }
      return true;

    case 'horario-inicio':
      if (!el.value) { setarErro(id, 'Informe o horário de início.'); return false; }
      return true;

    case 'horario-fim': {
      const inicio = document.getElementById('horario-inicio').value;
      if (!el.value) { setarErro(id, 'Informe o horário de término.'); return false; }
      if (inicio && el.value <= inicio) {
        setarErro(id, 'O término deve ser posterior ao início.');
        return false;
      }
      return true;
    }

    case 'dias': {
      const marcados = document.querySelectorAll('input[name="dias"]:checked').length;
      const erroEl = document.getElementById('erro-dias');
      const fieldset = document.getElementById('grupo-dias').closest('.campo');
      if (marcados === 0) {
        erroEl.textContent = 'Selecione pelo menos um dia de atendimento.';
        fieldset.classList.add('campo--invalido');
        return false;
      }
      erroEl.textContent = '';
      fieldset.classList.remove('campo--invalido');
      return true;
    }

    case 'cep':
      if (!el.value.trim()) { setarErro(id, 'Informe o CEP.'); return false; }
      if (el.value.replace(/\D/g, '').length !== 8) {
        setarErro(id, 'CEP deve ter 8 dígitos.');
        return false;
      }
      return true;

    case 'endereco':
      if (!el.value.trim()) { setarErro(id, 'Informe o endereço.'); return false; }
      return true;

    case 'bairro':
      if (!el.value.trim()) { setarErro(id, 'Informe o bairro.'); return false; }
      return true;

    case 'municipio':
      if (!el.value.trim()) { setarErro(id, 'Informe o município.'); return false; }
      return true;

    case 'uf':
      if (!el.value.trim()) { setarErro(id, 'Informe a UF.'); return false; }
      if (el.value.length !== 2) { setarErro(id, 'UF deve ter 2 letras.'); return false; }
      return true;

    case 'atividades':
      if (!el.value.trim()) { setarErro(id, 'Descreva as atividades desenvolvidas.'); return false; }
      if (el.value.length > LIMITE_ATIVIDADES) {
        setarErro(id, `Máximo de ${LIMITE_ATIVIDADES} caracteres.`);
        return false;
      }
      return true;

    case 'especialidades': {
      const componente = document.getElementById('multiselect-especialidades');
      const erroEl = document.getElementById('erro-especialidades');
      if (especialidadesSelecionadas.size === 0) {
        erroEl.textContent = 'Selecione pelo menos uma especialidade.';
        componente.classList.add('multiselect--invalido');
        return false;
      }
      erroEl.textContent = '';
      componente.classList.remove('multiselect--invalido');
      return true;
    }

    case 'site':
      if (!el.value.trim()) return true; // opcional
      try { new URL(el.value); return true; }
      catch { setarErro(id, 'Informe uma URL válida (ex.: https://exemplo.com).'); return false; }
  }
  return true;
}

/* ----------------------- ViaCEP ----------------------- */

function configurarBuscaCep() {
  const botao = document.getElementById('botao-buscar-cep');
  const cep = document.getElementById('cep');

  const buscar = async () => {
    if (!validarCampo('cep')) return;
    botao.disabled = true;
    botao.textContent = 'Buscando...';
    try {
      const dados = await consultarCep(cep.value);
      document.getElementById('endereco').value = dados.logradouro || '';
      document.getElementById('bairro').value = dados.bairro || '';
      document.getElementById('municipio').value = dados.localidade || '';
      document.getElementById('uf').value = dados.uf || '';
      mostrarAlerta('sucesso', 'CEP encontrado',
        'Os campos de endereço foram preenchidos automaticamente.');
    } catch (erro) {
      mostrarAlerta('erro', 'CEP não localizado', erro.message);
    } finally {
      botao.disabled = false;
      botao.innerHTML = '<span class="material-icons">search</span> Buscar CEP';
    }
  };

  botao.addEventListener('click', buscar);
  cep.addEventListener('blur', () => {
    if (cep.value.replace(/\D/g, '').length === 8) buscar();
  });
}

/* ----------------------- Endereço pessoal ----------------------- */

function atualizarTextoEnderecoPessoal() {
  if (!enderecoPessoal) return;
  const partes = [
    `${enderecoPessoal.endereco}, ${enderecoPessoal.numero}`,
    enderecoPessoal.complemento,
    enderecoPessoal.bairro,
    `${enderecoPessoal.municipio}/${enderecoPessoal.uf}`,
    `CEP ${enderecoPessoal.cep}`
  ].filter(Boolean);
  document.getElementById('texto-endereco-pessoal').textContent = partes.join(' — ');
}

function configurarEnderecoPessoal() {
  const botaoConfirmar = document.getElementById('botao-confirmar-endereco-pessoal');
  const botaoEditar = document.getElementById('botao-editar-endereco-pessoal');
  const confirmacao = document.getElementById('confirmacao-endereco-pessoal');

  botaoConfirmar.addEventListener('click', () => {
    enderecoPessoalConfirmado = true;
    confirmacao.classList.remove('oculto');
    botaoConfirmar.disabled = true;
    document.getElementById('erro-endereco-pessoal').textContent = '';
    document.getElementById('bloco-endereco-pessoal').classList.remove('endereco-pessoal--invalido');
  });

  botaoEditar.addEventListener('click', abrirModalEnderecoPessoal);

  configurarModalEnderecoPessoal();
}

/* ----------------------- Modal de endereço pessoal ----------------------- */

function abrirModalEnderecoPessoal() {
  if (!enderecoPessoal) return;
  document.getElementById('ep-cep').value = enderecoPessoal.cep || '';
  document.getElementById('ep-endereco').value = enderecoPessoal.endereco || '';
  document.getElementById('ep-numero').value = enderecoPessoal.numero || '';
  document.getElementById('ep-complemento').value = enderecoPessoal.complemento || '';
  document.getElementById('ep-bairro').value = enderecoPessoal.bairro || '';
  document.getElementById('ep-municipio').value = enderecoPessoal.municipio || '';
  document.getElementById('ep-uf').value = enderecoPessoal.uf || '';

  // Limpa erros
  ['cep', 'endereco', 'bairro', 'municipio', 'uf'].forEach((c) => {
    document.getElementById(`ep-erro-${c}`).textContent = '';
    document.getElementById(`ep-${c}`).closest('.campo').classList.remove('campo--invalido');
  });

  document.getElementById('modal-endereco').classList.add('modal--aberto');
  setTimeout(() => document.getElementById('ep-cep').focus(), 50);
}

function fecharModalEnderecoPessoal() {
  document.getElementById('modal-endereco').classList.remove('modal--aberto');
}

function configurarModalEnderecoPessoal() {
  const modal = document.getElementById('modal-endereco');
  const form = document.getElementById('form-endereco-modal');
  const botaoCancelar = document.getElementById('ep-botao-cancelar');
  const botaoBuscarCep = document.getElementById('ep-botao-buscar-cep');
  const campoCep = document.getElementById('ep-cep');
  const campoUf = document.getElementById('ep-uf');

  // Máscaras
  campoCep.addEventListener('input', () => { campoCep.value = formatarCep(campoCep.value); });
  campoUf.addEventListener('input', () => {
    campoUf.value = campoUf.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 2);
  });

  // Fechar modal
  botaoCancelar.addEventListener('click', fecharModalEnderecoPessoal);
  modal.addEventListener('click', (ev) => {
    if (ev.target === modal) fecharModalEnderecoPessoal();
  });
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && modal.classList.contains('modal--aberto')) {
      fecharModalEnderecoPessoal();
    }
  });

  // Busca CEP
  const buscarCepModal = async () => {
    const cep = campoCep.value.replace(/\D/g, '');
    if (cep.length !== 8) {
      definirErroModal('cep', 'CEP deve ter 8 dígitos.');
      return;
    }
    botaoBuscarCep.disabled = true;
    try {
      const dados = await consultarCep(cep);
      document.getElementById('ep-endereco').value = dados.logradouro || '';
      document.getElementById('ep-bairro').value = dados.bairro || '';
      document.getElementById('ep-municipio').value = dados.localidade || '';
      document.getElementById('ep-uf').value = dados.uf || '';
      definirErroModal('cep', '');
    } catch (erro) {
      definirErroModal('cep', erro.message);
    } finally {
      botaoBuscarCep.disabled = false;
    }
  };
  botaoBuscarCep.addEventListener('click', buscarCepModal);
  campoCep.addEventListener('blur', () => {
    if (campoCep.value.replace(/\D/g, '').length === 8) buscarCepModal();
  });

  // Submissão
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    if (!validarFormularioEnderecoPessoal()) return;

    enderecoPessoal = {
      cep: document.getElementById('ep-cep').value.trim(),
      endereco: document.getElementById('ep-endereco').value.trim(),
      numero: document.getElementById('ep-numero').value.trim(),
      complemento: document.getElementById('ep-complemento').value.trim(),
      bairro: document.getElementById('ep-bairro').value.trim(),
      municipio: document.getElementById('ep-municipio').value.trim(),
      uf: document.getElementById('ep-uf').value.trim().toUpperCase()
    };
    enderecoPessoalConfirmado = false;
    document.getElementById('confirmacao-endereco-pessoal').classList.add('oculto');
    document.getElementById('botao-confirmar-endereco-pessoal').disabled = false;
    atualizarTextoEnderecoPessoal();
    fecharModalEnderecoPessoal();
    mostrarAlerta('info', 'Endereço pessoal atualizado',
      'Não esqueça de confirmar o novo endereço antes de enviar a solicitação.');
  });
}

function definirErroModal(campo, mensagem) {
  const el = document.getElementById(`ep-${campo}`);
  const erro = document.getElementById(`ep-erro-${campo}`);
  erro.textContent = mensagem;
  el.closest('.campo').classList.toggle('campo--invalido', !!mensagem);
}

function validarFormularioEnderecoPessoal() {
  let valido = true;
  const obrig = {
    'cep': 'Informe o CEP.',
    'endereco': 'Informe o endereço.',
    'bairro': 'Informe o bairro.',
    'municipio': 'Informe o município.',
    'uf': 'Informe a UF.'
  };
  Object.entries(obrig).forEach(([c, msg]) => {
    const val = document.getElementById(`ep-${c}`).value.trim();
    if (!val) { definirErroModal(c, msg); valido = false; return; }
    definirErroModal(c, '');
  });

  const cep = document.getElementById('ep-cep').value.replace(/\D/g, '');
  if (cep && cep.length !== 8) {
    definirErroModal('cep', 'CEP deve ter 8 dígitos.');
    valido = false;
  }
  const uf = document.getElementById('ep-uf').value.trim();
  if (uf && uf.length !== 2) {
    definirErroModal('uf', 'UF deve ter 2 letras.');
    valido = false;
  }
  return valido;
}

/* ----------------------- Anexo ----------------------- */

function configurarAnexo() {
  const input = document.getElementById('alvara');
  const info = document.getElementById('info-arquivo');
  const erro = document.getElementById('erro-alvara');
  const bloco = document.getElementById('bloco-anexo');

  input.addEventListener('change', () => {
    erro.textContent = '';
    bloco.classList.remove('anexo--invalido');
    const arquivo = input.files[0];
    if (!arquivo) {
      info.textContent = 'Nenhum arquivo selecionado';
      arquivoAlvara = null;
      return;
    }

    if (!TIPOS_ANEXO_ACEITOS.includes(arquivo.type)) {
      erro.textContent = 'Tipo de arquivo não permitido. Use PDF, JPG ou PNG.';
      bloco.classList.add('anexo--invalido');
      input.value = '';
      arquivoAlvara = null;
      info.textContent = 'Nenhum arquivo selecionado';
      return;
    }

    if (arquivo.size > TAMANHO_MAX_ANEXO_MB * 1024 * 1024) {
      erro.textContent = `O arquivo excede o tamanho máximo de ${TAMANHO_MAX_ANEXO_MB} MB.`;
      bloco.classList.add('anexo--invalido');
      input.value = '';
      arquivoAlvara = null;
      info.textContent = 'Nenhum arquivo selecionado';
      return;
    }

    arquivoAlvara = arquivo;
    const tamanhoKb = (arquivo.size / 1024).toFixed(1);
    info.textContent = `${arquivo.name} (${tamanhoKb} KB)`;
  });
}

/* ----------------------- Simulação Coren ----------------------- */

function configurarSimulacao() {
  document.querySelectorAll('#botoes-simulacao .painel-simulacao__botao').forEach((b) => {
    b.addEventListener('click', () => {
      pendenciaCoren.situacaoAtual = b.dataset.situacao;
      marcarBotaoSimulacaoAtivo(b.dataset.situacao);
    });
  });
}

function marcarBotaoSimulacaoAtivo(situacao) {
  document.querySelectorAll('#botoes-simulacao .painel-simulacao__botao').forEach((b) => {
    b.classList.toggle('painel-simulacao__botao--ativo', b.dataset.situacao === situacao);
  });
}

/* ----------------------- Contador de atividades ----------------------- */

function configurarContadorAtividades() {
  const ta = document.getElementById('atividades');
  const contador = document.getElementById('contador-atividades');
  ta.addEventListener('input', () => {
    contador.textContent = `${ta.value.length} / ${LIMITE_ATIVIDADES}`;
  });
}

/* ----------------------- Envio ----------------------- */

function configurarEnvio() {
  document.getElementById('formulario-consultorio').addEventListener('submit', (ev) => {
    ev.preventDefault();
    enviarFormulario();
  });
}

function enviarFormulario() {
  const campos = ['nome', 'email', 'telefone', 'cnpj',
                  'horario-inicio', 'horario-fim', 'dias',
                  'cep', 'endereco', 'bairro', 'municipio', 'uf',
                  'atividades', 'especialidades', 'site'];
  let valido = true;
  campos.forEach((c) => { if (!validarCampo(c)) valido = false; });

  // Anexo obrigatório
  if (!arquivoAlvara) {
    document.getElementById('erro-alvara').textContent =
      'Anexe o alvará de funcionamento.';
    document.getElementById('bloco-anexo').classList.add('anexo--invalido');
    valido = false;
  }

  // Confirmação do endereço pessoal
  if (!enderecoPessoalConfirmado) {
    document.getElementById('erro-endereco-pessoal').textContent =
      'Confirme o endereço pessoal antes de enviar.';
    valido = false;
  }

  if (!valido) {
    mostrarAlerta('erro', 'Há campos pendentes',
      'Verifique os campos destacados em vermelho e tente novamente.');
    rolarParaPrimeiroErro();
    return;
  }

  // Avaliação da pendência simulada
  const situacao = pendenciaCoren.situacaoAtual || 'regular';
  if (situacao !== 'regular') {
    const mensagens = {
      'financeira': {
        titulo: 'Solicitação bloqueada por pendência financeira',
        texto: 'Identificamos pendências financeiras junto ao Coren. ' +
               'Regularize-as no setor financeiro para prosseguir com o registro do consultório.'
      },
      'eleitoral': {
        titulo: 'Solicitação bloqueada por pendência eleitoral',
        texto: 'Identificamos pendências eleitorais junto ao Coren. ' +
               'Regularize sua situação eleitoral profissional para prosseguir.'
      },
      'etica': {
        titulo: 'Solicitação bloqueada por pendência ética',
        texto: 'Identificamos pendências éticas em seu cadastro profissional. ' +
               'Procure a Comissão de Ética do Coren para mais informações.'
      }
    };
    const m = mensagens[situacao];
    mostrarAlerta('aviso', m.titulo, m.texto);
    rolarParaTopo();
    return;
  }

  // Sucesso (protótipo)
  persistirNovoConsultorio()
    .then((nomeSalvo) => {
      try {
        sessionStorage.setItem('sigen.prototipo.solicitacaoEnviada', nomeSalvo);
      } catch (_) { /* ignora */ }
      mostrarAlerta('sucesso', 'Solicitação enviada',
        'Sua solicitação foi enviada e está em análise. ' +
        'Você será redirecionado para a lista de consultórios.');
      rolarParaTopo();
      setTimeout(() => {
        window.location.href = './consultorio-lista.html';
      }, 2000);
    })
    .catch((erro) => {
      mostrarAlerta('erro', 'Falha ao registrar solicitação', erro.message);
    });
}

/**
 * Monta o objeto do novo consultório a partir do formulário,
 * adiciona à lista persistida e retorna o nome salvo.
 */
async function persistirNovoConsultorio() {
  const lista = await carregarConsultorios();
  const novo = {
    id: gerarNovoIdConsultorio(lista),
    nome: document.getElementById('nome').value.trim(),
    site: document.getElementById('site').value.trim(),
    email: document.getElementById('email').value.trim(),
    telefone: document.getElementById('telefone').value.trim(),
    cnpj: document.getElementById('cnpj').value.trim(),
    horarioInicio: document.getElementById('horario-inicio').value,
    horarioFim: document.getElementById('horario-fim').value,
    diasAtendimento: Array.from(
      document.querySelectorAll('input[name="dias"]:checked')
    ).map((cb) => cb.value),
    cep: document.getElementById('cep').value.trim(),
    endereco: document.getElementById('endereco').value.trim(),
    numero: document.getElementById('numero').value.trim(),
    complemento: document.getElementById('complemento').value.trim(),
    bairro: document.getElementById('bairro').value.trim(),
    municipio: document.getElementById('municipio').value.trim(),
    uf: document.getElementById('uf').value.trim().toUpperCase(),
    atividades: document.getElementById('atividades').value.trim(),
    especialidades: Array.from(especialidadesSelecionadas),
    alvara: arquivoAlvara ? arquivoAlvara.name : '',
    status: 'em-analise',
    dataCadastro: new Date().toISOString().slice(0, 10)
  };
  lista.push(novo);
  salvarConsultorios(lista);
  return novo.nome;
}

function rolarParaPrimeiroErro() {
  const primeiro = document.querySelector('.campo--invalido, .anexo--invalido, .multiselect--invalido');
  if (primeiro) primeiro.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function rolarParaTopo() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ----------------------- Alerta ----------------------- */

function mostrarAlerta(tipo, titulo, mensagem) {
  const area = document.getElementById('area-alerta');
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
