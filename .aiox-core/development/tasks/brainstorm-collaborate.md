---
task: Brainstorm Colaborativo - Ideação com Agentes Autônomos
responsavel: "@brainstorm"
responsavel_type: agent
atomic_layer: task
elicit: true
entrada: |
  - idea: Ideia/conceito a ser explorado
  - context: Contexto do produto/visão
  - scope: "MVP, full-feature, research-only, etc."
saida: |
  - SESSION.md: Transcrição completa da conversa
  - DECISIONS.yaml: Decisões estruturadas
  - OUTCOMES.yaml: Features/stories/epics gerados
  - Stories criadas em docs/stories/ (se aprovado)
checklist:
  - "[ ] Fase 1: Coleta da ideia inicial"
  - "[ ] Fase 2: Questionamento profundo"
  - "[ ] Fase 3: Análise multi-perspectiva"
  - "[ ] Fase 4: Síntese de decisões"
  - "[ ] Fase 5: Documentação de outcomes"
  - "[ ] Fase 6: Handoff para próxima fase"
---

# *brainstorm-collaborate

Conduz uma sessão colaborativa real de brainstorm com agentes autônomos.

## Fluxo de Conversa Interativa

### 1. INICIALIZAÇÃO
- [ ] Receba ideia do usuário
- [ ] Confirme scope (MVP/full/research)
- [ ] Crie sessão em `.aiox/brainstorm-sessions/{YYYY-MM-DD}-{tema}/`
- [ ] Inicialize SESSION.md, DECISIONS.yaml, OUTCOMES.yaml

### 2. FASE DE IDEAÇÃO (Você + Humano)

**Sua tarefa**: Questionar profundamente

```
USER: "Ideia: Dashboard integrado de manutenção de veículos"

VOCÊ:
"Excelente! Deixa eu entender melhor:

1. **Problema Core**: 
   - Qual problema específico isso resolve?
   - Para quem (qual persona)?

2. **Impacto Esperado**:
   - Como muda a vida do usuário?
   - Métrica de sucesso?

3. **Constraints**:
   - Dependências?
   - Riscos conhecidos?

Responda cada uma e aí vou invocar os agentes para perspectivas."
```

### 3. FASE DE ANÁLISE MULTI-PERSPECTIVA (Paralelo)

Após humano responder, invoque agentes:

```bash
# @pm: Estratégia + Visão + Roadmap
"@pm, essa ideia de Dashboard de Manutenção:
 - Alinha com visão de 'gestão integrada'?
 - Onde encaixa no roadmap?
 - Prioridade vs outras iniciativas?
 - Risks estratégicos?"

# @po: Valor + Priorização + Backlog
"@po, do ponto de vista de produto:
 - User value proposta?
 - Prioridade vs backlog?
 - Critérios de aceitação iniciais?
 - Dependências no backlog?"

# @analyst: Pesquisa + Validação + Market
"@analyst, precisamos validar:
 - Soluções similares no mercado?
 - Demand de usuários?
 - Trends de tecnologia (telemática)?
 - Gaps em soluções existentes?"

# @architect: Viabilidade Técnica + Impactos
"@architect, análise técnica:
 - Viável com arquitetura atual?
 - Qual impacto em outros sistemas?
 - Complexidade vs timeline?
 - Riscos técnicos?"
```

### 4. SÍNTESE E DECISÃO (Você)

Após respostas, sintetize:

```
**SÍNTESE - Dashboard de Manutenção**

✅ ALINHAMENTO:
- @pm: Alinha com visão, alta prioridade
- @po: Alto valor (reduz downtime), viável em 2 sprints
- @analyst: Market demand forte, 3 competidores estudados
- @architect: Viável, integra com telemetry existente

⚠️ RISCOS:
- Timeline (dependência de API telemática)
- Mobile UI complexity

🎯 RECOMENDAÇÃO: Proceder com MVP (v1: desktop + relatórios)

📋 PRÓXIMA FASE: Specification (via @pm)
```

### 5. DOCUMENTAÇÃO ESTRUTURADA

Capture em tempo real:

**SESSION.md:**
```markdown
# Brainstorm Session: Dashboard Manutenção
**Data:** 2026-07-14  
**Facilitador:** @brainstorm  
**Participantes:** Leonardo, @pm, @po, @analyst, @architect

## Transcrição Completa
[conversação integrada]

## Decisões Finais
- [decision list]

## Próximos Passos
- [handoff]
```

**DECISIONS.yaml:**
```yaml
session_id: "2026-07-14-dashboard-manutencao"
decisions:
  - id: "DEC-001"
    statement: "Proceder com Dashboard Manutenção (MVP)"
    rationale: "Market validation + alinhamento estratégico"
    impact: "2 sprints, 4-5 devs"
    approved_by: ["@pm", "@po"]
    timestamp: "2026-07-14T14:45"
```

**OUTCOMES.yaml:**
```yaml
session_id: "2026-07-14-dashboard-manutencao"
outcomes:
  epics:
    - name: "Dashboard Integrado de Manutenção"
      description: "..."
      scope: "MVP"
  stories:
    - title: "Como operador, visualizar manutenção próxima"
      estimate: "8pt"
    - title: "Como técnico, registrar manutenção realizada"
      estimate: "5pt"
  risks:
    - "Dependency on telemetry API"
  next_phase: "specification"
  handoff_to: "@pm"
```

### 6. HANDOFF

Ao terminar:
- [ ] Gere stories em `docs/stories/` se aprovado
- [ ] Crie epic em `docs/stories/epics/`
- [ ] Passe para @pm para specification phase
- [ ] Archive session em `.aiox/brainstorm-sessions/`

## Exemplos de Questões Profundas

**Problema:**
- "Qual é o problema REAL? (evite solução mascarada de problema)"
- "Quem sofre com isso? (defina persona)"
- "Como medem o sucesso?"

**Impacto:**
- "Qual sistema isso afeta?"
- "Como muda fluxo de trabalho?"
- "Qualquer breaking change?"

**Viabilidade:**
- "Dependências técnicas?"
- "Timeline realista?"
- "Recursos necessários?"

**Risco:**
- "O que pode dar errado?"
- "Qual é a pior case?"
- "Mitigation strategy?"

## Modo de Execução

```bash
@brainstorm
*brainstorm-collaborate --idea "Sua ideia aqui" --scope "mvp"
```

## Outputs Esperados

1. ✅ Sessão documentada completamente
2. ✅ Decisões estruturadas e aprovadas
3. ✅ Features/Stories pronta para dev
4. ✅ Risks e mitigations identificados
5. ✅ Handoff claro para próxima fase
