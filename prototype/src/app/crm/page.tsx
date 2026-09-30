"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Plus, MessageCircle, Pencil, FileText, Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Pill, type Tone } from "@/components/pills";
import { useDados } from "@/hooks/use-dados";
import { brl } from "@/lib/dados";
import type { Cliente } from "@/lib/dados";

const FILTROS = ["Todos", "VIP", "Recorr.", "Novo"];
const tagTone = (t: Cliente["tag"]): Tone => (t === "VIP" ? "brand" : t === "Recorrente" ? "info" : "ok");
const ini = (n: string) => n.trim().split(/\s+/).slice(0, 2).map((x) => x[0]).join("").toUpperCase();

export default function CrmPage() {
  const dados = useDados();
  const [sel, setSel] = useState(0);
  const [q, setQ] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [tab, setTab] = useState("perfil");

  if (!dados) {
    return (
      <AppShell activeSlug="crm">
        <div className="p-6 text-muted-foreground">Carregando…</div>
      </AppShell>
    );
  }

  const { clientes, agentes } = dados;
  const lista = clientes.filter((c) => {
    const okF = filtro === "Todos" || (filtro === "VIP" && c.tag === "VIP") || (filtro === "Recorr." && c.tag === "Recorrente") || (filtro === "Novo" && c.tag === "Novo");
    return okF && `${c.nome} ${c.telefone} ${c.cpf}`.toLowerCase().includes(q.toLowerCase());
  });
  const c = lista[sel] ?? clientes[0];
  const vips = clientes.filter((x) => x.tag === "VIP").length;
  const totalVeic = clientes.reduce((s, x) => s + x.veiculos.length, 0);

  return (
    <AppShell activeSlug="crm">
      <div className="flex h-full">
        {/* lista */}
        <aside className="flex w-80 shrink-0 flex-col border-r bg-card">
          <div className="border-b px-4 py-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold">CRM de Clientes</h2>
              <button className="inline-flex items-center gap-1 rounded-lg bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                <Plus className="size-3.5" /> Novo
              </button>
            </div>
            <p className="text-xs text-muted-foreground">{clientes.length} clientes · {vips} VIP · {totalVeic} veículos</p>
            <div className="relative mt-3">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input value={q} onChange={(e) => { setQ(e.target.value); setSel(0); }} placeholder="Nome, CPF, telefone…" className="h-9 w-full rounded-lg border bg-background pl-8 pr-3 text-sm outline-none focus:border-ring" />
            </div>
            <div className="mt-2 flex gap-1">
              {FILTROS.map((f) => (
                <button key={f} onClick={() => { setFiltro(f); setSel(0); }} className={`flex-1 rounded-md px-2 py-1 text-xs font-medium transition-colors ${filtro === f ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}>{f}</button>
              ))}
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-2">
            {lista.map((cl, i) => {
              const active = cl.nome === c.nome;
              return (
                <button key={cl.nome} onClick={() => setSel(i)} className={`relative mb-1.5 flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors ${active ? "border-primary/30 bg-accent" : "hover:bg-muted/50"}`}>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{ini(cl.nome)}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate text-sm font-semibold">{cl.nome}</span>
                      <Pill tone={tagTone(cl.tag)}>{cl.tag}</Pill>
                    </div>
                    <div className="text-xs text-muted-foreground">{cl.visitas} visitas · {brl(cl.totalGasto)}</div>
                    {cl.agenteAtuando && (
                      <div className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium text-primary">
                        <Sparkles className="size-3" /> {cl.agenteAtuando} atuando
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* detalhe */}
        <section className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary">{ini(c.nome)}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-semibold">{c.nome}</h1>
                    <Pill tone={tagTone(c.tag)}>{c.tag}</Pill>
                  </div>
                  <p className="text-sm text-muted-foreground">{c.telefone} · {c.email}</p>
                  <p className="text-xs text-muted-foreground">CPF {c.cpf} · {c.endereco}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"><FileText className="size-4" /> Nova OS</button>
                <Link href="/nina" className="inline-flex items-center gap-1.5 rounded-lg border bg-card px-3 py-2 text-sm font-medium hover:bg-muted"><MessageCircle className="size-4" /> WhatsApp</Link>
                <button className="inline-flex items-center gap-1.5 rounded-lg border bg-card px-3 py-2 text-sm font-medium hover:bg-muted"><Pencil className="size-4" /> Editar</button>
              </div>
            </div>

            {c.agenteAtuando && (
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-primary/20 bg-accent/60 px-3 py-2 text-sm text-accent-foreground">
                <Sparkles className="size-4 text-primary" />
                <strong>{c.agenteAtuando}</strong> (pós-venda) está reativando este cliente automaticamente.
              </div>
            )}

            {/* métricas */}
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Metric label="Visitas" v={String(c.visitas)} />
              <Metric label="Total gasto" v={brl(c.totalGasto)} mono />
              <Metric label="Ticket médio" v={brl(c.ticketMedio)} mono />
              <Metric label="Última visita" v={c.ultimaVisita} />
            </div>

            {/* tabs */}
            <div className="mt-5 flex gap-1 border-b">
              {[["perfil", "Perfil"], ["historico", `Histórico (${c.historico.length})`], ["veiculos", `Veículos (${c.veiculos.length})`]].map(([id, label]) => (
                <button key={id} onClick={() => setTab(id)} className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors ${tab === id ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{label}</button>
              ))}
            </div>

            <div className="pt-5">
              {tab === "perfil" && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field k="Nome completo" v={c.nome} />
                  <Field k="Tipo de cliente" v={c.tag} />
                  <Field k="Telefone / WhatsApp" v={c.telefone} mono />
                  <Field k="E-mail" v={c.email} />
                  <Field k="CPF" v={c.cpf} mono />
                  <Field k="CEP" v={c.cep} mono />
                  <Field k="Endereço" v={c.endereco} />
                </div>
              )}
              {tab === "historico" && (
                <div className="space-y-2">
                  {c.historico.length ? c.historico.map((h, i) => {
                    const daRita = h.startsWith(agentes.retencao);
                    return (
                      <div key={i} className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm ${daRita ? "border-primary/20 bg-accent/40" : "bg-card"}`}>
                        {daRita ? <Sparkles className="size-4 text-primary" /> : <FileText className="size-4 text-muted-foreground" />}
                        {h}
                      </div>
                    );
                  }) : <p className="text-sm text-muted-foreground">Sem histórico registrado.</p>}
                </div>
              )}
              {tab === "veiculos" && (
                <div className="space-y-2">
                  {c.veiculos.map((placa) => {
                    const v = dados.veiculos.find((x) => x.placa === placa);
                    return (
                      <Link key={placa} href="/prontuario" className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3 hover:bg-muted/40">
                        <span className="mono rounded bg-neutral-900 px-1.5 py-0.5 text-xs font-semibold text-white">{placa}</span>
                        <span className="text-sm font-medium">{v ? `${v.marca} ${v.modelo} ${v.ano}` : placa}</span>
                        {v && <span className="ml-auto text-xs text-muted-foreground">{v.km.toLocaleString("pt-BR")} km</span>}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function Metric({ label, v, mono }: { label: string; v: string; mono?: boolean }) {
  return (
    <div className="rounded-xl border bg-card px-4 py-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={`mt-0.5 text-lg font-semibold ${mono ? "mono" : ""}`}>{v}</div>
    </div>
  );
}

function Field({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="rounded-xl border bg-card px-4 py-3">
      <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{k}</div>
      <div className={`mt-0.5 text-sm font-medium ${mono ? "mono" : ""}`}>{v}</div>
    </div>
  );
}
