"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  CircleAlert,
  ChevronRight,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Pill } from "@/components/pills";
import { useDados } from "@/hooks/use-dados";
import { brl } from "@/lib/dados";

const FATURAMENTO_7D = [3200, 4100, 3800, 5200, 4600, 6100, 4820];
const PERIODOS = ["Hoje", "Semana", "Mês"];

export default function DashboardPage() {
  const dados = useDados();
  const [tab, setTab] = useState("geral");
  const [periodo, setPeriodo] = useState("Hoje");
  const [verRecusados, setVerRecusados] = useState(false);

  if (!dados) {
    return (
      <AppShell activeSlug="dashboard">
        <div className="p-6 text-muted-foreground">Carregando…</div>
      </AppShell>
    );
  }

  const d = dados.dashboard;
  const pct = (v: number) => `${Math.round(v * 100)}%`;

  return (
    <AppShell activeSlug="dashboard">
      <div className="mx-auto max-w-5xl p-6">
        {/* header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold">Dashboard Gerencial</h1>
            <p className="text-sm text-muted-foreground">Visão executiva · 14 jul 2026</p>
          </div>
          <div className="flex rounded-lg border bg-card p-0.5">
            {PERIODOS.map((p) => (
              <button
                key={p}
                onClick={() => setPeriodo(p)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  periodo === p ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* tabs */}
        <div className="mt-5 flex gap-1 border-b">
          {["Visão Geral", "Equipe", "Faturamento"].map((t, i) => {
            const id = ["geral", "equipe", "faturamento"][i];
            const on = tab === id;
            return (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                  on ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* VISÃO GERAL */}
        {tab === "geral" && (
          <div className="mt-5 space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Kpi label="Veículos Recebidos" valor={String(d.hoje.recebidos)} delta={`+${d.hoje.recebidosVsOntem} vs ontem`} up />
              <Kpi label="Veículos Entregues" valor={String(d.hoje.entregues)} meta={`meta: ${d.hoje.entreguesMeta}`} progresso={d.hoje.entregues / d.hoje.entreguesMeta} />
              <Kpi label="Faturamento" valor={brl(d.hoje.faturamento)} delta={`+${pct(d.hoje.faturamentoVsOntem)} vs ontem`} up />
              <Kpi label="Ticket Médio" valor={brl(d.hoje.ticketMedio)} meta={`meta: ${brl(d.hoje.ticketMeta)}`} progresso={d.hoje.ticketMedio / d.hoje.ticketMeta} />
            </div>

            {/* Operação */}
            <Secao titulo="Operação">
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <MiniCard n={d.operacao.emExecucao} label="Em Execução" sub="2 mecânicos ativos" tone="ok" />
                <MiniCard n={d.operacao.agAprovacao} label="Ag. Aprovação" sub="2h+ sem resposta" tone="warn" />
                <MiniCard n={d.operacao.agPecas} label="Ag. Peças" sub="1 fornecedor atrasado" tone="warn" />
                <MiniCard n={d.operacao.veiculosParados} label="Veículos Parados" sub="ação necessária" tone="danger" />
              </div>
            </Secao>

            {/* Comercial / funil */}
            <Secao titulo="Comercial">
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <div className="rounded-xl border bg-card p-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="mono text-lg font-bold">{brl(d.comercial.orcado)}</div>
                      <div className="text-xs text-muted-foreground">Orçado</div>
                    </div>
                    <div>
                      <div className="mono text-lg font-bold text-ok">{brl(d.comercial.aprovado)}</div>
                      <div className="text-xs text-muted-foreground">Aprovado</div>
                    </div>
                    <div>
                      <div className="mono text-lg font-bold">{pct(d.comercial.conversao)}</div>
                      <div className="text-xs text-muted-foreground">Conversão (meta {pct(d.comercial.conversaoMeta)})</div>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border bg-card p-4">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Funil de aprovação</div>
                  <FunilLinha label="Orçado" valor={d.comercial.orcado} max={d.comercial.orcado} tone="var(--muted-foreground)" />
                  <FunilLinha label="Aprovado" valor={d.comercial.aprovado} max={d.comercial.orcado} tone="var(--ok)" />
                  <button onClick={() => setVerRecusados((v) => !v)} className="mt-1 w-full text-left">
                    <FunilLinha label="Recusado" valor={d.comercial.recusado} max={d.comercial.orcado} tone="var(--warn)" clicavel />
                  </button>
                  {verRecusados && (
                    <div className="mt-2 space-y-1 rounded-lg bg-muted p-2 text-xs">
                      <div className="font-medium text-muted-foreground">Serviços recusados</div>
                      {d.servicosRecusados.map((s, i) => (
                        <div key={i} className="flex justify-between">
                          <span>{s.item} · {s.veiculo}</span>
                          <span className="mono">{brl(s.valor)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Secao>

            {/* Produtividade + OS por status */}
            <Secao titulo="Produtividade">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border bg-card p-4">
                  <div className="text-xs text-muted-foreground">Mecânico mais produtivo</div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">CF</span>
                    <div>
                      <div className="text-sm font-semibold">Carlos Ferreira</div>
                      <div className="text-xs text-muted-foreground">3 OS · 4h 32min</div>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border bg-card p-4">
                  <div className="text-xs text-muted-foreground">Tempo médio de execução</div>
                  <div className="mono mt-1 text-2xl font-bold">{d.produtividade.tempoMedioExecucao}</div>
                </div>
                <div className="rounded-xl border bg-card p-4">
                  <div className="text-xs text-muted-foreground">Taxa de aprovação</div>
                  <div className="mt-1 text-2xl font-bold text-ok">{pct(d.produtividade.taxaAprovacao)}</div>
                  <div className="text-xs text-muted-foreground">meta {pct(d.produtividade.taxaMeta)}</div>
                </div>
              </div>
              <div className="mt-3 rounded-xl border bg-card p-4">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">OS por status</div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(d.osPorStatus).map(([k, v]) => (
                    <span key={k} className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-sm">
                      {k} <span className="font-semibold">{v}</span>
                    </span>
                  ))}
                </div>
              </div>
            </Secao>
          </div>
        )}

        {/* EQUIPE */}
        {tab === "equipe" && (
          <div className="mt-5 space-y-3">
            {d.equipe.map((m) => {
              const critico = m.carga >= 0.85;
              return (
                <div key={m.nome} className="rounded-xl border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {m.nome.split(" ").map((x) => x[0]).join("")}
                    </span>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{m.nome} <span className="font-normal text-muted-foreground">· {m.nivel}</span></div>
                      <div className="text-xs text-muted-foreground">{m.horas}h / {m.capacidade}h · {m.os} OS</div>
                    </div>
                    {/* Fix14 #3: carga alta = âmbar, não vermelho */}
                    <Pill tone={critico ? "atencao" : "ok"}>{critico ? "Carga alta" : "Disponível"}</Pill>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full" style={{ width: pct(m.carga), background: critico ? "var(--warn)" : "var(--ok)" }} />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">{pct(m.carga)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* FATURAMENTO */}
        {tab === "faturamento" && (
          <div className="mt-5">
            <div className="rounded-xl border bg-card p-5">
              <div className="mb-4 flex items-baseline justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">Faturamento · últimos 7 dias</div>
                  <div className="mono text-2xl font-bold">{brl(FATURAMENTO_7D.reduce((a, b) => a + b, 0))}</div>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-ok"><TrendingUp className="size-4" /> +18%</span>
              </div>
              <div className="flex h-40 items-end gap-3">
                {FATURAMENTO_7D.map((v, i) => {
                  const max = Math.max(...FATURAMENTO_7D);
                  return (
                    <div key={i} className="flex flex-1 flex-col items-center gap-1">
                      <div className="w-full rounded-t-md" style={{ height: `${(v / max) * 100}%`, background: i === 6 ? "var(--primary)" : "var(--brand-tint)" }} />
                      <span className="text-[10px] text-muted-foreground">{["S", "T", "Q", "Q", "S", "S", "D"][i]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

function Kpi({ label, valor, delta, up, meta, progresso }: { label: string; valor: string; delta?: string; up?: boolean; meta?: string; progresso?: number }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mono mt-1 text-2xl font-bold">{valor}</div>
      {delta && (
        <div className={`mt-1 inline-flex items-center gap-1 text-xs font-medium ${up ? "text-ok" : "text-danger"}`}>
          {up ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />} {delta}
        </div>
      )}
      {meta && (
        <>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min((progresso ?? 0) * 100, 100)}%` }} />
          </div>
          <div className="mt-1 text-xs text-muted-foreground">{meta}</div>
        </>
      )}
    </div>
  );
}

function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{titulo}</h2>
      {children}
    </div>
  );
}

function MiniCard({ n, label, sub, tone }: { n: number; label: string; sub: string; tone: "ok" | "warn" | "danger" }) {
  const cor = tone === "ok" ? "var(--ok)" : tone === "warn" ? "var(--warn)" : "var(--danger)";
  const Icon = tone === "danger" ? CircleAlert : tone === "warn" ? Clock : TrendingUp;
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold">{n}</span>
        <Icon className="size-4" style={{ color: cor }} />
      </div>
      <div className="mt-1 text-sm font-medium">{label}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}

function FunilLinha({ label, valor, max, tone, clicavel }: { label: string; valor: number; max: number; tone: string; clicavel?: boolean }) {
  return (
    <div className="py-1">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1 text-muted-foreground">{label}{clicavel && <ChevronRight className="size-3.5" />}</span>
        <span className="mono font-medium">{brl(valor)}</span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full" style={{ width: `${(valor / max) * 100}%`, background: tone }} />
      </div>
    </div>
  );
}
