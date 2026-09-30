# 12 — Zona de Risco e Guardrails de Escopo

*Função deste documento: ser o "não" pré-assinado. Toda vez que uma feature nova parecer boa ideia (cliente pediu, concorrente lançou, deu vontade de codar), a decisão já foi tomada aqui — só executar. Motivo de existir: risco nº 1 do doc 08 (escopo estourar) é o que mata projetos idênticos a este (caso real do doc 08, risco 13).*

## A régua única

> **Uma feature só entra se: (a) dá mãos/olhos a um agente, ou (b) remove um motivo de manter o sistema antigo. Se não faz nenhum dos dois, não entra — não importa quem pediu.**

---

## 🟢 Zona Verde — escopo comprometido (docs 04 e 11)

Fase 0: Atendimento, placa, OS/orçamento, DVI foto, link de aprovação, WhatsApp, 1 agente.
Fase 1: Recepcionista, PDV Essencial, Estoque Básico, Kanban, fiscal, Pix no link, dashboard.
Fase 2: Gestor, Cobrador, financeiro/PDV completo, estoque avançado, apontamento, painel TV, offline.
Fase 3: Técnico, Peças, multiunidade, parceiros, BI, verticais adjacentes.

**Regra de ordem:** feature de fase futura NUNCA é antecipada por pedido de 1 cliente — só por demanda registrada de vários (gate do doc 04).

## 🟡 Zona Amarela — só entra com gate batido + demanda registrada

| Item | Condição de entrada |
|---|---|
| Integração com sistema externo específico (ERP, catálogo, distribuidor) | 5+ clientes pagantes pedindo O MESMO sistema, por escrito |
| Funcionalidade de funilaria/colisão | Nunca antes da Fase 3; preferir parceria (Cilia) a construção |
| Agente novo fora do portfólio dos 8+3 (doc 05/11) | Só se substituir função de folha OU gerar receita mensurável — agente "legal de ter" não existe |
| Migração assistida de dados de sistema legado | Só importador padrão (planilha); migração completa = serviço cobrado à parte, nunca promessa de venda |
| API oficial Meta (WhatsApp) | Entra pelo gatilho do doc 06 (receita dependente do canal ou 1º ban em pagante) — não por ansiedade |
| Relatório/tela personalizada pedida por 1 cliente | Vira configuração genérica do produto ou não vira |
| Slide de fotos no Painel de TV do Cliente | Só com fotos **anonimizadas** (sem placa/nome/dado identificável) ou banco curado com consentimento no cadastro. Nunca expor veículo identificável de um cliente para outro numa tela pública (LGPD) |

## 🔴 Zona Vermelha — fora do escopo (o "não" pré-assinado)

| Item | Por que está proibido |
|---|---|
| **E-commerce / hub de vendas / sincronização Mercado Livre** | Foi metade do naufrágio do caso do vídeo (doc 08 risco 13). É varejo, outro produto, outro comprador |
| **Customização exclusiva pra um cliente** ("faz só pra mim que eu pago mais") | A armadilha nº 1. Tudo que entra no código é multi-tenant e genérico, sem exceção |
| **"Parceria"/sociedade com cliente** | Doc 08 risco 13. Relação é sempre fornecedor↔assinante |
| **RPA / robô lendo tela de sistema legado** | Quebra toda semana; vira consultoria eterna (decidido na 1ª conversa do projeto) |
| **Plataforma genérica de criação de agentes** ("crie seu agente") | Mercado da Zaia/CrewAI, capitalizado. Vendemos agentes prontos, nichados |
| **Outros nichos (barbearia, salão, clínica, pet...)** | O caminho do Wüst: genérico com verniz. Nicho = oficina, até dominar |
| **Funilaria/sinistro/seguradora** | Território Cilia (R$ 110 mi). Parceria futura, nunca briga |
| **App instalável para o cliente final (motorista)** | Decisão de produto do doc 01: cliente recebe LINK, nunca instala nada |
| **Hardware / TEF físico / maquininha própria** | Capital e suporte que não temos; Pix + Asaas resolve |
| **Contabilidade completa (SPED, folha, apuração de impostos)** | Isso é território do contador/ERP contábil. Nosso limite: DRE simples + exportar pro contador |
| **White-label / revenda antes da Fase 3** | Complexidade de plataforma sem base de produto validada |
| **Trocar de stack / reescrever** ("será que em Go/Rust/etc...") | Stack decidida (doc 06). Reescrita só com dor de produção real e mensurada |

## O Tribunal do Escopo (checklist antes de aceitar QUALQUER feature)

1. Está na Zona Verde da fase atual? → executa.
2. Dá mãos/olhos a um agente OU remove motivo de manter o sistema antigo? Se não → recusa.
3. Serve pra TODOS os clientes do nicho ou pra UM? Se pra um → recusa (ou vira config genérica).
4. Quantos clientes pagantes pediram por escrito? (<5 → backlog, não roadmap).
5. Cabe sem adiar o gate da fase atual? Se adia → backlog.

**Empate ou dúvida = NÃO.** Feature recusada vai pro backlog com data e quem pediu — nada se perde, nada fura a fila.

## Frases prontas (recusa sem perder o cliente)

- Pedido de customização: *"Isso é boa ideia — vou registrar. Aqui funciona assim: quando várias oficinas pedem, vira parte do produto e sai pra todo mundo, sem custo extra pra você. O que eu não faço é versão exclusiva, porque é isso que deixa sistema caro e travado igual os antigos."*
- Pedido de e-commerce/venda online: *"Nosso foco é o serviço e o balcão. Pra loja virtual existem ferramentas ótimas — e o estoque daqui pode conversar com elas no futuro."*
- Pedido de "sociedade": *"Prefiro te ter como cliente bem atendido do que como sócio mal resolvido. Teu retorno é o sistema trabalhando pra ti."*

## Sinais de deriva (auto-auditoria mensal — 10 min)

- [ ] Estou codando algo que não está na Zona Verde da fase atual?
- [ ] Algum cliente tem feature que só ele usa?
- [ ] O gate da fase atual está há 2+ meses sem progresso enquanto features novas entram?
- [ ] Prometi prazo de item Amarelo/Vermelho pra fechar uma venda?
- [ ] Estou pesquisando stack/ferramenta nova em vez de entregar a fase?

**2+ marcados = parar, reler este documento, cortar até voltar pra Zona Verde.**

## Exceção única

Este documento só pode ser alterado em revisão deliberada (não no meio de uma venda nem de madrugada codando): mudança registrada com data, motivo e qual evidência de mercado a justifica.
