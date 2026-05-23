description: 'Diretrizes para criação de protótipos e interfaces com HTML semântico, CSS e JavaScript progressivo. Aplica-se aos arquivos HTML, CSS e JS do projeto.'
applyTo: '**/*.html, **/*.css, **/*.js'
---

# Instruções de Prototipagem HTML, CSS e JavaScript

Siga estas diretrizes ao criar ou atualizar interfaces, protótipos e componentes visuais do SIGEN.

## Estrutura HTML

- Use HTML5 semântico: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
- Todo formulário deve ter `<label>` associado a cada `<input>` via atributo `for`.
- Imagens devem ter atributo `alt` descritivo; imagens decorativas usam `alt=""`.
- Headings seguem hierarquia lógica: apenas um `<h1>` por página, seguido de `<h2>`, `<h3>`, etc.
- Use atributos `aria-*` e `role` para componentes interativos sem equivalente HTML nativo.

## Variáveis CSS

Defina variáveis no `:root` para garantir consistência visual:

```css
:root {
  /* Cores */
  --cor-primaria: #1a73e8;
  --cor-primaria-hover: #1558b0;
  --cor-secundaria: #f1f3f4;
  --cor-texto: #202124;
  --cor-texto-secundario: #5f6368;
  --cor-fundo: #ffffff;
  --cor-borda: #dadce0;
  --cor-erro: #d93025;
  --cor-sucesso: #1e8e3e;
  --cor-aviso: #f9ab00;

  /* Tipografia */
  --fonte-principal: 'Segoe UI', system-ui, sans-serif;
  --tamanho-base: 1rem;
  --tamanho-pequeno: 0.875rem;
  --tamanho-grande: 1.25rem;
  --tamanho-titulo: 1.5rem;

  /* Espaçamento */
  --espaco-xs: 0.25rem;
  --espaco-sm: 0.5rem;
  --espaco-md: 1rem;
  --espaco-lg: 1.5rem;
  --espaco-xl: 2rem;

  /* Bordas */
  --raio-borda: 4px;
  --raio-borda-grande: 8px;

  /* Sombras */
  --sombra-card: 0 1px 3px rgba(0, 0, 0, 0.12);
  --sombra-modal: 0 4px 16px rgba(0, 0, 0, 0.2);
}
```

## Nomenclatura de Classes

Use o padrão BEM adaptado em kebab-case:

- Bloco: `.card-usuario`, `.formulario-cadastro`
- Elemento: `.card-usuario__titulo`, `.formulario-cadastro__campo`
- Modificador: `.btn--primario`, `.btn--desabilitado`

## Acessibilidade

- Contraste mínimo de 4.5:1 para texto normal e 3:1 para texto grande (WCAG 2.1 AA).
- Elementos interativos devem ter foco visível (`outline` não deve ser removido sem substituto).
- Forneça alternativas textuais para conteúdo não textual.
- Componentes de interface devem ser operáveis por teclado.

## Responsividade

- Mobile-first: escreva estilos base para telas pequenas e expanda com `@media (min-width: ...)`.
- Breakpoints recomendados: `480px` (mobile), `768px` (tablet), `1024px` (desktop), `1280px` (wide).
- Evite unidades fixas em `px` para tamanhos de fonte; prefira `rem` ou `em`.

## JavaScript Progressivo

- Use JavaScript apenas para comportamentos que exijam interação dinâmica, como menus expansíveis, modais, abas e validação de interface.
- Prefira APIs nativas do navegador e código simples, sem dependências externas desnecessárias.
- Garanta funcionamento básico da interface mesmo sem JavaScript, quando aplicável.
- Atualize estados visuais com atributos acessíveis como `aria-expanded`, `aria-hidden` e `aria-current` quando necessário.
- Evite manipular estilos diretamente via JavaScript; prefira alternar classes CSS descritivas.

Exemplo:

```js
const botaoMenu = document.querySelector('.menu__botao');
const painelMenu = document.querySelector('.menu__painel');

botaoMenu?.addEventListener('click', () => {
  const expandido = botaoMenu.getAttribute('aria-expanded') === 'true';

  botaoMenu.setAttribute('aria-expanded', String(!expandido));
  painelMenu?.classList.toggle('menu__painel--aberto', !expandido);
});
```

## Componentes Comuns

### Botões
```html
<button type="button" class="btn btn--primario">Salvar</button>
<button type="button" class="btn btn--secundario">Cancelar</button>
<button type="button" class="btn btn--perigo">Excluir</button>
```

### Cards
```html
<article class="card">
  <header class="card__cabecalho">
    <h2 class="card__titulo">Título do Card</h2>
  </header>
  <div class="card__corpo">
    <!-- conteúdo -->
  </div>
  <footer class="card__rodape">
    <!-- ações -->
  </footer>
</article>
```

### Mensagens de Feedback
```html
<div role="alert" class="mensagem mensagem--erro">Erro ao salvar os dados.</div>
<div role="status" class="mensagem mensagem--sucesso">Dados salvos com sucesso.</div>
```
