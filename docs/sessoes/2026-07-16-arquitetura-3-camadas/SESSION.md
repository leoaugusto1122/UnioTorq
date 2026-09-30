# Brainstorm Session: Arquitetura de IA em 3 Camadas + Funcionários Digitais

**Data:** 2026-07-16
**Hora:** 16:32 (-03)
**Facilitador:** Orion (@aiox-master, atuando como @brainstorm)
**Moderador Humano:** Leonardo
**Participantes:**
- 👤 Leonardo (Humano — Ideador; ex-mecânico + analista de requisitos)
- 👑 Orion (Facilitador + síntese multi-perspectiva)

> **Nota de honestidade:** as perspectivas @pm/@po/@analyst/@architect abaixo foram **sintetizadas pelo facilitador a partir dos docs fundadores** (01, 05, 06, 10, 15), não executadas como runs de subagentes separados. Validação formal por @architect/@pm fica disponível como próximo passo.

**Status:** DOCUMENTED

---

## 📌 IDEIA INICIAL

**Título:** Arquitetura em 3 camadas (Regras → Automação → IA) e reframe de "8 agentes" para "Funcionários Digitais".

**Descrição:**
```
Avaliar uma conversa externa (ChatGPT) que propôs: (a) agentes não têm tela
própria, trabalham dentro do fluxo da oficina; (b) um único "cérebro" com skills
em vez de 8 agentes; (c) vender "Funcionários Digitais", não "IA"; (d) separar o
sistema em 3 camadas — Regras (0 token), Automação (0 token), IA (só quando precisa
interpretar), com a IA "por último, não por primeiro".
Gatilho: preocupação de custo — usar IA como lógica de negócio tornaria a operação
cara demais para a mensalidade pretendida (R$ 900).
```

**Scope Proposto:** Research-Only (decisão de arquitetura; sem código nesta fase)

**Context:**
- Alinha com: visão do Atendimento soberano (01), agentes como skills (15), funcionários digitais (05).
- Motivação: travar o princípio de custo/arquitetura **antes** de escrever código (regra "spec antes de codar").

---

## 🤔 QUESTIONAMENTO PROFUNDO

### Problema & Valor
| Pergunta | Resposta |
|----------|----------|
| **Qual é o problema core?** | IA usada como lógica de negócio → custo insustentável e posicionamento fraco ("8 agentes"). |
| **Quem sofre com isso?** | O negócio (margem da mensalidade) e o mercado-alvo (oficina independente sensível a preço). |
| **Como medem sucesso?** | Custo de IA como % da receita por tenant (meta < 10–15%). |
| **Qual o impacto esperado?** | Habilita escala comercial e a promessa "SO Inteligente" em vez de "chatbot". |

### Impacto no Sistema
| Pergunta | Resposta |
|----------|----------|
| **Qual sistema afeta?** | Orquestrador de IA (15), motor de regras/automação (06), portfólio de agentes (05). |
| **Breaking changes?** | Não — confirma e afia decisões existentes; nenhuma decisão fechada é revertida. |
| **Dependências?** | Tabela de roteamento de eventos (novo artefato); observabilidade de custo por camada. |
| **Integração com quê?** | WhatsApp (canal), Asaas (webhook), base técnica (fase 3). |

### Viabilidade
| Pergunta | Resposta |
|----------|----------|
| **Viável tecnicamente?** | Sim — ~80% já é a arquitetura documentada; falta escrever o princípio das 3 camadas como lei. |
| **Timeline realista?** | Decisão imediata (ADR); patch de docs 06/15 curto; impacto no MVP é de design, não de reescrita. |
| **Recursos necessários?** | Nenhum extra para a decisão; disciplina de engenharia na implementação. |
| **Riscos conhecidos?** | Over-engineering de regras; regressão para "um modelo só"; IA vazando para lógica de negócio. |

---

## 🔍 PERSPECTIVAS (síntese do facilitador)

### @pm — Estratégia & Visão
**Feedback:**
```
Reframe "Funcionários Digitais / SO Inteligente" é estrategicamente superior a
"8 agentes de IA" (comoditizável). Alinha 100% com a visão do Atendimento soberano
e com "o agente é o sistema". Não altera o roadmap — sharpen, não pivot.
```
**Recomendação:** ✅

### @po — Valor & Priorização
**Feedback:**
```
A spec "Funcionários Digitais" (7 perguntas + ROI por agente) torna a proposta de
valor tangível e vendável — a oficina vê pelo que paga. Alto valor, baixo custo de
produção. Prioridade alta como base para specification.
```
**Recomendação:** ✅

### @analyst — Pesquisa & Market
**Feedback:**
```
Padrão validado por Tekion (suíte agêntica: Scheduler/Service/T1) e por controle de
custo de IA como diferencial de margem. A base de conhecimento técnica própria é
ativo defensável (doc 16). O cálculo de R$ 900 é PREÇO, não custo — reforça a
necessidade de manter custo de IA como fração pequena da receita.
```
**Recomendação:** ✅

### @architect — Viabilidade Técnica
**Feedback:**
```
Viável e correto. 3 camadas com portão declarativo é a arquitetura que escala.
Correções obrigatórias: (1) roteamento de modelo por skill, não modelo único;
(2) o portão "precisa IA?" é regra, não chamada de LLM; (3) WhatsApp e chat do
Gestor são superfícies conversacionais propositais — o resto não tem tela;
(4) percentuais são princípio, não métrica.
```
**Recomendação:** ✅ (com as 4 cláusulas)

---

## 🎯 SÍNTESE & DECISÃO

### Alinhamento Multi-Perspectiva
| Perspectiva | Alinhamento | Prioridade | Risco |
|-------------|-------------|-----------|-------|
| @pm (Estratégia) | ✅ | Alta | Baixo |
| @po (Valor) | ✅ | Alta | Baixo |
| @analyst (Market) | ✅ | Alta | Baixo |
| @architect (Tech) | ✅ | Alta | Médio (disciplina de engenharia) |

### Decisão Final
**Recomendação:** PROCEDER

**Rationale:**
```
A proposta não introduz um caminho novo e arriscado — ela formaliza um princípio
(IA por último, 3 camadas) que faltava estar escrito e que resolve diretamente o
risco de custo/margem. Confirma decisões já tomadas (01/05/15) e as afia. As 4
correções técnicas mantêm o alinhamento com o que já estava certo.
```

**Scope Aprovado:** Research-Only (decisão + docs). **Sem stories nesta fase** — debate continua com o humano.

**Timeline Estimado:** Decisão imediata; patch docs 06/15 em seguida.

### Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|-----------|
| IA vira lógica de negócio (regressão) | Alto | Regra de ouro no doc 17; revisão de classificação por feature |
| "Um modelo só" (regressão) | Médio | Cláusula 1 do ADR-001; manter roteamento por skill (15 §3a) |
| Over-engineering de regras | Médio | Revisar Nível 1/2/3 por feature no specification |
| Hipótese de custo não confirmada | Médio | Métrica: custo de IA como % da receita; validar no piloto (doc 10) |

---

## 📦 OUTCOMES

Ver `OUTCOMES.yaml`. Resumo:
- **Features identificadas:** motor de regras (C1), motor de automação (C2), roteador de eventos declarativo, orquestrador de IA com roteamento por skill, base de conhecimento técnica.
- **Stories a criar:** nenhuma nesta fase (aguarda specification via @pm após retomada do debate).

---

## 📋 DECISÕES DOCUMENTADAS
| ID | Decisão | Rationale | Status |
|---|---------|-----------|--------|
| DEC-001 | Adotar arquitetura em 3 camadas ("IA por último") | Resolve custo/margem; afia arquitetura existente | ✅ Approved (ADR-001) |
| DEC-002 | Consolidar portfólio como "Funcionários Digitais" (spec 7 perguntas, por objetivo) | Torna valor tangível; posicionamento superior | ✅ Approved (doc 17) |
| DEC-003 | 4 correções técnicas ao modelo original | Preserva decisões corretas já existentes | ✅ Approved (ADR-001 cláusulas) |

---

## 📤 HANDOFF

**Próxima Fase:** debate aberto com o humano → depois specification (@pm) / patch docs 06 e 15.

**Responsável:** Orion (facilitação do debate); @pm (specification quando acionado).

**Artifacts:**
- ✅ `docs/adr/ADR-001-arquitetura-3-camadas.md`
- ✅ `docs/17-funcionarios-digitais.md`
- ✅ SESSION.md / DECISIONS.yaml / OUTCOMES.yaml
- ⏳ Patch em docs 06 e 15 (pendente)
- ⏳ Stories (não criadas — aguardam debate + specification)

**Observações para próxima fase:**
```
O humano pediu para RETOMAR O DEBATE após a documentação. Não avançar para stories
sem essa retomada. Pontos quentes em aberto para o debate: (a) organização "por
objetivo" vs portfólio atual por papel; (b) desenho concreto do roteador de eventos;
(c) validação numérica do custo de IA vs receita (doc 10).
```

---

**Sessão Finalizada:** 2026-07-16 16:32 (-03)
**Documentado por:** Orion (@aiox-master)
**Arquivo:** `.aiox/brainstorm-sessions/2026-07-16-arquitetura-3-camadas/SESSION.md`
