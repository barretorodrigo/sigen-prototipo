---
description: 'Diretrizes para levantamento, documentação e validação de requisitos de sistemas. Use ao criar, revisar ou atualizar especificações e documentos de requisitos.'
applyTo: 'docs/**/*.md, spec/**/*.md, requisitos/**/*.md'
---

# Instruções para Requisitos de Sistemas

Siga estas diretrizes ao levantar, documentar ou revisar requisitos do SIGEN.

## Tipos de Requisitos

### Requisitos Funcionais (RF)
Descrevem o que o sistema deve fazer — funcionalidades, comportamentos e regras de negócio.

Formato de ID: `RF-NNN` (ex: `RF-001`)

### Requisitos Não Funcionais (RNF)
Descrevem qualidades do sistema — desempenho, segurança, usabilidade, disponibilidade.

Formato de ID: `RNF-NNN` (ex: `RNF-001`)

### Regras de Negócio (RN)
Restrições e políticas que governam o comportamento do sistema.

Formato de ID: `RN-NNN` (ex: `RN-001`)

## Template de Requisito

Cada requisito deve ser documentado com a estrutura abaixo:

```markdown
### RF-001 — [Título Conciso do Requisito]

**Descrição:** [Descrição clara e objetiva do que o sistema deve fazer]

**Ator(es):** [Usuário final, Administrador, Sistema externo, etc.]

**Pré-condições:** [O que deve ser verdadeiro antes que este requisito possa ser satisfeito]

**Critérios de Aceite:**
- [ ] [Critério verificável 1]
- [ ] [Critério verificável 2]
- [ ] [Critério verificável 3]

**Prioridade:** Alta | Média | Baixa

**Dependências:** [IDs de outros requisitos relacionados, ou "Nenhuma"]

**Observações:** [Informações complementares, restrições ou riscos conhecidos]
```

## Escrita de Requisitos

- Use linguagem precisa: evite termos ambíguos como "rápido", "fácil", "adequado".
- Prefira a forma: **"O sistema deve [ação] [objeto] [condição/restrição]"**.
- Cada requisito deve expressar uma única responsabilidade.
- Requisitos devem ser verificáveis — se não pode ser testado, não é um requisito válido.
- Evite implementação no enunciado do requisito; descreva o "o quê", não o "como".

## User Stories

Para requisitos orientados ao usuário, utilize o formato:

```
Como [tipo de usuário],
quero [objetivo/ação],
para que [benefício/valor].
```

Exemplo:
```
Como gestor de contratos,
quero filtrar contratos por status e período,
para que eu possa acompanhar vencimentos próximos com agilidade.
```

## Níveis de Prioridade

| Prioridade | Critério |
|---|---|
| **Alta** | Sem esta funcionalidade, o sistema não atende ao objetivo principal |
| **Média** | Importante para a experiência do usuário, mas não bloqueia o uso |
| **Baixa** | Desejável, mas pode ser adiado sem impacto significativo |

## Checklist de Validação

Antes de finalizar um documento de requisitos, verifique:

- [ ] Todos os requisitos têm ID único.
- [ ] Critérios de aceite são testáveis e mensuráveis.
- [ ] Não há requisitos contraditórios entre si.
- [ ] Atores e pré-condições estão identificados.
- [ ] Regras de negócio relevantes estão documentadas.
- [ ] Requisitos não funcionais (desempenho, segurança, usabilidade) foram considerados.
- [ ] Dependências entre requisitos estão mapeadas.

## Rastreabilidade

Mantenha uma matriz de rastreabilidade relacionando requisitos a:
- Casos de uso ou user stories
- Componentes do sistema
- Casos de teste

Use o arquivo `docs/rastreabilidade.md` para centralizar este mapeamento.
