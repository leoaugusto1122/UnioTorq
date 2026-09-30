# ADR-003 — Persistência e Grafo (Postgres-first)

- **Status:** Aceito
- **Data:** 2026-07-17
- **Decisores:** Leonardo (fundador), Orion (@aiox-master, facilitador)
- **Origem:** Refinamento da [ADR-002 (Memória Viva)](ADR-002-memoria-viva.md) — decisão sobre como armazenar o Grafo de Conhecimento.
- **Depende de:** [ADR-002 (Memória Viva)](ADR-002-memoria-viva.md)

---

## Contexto

A Memória Viva ([ADR-002](ADR-002-memoria-viva.md)) tem uma camada de **Grafo de Conhecimento**. A pergunta: implementar em **banco de grafo dedicado (Neo4j)** desde já, ou **relacional (PostgreSQL)**?

Fatores decisivos:
- **Escala é local/regional (Maringá).** ~95 oficinas mecânicas na cidade. Cenário: piloto 3–5 → ano 1 20–30 → alguns anos 50–100 oficinas. Volume: ~10–50 milhões de linhas em 3 anos — **dado pequeno** para Postgres.
- **As queries do MVP são de 1–2 saltos** (peça-por-modelo, co-ocorrência) = joins/agregações SQL triviais, **não** travessias profundas.
- **Fundador solo:** um segundo datastore é tax operacional perpétuo (sync, backup, upgrade, monitoramento).
- **Profissionalismo = tamanho certo**, não tecnologia mais sofisticada. Graph DB dedicado para 30 oficinas seria otimização prematura.

---

## Decisão

1. **PostgreSQL é a fonte única da verdade** — transacional (ACID) para tudo: OS, financeiro, estoque **e** o Grafo de Conhecimento.

2. **O Grafo é implementado relacionalmente:**
   - **Tabela de arestas:** `relacionamento(origem, destino, tipo, peso, props JSONB, criado_em, atualizado_em)`. Ex.: `(Gol_G3_AP, Gates_K123, 'USA', peso=87)`.
   - **Views materializadas** para estatística: co-ocorrência, peça-por-modelo, confiança.
   - As **foreign keys** do transacional já são arestas naturais do grafo.

3. **Sem banco de grafo dedicado (Neo4j) no escopo atual.**

4. **Abstração de repositório de conhecimento.** A escrita/leitura do grafo fica atrás de uma interface (mesmo padrão do provider de LLM abstraído no [doc 15 §3a](../15-arquitetura-ia-e-admin.md)). O resto do app não sabe qual motor está embaixo → trocar de motor = reescrever **um adaptador**, não o app.

5. **Escrita única.** O Postgres é sempre autoritativo. Qualquer projeção futura (AGE/Neo4j) é **hidratada a partir dele, numa direção só**, e é **descartável/reconstruível**. **Nunca dual-write.**

6. **Porta futura sem migração:** a extensão **Apache AGE** dá `Cypher` **dentro** do Postgres. Um Neo4j dedicado só se justifica na **Fase 4** (Conhecimento Global: milhões de OS entre oficinas, travessia multi-salto).

---

## Cláusulas

- Modelar a tabela de arestas limpa `(origem, destino, tipo, peso, props)` — mapeia **1:1** para nós/relações do Neo4j (migração futura trivial).
- **Centralizar** as queries de grafo num módulo (repositório), não espalhar SQL pelo código.
- O modelo do grafo (nós, tipos de relação, lógica de escrita) é **agnóstico de motor** — é a parte cara e reaproveitável; o motor de armazenamento é trocável.

---

## Consequências

**Positivas:**
- **Um datastore só** — custo operacional mínimo para fundador solo.
- **Nada desperdiçado** — o modelo do grafo serve Postgres, AGE ou Neo4j sem rewrite.
- **Porta aberta** — AGE (in-place, zero migração) ou Neo4j (Fase 4) quando/se a escala exigir.
- **Integridade** — escrita única mantém o Postgres autoritativo; projeções são reconstruíveis.

**Negativas / custos assumidos:**
- Travessias profundas multi-salto são mais verbosas em SQL (recursive CTE) — aceitável no escopo atual; AGE resolve quando surgir a necessidade.

---

## Alternativas consideradas

| Alternativa | Por que rejeitada |
|---|---|
| **Neo4j desde o dia 1** | Over-engineering para escala local; tax de sync/ops perpétuo; grafo vazio por meses (otimização prematura). O fosso é o **dado**, não o motor. |
| **Dois bancos com dual-write** | Drift e problemas de integridade. Projeção deve ser hidratada numa direção só. |

---

## Referências
- [ADR-002 — Memória Viva](ADR-002-memoria-viva.md) · [ADR-001 — 3 camadas](ADR-001-arquitetura-3-camadas.md)
- [15 — Arquitetura IA/Admin](../15-arquitetura-ia-e-admin.md) (padrão de abstração de provider)
