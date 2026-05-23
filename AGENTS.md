# AGENTS.md

## Visão Geral do Projeto

O SIGEN é um sistema de gestão com base em HTML, CSS e JavaScript para construção de interfaces e protótipos de alta fidelidade. O repositório também deve suportar levantamento e documentação de requisitos de sistemas em português do Brasil.

Este projeto utiliza customizações do GitHub Copilot organizadas em:

- **Agentes**: especialistas para tarefas específicas, como prototipagem e requisitos.
- **Instruções**: regras automáticas aplicadas por tipo de arquivo.
- **Skills**: fluxos especializados reutilizáveis para tarefas recorrentes.

## Estrutura de Customizações

```text
.github/
├── agents/         # Agentes especializados (.agent.md)
├── instructions/   # Instruções por padrão de arquivo (.instructions.md)
└── skills/         # Skills reutilizáveis (cada pasta com SKILL.md)
```

## Agentes Disponíveis

- **Prototipador HTML/CSS/JS**: especialista em criar telas, componentes e interações de interface com HTML, CSS e JavaScript progressivo.
- **Analista de Requisitos**: especialista em elicitação, documentação e validação de requisitos funcionais, não funcionais e regras de negócio.

## Instruções Disponíveis

- **prototipagem-html-css.instructions.md**: diretrizes para HTML, CSS e JavaScript de interface.
- **requisitos-de-sistemas.instructions.md**: diretrizes para documentos de requisitos.
- **copilot-instructions.md**: regras gerais do projeto.

## Convenções do Projeto

- Toda documentação em Markdown deve ser escrita em **português do Brasil**.
- HTML deve ser semântico e acessível.
- CSS deve priorizar variáveis, responsividade e nomenclatura clara.
- JavaScript deve ser progressivo, simples e sem dependências desnecessárias.
- Requisitos devem ter IDs, critérios de aceite e prioridade.

## Uso Recomendado

- Use o agente de prototipagem para criar ou revisar interfaces.
- Use o agente de requisitos para transformar demandas em especificações claras.
- Aplique as instruções específicas sempre que editar arquivos compatíveis com seus padrões `applyTo`.
