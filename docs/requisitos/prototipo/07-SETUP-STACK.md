# 07 — Setup da Stack e MCPs (ambiente do protótipo/SaaS)

**Data:** 2026-07-14 · **Executado por:** @devops (setup de ambiente)
**Decisão-base:** doc 06 fundador fixa a stack; o protótipo agora nasce **nela** (não mais vanilla), virando a semente do SaaS.

---

## 1. O que foi instalado (em `D:\UnioTorq\prototype\`)

| Item | Versão | Papel |
|---|---|---|
| Next.js | 16.2.10 (App Router, Turbopack) | Framework front (doc 06) |
| React / React-DOM | 19.2.4 | — |
| TypeScript | 5.9 | — |
| TailwindCSS | 4.3 | Estilo utilitário |
| shadcn/ui | CLI 4.13 · estilo `base-nova` · base `neutral` | Base de componentes (doc 06) |
| lucide-react | ícones | — |
| @base-ui/react | primitivos (novo shadcn) | — |
| clsx + tailwind-merge | `cn()` em `src/lib/utils.ts` | — |

**Build validado:** `pnpm build` compila e gera estático (exit 0). Componentes de teste: `src/components/ui/button.tsx`, `card.tsx`.

## 2. MCPs configurados (`prototype/.mcp.json`)

| MCP | Comando | Papel |
|---|---|---|
| **shadcn** | `npx shadcn@latest mcp` | Buscar/instalar componentes do registry shadcn (e Magic UI, que usa o mesmo registry) |
| **magic-ui** | `npx -y @magicuidesign/mcp@latest` (v2.0.0) | Componentes animados |

> ⚠️ **Reload necessário:** o Claude Code lê `.mcp.json` na inicialização. Os dois MCPs **só ficam ativos após reiniciar o Claude Code** (e aprovar os servidores quando solicitado). Nesta sessão eles ainda não estão vivos.

## 3. impeccable (skill já instalada)

`.impeccable/` já existe. É o **método/gate de qualidade** de design (hierarquia, espaçamento, acessibilidade, coerência) — roda sobre o que shadcn/Magic UI produzem. Não é framework; governa.

## 4. Papéis (evitar ruído — Calm Design, doc 01)

- **shadcn** = base do app (botões, tabelas, dialogs, forms). O app operacional denso fica calmo.
- **Magic UI** = brilho **pontual**: site de marketing, landing, login, onboarding, empty states, micro-interações. **Não** espalhar animação nas telas densas.
- **impeccable** = método que revisa tudo.

## 5. Como rodar

```bash
cd D:/UnioTorq/prototype
pnpm dev      # desenvolvimento (http://localhost:3000)
pnpm build    # build de produção
pnpm start    # servir o build (demo offline no notebook, sem internet)
```

**Demo offline:** depois de `pnpm build`, `pnpm start` roda 100% local (sem internet). Opção futura, se quiser robustez extra: `output: 'export'` no `next.config.ts` para estático puro.

## 6. Dados

`public/dados-demo.js` (a "verdade" única, doc `dados-demo`) fica em `public/` — servido como `/dados-demo.js`, carregável como script clássico e **editável sem rebuild** (troca a placa do dono em 30s). Fotos mock em `public/assets/images/`.

## 7. Override registrado

Isto **substitui** a decisão anterior de protótipo "vanilla, zero-build" (docs 01 §8 e 04 §8). Motivo: doc 06 fixa Next+shadcn como stack oficial; construir o protótipo nela elimina retrabalho (vira a semente do SaaS). A demo offline continua atendida (§5).

## 8. Próximo

Implementação das telas (passo 3), na ordem: Nina → Hub → Aprovação/Portal → Checklist → Lista(+Fast Lane) → Kanban → Dashboard → CRM → Prontuário → Configurações → Painel Mecânico → Painel TV Cliente. Usar os MCPs (após reload) + impeccable como gate.
