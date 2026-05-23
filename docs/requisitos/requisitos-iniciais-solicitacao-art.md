# Requisitos Iniciais do SIGEN

## Contexto

Este documento consolida os requisitos iniciais da tela de solicitação de Anotação de Responsabilidade Técnica (ART) observada em [SIGEN.html](../../SIGEN.html). O objetivo é registrar os requisitos gerais da experiência atual para servir como base de evolução funcional.

## Objetivo da funcionalidade

Permitir que um profissional autenticado registre uma solicitação de Anotação de Responsabilidade Técnica, informando dados da contratante, do local de atuação, do enfermeiro responsável técnico, documentos comprobatórios e declarações obrigatórias.

## Escopo desta versão inicial

- Requisitos gerais da tela autenticada.
- Fluxo principal de preenchimento e envio da solicitação.
- Regras de negócio explícitas na interface.
- Requisitos não funcionais mínimos para uso da tela.

## Fora de escopo neste documento

- Requisitos específicos de cada item do menu lateral.
- Regras internas de análise, deferimento ou indeferimento da solicitação após o envio.
- Integrações não evidenciadas pela interface atual.

## Atores

- Profissional de enfermagem autenticado.
- Sistema SIGEN.

## User Stories Iniciais

Como profissional de enfermagem autenticado,
quero preencher e enviar uma solicitação de responsabilidade técnica,
para que meu pedido seja formalmente registrado no SIGEN.

Como profissional de enfermagem autenticado,
quero informar dados da instituição, do local de atuação e dos anexos exigidos,
para que a solicitação possa ser analisada com base em informações completas.

## Requisitos Funcionais

### RF-001 — Exibir tela de solicitação autenticada

**Descrição:** O sistema deve disponibilizar a tela de solicitação de Anotação de Responsabilidade Técnica somente para usuário autenticado, exibindo cabeçalho, navegação lateral, identificação do usuário e conteúdo principal da solicitação.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Usuário autenticado no SIGEN.

**Critérios de Aceite:**
- [ ] O sistema exibe o título da funcionalidade no conteúdo principal.
- [ ] O sistema exibe identificação visual do usuário autenticado.
- [ ] O sistema exibe ações de navegação compatíveis com ambiente autenticado.

**Prioridade:** Alta

**Dependências:** Nenhuma

**Observações:** Requisito geral de entrada na funcionalidade.

### RF-002 — Permitir retorno à listagem ou tela anterior

**Descrição:** O sistema deve permitir ao usuário retornar da tela de solicitação para a tela anterior ou listagem relacionada sem submeter o formulário.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Usuário autenticado e posicionado na tela de solicitação.

**Critérios de Aceite:**
- [ ] O sistema disponibiliza ação visível de retorno.
- [ ] Ao acionar o retorno, o sistema redireciona o usuário para a tela anterior esperada.
- [ ] O retorno não envia a solicitação.

**Prioridade:** Média

**Dependências:** RF-001

**Observações:** A regra de preservação de dados ao voltar ainda precisa ser validada com as partes interessadas.

### RF-003 — Coletar dados da contratante

**Descrição:** O sistema deve permitir o preenchimento dos dados cadastrais, de endereço, contatos, redes sociais e representante legal da contratante vinculada ao enfermeiro responsável técnico.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Usuário autenticado e solicitação em preenchimento.

**Critérios de Aceite:**
- [ ] O sistema disponibiliza seção específica para dados da contratante.
- [ ] O sistema permite informar dados básicos, endereço e contatos da contratante.
- [ ] O sistema permite informar dados do representante legal da contratante.

**Prioridade:** Alta

**Dependências:** RF-001

**Observações:** O detalhamento campo a campo poderá ser feito em documento posterior.

### RF-004 — Permitir indicar que a contratante é o mesmo local de atuação

**Descrição:** O sistema deve permitir ao usuário indicar se a contratante é a mesma instituição do local de atuação.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Usuário em preenchimento da solicitação.

**Critérios de Aceite:**
- [ ] O sistema disponibiliza opção para indicar equivalência entre contratante e local de atuação.
- [ ] O sistema diferencia claramente os conceitos de contratante e local de atuação.
- [ ] O comportamento decorrente da seleção é aplicado de forma consistente no formulário.

**Prioridade:** Alta

**Dependências:** RF-003, RF-008

**Observações:** O comportamento exato de replicação automática de dados deve ser validado em etapa posterior.

### RF-005 — Coletar dados do enfermeiro responsável técnico

**Descrição:** O sistema deve permitir registrar as informações do enfermeiro responsável técnico associadas à solicitação, incluindo dados de identificação exibidos, área de gestão, modalidade, vínculo institucional, atividades e demais informações profissionais exigidas.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Usuário autenticado e solicitação em preenchimento.

**Critérios de Aceite:**
- [ ] O sistema disponibiliza seção específica para os dados do enfermeiro responsável técnico.
- [ ] O sistema exibe os dados profissionais necessários ao contexto da solicitação.
- [ ] O sistema permite informar os dados complementares exigidos para a ART.

**Prioridade:** Alta

**Dependências:** RF-001

**Observações:** Parte dos dados pode vir previamente identificada pelo sistema, mas a origem dessa informação deve ser validada.

### RF-006 — Permitir informar jornada e vínculos do enfermeiro responsável técnico

**Descrição:** O sistema deve permitir ao usuário informar a jornada de trabalho do enfermeiro responsável técnico, a carga horária semanal, observações de escala e outros vínculos relevantes.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Usuário em preenchimento da seção do enfermeiro responsável técnico.

**Critérios de Aceite:**
- [ ] O sistema permite selecionar dias de atuação do enfermeiro responsável técnico.
- [ ] O sistema permite informar a carga horária semanal.
- [ ] O sistema permite adicionar ou declarar outros vínculos do profissional.

**Prioridade:** Alta

**Dependências:** RF-005

**Observações:** A validação mínima da carga horária está documentada em regra de negócio específica.

### RF-007 — Permitir identificar se o enfermeiro responsável técnico é o coordenador

**Descrição:** O sistema deve permitir ao usuário declarar se o enfermeiro responsável técnico também exerce a função de coordenador.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Usuário em preenchimento da seção do enfermeiro responsável técnico.

**Critérios de Aceite:**
- [ ] O sistema disponibiliza opção explícita para declarar se o ERT é o coordenador.
- [ ] O sistema registra a escolha do usuário na solicitação.
- [ ] O sistema mantém a informação vinculada ao restante do cadastro do ERT.

**Prioridade:** Média

**Dependências:** RF-005

**Observações:** Requisito baseado em elemento visível da interface.

### RF-008 — Coletar dados do local de atuação

**Descrição:** O sistema deve permitir o preenchimento dos dados cadastrais, horário de funcionamento, endereço, contatos, redes sociais e representante legal do local onde o serviço de responsabilidade técnica será executado.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Usuário autenticado e solicitação em preenchimento.

**Critérios de Aceite:**
- [ ] O sistema disponibiliza seção específica para o local de atuação.
- [ ] O sistema permite informar dados básicos, horário de funcionamento, endereço e contatos.
- [ ] O sistema permite informar dados do representante legal do local de atuação.

**Prioridade:** Alta

**Dependências:** RF-001

**Observações:** O local de atuação representa a instituição onde o serviço será executado.

### RF-009 — Permitir anexar documentos obrigatórios e adicionais

**Descrição:** O sistema deve permitir anexar os documentos obrigatórios da solicitação e também documentos adicionais complementares.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Usuário em preenchimento da solicitação.

**Critérios de Aceite:**
- [ ] O sistema apresenta lista dos documentos obrigatórios da solicitação.
- [ ] O sistema permite selecionar arquivo compatível para cada documento exigido.
- [ ] O sistema permite adicionar documentos complementares além dos obrigatórios.

**Prioridade:** Alta

**Dependências:** RF-001

**Observações:** Os tipos de arquivo aceitos e a obrigatoriedade estão detalhados em regras de negócio.

### RF-010 — Exigir declaração de ciência e veracidade

**Descrição:** O sistema deve exigir que o usuário declare ciência e veracidade das informações prestadas antes do envio da solicitação.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Solicitação preenchida.

**Critérios de Aceite:**
- [ ] O sistema exibe o texto declaratório antes da ação de envio.
- [ ] O sistema permite ao usuário confirmar explicitamente a declaração.
- [ ] O sistema impede o envio enquanto a declaração obrigatória não for confirmada.

**Prioridade:** Alta

**Dependências:** RF-009

**Observações:** A declaração menciona responsabilidade legal sobre as informações prestadas.

### RF-011 — Validar dados obrigatórios antes do envio

**Descrição:** O sistema deve validar o preenchimento dos dados obrigatórios da solicitação antes de permitir o envio.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Usuário tenta submeter a solicitação.

**Critérios de Aceite:**
- [ ] O sistema identifica campos obrigatórios não preenchidos.
- [ ] O sistema impede o envio enquanto existirem inconsistências obrigatórias.
- [ ] O sistema apresenta feedback ao usuário sobre pendências de preenchimento.

**Prioridade:** Alta

**Dependências:** RF-003, RF-005, RF-008, RF-009, RF-010

**Observações:** Este requisito cobre validações gerais; regras específicas estão registradas em RN.

### RF-012 — Registrar a solicitação

**Descrição:** O sistema deve permitir que o usuário envie a solicitação após o atendimento das validações obrigatórias.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Solicitação válida, documentos anexados e declaração confirmada.

**Critérios de Aceite:**
- [ ] O sistema disponibiliza ação de envio da solicitação.
- [ ] O sistema executa o envio somente quando os requisitos obrigatórios forem atendidos.
- [ ] O sistema informa ao usuário o resultado do envio.

**Prioridade:** Alta

**Dependências:** RF-011

**Observações:** O comportamento pós-envio ainda precisa ser detalhado em requisito futuro.

## Requisitos Não Funcionais

### RNF-001 — Usabilidade e organização visual

**Descrição:** O sistema deve organizar o formulário em seções claramente identificadas, com títulos e agrupamentos que facilitem o preenchimento progressivo da solicitação.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Acesso à tela de solicitação.

**Critérios de Aceite:**
- [ ] As informações são apresentadas em blocos lógicos nomeados.
- [ ] O usuário consegue distinguir contratante, local de atuação, enfermeiro responsável técnico, anexos e declaração.
- [ ] As ações principais permanecem compreensíveis durante o preenchimento.

**Prioridade:** Alta

**Dependências:** Nenhuma

**Observações:** Requisito derivado da complexidade e extensão da tela.

### RNF-002 — Responsividade

**Descrição:** O sistema deve permitir o uso da tela em dispositivos desktop e móveis, preservando navegação, leitura e preenchimento dos dados obrigatórios.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Acesso à tela em diferentes larguras de tela.

**Critérios de Aceite:**
- [ ] A tela pode ser utilizada em resoluções móveis e desktop.
- [ ] Os principais controles permanecem acessíveis em modo móvel.
- [ ] O conteúdo não exige rolagem horizontal para operação principal em dispositivos compatíveis.

**Prioridade:** Média

**Dependências:** RF-001

**Observações:** A própria interface atual já apresenta cabeçalho móvel específico.

### RNF-003 — Acessibilidade mínima

**Descrição:** O sistema deve oferecer identificação textual dos campos, botões e seções, de modo compatível com navegação assistida e entendimento do formulário.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Uso da tela por pessoa com necessidade de tecnologia assistiva.

**Critérios de Aceite:**
- [ ] Campos possuem rótulos textuais visíveis.
- [ ] Ações principais possuem descrição textual compreensível.
- [ ] O conteúdo declaratório e informativo é legível sem depender apenas de cor ou ícone.

**Prioridade:** Média

**Dependências:** RF-001

**Observações:** Deve observar WCAG 2.1 AA, conforme diretrizes do projeto.

### RNF-004 — Segurança e privacidade dos dados

**Descrição:** O sistema deve restringir o acesso à funcionalidade e ao conteúdo da solicitação a usuários autenticados e proteger os dados pessoais e documentos anexados durante o preenchimento e envio.

**Ator(es):** Profissional de enfermagem autenticado

**Pré-condições:** Usuário acessando a funcionalidade.

**Critérios de Aceite:**
- [ ] Usuário não autenticado não acessa a tela operacional da solicitação.
- [ ] Dados pessoais exibidos na tela ficam vinculados ao contexto autenticado do usuário.
- [ ] Documentos anexados são tratados como conteúdo restrito da solicitação.

**Prioridade:** Alta

**Dependências:** RF-001, RF-009, RF-012

**Observações:** O detalhamento de perfis e permissões dependerá de refinamento posterior.

## Regras de Negócio

### RN-001 — Contratante e local de atuação possuem significados distintos

**Descrição:** O sistema deve considerar que a contratante é a instituição com vínculo direto ao enfermeiro e que o local de atuação é a instituição onde o serviço de responsabilidade técnica será executado.

**Critérios de Aceite:**
- [ ] O sistema apresenta ambas as definições ao usuário.
- [ ] O sistema mantém seções separadas para os dois contextos quando aplicável.
- [ ] O sistema permite ao usuário indicar quando ambos correspondem à mesma instituição.

### RN-002 — Código CNES pode ser opcional

**Descrição:** O sistema deve permitir que o campo de Código CNES permaneça em branco quando a instituição não possuir esse cadastro.

**Critérios de Aceite:**
- [ ] O sistema informa ao usuário que o campo pode ficar em branco nessa situação.
- [ ] O sistema não bloqueia o avanço apenas pela ausência do Código CNES.
- [ ] O sistema aceita o preenchimento do código quando informado.

### RN-003 — Carga horária semanal mínima do ERT

**Descrição:** O sistema deve exigir carga horária mínima semanal de 20 horas para o enfermeiro responsável técnico.

**Critérios de Aceite:**
- [ ] O sistema informa a exigência mínima de 20 horas semanais.
- [ ] O sistema identifica quando a carga horária informada é inferior ao mínimo.
- [ ] O sistema impede o envio da solicitação se a regra não for atendida.

### RN-004 — Número de inscrição no Coren depende do local de atuação

**Descrição:** O número de inscrição no Coren considerado na solicitação deve ser definido de acordo com o endereço do local de atuação ou da contratante, quando ambos forem a mesma instituição.

**Critérios de Aceite:**
- [ ] O sistema informa ao usuário a origem dessa definição.
- [ ] O sistema aplica a regra com base no contexto informado no formulário.
- [ ] O dado exibido permanece coerente com o endereço adotado para análise.

### RN-005 — Documentos obrigatórios da solicitação

**Descrição:** O sistema deve exigir, no mínimo, os documentos obrigatórios explicitados na tela para permitir o envio da solicitação.

**Critérios de Aceite:**
- [ ] O sistema exige documento de designação do enfermeiro para a função.
- [ ] O sistema exige relação nominal atualizada dos profissionais supervisionados.
- [ ] O sistema exige cartão de CNPJ e comprovação do vínculo empregatício quando marcados como obrigatórios na solicitação.

### RN-006 — Tipos de arquivo aceitos devem respeitar a regra do documento

**Descrição:** O sistema deve aceitar apenas tipos de arquivo compatíveis com cada documento exigido.

**Critérios de Aceite:**
- [ ] O sistema informa os tipos aceitos para cada anexo.
- [ ] O sistema restringe a seleção de arquivo aos formatos definidos para o respectivo documento.
- [ ] O sistema rejeita tentativa de envio incompatível com a regra de formato.

### RN-007 — Declaração de veracidade é obrigatória

**Descrição:** O sistema deve exigir o aceite da declaração de veracidade, ciência legal e não sobreposição de horários antes do envio da solicitação.

**Critérios de Aceite:**
- [ ] O texto declaratório é exibido integralmente ao usuário.
- [ ] O sistema exige confirmação explícita da declaração.
- [ ] O sistema não envia a solicitação sem esse aceite.

## Pendências para Validação com o Negócio

- Confirmar se o retorno da tela deve preservar o formulário parcialmente preenchido.
- Confirmar quais campos são preenchidos automaticamente a partir do cadastro do usuário ou de bases internas.
- Confirmar regras exatas para replicação de dados quando contratante e local de atuação forem a mesma instituição.
- Confirmar quais documentos adicionais são opcionais e como impactam a análise.
- Confirmar mensagem de sucesso, protocolo e comportamento após o envio da solicitação.
- Confirmar se existe salvamento em rascunho.

## Próximos Passos Recomendados

1. Validar este documento com a área de negócio para remover ambiguidades.
2. Detalhar os campos obrigatórios por seção, se necessário.
3. Criar requisitos específicos da nova funcionalidade a partir desta base.
4. Montar a rastreabilidade entre requisitos, tela atual e futuros casos de teste.