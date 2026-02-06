'use client';
import { useEffect, useState } from 'react';

type Precio = {
  label: string;
  val: string;
  change: number;
};

const fallbackPrecios: Precio[] = [
  { label: 'Dólar Blue', val: 'N/D', change: 0 },
  { label: 'BTC', val: 'N/D', change: 0 },
  { label: 'ETH', val: 'N/D', change: 0 },
  { label: 'SOL', val: 'N/D', change: 0 },
  { label: 'Real Brasil', val: 'N/D', change: 0 },
  { label: 'Sol Peruano', val: 'N/D', change: 0 },
];

export default function Mercados() {
    const [precios, setPrecios] = useState<any[]>([]);

    useEffect(() => {
        const fetchPrecios = async () => {
            try {
                const resDolar = await fetch('https://criptoya.com/api/dolar');
                const dataDolar = await resDolar.json();
                const blue = dataDolar.blue.ask;
                
                const resCrypto = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana&price_change_percentage=24h');
                const dataCrypto = await resCrypto.json();

                const format = (id: string) => {
                    const c = dataCrypto.find((coin: any) => coin.id === id);
                    return { 
                        label: c ? c.symbol.toUpperCase() : id.toUpperCase(), 
                        val: c ? `u$s ${c.current_price.toLocaleString()}` : "0", 
                        change: c ? c.price_change_percentage_24h : 0 
                    };
                };

                setPrecios([
                    { label: "Dólar Blue", val: `$${blue}`, change: 0.25 },
                    format('bitcoin'), format('ethereum'), format('solana'),
                    { label: "Real Brasil", val: `$${Math.round(0.18 * blue)}`, change: -0.15 },
                    { label: "Sol Peruano", val: `$${Math.round(0.27 * blue)}`, change: 0 }
                ]);
            } catch (e) { console.error(e); }
  const [precios, setPrecios] = useState<Precio[]>([]);

  useEffect(() => {
    const fetchPrecios = async () => {
      try {
        const resDolar = await fetch('https://criptoya.com/api/dolar');
        if (!resDolar.ok) {
          throw new Error('Respuesta inválida al consultar el dólar');
        }
        const dataDolar = await resDolar.json();
        const blue = Number(dataDolar?.blue?.ask ?? 0);

        const resCrypto = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana&price_change_percentage=24h'
        );
        if (!resCrypto.ok) {
          throw new Error('Respuesta inválida al consultar criptomonedas');
        }
        const dataCrypto = await resCrypto.json();

        const format = (id: string): Precio => {
          const c = dataCrypto.find((coin: { id: string }) => coin.id === id);
          const currentPrice = c?.current_price;
          const change = c?.price_change_percentage_24h;
          return {
            label: c ? c.symbol.toUpperCase() : id.toUpperCase(),
            val:
              typeof currentPrice === 'number'
                ? `US$ ${currentPrice.toLocaleString()}`
                : 'N/D',
            change: typeof change === 'number' ? change : 0,
          };
        };
        fetchPrecios();
    }, []);

    if (precios.length === 0) return null;

    return (
        <div className="w-full bg-[#000000] border-y border-gray-800 h-[45px] flex items-center overflow-hidden z-[999] relative shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="flex whitespace-nowrap animate-ticker">
                {[...precios, ...precios, ...precios].map((item, i) => {
                    const color = item.change > 0 ? "text-green-500" : item.change < 0 ? "text-red-500" : "text-gray-400";
                    return (
                        <div key={i} className="flex items-center px-16 border-r border-gray-900 bg-[#000000]">
                            <span className="text-gray-500 text-[10px] font-mono uppercase mr-3">{item.label}</span>
                            <span className="text-white text-sm font-bold font-mono mr-3">{item.val}</span>
                            <span className={`${color} text-[11px] font-black`}>
                                {item.change > 0 ? "▲" : item.change < 0 ? "▼" : "◀▶"} {Math.abs(item.change).toFixed(2)}%
                            </span>
                        </div>
                    );
                })}

        if (!blue) {
          throw new Error('Datos incompletos para el dólar blue');
        }

        setPrecios([
          { label: 'Dólar Blue', val: `$${blue}`, change: 0.25 },
          format('bitcoin'),
          format('ethereum'),
          format('solana'),
          { label: 'Real Brasil', val: `$${Math.round(0.18 * blue)}`, change: -0.15 },
          { label: 'Sol Peruano', val: `$${Math.round(0.27 * blue)}`, change: 0 },
        ]);
      } catch (e) {
        console.error(e);
        setPrecios(fallbackPrecios);
      }
    };
    fetchPrecios();
  }, []);

  if (precios.length === 0) return null;

  return (
    <div className="w-full bg-[#000000] border-y border-gray-800 h-[45px] flex items-center overflow-hidden z-[999] relative shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <div className="flex whitespace-nowrap animate-ticker">
        {[...precios, ...precios, ...precios].map((item, i) => {
          const color =
            item.change > 0
              ? 'text-green-500'
              : item.change < 0
                ? 'text-red-500'
                : 'text-gray-400';
          return (
            <div key={i} className="flex items-center px-16 border-r border-gray-900 bg-[#000000]">
              <span className="text-gray-500 text-[10px] font-mono uppercase mr-3">{item.label}</span>
              <span className="text-white text-sm font-bold font-mono mr-3">{item.val}</span>
              <span className={`${color} text-[11px] font-black`}>
                {item.change > 0 ? '▲' : item.change < 0 ? '▼' : '◀▶'}{' '}
                {Math.abs(item.change).toFixed(2)}%
              </span>
            </div>
        </div>
    );
}
          );
        })}
      </div>
    </div>
  );
}
