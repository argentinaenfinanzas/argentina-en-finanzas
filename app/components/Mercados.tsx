"use client";

import { useEffect, useState } from "react";

type Precio = {
  label: string;
  val: string;
  change: number;
};

const fallbackPrecios: Precio[] = [
  { label: "Dólar Blue", val: "N/D", change: 0 },
  { label: "BTC", val: "N/D", change: 0 },
  { label: "ETH", val: "N/D", change: 0 },
  { label: "SOL", val: "N/D", change: 0 },
  { label: "Real Brasil", val: "N/D", change: 0 },
  { label: "Sol Peruano", val: "N/D", change: 0 },
];

export default function Mercados() {
  const [precios, setPrecios] = useState<Precio[]>(fallbackPrecios);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrecios = async () => {
      try {
        const res = await fetch("/api/mercados", { cache: "no-store" });
        if (!res.ok) {
          throw new Error("Respuesta inválida del endpoint interno");
        }
        const data = (await res.json()) as { precios?: Precio[] };
        if (data?.precios?.length) {
          setPrecios(data.precios);
        }
      } catch (error) {
        console.error(error);
        setPrecios(fallbackPrecios);
      } finally {
        setLoading(false);
      }
    };

    fetchPrecios();
  }, []);

  return (
    <div className="markets-ticker" aria-live="polite">
      <div className="markets-track">
        {[...precios, ...precios, ...precios].map((item, i) => {
          const color =
            item.change > 0
              ? "market-change up"
              : item.change < 0
                ? "market-change down"
                : "market-change flat";
          return (
            <div key={`${item.label}-${i}`} className="market-item">
              <span className="market-label">{item.label}</span>
              <span className="market-value">{item.val}</span>
              <span className={color}>
                {item.change > 0 ? "▲" : item.change < 0 ? "▼" : "•"} {Math.abs(item.change).toFixed(2)}%
              </span>
            </div>
          );
        })}
        {loading && (
          <div className="market-item">
            <span className="market-label">Mercado</span>
            <span className="market-value">Cargando...</span>
            <span className="market-change flat">• 0.00%</span>
          </div>
        )}
      </div>
    </div>
  );
}

