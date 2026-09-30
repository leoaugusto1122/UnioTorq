# ADR-001 — Arquitetura em 3 Camadas: Regras → Automação → IA ("IA por último")

- **Status:** Aceito
- **Data:** 2026-07-16
- **Decisores:** Leonardo (fundador), Orion (@aiox-master, facilitador)
- **Origem:** Sessão de brainstorm `2026-07-16-arquitetura-3-camadas` — provocada pela avaliação de uma conversa externa (ChatGPT) que re-derivou boa parte da arquitetura já decidida em [01](../../produto/01-visao-do-produto.md), [05](../../produto/05-agentes-de-ia.md) e [15](../15-arquitetura-ia-e-admin.md), e trouxe um refinamento que faltava estar escrito como lei.
- **Docs afetados (patch pendente):** [06-arquitetura-e-integracoes.md](../06-arquitetura-e-integracoes.md), [15-arquitetura-ia-e-admin.md](../15-arquitetura-ia-e-admin.md)

---

## Contexto

O modelo mental de "**8 agentes de IA**" — usado até aqui para descrever o produto — carrega dois riscos concretos:

1. **Custo / margem.** Se a IA for tratada como a lógica de negócio (decidir se o óleo venceu, se há item recusado, se existe orçamento pendente), o consumo de tokens escala com o volume operacional. Um levantamento inicial do fundador estimou ~R$ 900/mês de IA por oficina usando 8 agentes de forma indiscriminada. **Esclarecimento importante:** R$ 900 é o **preço da mensalidade pretendida**, não o custo de IA — o que torna a disciplina de custo ainda mais crítica, porque o custo de IA precisa ser uma fração pequena dessa receita para a margem fechar.
2. **Posicionamento.** Vender "8 agentes de IA" é fraco e comoditizável (todo concorrente vai anunciar o mesmo). A promessa forte é "**uma oficina que funciona melhor com a mesma equipe**", não "um chatbot".

O que **já estava decidido** e este ADR **não reabre** (princípio *No Invention*):

- **O agente é o sistema** — núcleo de dados próprio; IA opera sobre dados nossos, nunca sistemas de terceiros ([05](../../produto/05-agentes-de-ia.md)).
- **Agentes são skills declarativas** (YAML), não código hardcoded ([15 §4](../15-arquitetura-ia-e-admin.md)).
- **IA sempre via backend**, cotas medidas em "ações" (não tokens), usuário nunca toca na IA direto ([15 §1–2](../15-arquitetura-ia-e-admin.md)).
- **Funcionários digitais** como framing comercial ([01](../../produto/01-visao-do-produto.md), [05](../../produto/05-agentes-de-ia.md)).

O que **faltava estar escrito como princípio formal**: a separação explícita entre *o que é regra de negócio* (barato, determinístico) e *o que exige IA* (caro, probabilístico), com um portão de decisão antes de qualquer chamada de modelo.

---

## Decisão

Adotamos uma arquitetura de execução em **3 camadas**, com o princípio-mestre **"IA por último, não por primeiro"**. Todo evento do sistema passa por um roteador que decide a camada antes de gastar qualquer token.

```
                     EVENTO
                        │
                        ▼
          Camada 1 — Motor de Regras (0 token)
                        │
            ┌───────────┴───────────┐
            ▼                       ▼
     Resolve sozinho?          Precisa interpretar?
            │                       │
           Sim                     Sim
            ▼                       ▼
   Camada 2 — Automação        Camada 3 — IA
   (workflow, 0 token)         (consome cota)
            │                       │
            └───────────┬───────────┘
                        ▼
              Atualiza o sistema
                        │
                        ▼
          WhatsApp / Dashboard / App
```

### Camada 1 — Motor de Regras (custo zero)
Fatos determinísticos e cálculos. SQL e regra de negócio, nunca IA:
óleo vencido, KM > próxima troca, item recusado no histórico, peça em estoque, veículo parado há N dias, orçamento aguardando aprovação, cliente inativo há X meses, cálculo de comissão/desconto/total, baixa de estoque, mudança de status da OS, geração de financeiro.

### Camada 2 — Motor de Automação (custo zero)
Workflows disparados por eventos, sem IA:
`óleo venceu → cria tarefa → envia pra fila de contato`; `cliente aprovou → libera execução → avisa mecânico`; réguas, filas, gatilhos.

### Camada 3 — IA (consome cota)
Só entra quando é preciso **interpretar ou gerar** — aquilo que algoritmo tradicional faz mal:
áudio → diagnóstico estruturado; resumo de histórico longo; texto natural para WhatsApp; resposta a pergunta aberta do gestor; sugestão de combinação de serviços quando há contexto suficiente; interpretação de manual técnico.

### Manifesto do produto (deriva desta decisão)
> **Todo trabalho repetitivo deve ser automatizado.**
> **Todo trabalho que exige interpretação deve ser assistido por IA.**
> **Toda decisão crítica continua sendo humana.**

### Classificação de tarefas (guia de projeto)
| Nível | Quem resolve | Exemplos |
|---|---|---|
| **1 — Sistema sozinho** | Regras + Automação (0 token) | comissão, baixa de estoque, revisão por KM/tempo, reserva de peça, status da OS, financeiro |
| **2 — IA auxilia o usuário** | IA + humano | áudio→diagnóstico, resumo de histórico, redação de orçamento, resposta ao gestor, mensagem personalizada |
| **3 — IA trabalha sozinha** | IA autônoma dentro de trilhos | Recepcionista no WhatsApp, Pós-venda verificando vencimentos e montando campanhas |

---

## Cláusulas técnicas (correções ao modelo original)

Estas cláusulas ajustam pontos onde a proposta externa simplificou demais ou contradizia decisões já corretas:

1. **Roteamento de modelo por skill — NÃO um modelo único.**
   Mantém-se [15 §3a](../15-arquitetura-ia-e-admin.md): modelo forte só para conversa com cliente e Gestor; modelo barato para classificação/estruturação (ex.: Recepcionista→MiniMax, Mecânico→DeepSeek Flash, Gestor→Claude Sonnet). "Um cérebro" é verdade *conceitual*; tecnicamente roteia-se por tarefa. **Proibido regredir para "um modelo só".**

2. **O portão "precisa de IA?" é uma regra declarativa — NUNCA uma chamada de LLM.**
   A decisão de camada é feita por uma tabela de roteamento por tipo de evento (custo zero). Perguntar ao LLM "você é necessário aqui?" já gastaria o token que se quer economizar.

3. **Nenhum agente é módulo/menu na UI operacional.**
   Agentes aparecem como **sugestões e ações atribuídas na Timeline do Atendimento** ([05](../../produto/05-agentes-de-ia.md): toda ação vira evento). Duas exceções conversacionais **propositais**: o **WhatsApp** (canal do Recepcionista/cliente) e o **chat do Gestor** (T1, dono). Não existe "tela da IA" no fluxo operacional.

4. **Os percentuais são princípio, não métrica contratual.**
   Frases como "99% regra / 5% IA" descrevem a *direção* (a maior parte do trabalho é barata), não uma meta a ser perseguida numericamente. O split real depende do mix de features.

5. **IA é copiloto de decisão — não só "gerador de texto", e nunca autopiloto de ação consequente.**
   "Interpretar/gerar" (Camada 3) **inclui apoio à decisão**: sintetizar, priorizar com nuance, dar julgamento e recomendar — não apenas redigir mensagem bonita. Exemplos: o **Gestor** não devolve só o número, aponta *por que* a margem caiu; o **Consultor** decide *qual* recusado reofertar e *como* enquadrar a consequência pra subir a aprovação; o **diagnóstico assistido** (futuro) sugere causa provável. O que a IA **não** faz: (a) **recalcular fatos** que a Camada 1 já entrega (isso é bug de arquitetura); (b) **executar sozinha ação consequente** — preço final, desconto, fechar venda, alterar OS —, que sempre exige aprovação humana ([17](../../produto/17-funcionarios-digitais.md), [15 §5](../15-arquitetura-ia-e-admin.md)). **Regra: IA copiloto, humano comandante.** Os ~5% de IA são baixos em volume e **altíssimos em valor** — a última milha de julgamento, não enfeite de copywriting.

---

## Consequências

**Positivas:**
- **Custo baixo e previsível** — IA deixa de ser lógica de negócio; margem da mensalidade protegida.
- **Velocidade** — regras executam em milissegundos; IA em segundos. O dia a dia fica rápido.
- **Confiabilidade** — cálculo, estoque e financeiro nunca dependem de resposta probabilística.
- **Escala** — com 500 oficinas, a maior parte da carga continua sendo SQL, filas e automações.
- **Posicionamento** — habilita a promessa "Sistema Operacional Inteligente / equipe digital", superior a "8 agentes".

**Negativas / custos assumidos:**
- Exige **disciplina de engenharia**: a tabela de roteamento de eventos vira um artefato mantido e versionado.
- Risco de **over-engineering das regras** (tratar como regra algo que ganharia com IA) — mitigar revisando a classificação por feature.
- Exige **observabilidade de custo por camada** para validar a hipótese econômica.

**Métrica de acompanhamento:**
- **Custo de IA como % da receita por tenant.** Meta direcional: **< 10–15%** da mensalidade. Cruzar com [10-custos](../../negocio/10-custos-detalhados-e-plano-piloto.md) no plano piloto.

---

## Alternativas consideradas

| Alternativa | Por que rejeitada |
|---|---|
| **8 agentes autônomos decidindo tudo com IA** | Custo insustentável, latência alta, decisões probabilísticas em cálculo/financeiro, posicionamento fraco. |
| **Um único modelo para todos os agentes** | Desperdício de custo (modelo caro em tarefa trivial) e/ou qualidade baixa (modelo barato em conversa com cliente). Contraria [15 §3a](../15-arquitetura-ia-e-admin.md). |
| **Manter IA e algoritmo misturados sem princípio explícito** | Foi o estado que gerou o susto dos R$ 900; sem lei escrita, a IA vaza para dentro de lógica de negócio. |

---

## Referências

- [01 — Visão do Produto](../../produto/01-visao-do-produto.md)
- [05 — Agentes de IA](../../produto/05-agentes-de-ia.md)
- [15 — Arquitetura de IA, Admin e Skills](../15-arquitetura-ia-e-admin.md)
- [17 — Funcionários Digitais](../../produto/17-funcionarios-digitais.md)
- Sessão: `../../sessoes/2026-07-16-arquitetura-3-camadas/`
