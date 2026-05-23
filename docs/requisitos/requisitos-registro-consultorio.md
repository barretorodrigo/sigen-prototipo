# Requisitos da Funcionalidade Registro de Consultório

## Contexto

Este documento descreve os requisitos iniciais da nova funcionalidade Registro de Consultório no SIGEN. A funcionalidade ficará disponível no menu autenticado com o rótulo Consultório, posicionada logo abaixo de Responsabilidade Técnica.

## Objetivo da funcionalidade

Permitir que o profissional autenticado registre consultórios vinculados ao seu exercício profissional, consulte os registros existentes, visualize detalhes e solicite o cancelamento de registros já cadastrados.

## Escopo desta funcionalidade

- Inclusão do item de menu Consultório abaixo de Responsabilidade Técnica.
- Listagem de consultórios cadastrados.
- Ação para criar nova solicitação de registro de consultório.
- Visualização de registro existente.
- Visualização do certificado de registro de consultório para registros ativos.
- Cancelamento de registro existente.
- Preenchimento dos dados do consultório.
- Anexo do alvará de funcionamento.
- Validação de regularidade do profissional junto ao Coren.
- Oferta de meio para o profissional confirmar ou atualizar seu endereço pessoal na própria funcionalidade.

## Fora de escopo neste documento

- Fluxos internos de análise administrativa após o envio da solicitação.
- Regras específicas de integrações externas não confirmadas.
- Política detalhada de versionamento histórico do consultório após atualização.

## Atores

- Profissional de enfermagem autenticado.
- Sistema SIGEN.

## User Stories Iniciais

Como profissional de enfermagem autenticado,
quero visualizar meus consultórios cadastrados,
para que eu possa acompanhar meus registros ativos, vencidos e anteriores.

Como profissional de enfermagem autenticado,
quero cadastrar um novo consultório,
para que meu local de exercício profissional fique formalmente registrado no SIGEN.

Como profissional de enfermagem autenticado,
quero cancelar um registro de consultório existente,
para que o sistema reflita minha situação atual.

Como profissional de enfermagem autenticado,
quero visualizar o certificado de um consultório com registro ativo,
para que eu possa comprovar a regularidade do estabelecimento.

Como profissional de enfermagem autenticado,
quero confirmar ou atualizar meu endereço pessoal durante o fluxo,
para que meu cadastro permaneça consistente no SIGEN.

## Requisitos Funcionais

### RF-001 — Exibir item de menu Consultório

**Descrição:** O sistema deve exibir o item de menu Consultório no ambiente autenticado, posicionado logo abaixo do item Responsabilidade Técnica.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Usuário autenticado no SIGEN.

**Critérios de Aceite:**
- [ ] O sistema exibe o item de menu Consultório no menu autenticado.
- [ ] O item Consultório aparece logo abaixo de Responsabilidade Técnica.
- [ ] Ao selecionar o item, o sistema direciona o usuário para a funcionalidade de consultórios.

**Prioridade:** Alta

**Dependências:** Nenhuma

**Observações:** Requisito de entrada da nova funcionalidade.

### RF-002 — Listar consultórios cadastrados

**Descrição:** O sistema deve apresentar uma listagem dos consultórios cadastrados pelo profissional autenticado.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Usuário autenticado e acesso à funcionalidade Consultório.

**Critérios de Aceite:**
- [ ] O sistema exibe uma tela de listagem ao acessar a funcionalidade.
- [ ] O sistema apresenta os consultórios já cadastrados para o profissional, quando existirem.
- [ ] O sistema exibe na listagem o status do registro como Ativo, Vencida, Cancelado ou Em análise.
- [ ] Quando não houver registros, a tabela deve ser exibida sem linhas de dados e com o conteúdo `Não possui registro de consultório`.

**Prioridade:** Alta

**Dependências:** RF-001

**Observações:** Na ausência de registros, a tabela permanece visível e sem itens cadastrados.

### RF-003 — Disponibilizar ação para criar nova solicitação

**Descrição:** O sistema deve disponibilizar na listagem uma ação para iniciar uma nova solicitação de registro de consultório.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Usuário autenticado na tela de listagem de consultórios.

**Critérios de Aceite:**
- [ ] O sistema apresenta botão ou ação equivalente para criar nova solicitação.
- [ ] Ao acionar a criação, o sistema abre o formulário de registro de consultório.
- [ ] A ação de criação permanece acessível mesmo quando não houver registros anteriores.

**Prioridade:** Alta

**Dependências:** RF-002

**Observações:** A nomenclatura da ação pode ser refinada na definição de interface.

### RF-004 — Permitir visualizar registro de consultório

**Descrição:** O sistema deve permitir ao profissional visualizar os dados de um consultório previamente cadastrado.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Existir ao menos um consultório cadastrado.

**Critérios de Aceite:**
- [ ] Cada registro listado possui ação de visualização.
- [ ] Ao visualizar, o sistema apresenta os dados do consultório selecionado.
- [ ] A visualização identifica claramente o registro consultado.

**Prioridade:** Alta

**Dependências:** RF-002

**Observações:** O nível de edição a partir da visualização não foi solicitado neste momento.

### RF-005 — Permitir cancelar registro de consultório

**Descrição:** O sistema deve permitir ao profissional cancelar registros de consultório existentes.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Existir ao menos um consultório cadastrado e cancelável.

**Critérios de Aceite:**
- [ ] Cada registro elegível possui ação de cancelamento.
- [ ] O sistema solicita confirmação antes de concluir o cancelamento.
- [ ] Após o cancelamento, o sistema reflete o novo estado do registro na listagem.
- [ ] Registros já cancelados não podem ser cancelados novamente.

**Prioridade:** Alta

**Dependências:** RF-002

**Observações:** O cancelamento exige apenas confirmação do usuário.

### RF-006 — Exibir formulário de registro de consultório

**Descrição:** O sistema deve disponibilizar formulário específico para cadastro de registro de consultório.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Usuário autenticado e acionamento da criação de nova solicitação.

**Critérios de Aceite:**
- [ ] O sistema apresenta formulário próprio de registro de consultório.
- [ ] O formulário organiza os dados em seções compreensíveis.
- [ ] O usuário consegue retornar à listagem sem concluir o envio.

**Prioridade:** Alta

**Dependências:** RF-003

**Observações:** O detalhamento dos campos obrigatórios está distribuído nos requisitos seguintes.

### RF-007 — Coletar dados cadastrais do consultório

**Descrição:** O sistema deve permitir informar os dados cadastrais e de contato do consultório, respeitando obrigatoriedade e validações confirmadas para cada campo.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Usuário no formulário de registro de consultório.

**Critérios de Aceite:**
- [ ] O sistema exige o preenchimento de Nome, Correio Eletrônico, Telefone e ao menos um identificador fiscal entre CPF e CNPJ.
- [ ] O sistema permite o preenchimento opcional de Site.
- [ ] O sistema valida o Correio Eletrônico em formato padrão de e-mail.
- [ ] O sistema valida o CPF informado como CPF válido, quando esse for o identificador preenchido.
- [ ] O sistema valida o CNPJ informado como CNPJ válido, quando esse for o identificador preenchido.

**Prioridade:** Alta

**Dependências:** RF-006

**Observações:** O Site é campo livre e opcional. O formulário deve aceitar cadastros identificados por pessoa física ou pessoa jurídica.

### RF-008 — Coletar horário e dias de atendimento

**Descrição:** O sistema deve permitir informar o horário e os dias de atendimento do consultório.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Usuário no formulário de registro de consultório.

**Critérios de Aceite:**
- [ ] O sistema exige o preenchimento do horário de atendimento em formato de intervalo de horas.
- [ ] O sistema exige o preenchimento dos dias de atendimento em campo de seleção múltipla dos dias da semana.
- [ ] O sistema vincula essas informações ao registro do consultório.

**Prioridade:** Alta

**Dependências:** RF-006

**Observações:** Os dias de atendimento devem permitir múltiplas seleções.

### RF-009 — Coletar endereço do consultório

**Descrição:** O sistema deve permitir informar os dados de endereço do consultório, com consulta automática a partir do CEP.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Usuário no formulário de registro de consultório.

**Critérios de Aceite:**
- [ ] O sistema exige o preenchimento de Endereço, CEP, Bairro, Município e UF.
- [ ] O sistema permite o preenchimento opcional de Número e Complemento.
- [ ] O sistema realiza integração com CEP dos Correios.
- [ ] Ao consultar o CEP, o sistema preenche automaticamente os demais campos de endereço disponíveis no retorno, incluindo Município e UF.
- [ ] O sistema associa o endereço informado ao registro do consultório.

**Prioridade:** Alta

**Dependências:** RF-006

**Observações:** O campo País foi removido da funcionalidade.

### RF-010 — Permitir informar atividades exercidas

**Descrição:** O sistema deve permitir ao profissional informar as atividades exercidas no consultório.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Usuário no formulário de registro de consultório.

**Critérios de Aceite:**
- [ ] O sistema exige campo livre para descrição das atividades exercidas.
- [ ] O sistema armazena a descrição vinculada ao registro do consultório.
- [ ] O conteúdo informado fica disponível na visualização do registro.
- [ ] O sistema limita o campo a 5000 caracteres.

**Prioridade:** Alta

**Dependências:** RF-006

**Observações:** Campo livre de preenchimento.

### RF-011 — Permitir informar registro de especialidade junto ao COREN

**Descrição:** O sistema deve exigir o registro de especialidade do profissional junto ao COREN, com base nas especialidades disponíveis no sistema.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Usuário no formulário de registro de consultório.

**Critérios de Aceite:**
- [ ] O sistema exige o preenchimento do registro de especialidade junto ao COREN.
- [ ] O sistema apresenta a seleção a partir das especialidades disponíveis no sistema.
- [ ] A informação fica vinculada à solicitação do consultório.
- [ ] A informação pode ser consultada na visualização do registro.

**Prioridade:** Alta

**Dependências:** RF-006

**Observações:** O dado deve ser obtido a partir das especialidades do sistema.

### RF-012 — Permitir anexar alvará de funcionamento

**Descrição:** O sistema deve permitir anexar o alvará de funcionamento como documento da solicitação de registro do consultório.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Usuário no formulário de registro de consultório.

**Critérios de Aceite:**
- [ ] O sistema exibe seção de anexos da solicitação.
- [ ] O sistema permite selecionar e associar o alvará de funcionamento ao registro.
- [ ] O sistema identifica quando o anexo obrigatório não foi informado.
- [ ] O sistema impede o envio quando o alvará de funcionamento não estiver anexado.

**Prioridade:** Alta

**Dependências:** RF-006

**Observações:** O alvará de funcionamento é obrigatório.

### RF-013 — Orientar atualização de endereço do profissional

**Descrição:** O sistema deve permitir ao profissional confirmar o endereço pessoal atual ou atualizar esse endereço na própria funcionalidade.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Usuário no fluxo de registro de consultório.

**Critérios de Aceite:**
- [ ] O sistema apresenta ao profissional a possibilidade de confirmar o endereço pessoal atual.
- [ ] O sistema permite atualizar o endereço pessoal na própria funcionalidade.
- [ ] O usuário consegue seguir no fluxo após confirmar ou atualizar o endereço pessoal.

**Prioridade:** Alta

**Dependências:** RF-006

**Observações:** A confirmação do endereço depende da manifestação do próprio profissional.

### RF-014 — Validar regularidade do profissional para registrar consultório

**Descrição:** O SIGEN deve validar internamente se o número de registro do profissional está regular no Coren antes de permitir o envio da solicitação de consultório.

**Ator(es):** Sistema SIGEN, Profissional de enfermagem autenticado

**Pré-condições:** Usuário autenticado e tentativa de envio da solicitação.

**Critérios de Aceite:**
- [ ] O sistema verifica a regularidade do número de registro profissional.
- [ ] O sistema impede o envio quando houver irregularidade identificada.
- [ ] O sistema informa ao usuário qual pendência impede o prosseguimento, distinguindo pendência financeira, irregularidade eleitoral e pendência ética.

**Prioridade:** Alta

**Dependências:** RF-015

**Observações:** As regras específicas de regularidade estão detalhadas em RN.

### RF-015 — Validar dados obrigatórios antes do envio da solicitação

**Descrição:** O sistema deve validar o preenchimento dos dados obrigatórios do consultório e a presença do anexo exigido antes do envio.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Usuário tenta submeter a solicitação de registro de consultório.

**Critérios de Aceite:**
- [ ] O sistema identifica campos obrigatórios não preenchidos.
- [ ] O sistema identifica ausência do anexo obrigatório.
- [ ] O sistema impede o envio até que todas as pendências sejam resolvidas.
- [ ] O sistema exige o preenchimento de Nome, Correio Eletrônico, Telefone, Horário de atendimento, Dias de atendimento, Endereço, CEP, Bairro, Município, CPF ou CNPJ, UF, Atividades exercidas, Registro de especialidade junto ao COREN e Alvará de funcionamento.

**Prioridade:** Alta

**Dependências:** RF-007, RF-008, RF-009, RF-010, RF-011, RF-012

**Observações:** Número, Complemento e Site são opcionais.

### RF-016 — Registrar a solicitação de consultório

**Descrição:** O sistema deve permitir ao profissional enviar a solicitação de registro de consultório após o atendimento das validações aplicáveis.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Formulário válido, anexo obrigatório presente e regularidade profissional confirmada.

**Critérios de Aceite:**
- [ ] O sistema disponibiliza ação de envio da solicitação.
- [ ] O sistema conclui o envio somente quando todas as validações forem atendidas.
- [ ] O sistema informa o resultado do envio ao usuário.

**Prioridade:** Alta

**Dependências:** RF-014, RF-015

**Observações:** O retorno pós-envio, inclusive número de protocolo, ainda precisa ser confirmado.

### RF-017 — Disponibilizar ação para visualizar certificado de consultório ativo

**Descrição:** O sistema deve disponibilizar na listagem de consultórios uma ação específica para visualização do Certificado de Registro de Consultório quando o registro estiver com status Ativo.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Existir ao menos um consultório com status Ativo na listagem.

**Critérios de Aceite:**
- [ ] O sistema exibe a ação de visualização do certificado apenas para registros com status Ativo.
- [ ] O sistema não exibe a ação de certificado para registros com status Em análise.
- [ ] O sistema não exibe a ação de certificado para registros com status Cancelado.
- [ ] A ação de certificado fica disponível na coluna de ações da listagem de consultórios.

**Prioridade:** Alta

**Dependências:** RF-002

**Observações:** A nomenclatura visível da ação pode ser refinada na definição de interface, desde que deixe claro que se trata do certificado.

### RF-018 — Exibir certificado de registro de consultório em nova aba

**Descrição:** O sistema deve abrir o Certificado de Registro de Consultório em nova aba do navegador ao acionar a opção de visualização do certificado.

**Ator(es):** Profissional de enfermagem autenticado, público com acesso ao link

**Pré-condições:** Consultório com status Ativo e acionamento da visualização do certificado.

**Critérios de Aceite:**
- [ ] Ao acionar a visualização do certificado, o sistema abre o documento em nova aba.
- [ ] A nova aba apresenta o certificado sem depender de fluxo adicional de autenticação no protótipo.
- [ ] O certificado pode ser impresso diretamente pela funcionalidade nativa do navegador.

**Prioridade:** Alta

**Dependências:** RF-017

**Observações:** O protótipo não precisa gerar arquivo PDF automaticamente.

### RF-019 — Exibir conteúdo obrigatório do certificado de registro de consultório

**Descrição:** O sistema deve apresentar no certificado as informações institucionais e cadastrais mínimas do registro ativo do consultório.

**Ator(es):** Profissional de enfermagem autenticado, público com acesso ao link

**Pré-condições:** Certificado aberto para um consultório com status Ativo.

**Critérios de Aceite:**
- [ ] O sistema exibe no certificado o nome do consultório.
- [ ] O sistema exibe no certificado o CPF ou o CNPJ informado no cadastro do consultório, conforme o identificador aplicável ao registro.
- [ ] O sistema exibe no certificado as especialidades vinculadas ao consultório.
- [ ] O sistema exibe no certificado a identificação do profissional de enfermagem responsável.
- [ ] O sistema exibe no certificado a data de início da vigência.
- [ ] O sistema exibe no certificado a data de validade do registro.
- [ ] O sistema exibe no certificado um QR Code de validação com finalidade decorativa no protótipo.
- [ ] O sistema exibe no certificado texto institucional de concessão do registro.

**Prioridade:** Alta

**Dependências:** RF-018

**Observações:** O certificado não deve apresentar numeração nesta versão do protótipo.

### RF-020 — Exibir identidade institucional do emissor no certificado

**Descrição:** O sistema deve apresentar o certificado com identidade institucional do Coren responsável pelo registro, com aplicação visual adequada para um documento oficial.

**Ator(es):** Profissional de enfermagem autenticado, público com acesso ao link

**Pré-condições:** Certificado aberto para visualização.

**Critérios de Aceite:**
- [ ] O sistema exibe no certificado a identificação visual do Coren responsável.
- [ ] No protótipo, o sistema utiliza o Coren-PE como emissor exibido no certificado.
- [ ] O certificado apresenta aparência compatível com documento institucional formal.
- [ ] O conteúdo do certificado permanece legível em tela e em impressão.

**Prioridade:** Média

**Dependências:** RF-018, RF-019

**Observações:** Em versão futura, o emissor deve variar conforme a UF responsável pelo registro.

### RF-021 — Permitir acesso público ao certificado por link direto

**Descrição:** O sistema deve permitir que o Certificado de Registro de Consultório seja acessado por qualquer pessoa que possua o link direto do documento.

**Ator(es):** Público externo, profissional de enfermagem autenticado

**Pré-condições:** Existir certificado disponível para consultório com status Ativo.

**Critérios de Aceite:**
- [ ] O certificado pode ser visualizado por link direto no protótipo.
- [ ] O acesso ao certificado não exige autenticação específica no protótipo.
- [ ] O acesso por link direto exibe o mesmo conteúdo visual do certificado aberto a partir da listagem.

**Prioridade:** Média

**Dependências:** RF-018

**Observações:** O acesso público está restrito ao contexto do protótipo e deverá ser reavaliado em versão produtiva.

## Detalhamento dos Campos e Validações

| Campo | Obrigatoriedade | Validação confirmada |
|---|---|---|
| Nome | Obrigatório | Sem validação adicional registrada |
| Site | Opcional | Campo livre |
| Correio Eletrônico | Obrigatório | Deve ser um e-mail em formato padrão |
| Telefone | Obrigatório | Aceita telefone fixo ou celular, sem regra adicional registrada |
| Horário de atendimento | Obrigatório | Deve ser informado em formato de intervalo de horas |
| Dias de atendimento | Obrigatório | Campo de seleção múltipla dos dias da semana |
| Endereço | Obrigatório | Preenchimento com apoio de consulta automática por CEP |
| CEP | Obrigatório | Integração com CEP dos Correios |
| Número | Opcional | Sem validação adicional registrada |
| Complemento | Opcional | Sem validação adicional registrada |
| Bairro | Obrigatório | Sem validação adicional registrada |
| Município | Obrigatório | Preenchimento automático a partir da consulta de CEP, quando disponível |
| CPF ou CNPJ | Obrigatório | Deve exigir ao menos um dos identificadores e validar o documento informado conforme o tipo |
| UF | Obrigatório | Preenchimento automático a partir da consulta de CEP, quando disponível |
| Atividades exercidas | Obrigatório | Campo livre com limite de 5000 caracteres |
| Registro de especialidade junto ao COREN | Obrigatório | Deve ser listado a partir das especialidades do sistema |
| Alvará de funcionamento | Obrigatório | Anexo obrigatório para envio |

**Observações:**
- O campo País foi removido da funcionalidade.
- Município e UF devem ser preenchidos automaticamente a partir da consulta de CEP, quando houver retorno disponível.

## Requisitos Não Funcionais

### RNF-001 — Usabilidade da listagem e do formulário

**Descrição:** O sistema deve organizar a funcionalidade de consultório de modo que o profissional compreenda facilmente a diferença entre listar registros, visualizar detalhes, cancelar registros e criar nova solicitação.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Acesso à funcionalidade Consultório.

**Critérios de Aceite:**
- [ ] A listagem apresenta ações claramente identificadas.
- [ ] O formulário apresenta agrupamento lógico dos dados.
- [ ] O usuário distingue facilmente as ações de criar, visualizar e cancelar.

**Prioridade:** Alta

**Dependências:** RF-002, RF-003, RF-004, RF-005, RF-006

**Observações:** O fluxo deve reduzir ambiguidades operacionais.

### RNF-002 — Acessibilidade mínima

**Descrição:** O sistema deve apresentar rótulos textuais, mensagens de validação compreensíveis e navegação compatível com acessibilidade mínima para a funcionalidade.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Uso da funcionalidade por pessoa com necessidade de tecnologia assistiva.

**Critérios de Aceite:**
- [ ] Campos e ações possuem descrição textual compreensível.
- [ ] Mensagens de erro e validação são apresentadas em texto.
- [ ] A funcionalidade atende às diretrizes mínimas de acessibilidade do projeto.

**Prioridade:** Média

**Dependências:** Nenhuma

**Observações:** Deve observar WCAG 2.1 AA conforme diretrizes do projeto.

### RNF-003 — Segurança do acesso aos registros

**Descrição:** O sistema deve restringir a visualização e o cancelamento dos registros de consultório ao profissional autenticado responsável por eles.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Usuário autenticado acessando a funcionalidade.

**Critérios de Aceite:**
- [ ] Usuário não autenticado não acessa a funcionalidade.
- [ ] O usuário visualiza apenas os registros autorizados para seu contexto.
- [ ] O cancelamento só pode ser realizado por usuário autorizado.

**Prioridade:** Alta

**Dependências:** RF-002, RF-004, RF-005

**Observações:** O modelo detalhado de permissão ainda pode ser refinado.

### RNF-004 — Apresentação adequada do certificado para impressão

**Descrição:** O sistema deve apresentar o certificado em formato visual adequado para impressão direta pelo navegador em página única ou com quebra controlada.

**Ator(es):** Profissional de enfermagem autenticado, público com acesso ao link

**Pré-condições:** Certificado aberto em nova aba.

**Critérios de Aceite:**
- [ ] O certificado mantém legibilidade quando submetido à impressão pelo navegador.
- [ ] O conteúdo principal do certificado não sofre perda de informação relevante na impressão.
- [ ] A formatação visual do certificado preserva caráter institucional em tela e em papel.

**Prioridade:** Média

**Dependências:** RF-018, RF-019, RF-020

**Observações:** A impressão será realizada pelos recursos nativos do navegador.

### RNF-005 — Acessibilidade da ação e do conteúdo do certificado

**Descrição:** O sistema deve garantir identificação textual clara para a ação de certificado e para as informações principais exibidas no documento.

**Ator(es):** Profissional de enfermagem autenticado, público com acesso ao link

**Pré-condições:** Uso da listagem ou do certificado por pessoa com necessidade de tecnologia assistiva.

**Critérios de Aceite:**
- [ ] A ação de visualização do certificado possui identificação textual compreensível.
- [ ] As informações principais do certificado são apresentadas em texto legível.
- [ ] O certificado observa as diretrizes mínimas de acessibilidade do projeto.

**Prioridade:** Média

**Dependências:** RF-017, RF-018, RF-019

**Observações:** Deve observar WCAG 2.1 AA conforme diretrizes do projeto.

## Regras de Negócio

### RN-001 — A funcionalidade deve possuir listagem e criação de nova solicitação

**Descrição:** A entrada da funcionalidade Consultório deve sempre oferecer ao usuário uma listagem dos registros existentes e uma ação para iniciar nova solicitação.

**Critérios de Aceite:**
- [ ] O sistema exibe a listagem ao acessar o menu Consultório.
- [ ] O sistema disponibiliza botão para nova solicitação.
- [ ] O usuário consegue acessar ambos os recursos sem depender de fluxo alternativo.

### RN-002 — Registros existentes podem ser cancelados

**Descrição:** O sistema deve permitir cancelamento dos registros existentes por meio de confirmação simples do usuário.

**Critérios de Aceite:**
- [ ] O sistema disponibiliza cancelamento para registros elegíveis.
- [ ] O cancelamento altera o estado do registro.
- [ ] O estado atualizado é refletido na listagem e na visualização.
- [ ] O registro cancelado passa a ter status Cancelado.
- [ ] O registro com status Cancelado não pode ser cancelado novamente.

### RN-009 — Status possíveis do registro de consultório

**Descrição:** O sistema deve considerar apenas os status Ativo, Vencida, Cancelado e Em análise para os registros de consultório.

**Critérios de Aceite:**
- [ ] O sistema utiliza apenas os status Ativo, Vencida, Cancelado e Em análise para representar o estado do registro.
- [ ] O status do registro é exibido na listagem e na visualização quando aplicável.
- [ ] O estado do registro permanece consistente com as ações realizadas no fluxo.

### RN-003 — Regularidade profissional é condição para registrar consultório

**Descrição:** O sistema só deve permitir o envio da solicitação de consultório quando o número de registro do profissional estiver regular junto ao Coren.

**Critérios de Aceite:**
- [ ] O sistema bloqueia o envio em caso de irregularidade.
- [ ] O sistema realiza a verificação antes da conclusão da solicitação.
- [ ] O sistema informa ao usuário que a regularidade é condição obrigatória.

### RN-004 — Regularidade financeira é obrigatória

**Descrição:** O profissional não pode registrar consultório quando houver pendência financeira perante o Coren.

**Critérios de Aceite:**
- [ ] O sistema verifica pendência financeira como parte da regularidade.
- [ ] O sistema bloqueia o envio quando existir pendência financeira.
- [ ] O sistema informa o motivo do bloqueio ao usuário.

### RN-005 — Regularidade eleitoral é obrigatória

**Descrição:** O profissional não pode registrar consultório quando estiver irregular em relação às votações exigidas pelo Coren.

**Critérios de Aceite:**
- [ ] O sistema verifica a regularidade com votações como parte da regularidade.
- [ ] O sistema bloqueia o envio quando houver irregularidade eleitoral.
- [ ] O sistema informa o motivo do bloqueio ao usuário.

### RN-006 — Ausência de processo ético impeditivo é obrigatória

**Descrição:** O profissional não pode registrar consultório quando responder a processo ético que o torne irregular para essa finalidade.

**Critérios de Aceite:**
- [ ] O sistema verifica a existência de impedimento ético como parte da regularidade.
- [ ] O sistema bloqueia o envio quando houver impedimento ético aplicável.
- [ ] O sistema informa ao usuário que a regularidade ética não foi atendida.

### RN-007 — Alvará de funcionamento é documento obrigatório

**Descrição:** O sistema deve exigir o anexo do alvará de funcionamento para permitir o envio da solicitação de registro do consultório.

**Critérios de Aceite:**
- [ ] O sistema identifica o alvará de funcionamento como anexo obrigatório.
- [ ] O sistema bloqueia o envio quando o documento não for anexado.
- [ ] O sistema orienta o usuário sobre a pendência do anexo.

### RN-008 — O profissional deve ter meio para atualizar endereço cadastral

**Descrição:** O sistema deve permitir que o profissional confirme o endereço pessoal atual ou realize a atualização cadastral na própria funcionalidade durante o fluxo do registro de consultório.

**Critérios de Aceite:**
- [ ] O sistema permite confirmar o endereço pessoal atual.
- [ ] O sistema permite atualizar o endereço pessoal na própria funcionalidade.
- [ ] O fluxo de confirmação ou atualização fica acessível durante o cadastro.

### RN-010 — Certificado é exclusivo para registro ativo

**Descrição:** O sistema só deve disponibilizar o Certificado de Registro de Consultório para registros que estejam com status Ativo.

**Critérios de Aceite:**
- [ ] O sistema não disponibiliza certificado para registros Em análise.
- [ ] O sistema não disponibiliza certificado para registros Vencida.
- [ ] O sistema não disponibiliza certificado para registros Cancelado.
- [ ] O sistema disponibiliza certificado somente quando o status do registro for Ativo.

### RN-011 — Registro e certificado possuem data de validade

**Descrição:** O registro de consultório deve possuir data de validade, que deve ser exibida no certificado e utilizada para caracterizar o status Vencida quando aplicável.

**Critérios de Aceite:**
- [ ] O certificado apresenta a data de início da vigência.
- [ ] O certificado apresenta a data de validade do registro.
- [ ] O sistema deve permitir classificar o registro como Vencida quando a validade estiver expirada.

### RN-012 — QR Code do certificado é decorativo no protótipo

**Descrição:** O QR Code apresentado no certificado deve ter finalidade exclusivamente ilustrativa no protótipo.

**Critérios de Aceite:**
- [ ] O certificado exibe QR Code como elemento visual de validação.
- [ ] O protótipo não depende de validação real por leitura do QR Code.
- [ ] O comportamento do QR Code pode ser simulado sem integração externa.

### RN-013 — Emissor exibido no protótipo é o Coren-PE

**Descrição:** O protótipo deve exibir o Coren-PE como emissor do certificado, preservando a premissa de que em ambiente real o emissor será o Coren da UF responsável.

**Critérios de Aceite:**
- [ ] O certificado do protótipo apresenta o Coren-PE como emissor.
- [ ] O documento não apresenta COFEN como emissor do certificado nesta versão.
- [ ] O requisito registra que a definição do Coren emissor por estado deverá ser tratada em evolução futura.

## Pendências para Validação com o Negócio

- Confirmar tipos e tamanho máximo aceitos para o alvará de funcionamento.
- Confirmar se haverá protocolo, comprovante ou notificação após o envio.
- Confirmar qual informação cadastral representará formalmente o profissional de enfermagem responsável no certificado.
- Confirmar se a data de início da vigência corresponderá à data de ativação do registro ou a outro marco de negócio.

## Próximos Passos Recomendados

1. Validar este documento com a área de negócio e com a equipe responsável pelo cadastro profissional.
2. Detalhar obrigatoriedade e máscaras de cada campo do formulário.
3. Definir os estados do registro para listagem, visualização e cancelamento.
4. Especificar os casos de teste derivados das regras de regularidade profissional.
5. Validar com o negócio o texto institucional definitivo do Certificado de Registro de Consultório.