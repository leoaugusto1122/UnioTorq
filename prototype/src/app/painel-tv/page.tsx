"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Image as ImageIcon, CheckCircle2, TriangleAlert } from "lucide-react";
import { useDados } from "@/hooks/use-dados";

export default function PainelTvPage() {
  const dados = useDados();
  const [slide, setSlide] = useState(0);
  const [alerta, setAlerta] = useState(false);

  const slides = dados?.orcamento ?? [];
  const prontos = dados?.fila.filter((f) => f.pronto) ?? [];

  useEffect(() => {
    if (!slides.length) return;
    const t1 = setInterval(() => setSlide((s) => (s + 1) % slides.length), 6000);
    let hide: ReturnType<typeof setTimeout>;
    const t2 = setInterval(() => {
      if (prontos.length) {
        setAlerta(true);
        hide = setTimeout(() => setAlerta(false), 8000);
      }
    }, 22000);
    return () => {
      clearInterval(t1);
      clearInterval(t2);
      clearTimeout(hide);
    };
  }, [slides.length, prontos.length]);

  if (!dados) return <div className="dark min-h-screen bg-background p-8 text-foreground">Carregando…</div>;

  const etapaCor = (e: string) =>
    e.includes("Execu") ? "var(--brand)" : e.includes("Aprova") ? "var(--info)" : e.includes("Peças") ? "var(--warn)" : e.includes("Pronto") ? "var(--ok)" : "var(--muted-foreground)";
  const slideAtual = slides[slide];
  const alvo = prontos[0];

  return (
    <div className="dark relative min-h-screen bg-background text-foreground">
      {/* header */}
      <div className="flex items-center gap-3 border-b border-border px-8 py-5">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground">U</div>
        <span className="text-lg font-semibold">{dados.oficina.nome}</span>
        <Link href="/" className="ml-auto inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Sair
        </Link>
        <span className="mono ml-4 text-2xl font-bold tabular-nums">14:32</span>
      </div>

      <div className="grid grid-cols-1 gap-6 p-8 lg:grid-cols-2">
        {/* status list */}
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Seu veículo em tempo real</h2>
          <div className="space-y-3">
            {dados.fila.slice(0, 7).map((f) => (
              <div key={f.placa} className="flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4">
                <span className="mono rounded-lg bg-white/10 px-3 py-1.5 text-lg font-bold tracking-wide">{f.placa}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-lg font-semibold">{f.veiculo}</div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full" style={{ width: `${f.progresso}%`, background: etapaCor(f.etapa) }} />
                  </div>
                </div>
                <span className="shrink-0 text-sm font-semibold" style={{ color: etapaCor(f.etapa) }}>{f.etapa}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Dados anonimizados — sem nome do cliente (LGPD).</p>
        </div>

        {/* carrossel */}
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Vale a pena olhar</h2>
          {slideAtual && (
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="flex aspect-video items-center justify-center bg-white/5 text-muted-foreground">
                <ImageIcon className="size-16" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2">
                  <TriangleAlert className="size-5" style={{ color: slideAtual.severidade === "critico" ? "var(--danger)" : "var(--warn)" }} />
                  <span className="text-xl font-bold">{slideAtual.item}</span>
                </div>
                <p className="mt-2 text-lg leading-snug text-muted-foreground">
                  <span className="font-semibold text-foreground">Se não trocar:</span> {slideAtual.consequencia}
                </p>
                <div className="mt-4 flex gap-1.5">
                  {slides.map((_, i) => (
                    <span key={i} className="size-2 rounded-full" style={{ background: i === slide ? "var(--primary)" : "var(--border)" }} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* alerta de retirada (takeover) */}
      {alerta && alvo && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-background/98 backdrop-blur">
          <div className="inline-flex items-center gap-2 text-2xl font-semibold text-ok">
            <CheckCircle2 className="size-8" /> PRONTO PARA RETIRADA
          </div>
          <div className="mono rounded-3xl border-4 border-ok px-12 py-6 text-7xl font-bold tracking-widest">{alvo.placa}</div>
          <div className="text-2xl text-muted-foreground">{alvo.veiculo}</div>
          <div className="text-lg text-muted-foreground">Dirija-se à recepção, por favor</div>
        </div>
      )}
    </div>
  );
}
