# 09 — Plano de Validação de Campo

## Objetivo

Validar demanda e disposição a pagar **antes de escrever o grosso do código**, substituindo a estratégia de piloto único (descartada) por validação em lote.

**Meta objetiva: 3–5 pré-vendas pagas (R$ 79–99/mês) em 10–15 visitas qualificadas na região de Maringá, em 4–6 semanas.**

## Fase A — Preparação (1 semana)

1. **Protótipo visual** (Figma ou HTML estático): 5 telas — Lista de atendimentos, hub do Atendimento, checklist com foto no celular, link de aprovação (visão do cliente final), conversa do agente no WhatsApp. Não precisa funcionar; precisa parecer real.
2. **Demo matadora:** simulação com a placa do carro do próprio dono (consulta de placa real impressiona).
3. **Lista de alvos:** 20–25 oficinas/auto centers na região (Google Maps + indicações + fornecedores conhecidos dos 4 anos de mecânica). Qualificar pelo checklist do doc 03 (meta: 15 qualificadas).
4. **Mystery shopping paralelo:** criar trial no Ultracar, Oficina Integrada e mais 1; passar um atendimento fantasma em cada; documentar fricções (vira arsenal de venda com prova).

## Fase B — Visitas de descoberta (não é venda ainda)

**Abertura:** "Fui mecânico 4 anos, hoje trabalho com software. Tô construindo um sistema pra oficina e queria entender como funciona a sua operação — 20 minutos."

**Roteiro de perguntas (ouvir 80%, falar 20%):**

1. "Me conta o último carro que entrou aqui — do cliente chamando até pagar. Como foi, passo a passo?" *(mapeia o processo real)*
2. "Onde você anota as coisas hoje? Caderno, planilha, sistema? O que te irrita nele?"
3. "Quanto tempo o cliente demora, em média, pra aprovar um orçamento? O que você faz enquanto isso?"
4. "Quantas mensagens de WhatsApp de cliente você recebe por dia? Quem responde?"
5. "Cliente que trocou óleo há 6 meses e sumiu — alguém chama ele de volta? Como?"
6. "Você sabe dizer, agora, quanto faturou esse mês e qual box tá parado?" *(dor do gestor)*
7. "Como você ficou sabendo do sistema/ferramenta que usa hoje?" *(define canal de aquisição)*
8. **Teste de preço (âncora dupla):** "Uma ferramenta que resolvesse [a dor que ELE citou] por R$ 150/mês te parece caro ou barato? E R$ 350?"

**Registrar por visita:** perfil (checklist ICP), processo desenhado, top 3 dores nas palavras dele, reação de preço, canal, próximo passo.

## Fase C — Pré-venda (2ª visita ou fechamento na 1ª se esquentar)

**Oferta early adopter:**
- R$ 79–99/mês travado por 12 meses (vs. R$ 249 de tabela futura);
- Implantação e importação de clientes/veículos gratuitas;
- Linha direta com o fundador; influência direta no roadmap;
- Condição honesta: "entrego a primeira versão funcionando em X semanas; se não entregar, devolvo tudo".
- **Cláusula de propriedade (obrigatória, mesmo em acordo simples por escrito/WhatsApp):** o cliente licencia o uso da plataforma por assinatura; feedback, sugestões e participação no desenho do produto não geram copropriedade, direito ao código-fonte, exclusividade nem non-compete sobre a Unio AuraTech. Nenhuma "parceria" informal — sempre relação de fornecedor↔assinante. *(Motivo: ver doc 08, risco 13 — caso real de dev que perdeu controle do próprio sistema por falta desta cláusula.)*

**Cobrar de verdade (Pix/assinatura Asaas).** Piloto grátis não valida nada — a regra é inegociável.

**Tratamento de objeções previsíveis:**
- "Já uso o [sistema X]" → "Perfeito — me mostra como você manda foto da pastilha gasta pro cliente aprovar por lá?" (nenhum faz);
- "Não tenho tempo de aprender sistema" → "É exatamente por isso: o mecânico manda áudio e o sistema escreve. Menos trabalho, não mais";
- "Tá caro" → ancorar no valor de UMA aprovação a mais por semana.

## Fase D — Decisão (fim da semana 6)

| Resultado | Ação |
|---|---|
| **≥ 3 pré-vendas pagas** | GO: construir o MVP do doc 04, com os pré-clientes como conselho de produto |
| 1–2 pré-vendas | Analisar padrão das recusas; ajustar proposta/preço/nicho; mais 5–8 visitas |
| **0 pré-vendas em 15 visitas qualificadas** | NO-GO no formato atual: revisar recorte (Fast Lane/pneus? pesados? outra dor?) antes de qualquer código |

## Registro contínuo

Cada visita alimenta uma planilha única: data, oficina, score ICP, dores (verbatim), preço, canal, status. Ao fim, esse material vira: (a) backlog priorizado por frequência de dor real; (b) copy de vendas nas palavras do cliente; (c) prova pra eventual sócio/investidor.

## Papel dos contatos pessoais

- **Amigo/cunhado mecânico (perfil "enrolado"):** informante de processo e cobaia de usabilidade — **não** cliente de referência, **não** critério de decisão.
- **Rede dos 4 anos de mecânica:** porta de entrada pras visitas (indicação vale mais que cold call nesse setor).
