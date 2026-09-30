"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, Plus, Clock, AlertTriangle, Star } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Pill, Dot, etapaTone, sevTone } from "@/components/pills";
import { useDados } from "@/hooks/use-dados";
import { brl } from "@/lib/dados";
import type { Atendimento, Severidade } from "@/lib/dados";

const COLUNAS = [
  "Recebido",
  "Inspeção",
  "Ag. Aprovação",
  "Ag. Peças",
  "Aprovado",
  "Execução",
  "Ctrl. Qualidade",
  "Finalizado",
  "Entregue",
];

const norm = (etapa: string) => (etapa === "Pronto" ? "Finalizado" : etapa);
const initials = (n: string) => n.trim().split(/\s+/).slice(0, 2).map((x) => x[0]).join("").toUpperCase();

export default function KanbanPage() {
  const dados = useDados();
  const [view, setView] = useState<"lista" | "kanban" | "agenda">("kanban");
  const [filtro, setFiltro] = useState("Todos");
  const [q, setQ] = useState("");
  const [moved, setMoved] = useState<Record<string, string>>({});
  const [dragged, setDragged] = useState<string | null>(null);

  if (!dados) {
    return (
      <AppShell activeSlug="kanban">
        <div className="p-6 text-muted-foreground">Carregando…</div>
      </AppShell>
    );
  }

  const etapaDe = (f: Atendimento) => moved[f.placa] ?? norm(f.etapa);

  const matchFiltro = (f: Atendimento) => {
    if (filtro === "Críticos") return f.severidade === "critico";
    if (filtro === "Atenção") return f.severidade === "atencao";
    if (filtro === "Entregas Atrasadas") return f.prazo.toLowerCase().includes("atrasad");
    return true;
  };
  const matchQ = (f: Atendimento) => `${f.placa} ${f.veiculo} ${f.cliente}`.toLowerCase().includes(q.toLowerCase());
  const visiveis = dados.fila.filter((f) => matchFiltro(f) && matchQ(f));

  const criticos = dados.fila.filter((f) => f.severidade === "critico").length;
  const receita = dados.fila.reduce((s, f) => s + f.valor, 0);
  const stats = [
    { n: dados.fila.length, label: "No pátio" },
    { n: dados.fila.filter((f) => etapaDe(f) === "Execução").length, label: "Em Execução", tone: "ok" as const },
    { n: dados.fila.filter((f) => etapaDe(f) === "Ag. Aprovação").length, label: "Ag. Aprovação", tone: "info" as const },
    { n: criticos, label: "Críticos", tone: "critico" as const },
  ];

  return (
    <AppShell activeSlug="kanban">
      <div className="flex h-full flex-col">
        {/* top bar */}
        <div className="flex flex-wrap items-center gap-3 border-b px-5 py-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold">Operação</h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-danger-tint px-2 py-0.5 text-xs font-medium text-danger">
                <span className="size-1.5 rounded-full bg-danger" /> {criticos} críticos
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{dados.fila.length} veículos · terça-feira, 14 de julho</p>
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-2">
            <div className="flex rounded-lg border bg-card p-0.5">
              {(["lista", "kanban", "agenda"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                    view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Placa, cliente…"
                className="h-9 w-48 rounded-lg border bg-background pl-8 pr-3 text-sm outline-none focus:border-ring"
              />
            </div>
            <button className="inline-flex items-center gap-1.5 rounded-lg border bg-card px-3 py-2 text-sm font-medium hover:bg-muted">
              <SlidersHorizontal className="size-4" /> Filtros
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
              <Plus className="size-4" /> Novo Atendimento
            </button>
          </div>
        </div>

        {/* stats bar */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b bg-card px-5 py-2.5">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-1.5 text-sm">
              <span className="text-base font-bold" style={s.tone ? { color: `var(--${s.tone === "critico" ? "danger" : s.tone === "info" ? "info" : "ok"})` } : undefined}>{s.n}</span>
              <span className="text-muted-foreground">{s.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 text-sm">
            <span className="mono text-base font-bold text-primary">{brl(receita)}</span>
            <span className="text-muted-foreground">Receita est.</span>
          </div>
          <div className="ml-auto flex gap-1">
            {["Todos", "Críticos", "Atenção", "Entregas Atrasadas"].map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                  filtro === f ? "bg-primary/10 text-primary" : "border text-muted-foreground hover:bg-muted"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* conteúdo */}
        <div className="min-h-0 flex-1 overflow-auto p-4">
          {view === "kanban" && (
            <div className="flex h-full gap-3">
              {COLUNAS.map((col) => {
                const cards = visiveis.filter((f) => etapaDe(f) === col);
                const totalCol = cards.reduce((s, f) => s + f.valor, 0);
                return (
                  <div
                    key={col}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      if (dragged) setMoved((m) => ({ ...m, [dragged]: col }));
                      setDragged(null);
                    }}
                    className="flex w-72 shrink-0 flex-col rounded-xl bg-muted/40"
                  >
                    <div className="flex items-center justify-between border-b px-3 py-2.5">
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        {col}
                        <span className="rounded-full bg-card px-1.5 text-xs text-muted-foreground">{cards.length}</span>
                      </div>
                      <span className="mono text-xs font-medium text-muted-foreground">{brl(totalCol)}</span>
                    </div>
                    <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-2">
                      {cards.map((f) => (
                        <KanbanCard key={f.placa} f={f} onDragStart={() => setDragged(f.placa)} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {view === "lista" && (
            <div className="overflow-hidden rounded-xl border bg-card">
              <table className="w-full text-sm">
                <thead className="border-b bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2.5 font-medium">Placa</th>
                    <th className="px-4 py-2.5 font-medium">Veículo</th>
                    <th className="px-4 py-2.5 font-medium">Cliente</th>
                    <th className="px-4 py-2.5 font-medium">Etapa</th>
                    <th className="px-4 py-2.5 font-medium">Mecânico</th>
                    <th className="px-4 py-2.5 text-right font-medium">Valor</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {visiveis.map((f) => (
                    <tr key={f.placa} className="hover:bg-muted/40">
                      <td className="px-4 py-2.5">
                        <span className="mono rounded bg-neutral-900 px-1.5 py-0.5 text-xs font-semibold text-white">{f.placa}</span>
                      </td>
                      <td className="px-4 py-2.5 font-medium">{f.veiculo}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{f.cliente}</td>
                      <td className="px-4 py-2.5"><Pill tone={etapaTone(etapaDe(f))}>{etapaDe(f)}</Pill></td>
                      <td className="px-4 py-2.5 text-muted-foreground">{f.mecanico ?? "—"}</td>
                      <td className="mono px-4 py-2.5 text-right font-medium">{brl(f.valor)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {view === "agenda" && (
            <div className="mx-auto max-w-2xl space-y-2">
              <p className="mb-2 text-sm text-muted-foreground">Agenda do dia — entradas e previsões de entrega</p>
              {["08:30", "09:05", "10:00", "11:30", "13:00", "15:00", "16:00"].map((h, i) => {
                const f = dados.fila[i];
                return (
                  <div key={h} className="flex items-center gap-4 rounded-xl border bg-card px-4 py-3">
                    <span className="mono w-14 text-sm font-semibold text-muted-foreground">{h}</span>
                    {f ? (
                      <>
                        <Dot tone={sevTone(f.severidade)} />
                        <span className="mono text-sm font-medium">{f.placa}</span>
                        <span className="text-sm">{f.veiculo}</span>
                        <span className="text-sm text-muted-foreground">{f.cliente}</span>
                        {f.heroi && (
                          <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            agendado pela Nina
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-sm text-muted-foreground/60">livre</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function KanbanCard({ f, onDragStart }: { f: Atendimento; onDragStart: () => void }) {
  const badge: Record<Severidade, string> = { ok: "OK", atencao: "Atenção", critico: "Crítico" };
  const atrasado = f.prazo.toLowerCase().includes("atrasad");
  const pctMatch = f.prazo.match(/(\d+)%/);

  return (
    <Link
      href="/hub"
      draggable
      onDragStart={onDragStart}
      className="block cursor-grab rounded-xl border bg-card p-3 shadow-sm transition-shadow hover:shadow active:cursor-grabbing"
    >
      <div className="flex items-center justify-between">
        <span className="mono rounded bg-neutral-900 px-1.5 py-0.5 text-xs font-semibold text-white">{f.placa}</span>
        <span className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: `var(--${f.severidade === "critico" ? "danger" : f.severidade === "atencao" ? "warn" : "ok"})` }}>
          <Dot tone={sevTone(f.severidade)} /> {badge[f.severidade]}
        </span>
      </div>
      <div className="mt-2 text-sm font-semibold">{f.veiculo}</div>
      <div className="text-xs text-muted-foreground">{f.cliente}</div>
      <div className="mt-2 rounded-md border bg-muted/30 px-2 py-1 text-xs">{f.servico}</div>

      <div className="mt-2 flex flex-wrap gap-1">
        {!f.mecanico && <Tag>Sem técnico</Tag>}
        {f.prazo.toLowerCase().includes("priorit") && <Tag icon={<Star className="size-3" />} tone="brand">Prioritário</Tag>}
        {f.etapa === "Ag. Peças" && <Tag tone="warn">Ag. Peças</Tag>}
        {atrasado && <Tag icon={<AlertTriangle className="size-3" />} tone="danger">Entrega Atrasada</Tag>}
      </div>

      {pctMatch && (
        <div className="mt-2">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wide text-muted-foreground">
            <span>Prazo</span>
            <span>{f.prazo.replace(/^.*?(\d+% · )/, "$1")}</span>
          </div>
          <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full" style={{ width: `${pctMatch[1]}%`, background: atrasado ? "var(--danger)" : "var(--primary)" }} />
          </div>
        </div>
      )}

      {(f.parado || atrasado) && (
        <div className="mt-2 rounded-md px-2 py-1 text-[11px]" style={{ background: "var(--warn-tint)", color: "#a15c07" }}>
          <Clock className="mr-1 inline size-3" /> {f.prazo}
        </div>
      )}

      <div className="mt-2 flex items-center gap-2 border-t pt-2 text-xs">
        {f.mecanico ? (
          <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
            {initials(f.mecanico)}
          </span>
        ) : (
          <span className="flex size-6 items-center justify-center rounded-full bg-muted text-[10px] text-muted-foreground">—</span>
        )}
        <span className="text-muted-foreground">{(f.mecanico ?? "").split(" ")[0]}</span>
        {f.box && <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium">{f.box}</span>}
        <span className="mono ml-auto font-semibold">{brl(f.valor)}</span>
      </div>
    </Link>
  );
}

function Tag({ children, icon, tone = "neutral" }: { children: React.ReactNode; icon?: React.ReactNode; tone?: "neutral" | "brand" | "warn" | "danger" }) {
  const styles: Record<string, string> = {
    neutral: "bg-muted text-muted-foreground",
    brand: "text-primary",
    warn: "text-warn",
    danger: "text-danger",
  };
  const border = tone === "neutral" ? "" : "border";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${styles[tone]} ${border}`}>
      {icon}
      {children}
    </span>
  );
}
