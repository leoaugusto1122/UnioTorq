# Brainstorm Session: {TEMA}

**Data:** {YYYY-MM-DD}  
**Hora:** {HH:MM}  
**Facilitador:** @brainstorm  
**Moderador Humano:** {nome}  
**Participantes:**
- 👤 {nome} (Humano - Ideador)
- 🤖 @pm (Morgan - Estratégia/Visão)
- 🤖 @po (Pax - Valor/Priorização)
- 🤖 @analyst (Alex - Pesquisa/Market)
- 🤖 @architect (Aria - Viabilidade Técnica)

**Status:** {IDEATION | ANALYSIS | DECISION | DOCUMENTED}

---

## 📌 IDEIA INICIAL

**Título:** {nome da ideia}

**Descrição:**
```
{descrição clara da ideia/conceito}
```

**Scope Proposto:** {MVP | Full-Feature | Research-Only | Discovery}

**Context:**
- Alinha com: {visão/epic/roadmap}
- Motivação: {por que isso importa agora}

---

## 🤔 QUESTIONAMENTO PROFUNDO

### Problema & Valor

| Pergunta | Resposta |
|----------|----------|
| **Qual é o problema core?** | |
| **Quem sofre com isso?** | |
| **Como medem sucesso?** | |
| **Qual o impacto esperado?** | |

### Impacto no Sistema

| Pergunta | Resposta |
|----------|----------|
| **Qual sistema afeta?** | |
| **Breaking changes?** | |
| **Dependências?** | |
| **Integração com quê?** | |

### Viabilidade

| Pergunta | Resposta |
|----------|----------|
| **Viável tecnicamente?** | |
| **Timeline realista?** | |
| **Recursos necessários?** | |
| **Riscos conhecidos?** | |

---

## 🔍 PERSPECTIVAS DOS AGENTES

### @pm - Estratégia & Visão

**Questões Feitas:**
- Alinha com visão do produto?
- Onde encaixa no roadmap?
- Prioridade vs outras iniciativas?
- Risks estratégicos?

**Feedback:**
```
[resposta do @pm]
```

**Recomendação:** ✅ / ⚠️ / ❌

---

### @po - Valor & Priorização

**Questões Feitas:**
- User value proposta?
- Prioridade no backlog?
- Critérios de aceitação iniciais?
- Dependências?

**Feedback:**
```
[resposta do @po]
```

**Recomendação:** ✅ / ⚠️ / ❌

---

### @analyst - Pesquisa & Market

**Questões Feitas:**
- Soluções similares no mercado?
- Demand de usuários?
- Trends de tecnologia?
- Gaps em soluções existentes?

**Pesquisa Realizada:**
```
[findings]
```

**Recomendação:** ✅ / ⚠️ / ❌

---

### @architect - Viabilidade Técnica

**Questões Feitas:**
- Viável com arquitetura atual?
- Impacto em outros sistemas?
- Complexidade vs timeline?
- Riscos técnicos?

**Análise Técnica:**
```
[análise]
```

**Recomendação:** ✅ / ⚠️ / ❌

---

## 🎯 SÍNTESE & DECISÃO

### Alinhamento Multi-Perspectiva

| Perspectiva | Alinhamento | Prioridade | Risco |
|-------------|-------------|-----------|-------|
| @pm (Estratégia) | ✅ | Alta/Média/Baixa | Alto/Médio/Baixo |
| @po (Valor) | ✅ | Alta/Média/Baixa | Alto/Médio/Baixo |
| @analyst (Market) | ✅ | Alta/Média/Baixa | Alto/Médio/Baixo |
| @architect (Tech) | ✅ | Alta/Média/Baixa | Alto/Médio/Baixo |

### Decisão Final

**Recomendação:** {PROCEDER | CONDICIONAL | REJEITAR}

**Rationale:**
```
{explicação clara da decisão}
```

**Scope Aprovado:** {MVP | Full-Feature | Research | Reject}

**Timeline Estimado:** {X semanas}

**Recursos Necessários:** {X devs, Y designers, etc}

### Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| {risk 1} | High/Medium/Low | {como mitigar} |
| {risk 2} | High/Medium/Low | {como mitigar} |

---

## 📦 OUTCOMES

### Features Identificadas

```yaml
features:
  - id: "F-001"
    name: "{feature name}"
    description: "{description}"
    user_value: "{value}"
    scope: "MVP/Full"
```

### Stories a Criar

```yaml
stories:
  - title: "Como {persona}, {action}, para {benefit}"
    estimate: "Xpt"
    acceptance_criteria:
      - "Given... When... Then..."
    depends_on: []
```

### Next Steps

1. [ ] Aprovação final de escopo
2. [ ] Criação de stories em `docs/stories/`
3. [ ] Handoff para @pm (specification phase)
4. [ ] Planejamento de sprint

---

## 📋 DECISÕES DOCUMENTADAS

| ID | Decisão | Rationale | Status |
|---|---------|-----------|--------|
| DEC-001 | | | ✅ Approved |
| DEC-002 | | | ✅ Approved |

---

## 📤 HANDOFF

**Próxima Fase:** {specification | planning | development}

**Responsável:** @pm

**Artifacts:**
- ✅ SESSION.md (este arquivo)
- ✅ DECISIONS.yaml
- ✅ OUTCOMES.yaml
- ✅ Stories criadas

**Observações para próxima fase:**
```
{notas importantes}
```

---

## 📝 Notas & Decisões Adicionais

```
{espaço para anotações extras}
```

---

**Sesão Finalizada:** {timestamp}  
**Documentado por:** @brainstorm  
**Arquivo:** `.aiox/brainstorm-sessions/{YYYY-MM-DD}-{tema}/SESSION.md`
