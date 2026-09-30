# 08 — Riscos e Mitigações

| # | Risco | Prob. | Impacto | Mitigação |
|---|---|---|---|---|
| 1 | **Escopo estourar** (o "MVP" virar 5 produtos, 18 meses sem faturar) | Alta | Crítico | Contrato de escopo no doc 04; gate de avanço por fase; tudo fora do MVP vai pro backlog sem discussão; revisão mensal de escopo |
| 2 | **Banimento Evolution API** em cliente pagante | Média | Alto | Anti-ban obrigatório (delay, digitando, aquecimento, limites); número dedicado por oficina (não o pessoal do dono); plano de migração pra API oficial documentado (doc 06); comunicar o risco em contrato |
| 3 | **Cilia expandir pra gestão de mecânica geral** | Média | Alto | Velocidade + nicho (mecânica/auto center, não colisão); monitorar trimestralmente; preparar tese de parceria (cotação de peças/colisão via Cilia) |
| 4 | **Ultracar/AutoPro acordarem** (DVI + agente) | Média | Médio | Incumbentes são lentos (padrão Mitchell1 vs Tekmetric nos EUA); nossa vantagem é foco + velocidade + custo baixo; construir switching cost via histórico de dados e agentes |
| 5 | **Churn/inadimplência de PME** | Alta | Médio | ICP filtrado (organizado que quer crescer, R$ 40 mil+/mês); cobrança automática Pix/boleto com régua (Asaas); Agente de Retenção gera ROI visível = razão pra ficar; anti-persona documentada |
| 6 | **Validação falhar** (ninguém pré-comprar) | Média | Crítico (bom!) | É o cenário barato: descobrir antes de codar. Critério objetivo: <3 pré-vendas em 15 visitas qualificadas = revisar proposta/nicho antes de escrever código |
| 7 | **Conflito com empregador (Accellog)** | Baixa–média | Crítico | Ler cláusulas de PI/exclusividade/não-concorrência ANTES da primeira linha de código; separação total (hardware, contas, horário, zero código/template/conhecimento proprietário da empresa); domínios distintos (logística vs. reparação automotiva) ajudam, mas verificar por escrito |
| 8 | **Solo founder + CLT + família = burnout/lentidão** | Alta | Alto | Escopo magro; consultoria de agentes como renda que financia (não como segundo produto); metas trimestrais realistas; considerar sócio técnico/comercial se validação der forte |
| 9 | **Meta mudar regras do WhatsApp** (cobrança de respostas a partir de 08/2026; pressão pro Meta Business Agents) | Média | Médio | Arquitetura de mensageria abstraída (trocar provedor sem reescrever produto); custo por mensagem monitorado; produto não pode depender de UMA política de plataforma |
| 10 | **LGPD / dados de cliente final** | Baixa | Médio | Minimização de dados; consentimento no 1º contato; opt-out; logs; DPA com fornecedores; sem venda/uso secundário de dados |
| 11 | **Dependência de APIs de terceiros** (placa, fiscal, pagamento) | Baixa | Médio | Fornecedores com alternativa mapeada (doc 06); cache de consultas de placa; abstração de gateway |
| 12 | **"Uptime no sábado"** — indisponibilidade no pico da oficina | Média | Alto | Sem deploy sexta/sábado; monitoramento + alerta; status page; VPS com snapshot; plano de rollback |
| 13 | **Armadilha do "sócio informal"** — cliente (piloto ou grande) empurra "parceria" vaga, sistema fica amarrado às regras de negócio de UM cliente só, depois vem cobrança de cessão de código/PI retroativa e não-concorrência (caso real documentado: dev fez DMS automotivo completo por R$ 34 mil em 6 meses sob "parceria tecnológica" sem contrato, cliente depois exigiu código-fonte + cessão retroativa + não-concorrência de 12 meses) | Média | Crítico | **Nunca** aceitar "parceria"/equity vaga com cliente. Sempre contrato de assinatura SaaS por escrito desde o piloto (mesmo que simples): Leo é dono de 100% da plataforma; cliente licencia o uso; feedback/participação do cliente não gera copropriedade nem direito ao código-fonte; nenhuma customização proprietária de um cliente entra no núcleo multi-tenant |

## Nota: por que este projeto não é o mesmo risco do caso viral (jul/2026)

Vídeo circulando no YouTube/TabNews mostra dev que construiu sistema de escopo quase idêntico ao nosso DMS (OS+Kanban, estoque, PDV, fiscal, IA, WhatsApp) — mas para **um único cliente**, sob acordo informal, sem contrato. Resultado: cliente tentou extrair a regra de negócio e descartar o dev. A diferença estrutural que nos protege: **construímos uma vez e licenciamos pra muitos (SaaS multi-tenant)** — nenhum cliente individual tem poder de vida ou morte sobre o produto, e a relação é sempre assinatura, nunca sociedade. O risco só reaparece se, na pressa de fechar um cliente grande, aceitarmos fazer "customização exclusiva" fora do núcleo do produto — ver mitigação do risco 13.

- Validação: menos de 3 pré-vendas pagas em 15 visitas qualificadas.
- Pós-MVP: churn > 20% nos primeiros 90 dias dos early adopters.
- Cilia lançando gestão operacional completa pra mecânica geral com preço agressivo antes do nosso MVP → reavaliar recorte (ir mais fundo no Fast Lane/pneus ou pesados).
- Custo de aquisição real > 6 meses de mensalidade no canal direto regional.
