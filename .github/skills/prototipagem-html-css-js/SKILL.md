---
name: prototipagem-html-css-js
description: 'Cria protótipos de telas, componentes e fluxos com HTML, CSS e JavaScript progressivo para o SIGEN. Use quando o pedido envolver interface, layout, formulário, componente visual ou comportamento interativo simples.'
---

# Skill de Prototipagem HTML, CSS e JavaScript

## Visão Geral

Esta skill orienta a criação de protótipos navegáveis e componentes de interface para o SIGEN usando HTML semântico, CSS com design system e JavaScript progressivo.

## Quando Usar

Use esta skill quando:

- O usuário pedir uma nova tela, página ou componente visual.
- For necessário criar um protótipo funcional com navegação ou interação simples.
- Houver necessidade de ajustar layout, responsividade ou acessibilidade.
- O pedido envolver HTML, CSS ou JavaScript de interface.

## Objetivos

- Criar interfaces semânticas, acessíveis e responsivas.
- Reutilizar padrões visuais e variáveis CSS do projeto.
- Implementar interações simples com JavaScript sem dependências externas.
- Manter o código claro, legível e fácil de evoluir.

## Fluxo de Trabalho

### 1. Entender a necessidade

Antes de implementar, identifique:

- Qual tela, fluxo ou componente deve ser criado.
- Quem é o usuário principal dessa interface.
- Quais ações precisam estar disponíveis.
- Se existe algum requisito de acessibilidade, responsividade ou estado interativo.

### 2. Estruturar a interface

- Comece pelo HTML semântico.
- Organize a hierarquia de títulos e regiões da página.
- Associe corretamente `label`, `input`, `button` e mensagens de feedback.

### 3. Aplicar estilo

- Use variáveis CSS do `:root`.
- Nomeie classes em kebab-case.
- Prefira composição de classes e baixa especificidade.
- Garanta contraste e foco visível.

### 4. Adicionar comportamento

- Use JavaScript apenas quando houver ganho real de usabilidade.
- Prefira `addEventListener`, `classList`, `dataset` e atributos `aria-*`.
- Evite bibliotecas externas.
- Preserve comportamento básico mesmo sem JavaScript quando possível.

### 5. Validar a entrega

Confirme:

- [ ] Estrutura HTML semântica.
- [ ] Layout responsivo.
- [ ] Contraste e foco acessíveis.
- [ ] Classes consistentes com o padrão do projeto.
- [ ] JavaScript restrito ao comportamento de interface.
- [ ] Sem estilos inline e sem dependências desnecessárias.

## Padrões Recomendados

### Estrutura base

```html
<main class="painel">
  <section class="painel__secao" aria-labelledby="titulo-secao">
    <h1 id="titulo-secao" class="painel__titulo">Título da tela</h1>
    <p class="painel__descricao">Descrição curta do objetivo da interface.</p>
  </section>
</main>
```

### Interação simples

```js
const botao = document.querySelector('.filtro__botao');
const painel = document.querySelector('.filtro__painel');

botao?.addEventListener('click', () => {
  const aberto = botao.getAttribute('aria-expanded') === 'true';
  botao.setAttribute('aria-expanded', String(!aberto));
  painel?.classList.toggle('filtro__painel--aberto', !aberto);
});
```

## Restrições

- Não usar frameworks visuais sem indicação explícita.
- Não usar JavaScript para corrigir estrutura HTML ruim.
- Não quebrar acessibilidade em nome de efeito visual.
- Não introduzir dependências para interações simples.
