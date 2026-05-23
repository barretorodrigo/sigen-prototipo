# Instruções Gerais do Copilot — Projeto SIGEN

## Sobre o Projeto

O SIGEN é um sistema de gestão baseado em HTML/CSS. Todas as respostas devem considerar o contexto do projeto, priorizando boas práticas de desenvolvimento web, acessibilidade e clareza na especificação de requisitos.

## Diretrizes Gerais

- Escreva comentários, documentação e mensagens de commit em **português do Brasil**.
- Prefira soluções simples e legíveis a soluções complexas ou over-engineered.
- Siga padrões de acessibilidade WCAG 2.1 AA em todo código HTML/CSS.
- Valide requisitos contra necessidades reais dos usuários antes de implementar.

## Estilo de Código

- HTML semântico: use as tags corretas para o conteúdo certo (`<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, etc.).
- CSS: prefira variáveis CSS (`--cor-primaria`) para manter consistência visual.
- Evite estilos inline; use classes descritivas e bem nomeadas.
- Nomes de classes em kebab-case (ex: `card-usuario`, `btn-primario`).

## Fluxo de Trabalho

1. Antes de implementar: verifique se há um requisito ou especificação que justifique a mudança.
2. Ao criar protótipos: use HTML e CSS puros quando possível, sem dependências externas desnecessárias.
3. Ao levantar requisitos: documente em formato estruturado com ID, descrição, critérios de aceite e prioridade.
