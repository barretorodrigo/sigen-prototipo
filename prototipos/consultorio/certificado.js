/* ============================================================
   SIGEN — Certificado de Registro de Consultório
   Lê o consultório pelo parâmetro ?id= e popula a folha.
   Disponível apenas para registros com status "ativo".
   ============================================================ */

const NOME_RESPONSAVEL_PADRAO = 'Lilian Regina De Carvalho';
const LOCAL_EMISSAO = 'Recife/PE';

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  configurarBarraAcoes();

  if (!id) {
    exibirIndisponivel('Nenhum consultório foi indicado para emissão do certificado.');
    return;
  }

  let consultorios = [];
  let especialidades = [];
  try {
    consultorios = await carregarConsultorios();
    especialidades = await carregarJson('especialidades.json');
  } catch (_) {
    exibirIndisponivel('Não foi possível carregar os dados do consultório.');
    return;
  }

  const consultorio = consultorios.find((c) => c.id === id);

  if (!consultorio) {
    exibirIndisponivel('O consultório informado não foi localizado.');
    return;
  }

  if (consultorio.status !== 'ativo') {
    exibirIndisponivel(
      'O Certificado de Registro de Consultório está disponível apenas para registros com status Ativo.'
    );
    return;
  }

  preencherCertificado(consultorio, especialidades);
  exibirCertificado();
});

/**
 * Configura os botões da barra superior.
 */
function configurarBarraAcoes() {
  const botaoImprimir = document.getElementById('botao-imprimir');
  if (botaoImprimir) {
    botaoImprimir.addEventListener('click', () => window.print());
  }
}

/**
 * Mostra a folha do certificado.
 */
function exibirCertificado() {
  document.getElementById('folha-certificado').classList.remove('oculto');
}

/**
 * Exibe o aviso de indisponibilidade e oculta a folha.
 */
function exibirIndisponivel(mensagem) {
  const aviso = document.getElementById('aviso-indisponivel');
  document.getElementById('aviso-mensagem').textContent = mensagem;
  aviso.classList.remove('oculto');
  document.title = 'SIGEN — Certificado não disponível';
}

/**
 * Popula os campos do certificado a partir dos dados do consultório.
 */
function preencherCertificado(consultorio, especialidades) {
  document.getElementById('cert-nome').textContent = consultorio.nome || '—';
  document.getElementById('cert-cnpj').textContent = consultorio.cnpj || '—';
  document.getElementById('cert-responsavel').textContent = NOME_RESPONSAVEL_PADRAO;

  // Especialidades — mapeia ids para nomes legíveis
  const mapaEspecialidades = new Map(
    (especialidades || []).map((e) => [e.id, e.nome])
  );
  const ids = Array.isArray(consultorio.especialidades)
    ? consultorio.especialidades
    : (consultorio.especialidade ? [consultorio.especialidade] : []);
  const nomes = ids
    .map((id) => mapaEspecialidades.get(id) || id)
    .filter(Boolean);
  document.getElementById('cert-especialidades').textContent =
    nomes.length > 0 ? nomes.join(' • ') : '—';

  // Vigência — usa dataCadastro como início no protótipo
  const inicioVigencia = formatarDataPorExtenso(consultorio.dataCadastro);
  document.getElementById('cert-vigencia').textContent = inicioVigencia;

  // Validade — protótipo considera 1 (um) ano a partir do início da vigência
  const dataValidade = somarAnos(consultorio.dataCadastro, 1);
  document.getElementById('cert-validade').textContent =
    dataValidade ? formatarDataPorExtenso(dataValidade) : '—';

  // Local e data de emissão (no rodapé)
  const hojeExtenso = formatarDataPorExtenso(new Date().toISOString().slice(0, 10));
  document.getElementById('cert-local-data').textContent =
    `${LOCAL_EMISSAO}, ${hojeExtenso}.`;

  document.title = `SIGEN — Certificado de ${consultorio.nome}`;

  // QR Code decorativo determinístico a partir do id do consultório
  desenharQrCodeDecorativo('cert-qrcode', consultorio.id);
}

/**
 * Formata uma data ISO (AAAA-MM-DD) para extenso em português.
 */
function formatarDataPorExtenso(dataIso) {
  if (!dataIso) return '—';
  const partes = dataIso.split('-');
  if (partes.length !== 3) return dataIso;
  const ano = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10) - 1;
  const dia = parseInt(partes[2], 10);
  const meses = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];
  if (Number.isNaN(ano) || Number.isNaN(dia) || mes < 0 || mes > 11) return dataIso;
  return `${dia} de ${meses[mes]} de ${ano}`;
}

/**
 * Soma um número de anos a uma data ISO (AAAA-MM-DD) e retorna nova string ISO.
 * Retorna null quando a entrada é inválida.
 */
function somarAnos(dataIso, anos) {
  if (!dataIso) return null;
  const partes = dataIso.split('-');
  if (partes.length !== 3) return null;
  const ano = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10);
  const dia = parseInt(partes[2], 10);
  if (Number.isNaN(ano) || Number.isNaN(mes) || Number.isNaN(dia)) return null;
  const novoAno = String(ano + anos).padStart(4, '0');
  const mesStr = String(mes).padStart(2, '0');
  const diaStr = String(dia).padStart(2, '0');
  return `${novoAno}-${mesStr}-${diaStr}`;
}

/**
 * Gera um QR Code decorativo em SVG (não é um QR Code funcional).
 * O padrão é determinístico a partir da semente (id do consultório),
 * de forma que o mesmo registro sempre exibe o mesmo grafismo.
 *
 * Apenas para fins visuais no protótipo — conforme RN-012.
 */
function desenharQrCodeDecorativo(idContainer, semente) {
  const TAMANHO = 25;            // matriz 25x25 (estilo QR padrão)
  const VIEWBOX = 100;
  const celula = VIEWBOX / TAMANHO;

  const aleatorio = criarGeradorPseudoAleatorio(String(semente || 'sigen'));
  const ehCantoLocalizador = (linha, coluna) => {
    // Cantos superior-esquerdo, superior-direito e inferior-esquerdo (7x7)
    const cantos = [
      { l: 0, c: 0 },
      { l: 0, c: TAMANHO - 7 },
      { l: TAMANHO - 7, c: 0 }
    ];
    return cantos.some(({ l, c }) =>
      linha >= l && linha < l + 7 && coluna >= c && coluna < c + 7
    );
  };

  let rects = '';

  // Preenche células pseudo-aleatórias (exceto cantos localizadores)
  for (let l = 0; l < TAMANHO; l++) {
    for (let c = 0; c < TAMANHO; c++) {
      if (ehCantoLocalizador(l, c)) continue;
      if (aleatorio() > 0.52) {
        rects += `<rect x="${(c * celula).toFixed(2)}" y="${(l * celula).toFixed(2)}" width="${celula.toFixed(2)}" height="${celula.toFixed(2)}" />`;
      }
    }
  }

  // Desenha os três cantos localizadores (anel externo + miolo)
  const cantos = [
    { l: 0, c: 0 },
    { l: 0, c: TAMANHO - 7 },
    { l: TAMANHO - 7, c: 0 }
  ];
  cantos.forEach(({ l, c }) => {
    const x = (c * celula).toFixed(2);
    const y = (l * celula).toFixed(2);
    const tamanho7 = (7 * celula).toFixed(2);
    const tamanho5 = (5 * celula).toFixed(2);
    const tamanho3 = (3 * celula).toFixed(2);
    const ajuste1 = (celula).toFixed(2);
    const ajuste2 = (2 * celula).toFixed(2);
    // Quadrado externo cheio + quadrado branco interno + quadrado preto central
    rects += `<rect x="${x}" y="${y}" width="${tamanho7}" height="${tamanho7}" />`;
    rects += `<rect x="${(c * celula + +ajuste1).toFixed(2)}" y="${(l * celula + +ajuste1).toFixed(2)}" width="${tamanho5}" height="${tamanho5}" fill="#ffffff" />`;
    rects += `<rect x="${(c * celula + +ajuste2).toFixed(2)}" y="${(l * celula + +ajuste2).toFixed(2)}" width="${tamanho3}" height="${tamanho3}" />`;
  });

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEWBOX} ${VIEWBOX}" role="img" aria-label="QR Code decorativo">
      <rect width="${VIEWBOX}" height="${VIEWBOX}" fill="#ffffff" />
      <g fill="#0b2c5e">${rects}</g>
    </svg>
  `;

  document.getElementById(idContainer).innerHTML = svg;
}

/**
 * Gerador pseudo-aleatório determinístico baseado em hash simples da semente.
 * Retorna uma função sem argumentos que produz números entre 0 e 1.
 */
function criarGeradorPseudoAleatorio(semente) {
  let hash = 2166136261;
  for (let i = 0; i < semente.length; i++) {
    hash ^= semente.charCodeAt(i);
    hash = (hash * 16777619) >>> 0;
  }
  return function proximo() {
    hash = (hash + 0x6D2B79F5) >>> 0;
    let t = hash;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return (((t ^ (t >>> 14)) >>> 0) % 100000) / 100000;
  };
}
