'use client';
import { useEffect, useState } from 'react';

export default function Mercados() {
    const [precios, setPrecios] = useState<any[]>([]);

    useEffect(() => {
        const fetchPrecios = async () => {
            try {
                // 1. Dólar Blue (Referencia para conversiones)
                const resDolar = await fetch('https://criptoya.com/api/dolar');
                const dataDolar = await resDolar.json();
                const blue = dataDolar.blue.ask;

                // 2. Criptos con Variación 24h (API CoinGecko)
                const resCrypto = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h');
                const dataCrypto = await resCrypto.json();

                const formatCripto = (id: string) => {
                    const c = dataCrypto.find((coin: any) => coin.id === id);
                    return {
                        label: c.symbol.toUpperCase(),
                        val: `u$s ${c.current_price.toLocaleString()}`,
                        change: c.price_change_percentage_24h
                    };
                };

                setPrecios([
                    { label: "Dólar Blue", val: `$${blue}`, change: 0.5 }, // Valor estático de ejemplo para cambio
                    formatCripto('bitcoin'),
                    formatCripto('ethereum'),
                    formatCripto('solana'),
                    { label: "Real Brasil", val: `$${Math.round(0.18 * blue)}`, change: -0.2 },
                    { label: "Sol Peruano", val: `$${Math.round(0.27 * blue)}`, change: 0 },
                    { label: "Guaraní PY", val: `$${(0.00013 * blue).toFixed(2)}`, change: 0.1 }
                ]);
            } catch (error) {
                console.error("Error cargando ticker", error);
            }
        };
        fetchPrecios();
    }, []);

    if (precios.length === 0) return null;

    const RenderItem = ({ item }: any) => {
        // Lógica de colores según cambio 24h
        let colorClass = "text-gray-400"; // Gris (Neutro)
        let flecha = "▲";
        
        if (item.change > 0) {
            colorClass = "text-green-500"; // Verde (Sube)
        } else if (item.change < 0) {
            colorClass = "text-red-500"; // Rojo (Baja)
            flecha = "▼";
        } else {
            flecha = "◀▶"; // Gris/Mantiene
        }

        return (
            <div className="flex items-center px-10">
                <span className="text-gray-500 text-[10px] font-mono uppercase mr-2">{item.label}</span>
                <span className="text-white text-sm font-bold font-mono mr-2">{item.val}</span>
                <span className={`${colorClass} text-[10px] font-bold`}>
                    {flecha} {Math.abs(item.change).toFixed(2)}%
                </span>
            </div>
        );
    };

    return (
        <div className="bg-[#0a0a0a] border-b border-gray-800 overflow-hidden py-1.5">
            <div className="flex whitespace-nowrap animate-ticker">
                {[...precios, ...precios, ...precios].map((item, i) => (
                    <RenderItem key={i} item={item} />
                ))}
            </div>

            <style jsx global>{`
                @keyframes ticker {
                    0% { transform: translateX(-50%); }
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