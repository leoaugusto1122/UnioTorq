# ADR-002 — Memória Viva (Motor de Conhecimento)

- **Status:** Aceito
- **Data:** 2026-07-17
- **Decisores:** Leonardo (fundador), Orion (@aiox-master, facilitador)
- **Origem:** Continuação da sessão `2026-07-16-arquitetura-3-camadas` — série de conversas de refinamento (16–17/07) sobre o núcleo cognitivo do produto.
- **Depende de:** [ADR-001 (3 camadas)](ADR-001-arquitetura-3-camadas.md) · [ADR-003 (persistência)](ADR-003-persistencia.md)
- **Docs afetados:** [01-visao](../../produto/01-visao-do-produto.md), [15-arquitetura-ia-e-admin](../15-arquitetura-ia-e-admin.md), [17-funcionarios-digitais](../../produto/17-funcionarios-digitais.md), [16-operacao](../../operacao/16-operacao-onboarding-dados.md)

---

## Contexto

A pesquisa de concorrência ([analise-concorrencia-2026-07](../../negocio/analise-concorrencia-2026-07.md)) concluiu que os diferenciais de feature do UnioTorq (DVI, agente no WhatsApp, consulta por placa) são **defensáveis por integração, não por invenção** — peças existem soltas no mercado. Faltava um **fosso de invenção**.

Esse fosso é o que o [doc 16](../../operacao/16-operacao-onboarding-dados.md) já semeava como *"base de conhecimento auto-aprendiz (ativo defensável)"*: **um sistema que aprende com a própria operação da oficina.** A inovação **não é** o chatbot no WhatsApp (qualquer um faz) — é o ciclo `executa atendimento → aprende → relaciona → melhora a próxima decisão`, que nunca termina e cujo valor **composta** com o uso.

Este ADR eleva esse conceito a **ativo central do produto**: a **Memória Viva**. O verdadeiro produto não é a IA — é a Memória Viva; a IA é a interface inteligente que pensa e comunica sobre ela.

---

## Decisão

### 1. A Memória Viva é o núcleo do produto

Os módulos operacionais (**DMS + ERP + CRM**) escrevem e leem uma **Memória Viva** compartilhada. Os **Funcionários Digitais** não têm memória própria — consultam a Memória Viva. Isso realiza o princípio "o agente é o sistema, um núcleo de dados" ([doc 01](../../produto/01-visao-do-produto.md)).

### 2. Quatro camadas (todas sobre um Postgres — ver [ADR-003](ADR-003-persistencia.md))

| Camada | O que é | Custo |
|---|---|---|
| **1. Dados Estruturados** | Postgres transacional: cliente, veículo, OS, peça, fornecedor, estoque, financeiro | 0 token |
| **2. Grafo de Conhecimento** | Entidades + relações (`USA`, `RECUSA`, `TROCA_JUNTO`, `COMPRA`…) — **tabela de arestas relacional**, não banco de grafo | 0 token |
| **3. Memória Narrativa** | Histórico em linguagem natural, otimizado para o LLM raciocinar | ~0 token (gerada por template) |
| **4. Catálogo Técnico** | Conhecimento consolidado por veículo×motor (óleo, filtros, torque, correia, tempo padrão, códigos OEM/equivalentes) — **semeado + enriquecido pela operação** | 0 token |

### 3. Motor de Raciocínio (a camada de orquestração)

Acima da Memória Viva, decide **como agir** usando tudo que ela sabe. **90% determinístico + IA só na última milha:**
```
Regras/estatística reúnem os sinais (recusa, co-ocorrência, preferência do cliente, padrão de veículos)
        → política decide "ofereço agora?" (regra + threshold, 0 token)
        → IA apenas REDIGE a mensagem final
```
A IA **não descobre nada** — raciocina e comunica sobre conhecimento que o sistema já possui.

### 4. Fluxo (estende o ADR-001)

```
Eventos → Regras (C1) → Memória Viva (C1.5) → Motor de Raciocínio → IA (comunica) → Automação/WhatsApp/Usuário
```

---

## Cláusulas (disciplina de execução — inegociáveis)

1. **Modelo de dados *knowledge-ready* no dia 1.** Mesmo sem features de IA, a Fase 1 grava o item da OS **rico**: peça vinculada a veículo/motor/ano/código OEM/marca/mecânico/fornecedor. Gravar `Produto: PSL55` **flat** impede reconstruir o conhecimento depois. É **impossível de retrofitar** — a decisão de arquitetura de maior alavancagem do projeto.

2. **Catálogo Técnico semeado cedo.** Nasce semeado com catálogos de fabricante/tempários ([doc 05](../../produto/05-agentes-de-ia.md) já lista as fontes); a experiência da oficina refina/sobrescreve por cima. Sem semente, a **Central Técnica** (a tela que consolida a consulta e fecha o gap (d) da concorrência) está vazia na demo e nos primeiros meses. É arma de venda de dia 1, não coisa de Ano 3.

3. **Grafo é relacional (Postgres), não banco de grafo.** Ver [ADR-003](ADR-003-persistencia.md).

4. **Narrativa gerada barata.** Na maioria, texto de template preenchido a partir do estruturado (0 token). IA só para resumo genuinamente livre. Narrativa **não** pode virar sorvedouro de token (contraria [ADR-001](ADR-001-arquitetura-3-camadas.md)).

5. **Motor de Raciocínio: decisão determinística, IA só comunica.** A DECISÃO de agir é regra + threshold vindo da estatística — nunca "joga tudo no LLM e manda decidir" (caro, não-confiável, não-auditável). Guardrails obrigatórios: teto de frequência (anti-spam), threshold de relevância, **humano no loop no começo** (consultor aprova a oferta sugerida).

6. **Agentes stateless. A Memória Viva aprende, os agentes não.** Um novo especialista (ex.: Fiscal) nasce "inteligente" porque consulta a mesma Memória — sem treino. Refina o [doc 15 §4](../15-arquitetura-ia-e-admin.md).

---

## Fases (ordem de dependência; calendário comprimido pelo build assistido por IA)

| Fase | Entrega | IA? |
|---|---|---|
| **1 (MVP)** | Dados estruturados *knowledge-ready* + Catálogo Técnico **semeado** (Central Técnica) | Não |
| **2 (MVP)** | Motor de Conhecimento: estatística, co-ocorrência, **Recomendação Técnica** (recusa→item→veículo) | Não |
| **3** | Memória Narrativa + Motor de Raciocínio rico + Funcionários Digitais (especialistas) | Pouca |
| **4** | **Conhecimento Global** (anonimizado, opt-in, LGPD) + Motor de Insights | Sim |

> As fases são ordem de dependência, não calendário anual. Fase 1+2 compõem o MVP expandido.

---

## Consequências

**Positivas:**
- **Fosso de invenção via efeito de rede de dados** — quanto mais a oficina usa, mais valiosa a Memória fica *pra ela*; concorrentes não copiam com código, só com anos dos dados do cliente.
- **IA mais barata** — a Memória responde do banco em vez do LLM.
- **Confiável** — a IA opera sobre fatos verificados (força o guardrail "nunca inventar dado").
- **Posicionamento:** "Sistema Operacional Cognitivo para Oficinas" > "ERP com IA".

**Negativas / custos assumidos:**
- Exige **disciplina no modelo de dados** desde o dia 1 (cláusula 1).
- **Cold-start:** a Memória nasce vazia; depende de semear o Catálogo (cláusula 2).
- **Conhecimento Global** é Fase 4, pesado de LGPD (consentimento opt-in, anonimização — [doc 16](../../operacao/16-operacao-onboarding-dados.md)).

---

## Alternativas consideradas

| Alternativa | Por que rejeitada |
|---|---|
| **RAG tradicional** (PDF→embedding→vetor→LLM) | Ótimo para documentos; ruim para operação. O conhecimento de oficina é **relacional e orientado a evento**, não documento. |
| **Banco de grafo (Neo4j) no dia 1** | Over-engineering para escala local; tax de sincronização. Ver [ADR-003](ADR-003-persistencia.md). |
| **IA como lógica de negócio** | Caro, lento, probabilístico onde precisa ser determinístico. Ver [ADR-001](ADR-001-arquitetura-3-camadas.md). |
| **Nomear o núcleo com acrônimo (OKE/OIE)** | Consultor-speak; batizar componente grandioso antes de existir tenta over-engineering. Mantido **"Memória Viva"**. |

---

## Referências
- [ADR-001 — 3 camadas](ADR-001-arquitetura-3-camadas.md) · [ADR-003 — Persistência](ADR-003-persistencia.md)
- [01 — Visão](../../produto/01-visao-do-produto.md) · [05 — Agentes](../../produto/05-agentes-de-ia.md) · [15 — Arquitetura IA/Admin](../15-arquitetura-ia-e-admin.md) · [16 — Operação/Dados](../../operacao/16-operacao-onboarding-dados.md) · [17 — Funcionários Digitais](../../produto/17-funcionarios-digitais.md)
- [analise-concorrencia-2026-07](../../negocio/analise-concorrencia-2026-07.md)
