"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Plus, ClipboardCheck, Pencil, FileText, Sparkles, Gauge } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Pill } from "@/components/pills";
import { useDados } from "@/hooks/use-dados";
import { km as fmtKm } from "@/lib/dados";
import type { RevStatus } from "@/lib/dados";

const revCfg: Record<RevStatus, { label: string; tone: "ok" | "atencao" }> = {
  "em-dia": { label: "Revisão em dia", tone: "ok" },
  proxima: { label: "Rev. próxima", tone: "atencao" },
  vencida: { label: "Rev. vencida", tone: "atencao" },
};

export default function ProntuarioPage() {
  const dados = useDados();
  const [sel, setSel] = useState(0);
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("prontuario");

  if (!dados) {
    return (
      <AppShell activeSlug="prontuario">
        <div className="p-6 text-muted-foreground">Carregando…</div>
      </AppShell>
    );
  }

  const { veiculos, agentes } = dados;
  const lista = veiculos.filter((v) => `${v.placa} ${v.marca} ${v.modelo}`.toLowerCase().includes(q.toLowerCase()));
  const v = lista[sel] ?? veiculos[0];
  const pct = Math.min(Math.round((v.km / v.proxRevisao) * 100), 100);
  const restantes = v.proxRevisao - v.km;
  const precisa = v.revStatus !== "em-dia";

  return (
    <AppShell activeSlug="prontuario">
      <div className="flex h-full">
        <aside className="flex w-80 shrink-0 flex-col border-r bg-card">
          <div className="border-b px-4 py-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold">Prontuário de Veículos</h2>
              <button className="inline-flex items-center gap-1 rounded-lg bg-primary px-2 py-1 text-xs font-medium text-primary-foreground"><Plus className="size-3.5" /> Novo</button>
            </div>
            <p className="text-xs text-muted-foreground">{veiculos.length} veículos cadastrados</p>
            <div className="relative mt-3">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input value={q} onChange={(e) => { setQ(e.target.value); setSel(0); }} placeholder="Placa, marca, modelo…" className="h-9 w-full rounded-lg border bg-background pl-8 pr-3 text-sm outline-none focus:border-ring" />
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-2">
            {lista.map((ve, i) => {
              const active = ve.placa === v.placa;
              return (
                <button key={ve.placa} onClick={() => setSel(i)} className={`mb-1.5 block w-full rounded-xl border p-3 text-left transition-colors ${active ? "border-primary/30 bg-accent" : "hover:bg-muted/50"}`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="mono rounded bg-neutral-900 px-1.5 py-0.5 text-xs font-semibold text-white">{ve.placa}</span>
                    {ve.revStatus !== "em-dia" && <Pill tone="atencao">{revCfg[ve.revStatus].label}</Pill>}
                  </div>
                  <div className="mt-1.5 text-sm font-semibold">{ve.marca} {ve.modelo} {ve.ano}</div>
                  <div className="text-xs text-muted-foreground">{ve.cor} · {ve.dono}</div>
                  <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>{fmtKm(ve.km)}</span>
                    <span>Próx.: {fmtKm(ve.proxRevisao)}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="mono rounded-md bg-neutral-900 px-2 py-1 text-sm font-semibold text-white">{v.placa}</span>
                  <h1 className="text-xl font-semibold">{v.marca} {v.modelo} {v.ano}</h1>
                  <Pill tone={revCfg[v.revStatus].tone}>{revCfg[v.revStatus].label}</Pill>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">{v.cor} · {v.motor} · {v.combustivel} · {v.dono}</p>
              </div>
              <div className="flex gap-2">
                <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"><FileText className="size-4" /> Nova OS</button>
                <Link href="/checklist" className="inline-flex items-center gap-1.5 rounded-lg border bg-card px-3 py-2 text-sm font-medium hover:bg-muted"><ClipboardCheck className="size-4" /> Checklist</Link>
                <button className="inline-flex items-center gap-1.5 rounded-lg border bg-card px-3 py-2 text-sm font-medium hover:bg-muted"><Pencil className="size-4" /> Editar</button>
              </div>
            </div>

            {/* Rita reativando (Fix14: rev. vencida acionável) */}
            {precisa && (
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-primary/20 bg-accent/60 px-3 py-2 text-sm text-accent-foreground">
                <Sparkles className="size-4 text-primary" />
                Revisão se aproximando — a <strong>{agentes.retencao}</strong> vai reativar {v.dono}.
                <Link href="/nina" className="ml-1 font-medium underline">ver</Link>
              </div>
            )}

            {/* indicadores de uso */}
            <div className="mt-4 rounded-xl border bg-card p-4">
              <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <Gauge className="size-3.5" /> Indicadores de uso
              </div>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div><div className="text-xs text-muted-foreground">KM atual</div><div className="mono text-xl font-bold">{fmtKm(v.km)}</div></div>
                <div><div className="text-xs text-muted-foreground">Próxima revisão</div><div className="mono text-xl font-bold">{fmtKm(v.proxRevisao)}</div></div>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: precisa ? "var(--warn)" : "var(--ok)" }} />
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {pct}% até a próxima revisão · {restantes > 0 ? `${restantes.toLocaleString("pt-BR")} km restantes` : "revisão vencida"}
              </div>
            </div>

            {/* tabs */}
            <div className="mt-5 flex gap-1 border-b">
              {[["prontuario", "Prontuário"], ["historico", "Histórico"], ["checklists", "Checklists"], ["fotos", "Fotos"]].map(([id, label]) => (
                <button key={id} onClick={() => setTab(id)} className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors ${tab === id ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{label}</button>
              ))}
            </div>

            <div className="pt-5">
              {tab === "prontuario" && (
                <div className="space-y-5">
                  <div>
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Identificação</div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      <Field k="Placa" v={v.placa} mono />
                      <Field k="Marca" v={v.marca} />
                      <Field k="Modelo" v={v.modelo} />
                      <Field k="Ano" v={String(v.ano)} />
                      <Field k="Cor" v={v.cor} />
                      <Field k="Proprietário" v={v.dono} />
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Dados técnicos</div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      <Field k="Motor" v={v.motor} />
                      <Field k="Combustível" v={v.combustivel} />
                      <Field k="Chassi (VIN)" v={v.chassi} mono />
                      <Field k="Renavam" v={v.renavam} mono />
                    </div>
                  </div>
                </div>
              )}
              {tab === "historico" && (
                <div className="space-y-2">
                  {["Revisão 40k — 03 Nov 2025", "Troca de óleo — 12 Ago 2025", "Alinhamento 3D — 20 Mai 2025"].map((h) => (
                    <div key={h} className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2.5 text-sm"><FileText className="size-4 text-muted-foreground" /> {h}</div>
                  ))}
                </div>
              )}
              {tab === "checklists" && (
                <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">Checklists (DVI) anteriores deste veículo.</div>
              )}
              {tab === "fotos" && (
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex aspect-square items-center justify-center rounded-lg bg-muted text-muted-foreground"><FileText className="size-5" /></div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function Field({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="rounded-xl border bg-card px-4 py-3">
      <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{k}</div>
      <div className={`mt-0.5 truncate text-sm font-medium ${mono ? "mono" : ""}`}>{v}</div>
    </div>
  );
}
