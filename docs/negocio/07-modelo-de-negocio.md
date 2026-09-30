# 07 — Modelo de Negócio

## Receita em camadas (modelo Tekion adaptado)

| Camada | O quê | Quando |
|---|---|---|
| 1. Assinatura | Mensalidade SaaS por plano | MVP |
| 2. IA como add-on | Agentes adicionais além do incluso no plano | Fase 1–2 |
| 3. Pagamentos embutidos | Taxa/spread sobre Pix do link de aprovação (split Asaas) | Fase 1–2 |
| 4. Fiscal | Margem sobre documentos fiscais acima da franquia | Fase 1 |
| 5. Ecossistema | Parceiros (autopeças, cotação, seguros) pagando pra vender dentro da plataforma | Fase 3 |

## Precificação proposta (hipótese a validar em campo)

Faixa do mercado nacional: R$ 60–500/mês (Ultracar R$ 189–494; AutoPro ~R$ 197+; entrantes R$ 62–99). Benchmark EUA: US$ 179–199/mês de entrada — prova que o produto certo sustenta preço premium.

| Plano | Preço-alvo | Conteúdo |
|---|---|---|
| **Essencial** | R$ 149/mês | Atendimento + OS + orçamento + link de aprovação + notificações WhatsApp + histórico por placa + 2 usuários |
| **Profissional** | R$ 249–299/mês | + Agente (1 incluso) + Kanban + checklist mobile + fiscal (franquia de notas) + Pix no link + usuários ilimitados |
| **Performance** | R$ 399–449/mês | + Todos os agentes + dashboard completo + apontamento/produtividade + Painel TV + multiusuário avançado |
| Add-on Agente extra | R$ 49–79/mês cada | Retenção, Cobrador, Gestor etc. |

Âncoras para o teste de preço nas visitas: **R$ 150 e R$ 350** ("caro ou barato?").

Early adopters (pré-venda de validação): R$ 79–99/mês travado por 12 meses + implantação gratuita + acesso direto ao fundador. **Sempre pago — piloto grátis não valida disposição a pagar.**

## Unit economics (estimativa inicial por cliente/mês)

| Item | Custo estimado |
|---|---|
| Infra rateada (VPS, R2, banco) | R$ 5–15 |
| LLM (agentes, uso moderado) | R$ 10–40 (depende do agente ativo e roteamento de modelos) |
| WhatsApp (Evolution) | ~R$ 0 hoje; pós-migração oficial: poucos R$ (serviço grátis + utilidade R$ 0,035/msg); retenção/marketing R$ 0,3217/msg — repassar no add-on |
| API de placa | centavos por consulta (cachear resultado por placa) |
| Fiscal (quando ativo) | franquia embutida no plano; excedente repassado |
| **Custo direto total** | **~R$ 20–60/cliente/mês** |

Margem bruta alvo: **>75%** no plano Profissional.

## Metas de MRR (cenário conservador)

| Marco | Clientes | Ticket médio | MRR |
|---|---|---|---|
| Validação | 3–5 (pré-venda) | R$ 90 | R$ 300–450 |
| Ano 1 | 20–30 | R$ 180 | R$ 4–5,5 mil |
| Ano 2 | 80–120 | R$ 220 | R$ 18–26 mil |
| Ano 3 | ~200 (0,3% das 69 mil mecânicas) | R$ 250 | **R$ 50 mil** |

## Canal de aquisição (hipóteses — validar na pergunta de campo "como você conheceu o sistema que usa?")

1. **Venda direta regional** (Maringá e região): visita + demo com a placa do carro do próprio dono. Vantagem injusta: fundador ex-mecânico fala a língua.
2. **Indicação estruturada**: desconto por oficina indicada (setor compra por boca a boca).
3. **Balcão da autopeça / distribuidores**: o vendedor de peças conhece todas as oficinas da cidade — possível programa de parceiro.
4. Conteúdo/SEO local ("sistema para oficina") — longo prazo; o mercado já é disputado por SEO agressivo (caso Wüst).
5. Sindirepa-PR / feiras (Automec) / programa Inova Auto — credibilidade institucional.

## Custos fixos do negócio (fase inicial)

- Infra base (VPS + Cloudflare + domínios): R$ 150–400/mês.
- APIs mínimas (placa, e-mail transacional): R$ 100–200/mês.
- CNPJ/contabilidade: R$ 200–400/mês.
- Ferramentas de dev: ~R$ 0–100 (stack majoritariamente open-source).
- **Burn mensal alvo antes de receita: < R$ 1.000** — financiável pelo CLT + consultorias de agentes (renda paralela definida na estratégia).
