# Modelo de Custo e Margem — UnioTorq

> Consolida infra/IA ([10-custos](10-custos-detalhados-e-plano-piloto.md)) + WhatsApp oficial (re-baseline jul/2026) + custos de desenvolvimento e pró-labore, sob a arquitetura de [ADR-001 (3 camadas)](../arquitetura/adr/ADR-001-arquitetura-3-camadas.md).
> **Câmbio:** US$1 = R$5,14. **Todos os números são ESTIMATIVAS a validar no piloto.** Revalidar trimestralmente.

---

## 1. Premissas

- **Preços de plano** ([doc 10](10-custos-detalhados-e-plano-piloto.md)): Essencial **R$149** / Profissional **R$249** (carro-chefe) / Performance **R$399** + add-ons de agente R$59–129.
- **ADR-001 reduz o IA-runtime**: ~95% do trabalho é regra/automação (0 token); IA só interpreta/gera. O [doc 10](10-custos-detalhados-e-plano-piloto.md) estimava R$60–120/oficina com "8 agentes ativos" — número **pré-ADR**; aqui modelo mais baixo.
- **WhatsApp**: Evolution (~R$0) na validação e primeiros clientes; API oficial depois.

---

## 2. Decisão financeira-chave: WhatsApp é **pass-through**

O custo do WhatsApp oficial (re-baseline do fundador) **não pode entrar na margem do software**, senão destrói a margem:

| Categoria (Meta, jan/2026) | Custo | Uso |
|---|---|---|
| Utilitário (template) | ~R$0,21/msg | orçamento, status, aprovação |
| Marketing (template) | ~R$0,35/msg | campanha de retenção |
| Serviço (conversa livre) | **~R$150/mês fixo por oficina** | IA conversando livremente |
| Autenticação (OTP) | ~R$0,21/msg | login |

**Regra:** o software é vendido com margem alta; o WhatsApp oficial é **repassado ao cliente** (a custo, ou como add-on **"Recepcionista Conversacional 24/7"** que absorve o R$150/mês fixo). O cliente consumiria essas mensagens de qualquer forma — é custo dele, não seu. Assim o R$249 permanece margem de software.

---

## 3. Custo variável por oficina (software) — estimativa a escala

| Item | Essencial | Profissional | Performance |
|---|---|---|---|
| IA-runtime (pós-ADR-001) | ~R$10 | ~R$25 | ~R$50 |
| API de placa (cacheada) | ~R$10 | ~R$10 | ~R$15 |
| Storage (fotos DVI, R2) | ~R$5 | ~R$5 | ~R$8 |
| Infra rateada (a escala) | ~R$10 | ~R$10 | ~R$12 |
| **Custo variável/oficina** | **~R$35** | **~R$50** | **~R$85** |

*WhatsApp NÃO incluído (pass-through, seção 2).*

---

## 4. Custos fixos da empresa (mensal)

| Item | R$/mês | Fonte |
|---|---|---|
| Contabilidade/CNPJ | 200–400 | doc 07 |
| Ferramentas de dev | 0–100 | doc 07 |
| **IA de desenvolvimento (Claude R$100 + Codex R$100)** | **200** | input Leonardo |
| Infra base (não rateável no início) | ~100 | doc 10 |
| **Subtotal (fase atual, CLT financia)** | **~R$500–800** | |
| **+ Pró-labore (FUTURO)** | **+2.000** | input Leonardo |
| **Total futuro (com pró-labore)** | **~R$2.500–2.800** | |

---

## 5. Margem bruta por plano

| Plano | Preço | Custo var. | Margem bruta | % |
|---|---|---|---|---|
| Essencial | R$149 | ~R$35 | R$114 | **~76%** |
| Profissional | R$249 | ~R$50 | R$199 | **~80%** |
| Performance | R$399 | ~R$85 | R$314 | **~79%** |

Todos batem a meta de **≥75% bruto** do [doc 07](07-modelo-de-negocio.md). A escala derruba ainda mais o custo variável (infra/IA rateados).

---

## 6. Break-even (quantos clientes cobrem o fixo)

Usando a contribuição do plano carro-chefe (Profissional, ~R$199/cliente):

| Cenário | Custo fixo | Break-even |
|---|---|---|
| **Fase atual** (sem pró-labore, CLT financia) | R$500–800 | **~3–4 clientes** |
| **Futuro** (pró-labore R$2.000) | R$2.500–2.800 | **~13–15 clientes** |

Meta do [doc 07](07-modelo-de-negocio.md) para o ano 1: **20–30 clientes** → cobre o pró-labore de R$2k com folga. **A conta fecha.**

---

## 7. Recomendação de margem (o que você pediu)

1. **Software: mirar ≥75% bruto** (padrão SaaS saudável; = doc 07). Os três planos já entregam isso no modelo acima.
2. **WhatsApp oficial: pass-through** (a custo, ou leve markup no add-on conversacional). Nunca absorver na assinatura.
3. **Pró-labore R$2k é seguro como meta:** coberto por ~15 clientes Profissional — realista dentro do alvo ano-1.
4. **Não competir por preço:** o [ICP regional](03-publico-alvo-e-icp.md) (fatura R$40mil+/mês) briga por confiança/uptime, não por R$100 (doc 10). Preço-âncora R$249 é defensável.

---

## 8. Sensibilidade / riscos

- **WhatsApp "serviço" R$150/oficina/mês:** só no add-on de conversa livre; pass-through protege a margem.
- **Custo de IA subir:** mitigado por roteamento por skill (doc 15 §3a) + **Memória Operacional** (ADR-002, em elaboração) que responde do banco em vez do LLM.
- **Custo de dev (Codex/Claude R$200):** trivial no P&L; é o multiplicador que viabiliza o MVP expandido.
- **Escala:** custo variável/tenant cai; margem sobe.
