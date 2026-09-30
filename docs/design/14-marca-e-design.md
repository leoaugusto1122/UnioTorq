# 14 — Marca, Identidade e Revisão de Design (Protótipo v1)

*Referência: protótipo "Unio Oficina" (14 telas, jul/2026) — Kanban, Hub de Atendimento, Dashboard (3 abas), Painel TV, Prontuário de Veículos, Checklist mobile, Portal do Cliente, Aprovação Digital.*

## 1. Decisão de marca

**Decisão: manter o padrão Unio.** Arquitetura de marca: **Unio (marca-mãe / Unio AuraTech) → Unio Escala, Unio Oficina, Unio [futuro]**.

Justificativa: "Unio" (latim: união/unidade) carrega a tese do produto — tudo em um, Atendimento soberano. Padrão marca-mãe + sobrenome descritivo é o mesmo de Tekion (ARC/AEC/APC) e Conta Azul; escala pra futuros verticais (Unio Frota, Unio Pesados). Públicos dos produtos não se cruzam — o histórico do Unio Escala (escalas de igreja) não afeta a percepção do Unio Oficina.

**Pendência obrigatória antes de investir em marca:**
- [ ] Busca no INPI (classes 9 e 42) por "Unio" e "Unio Oficina"
- [ ] Domínios: uniooficina.com.br / unio.app / getunio.com.br (unio.com.br provavelmente indisponível)
- [ ] Reserva de @ em Instagram (canal relevante pro nicho)

Alternativas de reserva (só se INPI barrar): **Torq** (técnico, curto), **Eixo** (tudo gira em torno de um eixo), **Box One**. Ordem de preferência: Unio Oficina > alternativas.

## 2. Revisão de design — o que está certo (manter e proteger)

| Acerto | Por que importa |
|---|---|
| **R$ estimado por coluna do Kanban** | Dono enxerga dinheiro parado por etapa — pensamento financeiro embutido na operação |
| Microcopy acionável ("2h+ sem resposta", "1 fornecedor atrasado") | Número com "e daí" = gestão; número sem contexto = enfeite |
| **"O que acontece se não realizar?"** na Aprovação Digital | Educação de consequência = o que sobe taxa de fechamento (padrão MotoVisuals: 55%→90% nos EUA) |
| Placa em fonte mono; badges de status; prazo com barra de progresso | Identidade técnica + escaneabilidade |
| Prontuário de Veículos (metáfora médica) | Alinha com DVI ("saúde do veículo"); "Rev. próxima" na lista alimenta o Agente de Retenção |
| Portal sem login com timeline estilo rastreio | Inspiração FedEx/Amazon realizada; zero fricção pro cliente final |
| Dashboard com meta vs. realizado | Conceito Tekion (doc 13) já implementado |
| Split view no Hub (lista + detalhe) | Casa do consultor; componente do doc 01 |

## 3. Ajustes priorizados

| # | Ajuste | Tela | Gravidade |
|---|---|---|---|
| 1 | **Seletor de severidade (Verde/Amarelo/Vermelho) visível no item do checklist** — é o coração semântico do DVI; contadores no topo existem, mas a classificação no item não aparece. Verificar campo de texto duplicado na mesma tela | Checklist mobile | Alta |
| 2 | **Ranking de equipe na TV: configurável e desligado por padrão** — ranking público permanente gera ressentimento (debate clássico Tekmetric). TV foca em fila/entregas/alertas | Painel TV | Alta |
| 3 | **Disciplina de vermelho**: vermelho = risco a cliente/prazo; laranja = atenção operacional. Hoje vermelho aparece em crítico, atraso, workload e recusa — quando tudo grita, nada grita | Todas | Média |
| 4 | Campo de placa aceitar formato antigo (ABC-1234) e Mercosul (ABC1D23) — demo usa a placa real do dono | Cadastros/Kanban | Média |
| 5 | Unificar conceitualmente Portal do Cliente + Aprovação Digital (pro cliente é UM link; aprovação é aba do portal) — evita duas superfícies pra manter | Portal/Aprov. | Média |
| 6 | Coluna "Aguardando Peças" (boa adição) deve contar como "veículo parado" nos indicadores | Kanban/Dashboard | Média |
| 7 | "Valor Recusado" do funil → **clicável**, abrindo a fila de Serviços Recusados (doc 13) | Dashboard | Média |
| 8 | Mobile do mecânico: testar com luva + sol de pátio — contraste alto, alvos de toque maiores, considerar modo escuro | Checklist mobile | Média |
| 9 | Painel TV: rotação automática de conteúdo + auto-refresh (roda o dia todo sem toque) | Painel TV | Baixa |

## 4. Checklist de UX por persona

- **Consultor** ✔ Hub split-view, timer, CTA "Enviar Orçamento", WhatsApp a um clique
- **Gestor** ✔ Dashboard 3 abas, metas, workload da equipe, funil de aprovação
- **Recepção** ✔ Lista/filtros/busca por placa
- **Cliente final** ✔✔ Portal sem login, timeline, fotos, histórico com valores
- **Mecânico** ⚠️ A persona mais frágil — validar em campo (item 8 acima); "Só problemas" (toggle) é bom atalho
- **Dono "enrolado" (anti-persona)** — o protótipo já minimiza digitação; o teste real é o Fast Lane em ≤30s

## 5. Gap para a demo de pré-venda (doc 09/10)

Das 5 telas da demo, 4 prontas. **Falta 1: mock da conversa do agente no WhatsApp** (cliente: "tem horário hoje?" → agente agenda → confirmação). É a tela do diferencial nº 1 e a mais simples de produzir. Sem ela, a demo mostra um sistema bonito; com ela, mostra um funcionário digital.

## 6. Nota de escopo

O protótipo retrata a visão das Fases 1–2 (Kanban completo, TV, dashboard) — perfeito como material de venda. A ordem de construção continua sendo a do doc 04/11 (MVP magro primeiro). Protótipo vende a visão; código entrega a fase.
