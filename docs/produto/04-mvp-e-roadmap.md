# 04 — MVP e Roadmap

> **Nota (2026-07-17):** a numeração de **build** foi re-baselinada em [18 — Fases e Estimativas](18-fases-e-estimativas-build.md) após o pivô "MVP expandido". Este doc segue valendo para **escopo e racional de corte**; o doc 18 manda na sequência e nas estimativas.

## Princípio de corte

O documento original de visão listava como "Fase 1": Atendimentos + Kanban + Lista + Checklist Mobile offline + OS + Orçamentos + Aprovação Digital + Portal do Cliente + CRM WhatsApp + Dashboard + Painel TV. **Isso são ~5 produtos, não um MVP** — solo, com CLT, seriam 12–18 meses sem faturar.

Regra de ouro adotada: **MVP = o caminho mais curto entre "carro entrou" e "orçamento aprovado no WhatsApp"**, mais UM agente com ROI mensurável. Todo o resto é fase.

## MVP (Fase 0) — "Aprova no Zap"

| Entra | Não entra (vai pra fase) |
|---|---|
| Atendimento (entidade central) | Kanban drag-and-drop (começa como **Lista** com status) |
| Cadastro de veículo por **placa** (API de consulta) | App mobile offline-first (checklist começa como **web mobile** simples) |
| OS + Orçamento (peças + mão de obra) | Estoque, compras, financeiro completo |
| **DVI simplificado**: fotos anexadas a itens do orçamento | Painel TV |
| **Link de aprovação** (portal do cliente): aprova/reprova item a item + observação | Assinatura digital certificada (começa com aceite registrado + IP/timestamp) |
| **Notificação via WhatsApp** (Evolution API): orçamento pronto, aprovado, carro pronto | Agente conversacional completo (chega na Fase 1) |
| Histórico por veículo/placa | Emissão fiscal |
| Importador de clientes/veículos via planilha (onboarding) | Migração de dados de sistemas legados |
| Relatório básico: faturamento do período, ticket médio, OS abertas | Dashboard completo / BI |

**1 agente no MVP** (escolher na validação de campo, entre):
- **Agente de Retenção** (revisão por KM/tempo, reativação) — ROI mais fácil de provar; ou
- **Agente do Consultor** (anotação do mecânico → recomendação com foto em língua de cliente) — mais "uau" de demo, aumenta ticket.

**Critério de pronto do MVP:** uma oficina real completa o ciclo carro→OS→foto→link→aprovação→entrega sem tocar em papel, e o dono consegue dizer quanto faturou no mês dentro do sistema.

## Fase 1 — "Recepção que não dorme + o sistema que substitui de vez"

**Por que PDV/estoque entram já aqui (e não ficam só na Fase 2):** sem um mínimo de venda de balcão e estoque, o cliente continua pagando o sistema antigo só pra vender uma peça sem OS — e aí nunca cancela de fato o concorrente (Ultracar, AutoPro, GestãoClick, WSoft já incluem isso no plano base — ver doc 02). A meta desta fase é ser o motivo pelo qual ele cancela o sistema anterior, não só um complemento de WhatsApp.

**Regra de calibre (pra não repetir o erro do vídeo/doc 08 risco 13):** aqui entra o **essencial de reposição de sistema**, não o **peso contábil de ERP**. A diferença entre os dois é o que separa esta fase da Fase 2.

- Agente Recepcionista no WhatsApp (agenda, confirma, remarca, responde preço/horário) — espelho do Scheduler AI da Tekion.
- **PDV Essencial (venda de balcão):** registrar venda de peça/produto sem precisar abrir OS; forma de pagamento e valor recebido (sem gestão de caixa/turno formal — isso é Fase 2); emissão de NFC-e reaproveitando a mesma integração fiscal.
- **Estoque Básico:** cadastro de produto, quantidade, alerta de estoque mínimo, baixa automática (por OS ou por venda de balcão). Sem análise ABC, sem múltiplos depósitos, sem conciliação — isso é Fase 2.
- Kanban visual (Recebido → Inspeção → Aguardando Aprovação → Aprovado → Executando → Finalizado → Entregue) + tela de Exceções (aguardando peça, cliente não responde, atraso, retrabalho).
- Checklist mobile evoluído (áudio ditado → estruturação automática).
- Pix no link de aprovação (Asaas) — o "text-to-pay" brasileiro.
- Emissão fiscal: NFS-e (mão de obra) + NF-e/NFC-e (peças) via API fiscal (Focus NFe ou PlugNotas) — feature de **retenção**.
- Dashboard do gestor + primeiros indicadores de produtividade (horas apontadas, box parado).

## Fase 2 — "A oficina que se gerencia"

- Agente Gestor (T1 nosso): perguntas por áudio/texto sobre o negócio, comandos ("abre OS de troca de óleo pra placa ABC1D23").
- Agente Cobrador (régua de cobrança, segunda via Pix, baixa automática).
- **PDV/Financeiro completo:** caixa com abertura/fechamento e sangria, crediário, devolução, contas a pagar/receber, fluxo de caixa, DRE simples, comissões.
- **Estoque avançado:** compras, análise ABC, múltiplos depósitos, conciliação com nota de entrada.
- Apontamento completo do mecânico (iniciar/pausar/finalizar), utilização de box.
- Painel TV (modo escuro, fila, boxes, previsão de entrega).
- App mobile offline-first de verdade (sincronização).
- Matrizes de margem (piso/teto de markup) — padrão Tekmetric.

## Fase 3 — "Plataforma"

- Agente Técnico: placa → especificação de óleo/litragem/filtro/tempo padrão (base própria + catálogos tipo Tecfil + tempário).
- Agente de Peças: cotação com fornecedores via WhatsApp, comparativo dentro da OS.
- Garantia (OS vinculada) e Atendimento Interno (equipamentos da oficina).
- Multiunidade / redes; APIs públicas; ecossistema de parceiros (modelo APC da Tekion).
- Integrações: Cilia (orçamento colisão/cotação de peças) como parceiro, catálogos de distribuidores.
- BI/Analytics; IA para diagnóstico assistido.
- Verticais adjacentes: pesados, frotas, máquinas agrícolas.

## Critérios de avanço de fase (gates)

- **MVP → Fase 1:** 3–5 oficinas pagantes usando o ciclo completo por 60 dias; churn zero no período; NPS verbal positivo do consultor técnico.
- **Fase 1 → Fase 2:** 15–20 clientes pagantes; **maioria já cancelou o sistema antigo** (sinal de que o PDV Essencial/Estoque Básico cumpriu o papel de substituição); agente Recepcionista resolvendo ≥60% das conversas sem humano; MRR cobrindo custos de infra + fiscal.
- **Fase 2 → Fase 3:** 50+ clientes; demanda comprovada por multiunidade/peças (pedidos registrados de clientes reais, não hipótese).
