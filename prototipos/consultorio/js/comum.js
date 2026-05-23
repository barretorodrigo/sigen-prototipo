/* ============================================================
   SIGEN — Funções comuns ao protótipo Registro de Consultório
   ============================================================ */

// Caminho relativo aos arquivos de dados (a partir das páginas HTML em prototipos/consultorio/)
const CAMINHO_DADOS = './data/';
const CAMINHO_LOGO = '../../SIGEN_files/logo-cofen.png';

/**
 * Carrega um arquivo JSON local.
 * Prioriza dados embutidos em window.DADOS_MOCK (carregados via data/dados.js)
 * para que o protótipo funcione mesmo aberto direto pelo navegador (file://),
 * em que o fetch() seria bloqueado por CORS.
 * @param {string} nomeArquivo Nome do arquivo dentro de data/
 * @returns {Promise<any>}
 */
async function carregarJson(nomeArquivo) {
  // 1) Dados embutidos (preferencial — funciona em file:// e http(s)://)
  if (typeof window !== 'undefined' && window.DADOS_MOCK && nomeArquivo in window.DADOS_MOCK) {
    // Retorna uma cópia profunda para evitar mutações acidentais entre páginas
    return JSON.parse(JSON.stringify(window.DADOS_MOCK[nomeArquivo]));
  }

  // 2) Fallback: tenta carregar o arquivo JSON via fetch (somente em http(s)://)
  const resposta = await fetch(`${CAMINHO_DADOS}${nomeArquivo}`);
  if (!resposta.ok) {
    throw new Error(`Falha ao carregar ${nomeArquivo}`);
  }
  return resposta.json();
}

/* ============================================================
   Persistência local dos consultórios (protótipo)
   ------------------------------------------------------------
   Como não há backend, usamos localStorage para manter as
   alterações entre páginas (novo cadastro, cancelamento, etc.).
   A primeira leitura semeia o storage com os dados mock.
   ============================================================ */

const CHAVE_STORAGE_CONSULTORIOS = 'sigen.prototipo.consultorios';

/**
 * Retorna a lista de consultórios persistida.
 * Se ainda não houver, semeia a partir do mock e retorna.
 */
async function carregarConsultorios() {
  try {
    const bruto = localStorage.getItem(CHAVE_STORAGE_CONSULTORIOS);
    if (bruto) {
      return JSON.parse(bruto);
    }
  } catch (_) {
    // Acesso ao storage pode ser bloqueado em alguns contextos; segue para o mock.
  }

  const sementes = await carregarJson('consultorios.json');
  salvarConsultorios(sementes);
  return sementes;
}

/**
 * Persiste a lista de consultórios.
 */
function salvarConsultorios(lista) {
  try {
    localStorage.setItem(CHAVE_STORAGE_CONSULTORIOS, JSON.stringify(lista));
  } catch (_) {
    // Ignora silenciosamente quando o storage não está disponível.
  }
}

/**
 * Gera um novo id incremental com base na lista atual.
 */
function gerarNovoIdConsultorio(lista) {
  const numericos = lista
    .map((c) => parseInt(c.id, 10))
    .filter((n) => !Number.isNaN(n));
  const proximo = numericos.length === 0 ? 1 : Math.max(...numericos) + 1;
  return String(proximo);
}

/**
 * Renderiza o cabeçalho e o menu lateral (drawer) no elemento informado.
 * Apenas o item "Consultório" aparece como ativo, conforme o protótipo.
 * @param {string} idContainer ID do elemento que receberá o layout
 * @param {string} tituloPagina Título da página atual
 * @param {string} contextoHtml HTML do conteúdo principal
 */
function renderizarLayout(idContainer, tituloPagina, contextoHtml) {
  const container = document.getElementById(idContainer);
  container.innerHTML = `
    <div class="layout">
      <header class="cabecalho">
        <button class="cabecalho__menu-toggle" type="button" aria-label="Abrir menu" id="botao-menu">
          <span class="material-icons">menu</span>
        </button>
        <a class="cabecalho__logo" href="./consultorio-lista.html" aria-label="Página inicial">
          <img src="${CAMINHO_LOGO}" alt="Logo Cofen" />
        </a>
        <div class="cabecalho__espaco"></div>
        <div class="cabecalho__acoes">
          <button class="cabecalho__icone" type="button" aria-label="Notificações">
            <span class="material-icons">notifications</span>
          </button>
          <div class="cabecalho__avatar" role="button" tabindex="0" aria-label="Menu do usuário">
            <div class="cabecalho__avatar-circulo">L</div>
            <span class="cabecalho__avatar-nome">Lilian Regina De Carvalho</span>
            <span class="material-icons" aria-hidden="true">expand_more</span>
          </div>
        </div>
      </header>

      <div class="container-principal">
        <nav class="drawer" id="drawer" aria-label="Menu lateral">
          <h4 class="drawer__titulo">Navegação</h4>
          <a class="drawer__item" href="#">
            <span class="material-icons">home</span> Home
          </a>
          <a class="drawer__item" href="#">
            <span class="material-icons">person</span> Meus Dados
          </a>

          <details class="drawer__grupo" open>
            <summary class="drawer__grupo-cabecalho">
              <span class="material-icons">account_balance</span>
              <span>Empresa</span>
              <span class="material-icons drawer__grupo-seta">expand_more</span>
            </summary>
            <div class="drawer__grupo-conteudo">
              <a class="drawer__item" href="#">
                <span class="material-icons">edit_note</span> Responsabilidade técnica
              </a>
              <a class="drawer__item drawer__item--ativo" href="./consultorio-lista.html">
                <span class="material-icons">medical_services</span> Consultório
              </a>
            </div>
          </details>

          <details class="drawer__grupo">
            <summary class="drawer__grupo-cabecalho">
              <span class="material-icons">manage_accounts</span>
              <span>Registro e cadastro</span>
              <span class="material-icons drawer__grupo-seta">expand_more</span>
            </summary>
            <div class="drawer__grupo-conteudo">
              <a class="drawer__item" href="#">
                <span class="material-icons">person_add</span> Primeira Inscrição
              </a>
            </div>
          </details>

          <details class="drawer__grupo">
            <summary class="drawer__grupo-cabecalho">
              <span class="material-icons">attach_money</span>
              <span>Área Financeira</span>
              <span class="material-icons drawer__grupo-seta">expand_more</span>
            </summary>
            <div class="drawer__grupo-conteudo">
              <a class="drawer__item" href="#">
                <span class="material-icons">paid</span> Situação Financeira
              </a>
            </div>
          </details>
        </nav>

        <main class="conteudo" id="conteudo">
          ${contextoHtml}
        </main>
      </div>
    </div>
  `;

  document.title = `SIGEN — ${tituloPagina}`;

  // Toggle do drawer no mobile
  const botaoMenu = document.getElementById('botao-menu');
  const drawer = document.getElementById('drawer');
  botaoMenu.addEventListener('click', () => {
    drawer.classList.toggle('drawer--aberto');
  });
}

/**
 * Formata um CEP no padrão 00000-000.
 */
function formatarCep(valor) {
  const digitos = (valor || '').replace(/\D/g, '').slice(0, 8);
  if (digitos.length <= 5) return digitos;
  return `${digitos.slice(0, 5)}-${digitos.slice(5)}`;
}

/**
 * Formata um CNPJ no padrão 00.000.000/0000-00.
 */
function formatarCnpj(valor) {
  const d = (valor || '').replace(/\D/g, '').slice(0, 14);
  let saida = d;
  if (d.length > 2) saida = `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length > 5) saida = `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length > 8) saida = `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  if (d.length > 12) saida = `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
  return saida;
}

/**
 * Formata um telefone no padrão (00) 0000-0000 ou (00) 00000-0000.
 */
function formatarTelefone(valor) {
  const d = (valor || '').replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/**
 * Valida CNPJ pela rotina de dígitos verificadores.
 */
function validarCnpj(cnpj) {
  const d = (cnpj || '').replace(/\D/g, '');
  if (d.length !== 14) return false;
  if (/^(\d)\1+$/.test(d)) return false;

  const calcularDigito = (base) => {
    const pesos = base.length === 12
      ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
      : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let soma = 0;
    for (let i = 0; i < base.length; i++) {
      soma += parseInt(base[i], 10) * pesos[i];
    }
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const dig1 = calcularDigito(d.slice(0, 12));
  const dig2 = calcularDigito(d.slice(0, 12) + dig1);
  return dig1 === parseInt(d[12], 10) && dig2 === parseInt(d[13], 10);
}

/**
 * Valida e-mail em formato padrão.
 */
function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((email || '').trim());
}

/**
 * Consulta a API pública do ViaCEP.
 * Retorna o objeto de resposta ou lança erro.
 */
async function consultarCep(cep) {
  const digitos = (cep || '').replace(/\D/g, '');
  if (digitos.length !== 8) {
    throw new Error('CEP deve ter 8 dígitos.');
  }
  const resposta = await fetch(`https://viacep.com.br/ws/${digitos}/json/`);
  if (!resposta.ok) {
    throw new Error('Falha ao consultar o CEP.');
  }
  const dados = await resposta.json();
  if (dados.erro) {
    throw new Error('CEP não encontrado.');
  }
  return dados;
}

/**
 * Retorna o rótulo amigável do status.
 */
function rotuloStatus(status) {
  const mapa = {
    'ativo': 'Ativo',
    'cancelado': 'Cancelado',
    'em-analise': 'Em análise'
  };
  return mapa[status] || status;
}

/**
 * Retorna o nome amigável do dia da semana.
 */
function rotuloDia(dia) {
  const mapa = {
    'domingo': 'Domingo',
    'segunda': 'Segunda-feira',
    'terca': 'Terça-feira',
    'quarta': 'Quarta-feira',
    'quinta': 'Quinta-feira',
    'sexta': 'Sexta-feira',
    'sabado': 'Sábado'
  };
  return mapa[dia] || dia;
}

/**
 * Formata uma data ISO (YYYY-MM-DD) para o padrão DD/MM/YYYY.
 */
function formatarData(iso) {
  if (!iso) return '';
  const [a, m, d] = iso.split('-');
  return `${d}/${m}/${a}`;
}
