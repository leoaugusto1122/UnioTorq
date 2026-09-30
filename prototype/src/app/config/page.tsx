"use client";

import { Palette, Users, MessageSquare, Check } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useDados } from "@/hooks/use-dados";

export default function ConfigPage() {
  const dados = useDados();
  if (!dados) {
    return (
      <AppShell activeSlug="config">
        <div className="p-6 text-muted-foreground">Carregando…</div>
      </AppShell>
    );
  }
  const { oficina, agentes } = dados;

  return (
    <AppShell activeSlug="config">
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="text-xl font-semibold">Configurações</h1>
        <p className="text-sm text-muted-foreground">Marca, permissões e integrações</p>

        <div className="mt-6 space-y-4">
          {/* Identidade — ativa */}
          <section className="rounded-xl border bg-card p-5">
            <div className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Palette className="size-5" /></div>
              <div>
                <h2 className="text-sm font-semibold">Identidade da Oficina</h2>
                <p className="text-xs text-muted-foreground">Logo, nome e paleta do Portal do Cliente</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-medium text-muted-foreground">Nome da oficina</span>
                <input defaultValue={oficina.nome} className="mt-1 h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring" />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-muted-foreground">Telefone</span>
                <input defaultValue={oficina.telefone} className="mono mt-1 h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring" />
              </label>
              <div>
                <span className="text-xs font-medium text-muted-foreground">Cor da marca</span>
                <div className="mt-1 flex items-center gap-2">
                  <span className="size-9 rounded-lg border" style={{ background: oficina.cor }} />
                  <input defaultValue={oficina.cor} className="mono h-9 flex-1 rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring" />
                </div>
              </div>
              <div>
                <span className="text-xs font-medium text-muted-foreground">Logo</span>
                <div className="mt-1 flex items-center gap-2">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">U</span>
                  <button className="h-9 flex-1 rounded-lg border bg-background text-sm text-muted-foreground hover:bg-muted">Enviar logo…</button>
                </div>
              </div>
            </div>

            {/* preview do portal */}
            <div className="mt-4 rounded-lg border bg-muted/30 p-3">
              <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Prévia do Portal do Cliente</div>
              <div className="mt-2 flex items-center gap-2 rounded-lg bg-white p-2.5 shadow-sm">
                <span className="flex size-8 items-center justify-center rounded-lg text-sm font-bold text-white" style={{ background: oficina.cor }}>U</span>
                <div>
                  <div className="text-sm font-semibold text-neutral-900">{oficina.nome}</div>
                  <div className="text-xs text-neutral-500">Acompanhamento em tempo real</div>
                </div>
              </div>
            </div>

            <button className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
              <Check className="size-4" /> Salvar identidade
            </button>
          </section>

          {/* Usuários — em breve */}
          <SecaoBreve icon={Users} titulo="Usuários e Permissões" sub="Papéis, acessos e matriz de permissões por perfil" />

          {/* Canal WhatsApp — em breve, sem stack (doc 10) */}
          <section className="rounded-xl border bg-card p-5 opacity-90">
            <div className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground"><MessageSquare className="size-5" /></div>
              <div className="flex-1">
                <h2 className="text-sm font-semibold">Canal WhatsApp da oficina</h2>
                <p className="text-xs text-muted-foreground">Número conectado, status e templates das mensagens</p>
              </div>
              <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">em breve</span>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-3">
              <div className="rounded-lg border bg-background px-3 py-2">
                <div className="text-[11px] uppercase text-muted-foreground">Número</div>
                <div className="mono">{oficina.telefone}</div>
              </div>
              <div className="rounded-lg border bg-background px-3 py-2">
                <div className="text-[11px] uppercase text-muted-foreground">Status</div>
                <div className="inline-flex items-center gap-1 font-medium text-ok"><span className="size-1.5 rounded-full bg-ok" /> Conectado</div>
              </div>
              <div className="rounded-lg border bg-background px-3 py-2">
                <div className="text-[11px] uppercase text-muted-foreground">Templates</div>
                <div>{agentes.recepcionista} · {agentes.retencao}</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function SecaoBreve({ icon: Icon, titulo, sub }: { icon: typeof Users; titulo: string; sub: string }) {
  return (
    <section className="flex items-center gap-2 rounded-xl border bg-card p-5 opacity-90">
      <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground"><Icon className="size-5" /></div>
      <div className="flex-1">
        <h2 className="text-sm font-semibold">{titulo}</h2>
        <p className="text-xs text-muted-foreground">{sub}</p>
      </div>
      <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">em breve</span>
    </section>
  );
}
