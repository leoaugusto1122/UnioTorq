"use client";

import { AppShell } from "@/components/app-shell";
import { DeviceFrame } from "@/components/device-frame";
import { PortalCliente } from "@/components/portal-cliente";

export default function AprovacaoPage() {
  return (
    <AppShell activeSlug="aprovacao">
      <div className="p-6">
        <div>
          <h1 className="text-xl font-semibold">Aprovação Digital</h1>
          <p className="text-sm text-muted-foreground">Diagnóstico inteligente · Link WhatsApp</p>
        </div>
        <p className="mt-8 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Cliente · Aprovação Digital Inteligente
        </p>
        <div className="mt-4">
          <DeviceFrame statusColor="#ffffff" statusText="#111827">
            <PortalCliente defaultTab="aprovacao" />
          </DeviceFrame>
        </div>
      </div>
    </AppShell>
  );
}
