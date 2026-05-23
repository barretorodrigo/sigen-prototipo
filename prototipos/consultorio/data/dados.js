/* ============================================================
   SIGEN — Dados mock embutidos
   Carregados via <script> para funcionar mesmo sem servidor HTTP
   (quando o HTML é aberto direto pelo navegador, via file://,
   o fetch() é bloqueado por CORS).
   Para alterar os dados em ambiente servido, edite os arquivos
   .json correspondentes; eles têm o mesmo conteúdo.
   ============================================================ */

window.DADOS_MOCK = {
  'consultorios.json': [
    {
      "id": "1",
      "nome": "Consultório de Enfermagem São Lucas",
      "site": "https://www.consultoriosaolucas.com.br",
      "email": "contato@consultoriosaolucas.com.br",
      "telefone": "(81) 3456-7890",
      "cnpj": "12.345.678/0001-90",
      "horarioInicio": "08:00",
      "horarioFim": "18:00",
      "diasAtendimento": ["segunda", "terca", "quarta", "quinta", "sexta"],
      "cep": "50050-410",
      "endereco": "Avenida Conde da Boa Vista",
      "numero": "1578",
      "complemento": "Sala 1205",
      "bairro": "Boa Vista",
      "municipio": "Recife",
      "uf": "PE",
      "atividades": "Atendimento ambulatorial de enfermagem com foco em curativos, aplicação de medicamentos prescritos, aferição de sinais vitais, orientações em saúde e acompanhamento de pacientes crônicos.",
      "especialidades": ["enfermagem-do-trabalho", "feridas"],
      "alvara": "alvara-funcionamento-2025.pdf",
      "status": "ativo",
      "dataCadastro": "2025-03-15"
    },
    {
      "id": "2",
      "nome": "Clínica de Cuidados Vida & Saúde",
      "site": "",
      "email": "vidaesaude@email.com",
      "telefone": "(81) 98765-4321",
      "cnpj": "",
      "cpf": "529.982.247-25",
      "horarioInicio": "09:00",
      "horarioFim": "17:00",
      "diasAtendimento": ["segunda", "quarta", "sexta"],
      "cep": "53030-030",
      "endereco": "Rua do Sol",
      "numero": "190",
      "complemento": "",
      "bairro": "Carmo",
      "municipio": "Olinda",
      "uf": "PE",
      "atividades": "Atendimento domiciliar e ambulatorial de enfermagem geriátrica, com foco em cuidados paliativos e acompanhamento de idosos com doenças crônicas.",
      "especialidades": ["obstetricia"],
      "alvara": "alvara-2024.pdf",
      "status": "em-analise",
      "dataCadastro": "2026-04-10"
    },
    {
      "id": "3",
      "nome": "Consultório de Enfermagem Bem-Estar",
      "site": "https://bemestar-enfermagem.com.br",
      "email": "bemestar@enfermagem.com.br",
      "telefone": "(81) 3322-1100",
      "cnpj": "11.222.333/0001-44",
      "horarioInicio": "07:30",
      "horarioFim": "12:00",
      "diasAtendimento": ["terca", "quinta", "sabado"],
      "cep": "55002-110",
      "endereco": "Avenida Agamenon Magalhães",
      "numero": "2300",
      "complemento": "Conjunto 405",
      "bairro": "Maurício de Nassau",
      "municipio": "Caruaru",
      "uf": "PE",
      "atividades": "Consulta de enfermagem para acompanhamento de pacientes com hipertensão e diabetes, orientações nutricionais básicas e encaminhamentos.",
      "especialidades": ["uti", "enfermagem-do-trabalho"],
      "alvara": "alvara-bemestar.pdf",
      "status": "cancelado",
      "dataCadastro": "2024-08-22",
      "dataCancelamento": "2025-11-30"
    },
    {
      "id": "4",
      "nome": "Consultório Saúde Integral",
      "site": "",
      "email": "contato@saudeintegral.com.br",
      "telefone": "(81) 3344-5566",
      "cnpj": "",
      "cpf": "390.533.447-05",
      "horarioInicio": "08:00",
      "horarioFim": "17:00",
      "diasAtendimento": ["segunda", "quarta", "sexta"],
      "cep": "50050-000",
      "endereco": "Rua do Bom Jesus",
      "numero": "120",
      "complemento": "",
      "bairro": "Recife",
      "municipio": "Recife",
      "uf": "PE",
      "atividades": "Consultas de enfermagem para acompanhamento de pacientes hipertensos e diabéticos, com orientações em saúde preventiva.",
      "especialidades": ["enfermagem-do-trabalho"],
      "alvara": "alvara-saude-integral.pdf",
      "status": "vencida",
      "dataCadastro": "2024-05-23",
      "dataValidade": "2025-05-23"
    }
  ],

  'especialidades.json': [
    { "id": "uti", "nome": "UTI" },
    { "id": "obstetricia", "nome": "Obstetrícia" },
    { "id": "enfermagem-do-trabalho", "nome": "Enfermagem do Trabalho" },
    { "id": "feridas", "nome": "Feridas" }
  ],

  'endereco-pessoal.json': {
    "cep": "52050-160",
    "endereco": "Rua das Pitangueiras",
    "numero": "245",
    "complemento": "Apto 32",
    "bairro": "Parnamirim",
    "municipio": "Recife",
    "uf": "PE"
  },

  'pendencia-coren.json': {
    "_descricao": "Pendência simulada da regularidade do profissional junto ao Coren. Valores aceitos: regular | financeira | eleitoral | etica",
    "situacaoAtual": "regular"
  }
};
