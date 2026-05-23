---
name: levantamento-requisitos
description: 'Levanta, organiza e documenta requisitos funcionais, não funcionais e regras de negócio em português do Brasil. Use quando o pedido envolver especificação, user stories, critérios de aceite ou documentação de requisitos.'
---

# Skill de Levantamento de Requisitos

## Visão Geral

Esta skill orienta a elicitação, análise e documentação de requisitos de sistemas para o SIGEN, com foco em clareza, rastreabilidade e critérios de aceite verificáveis.

## Quando Usar

Use esta skill quando:

- O usuário pedir levantamento de requisitos para uma funcionalidade.
- For necessário transformar uma ideia em requisitos estruturados.
- Houver necessidade de escrever user stories, regras de negócio ou critérios de aceite.
- Um documento de especificação precisar ser revisado ou detalhado.

## Objetivos

- Identificar requisitos funcionais, não funcionais e regras de negócio.
- Reduzir ambiguidades por meio de perguntas direcionadas.
- Produzir documentação objetiva e testável.
- Manter rastreabilidade entre requisito, fluxo e aceitação.

## Fluxo de Trabalho

### 1. Descoberta

Antes de documentar, esclareça:

- Qual problema precisa ser resolvido.
- Quem são os usuários e atores envolvidos.
- Qual é o fluxo principal e quais são os fluxos alternativos.
- Quais restrições de negócio, prazo, segurança ou conformidade existem.

### 2. Estruturação

Organize os requisitos com IDs padronizados:

- `RF-001` para requisitos funcionais.
- `RNF-001` para requisitos não funcionais.
- `RN-001` para regras de negócio.

### 3. Escrita

Use linguagem objetiva e testável:

- Prefira a fórmula: `O sistema deve...`
- Separe uma responsabilidade por requisito.
- Inclua ator, pré-condição, prioridade e dependências quando fizer sentido.

### 4. Validação

Confirme:

- [ ] Todos os requisitos possuem ID único.
- [ ] Os critérios de aceite são mensuráveis.
- [ ] Não há contradições entre requisitos.
- [ ] As regras de negócio estão explícitas.
- [ ] O documento está em português do Brasil.

## Template Recomendado

```markdown
### RF-001 — Título do requisito

**Descrição:** O sistema deve ...

**Ator(es):** Usuário autenticado

**Pré-condições:** Usuário deve estar autenticado.

**Critérios de Aceite:**
- [ ] Critério 1
- [ ] Critério 2

**Prioridade:** Alta

**Dependências:** Nenhuma

**Observações:** Informação complementar.
```

## User Story

```text
Como [tipo de usuário],
quero [objetivo],
para que [benefício].
```

## Restrições

- Não confundir requisito com solução técnica.
- Não deixar critérios de aceite vagos.
- Não omitir casos de erro ou exceção quando forem relevantes.
- Não misturar regras de negócio com detalhes de interface sem necessidade.
