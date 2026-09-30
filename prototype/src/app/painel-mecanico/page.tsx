"use client";

import Link from "next/link";
import { ArrowLeft, Check, Play, Wrench } from "lucide-react";
import { useDados } from "@/hooks/use-dados";
import type { Atendimento } from "@/lib/dados";

const MECANICOS = ["Carlos", "Lucas", "João", "Pedro"];
const primeiro = (n: string | null) => (n ?? "").split(" ")[0];

export default function PainelMecanicoPage() {
  const dados = useDados();
  if (!dados) return <div className="dark min-h-screen bg-background p-8 text-foreground">Carregando…</div>;

  const carrosDe = (m: string) => dados.fila.filter((f) => primeiro(f.mecanico) === m);

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="flex items-center gap-3 border-b border-border px-6 py-4">
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground">U</div>
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          <Wrench className="size-4" /> Painel do Mecânico · Pátio
        </div>
        <Link href="/" className="ml-auto inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Sair
        </Link>
        <span className="mono ml-4 text-2xl font-bold tabular-nums">14:32</span>
      </div>

      <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 xl:grid-cols-4">
        {MECANICOS.map((m) => {
          const cars = carrosDe(m);
          const agora = cars.find((c) => c.etapa === "Execução") ?? cars[0];
          const fila = cars.filter((c) => c !== agora);
          return (
            <div key={m} className="rounded-2xl border border-border bg-card p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                  {m[0]}
                </span>
                <span className="text-lg font-semibold">{m}</span>
              </div>

              {agora ? (
                <>
                  <div className="mb-1 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-ok">
                    <Play className="size-3" /> Agora
                  </div>
                  <CardAgora c={agora} />
                </>
              ) : (
                <div className="rounded-xl border border-dashed border-border py-10 text-center">
                  <div className="text-sm font-semibold text-ok">• Livre</div>
                  <div className="text-xs text-muted-foreground">aguardando próximo carro</div>
                </div>
              )}

              {fila.length > 0 && (
                <div className="mt-4">
                  <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Na fila ({fila.length})
                  </div>
                  <div className="space-y-1.5">
                    {fila.map((c) => (
                      <div key={c.placa} className="flex items-center gap-2 rounded-lg bg-background px-2.5 py-1.5 text-sm">
                        <span className="mono rounded bg-white/10 px-1.5 py-0.5 text-xs font-semibold">{c.placa}</span>
                        <span className="truncate text-muted-foreground">{c.servico}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CardAgora({ c }: { c: Atendimento }) {
  return (
    <div className="rounded-xl border border-border bg-background p-3">
      <div className="flex items-center justify-between">
        <span className="mono rounded bg-white/10 px-2 py-0.5 text-sm font-bold">{c.placa}</span>
        {c.box && <span className="rounded bg-white/10 px-1.5 py-0.5 text-xs font-medium">{c.box}</span>}
      </div>
      <div className="mt-2 text-lg font-bold">{c.veiculo}</div>
      <div className="text-sm text-muted-foreground">{c.servico}</div>

      {c.tarefas.length > 0 ? (
        <div className="mt-3 space-y-1.5">
          {c.tarefas.map((t, i) => {
            const feita = t.estado === "feita";
            const atual = t.estado === "atual";
            return (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span
                  className="flex size-5 items-center justify-center rounded-full text-[10px]"
                  style={{
                    background: feita ? "var(--ok)" : atual ? "var(--primary)" : "transparent",
                    border: t.estado === "pendente" ? "1.5px solid var(--border)" : "none",
                    color: "#fff",
                  }}
                >
                  {feita ? <Check className="size-3" /> : atual ? <Play className="size-2.5" /> : ""}
                </span>
                <span className={atual ? "font-semibold" : feita ? "text-muted-foreground line-through" : "text-muted-foreground"}>
                  {t.label}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-3 rounded-lg bg-white/5 px-2.5 py-2 text-sm text-muted-foreground">
          {c.prazo}
        </div>
      )}
    </div>
  );
}
