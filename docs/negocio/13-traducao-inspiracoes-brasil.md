# 13 — Tradução das Inspirações (Tekion / ServiceTitan / Tekmetric) → Brasil

*Análise feature por feature do material Tekion (DMS, CRM, Pay, Payroll) + pesquisa ServiceTitan/Tekmetric (jul/2026). Critério: o que dá pra fazer DE VERDADE no Brasil, nichado em oficina, região de Maringá primeiro. Este doc alimenta o roadmap (doc 11) — as adições marcadas ✚ foram incorporadas lá.*

## 1. Veredito Tekion, feature por feature

| Feature Tekion | Veredito | Tradução / fase |
|---|---|---|
| DMS unificado "sem integrações" | ✅ Já é a tese | Atendimento soberano (doc 01) |
| CRM nativo "One Customer One View" | ✅ Formalizado | ✚ Módulo **CRM da Oficina** (F1): visão 360 + Serviços Recusados |
| Desking (financiamento/lenders) | ❌ | Território de concessionária/F&I. Pedaço útil (matriz de margem) já está na F2 |
| Contabilidade (GL ao vivo, conciliação) | ⚠️ Adapta o essencial | Conciliação automática por webhook Asaas (F2) + exportação pro contador. Contabilidade plena = zona vermelha (doc 12) |
| Peças & Serviço com IA | ✅ Já planejado | Agentes Mecânico/Técnico/Peças (F1–F3) |
| Dashboards / relatórios | ✅ + prints | ✚ Resumo Diário WhatsApp (F1); ✚ drill-down "todo número clicável" e meta vs. realizado (F2) |
| **Tekion Pay** | ✅ + 3 aprendizados | Asaas no link (F1). ✚ Repasse de taxa de cartão (legal no BR — Lei 13.455/2017) como proteção de margem da oficina (F2); pagamentos de saída/reembolso (F3); meta de onboarding self-service ("ativo em <1h") |
| Maquininha/hardware | ❌ | Zona vermelha (doc 12). Pix + link resolve |
| **Tekion Payroll** | ❌ | Folha no Brasil = eSocial = outro produto. Slice útil já na F2: comissões + apontamento; exportação pro contador. Resto: nunca |
| CRM Pro — AI Lead Snapshot | ✅ Adapta | ✚ **Resumo do Cliente por IA** ao abrir atendimento: histórico, veículos, recusados pendentes, preferências, última conversa (F2) |
| Transcrição de chamadas | ⚠️ Parcial | Oficina vive de zap, não de telefone — transcrição de áudio WhatsApp já coberta (Ag. Mecânico/Gestor) |
| Priorização inteligente | ✅ Adapta | ✚ Fila de follow-up ordenada por **valor parado** (F2) |
| Enterprise multi-loja | ✅ Já planejado | F3 (respeitando gates do doc 04) |

## 2. A peça que faltava: Serviços Recusados (deferred services)

Padrão consolidado nos EUA e ausente no Brasil:

- Serviço recusado ≈ venda adiada com janela de ~90 dias; consultor com 20 OS/dia não faz follow-up manual. Sequência automática (14 e 30 dias) recupera **18–28%** dos recusados em até 45 dias (pesquisa AutoLeap 2024).
- Shopmonkey: caso com **US$ 250 mil** em serviços recusados parados dentro do sistema, reativáveis.
- DVI com foto: **2× a taxa de aprovação** vs. recomendação verbal (dados Tekmetric).

**Nossa vantagem estrutural:** o link de aprovação item a item (F0) já registra cada recusa por veículo, de graça. Implementação:
1. Recusa no link → registro `serviço_recusado` (veículo, item, valor, data) — F0 (já sai naturalmente do modelo).
2. Tela "Recusados" por cliente/veículo + botão "adicionar à nova OS" — F1 (✚ adicionado ao doc 11).
3. Agente de Retenção trabalha a fila automaticamente (14/30 dias, mensagem personalizada, para se agendar) — F1/F2.
4. Priorização por valor parado — F2.

## 3. ServiceTitan — o playbook do "OS de serviços + fintech"

| O que fazem | Validação/tradução pra nós |
|---|---|
| Atlas: assistente que roda relatório, encontra job, despacha, aprende a executar tarefas por texto/voz | = Agente Gestor (F2), validado por player Nasdaq |
| AI Voice Agents + SMS Booking Agent (captura e agenda sozinho) | = Agente Recepcionista via WhatsApp (F1) |
| CRM com fila centralizada de follow-up | = Serviços Recusados + Retenção |
| Fintech embutida: Tap to Pay, Pay by Bank, financiamento, AP automation — "clientes recebem 40% mais rápido" | = Pix no link (F1) + conciliação (F2); argumento de venda pronto |
| Benchmark+ ("insights prontos pra diretoria") | = benchmarks regionais anônimos (F3): "oficinas do seu porte em Maringá faturam X" |
| Tese do fundador: "fluxos de apoio são puramente cognitivos → serão automatizados; margens a 40%" | É a nossa tese comercial dita por quem vale bilhões — usar em pitch/material |
| Alerta do VP de produto: "agentes desconectados entre si geram conflito; a plataforma unificada é o que importa" | Confirma "o agente é o sistema" (doc 11) contra a alternativa Zaia/agentes soltos |
| Dado de mercado: 54% dos empreiteiros dispostos a investir em IA em 1–3 anos; só 12% já embutiram | O timing: apetite alto, adoção baixa = janela aberta |

## 4. Novas features incorporadas ao roadmap (resumo das ✚)

| Feature | Fase | Custo de construir | Por quê |
|---|---|---|---|
| **Resumo Diário no WhatsApp do dono** (faturamento, carros, orçamentos parados, agenda de amanhã) | **F1** | Baixíssimo (cron + template) | Cria hábito diário; o dono "sente falta" do sistema. Inspiração direta do SMS de pacing da Tekion |
| **Serviços Recusados** (fila + tela + reativação) | F0 (dado) / **F1** (tela+agente) | Baixo (dado já capturado) | 18–28% de recuperação; nenhum nacional tem |
| **Resumo do Cliente por IA** (snapshot ao abrir atendimento) | F2 | Baixo (LLM barato sobre dados próprios) | Consultor atende como se lembrasse de tudo |
| **Fila priorizada por valor parado** | F2 | Baixo | Follow-up onde o dinheiro está |
| **Repasse de taxa de cartão** (opcional, por oficina) | F2 | Médio | Protege margem; legal (Lei 13.455/2017); diferencial que nenhum nacional oferece |
| **Drill-down universal + meta vs. realizado** no dashboard | F2 | Médio | "Todo número abre a porta da sua origem" |
| **Onboarding self-service** (ativo em <1h) | F1→contínuo | — (princípio) | Reduz custo de implantação; padrão Tekion Pay |
| Kanban simplificado (sem drag; clique muda status) | F0 (opcional) | 1–2 dias | Coração visual da demo; modelo de status já existe desde F0 |

## 5. Decisões de "não trazer" (registradas para não rediscutir)

Desking/F&I de concessionária; folha de pagamento (eSocial); maquininha/hardware próprio; contabilidade completa; call center telefônico. Motivos no doc 12 (zona vermelha) e na tabela acima.
