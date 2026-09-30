"use client";

import { AppShell } from "@/components/app-shell";
import { DeviceFrame } from "@/components/device-frame";
import { PortalCliente } from "@/components/portal-cliente";

export default function PortalPage() {
  return (
    <AppShell activeSlug="portal">
      <div className="p-6">
        <div>
          <h1 className="text-xl font-semibold">Portal do Cliente</h1>
          <p className="text-sm text-muted-foreground">Mobile Web · Sem login</p>
        </div>
        <p className="mt-8 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Cliente · Link via WhatsApp
        </p>
        <div className="mt-4">
          <DeviceFrame statusColor="#ffffff" statusText="#111827">
            <PortalCliente defaultTab="status" />
          </DeviceFrame>
        </div>
      </div>
    </AppShell>
  );
}
