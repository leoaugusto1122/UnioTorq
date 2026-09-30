"use client";

import { useEffect, useState } from "react";
import type { Dados } from "@/lib/dados";

/**
 * Lê a "verdade" única carregada por /dados-demo.js (window.DADOS_DEMO).
 * O script é beforeInteractive, então já está disponível na montagem do cliente.
 * Retorna null no 1º render do servidor (evita hydration mismatch).
 */
export function useDados(): Dados | null {
  const [dados, setDados] = useState<Dados | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.DADOS_DEMO) {
      setDados(window.DADOS_DEMO);
    }
  }, []);

  return dados;
}
