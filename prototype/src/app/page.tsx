"use client";

import Link from "next/link";
import { ArrowRight, Smartphone, Monitor, MonitorPlay } from "lucide-react";
import { useDados } from "@/hooks/use-dados";
import { TELAS, GRUPOS, type GrupoTela, type DispositivoTela } from "@/lib/telas";

const dispIcon: Record<DispositivoTela, typeof Smartphone> = {
  mobile: Smartphone,
  desktop: Monitor,
  tv: MonitorPlay,
};

export default function Home() {
  const dados = useDados();
  const grupos = Object.keys(GRUPOS) as GrupoTela[];

  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-5xl px-6 py-14">
        {/* Cabeçalho */}
        <header className="mb-10">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground">
              U
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                UnioTorq <span className="text-muted-foreground">· Protótipo</span>
              </h1>
              <p className="text-sm text-muted-foreground">
                Sistema operacional do pós-venda automotivo
              </p>
            </div>
          </div>

          {dados && (
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
              <span className="rounded-md bg-card px-3 py-1.5 ring-1 ring-border">
                {dados.oficina.nome}
              </span>
              <span className="rounded-md bg-card px-3 py-1.5 ring-1 ring-border">
                Carro-herói:{" "}
                <span className="mono font-medium">{dados.heroi.placa}</span> ·{" "}
                {dados.heroi.veiculo}
              </span>
              <span className="rounded-md bg-accent px-3 py-1.5 text-accent-foreground">
                Cliente: {dados.heroi.cliente}
              </span>
            </div>
          )}
        </header>

        {/* Grupos de telas */}
        <div className="space-y-9">
          {grupos.map((g) => {
            const telas = TELAS.filter((t) => t.grupo === g);
            const destaque = g === "destaque";
            return (
              <section key={g}>
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {GRUPOS[g]}
                </h2>
                <div
                  className={
                    destaque
                      ? "grid grid-cols-1"
                      : "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
                  }
                >
                  {telas.map((t) => {
                    const Icon = t.icon;
                    const Disp = dispIcon[t.dispositivo];
                    const inner = (
                      <div
                        className={[
                          "group relative flex h-full flex-col rounded-xl border bg-card p-5 transition-all",
                          t.pronta
                            ? "hover:border-primary/40 hover:shadow-sm"
                            : "opacity-60",
                          destaque ? "sm:flex-row sm:items-center sm:gap-5" : "",
                        ].join(" ")}
                      >
                        <div
                          className={[
                            "flex items-center justify-center rounded-lg",
                            destaque ? "size-14" : "size-10",
                            t.pronta
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground",
                          ].join(" ")}
                        >
                          <Icon className={destaque ? "size-7" : "size-5"} />
                        </div>

                        <div className={destaque ? "mt-0 flex-1" : "mt-4 flex-1"}>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{t.titulo}</h3>
                            <Disp className="size-3.5 text-muted-foreground" />
                            {destaque && (
                              <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-medium text-primary-foreground">
                                ⭐ diferencial
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {t.descricao}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center justify-between sm:mt-0">
                          {t.pronta ? (
                            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                              Abrir <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                            </span>
                          ) : (
                            <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                              em breve
                            </span>
                          )}
                        </div>
                      </div>
                    );

                    return t.pronta ? (
                      <Link key={t.slug} href={t.href} className="block h-full">
                        {inner}
                      </Link>
                    ) : (
                      <div key={t.slug} aria-disabled className="cursor-not-allowed">
                        {inner}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        <footer className="mt-12 border-t pt-6 text-xs text-muted-foreground">
          Protótipo para clientes piloto · troque{" "}
          <code className="mono">public/dados-demo.js</code> para personalizar por
          oficina.
        </footer>
      </div>
    </div>
  );
}
