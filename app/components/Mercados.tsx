'use client';
import { useEffect, useState } from 'react';

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

                const formatCripto = (id: string) => {
                    const c = dataCrypto.find((coin: any) => coin.id === id);
                    return {
                        label: c ? c.symbol.toUpperCase() : id.toUpperCase(),
                        val: c ? `u$s ${c.current_price.toLocaleString()}` : "0",
                        change: c ? c.price_change_percentage_24h : 0
                    };
                };

                setPrecios([
                    { label: "Dólar Blue", val: `$${blue}`, change: 0.15 },
                    formatCripto('bitcoin'),
                    formatCripto('ethereum'),
                    formatCripto('solana'),
                    { label: "Real Brasil", val: `$${Math.round(0.18 * blue)}`, change: -0.05 },
                    { label: "Sol Peruano", val: `$${Math.round(0.27 * blue)}`, change: 0 },
                    { label: "Guaraní PY", val: `$${(0.00013 * blue).toFixed(2)}`, change: 0.10 }
                ]);
            } catch (error) {
                console.error("Error cargando ticker", error);
            }
        };
        fetchPrecios();
        const interval = setInterval(fetchPrecios, 60000);
        return () => clearInterval(interval);
    }, []);

    if (precios.length === 0) return <div className="bg-black h-12 w-full"></div>;

    return (
        <div className="bg-black w-full overflow-hidden relative h-12 flex items-center">
            <div className="flex whitespace-nowrap animate-ticker">
                {[...precios, ...precios, ...precios, ...precios].map((item, i) => {
                    const esPositivo = item.change > 0;
                    const esNegativo = item.change < 0;
                    const colorClass = esPositivo ? "text-green-500" : esNegativo ? "text-red-500" : "text-gray-400";
                    const flecha = esPositivo ? "▲" : esNegativo ? "▼" : "◀▶";

                    return (
                        <div key={i} className="flex items-center px-14 border-r border-gray-900 bg-black">
                            <span className="text-gray-500 text-[10px] font-mono uppercase mr-3 tracking-widest">{item.label}</span>
                            <span className="text-white text-sm font-bold font-mono mr-3">{item.val}</span>
                            <span className={`${colorClass} text-[11px] font-black`}>
                                {flecha} {Math.abs(item.change).toFixed(2)}%
                            </span>
                        </div>
                    );
                })}
            </div>

            <style jsx>{`
                @keyframes ticker {
                    0% { transform: translateX(-25%); }
                    100% { transform: translateX(0); }
                }
                .animate-ticker {
                    display: inline-flex;
                    animation: ticker 40s linear infinite;
                }
            `}</style>
        </div>
    );
}
