'use client';
import { useEffect, useState } from 'react';

export default function Mercados() {
    const [precios, setPrecios] = useState<any[]>([]);

    useEffect(() => {
        const fetchPrecios = async () => {
            try {
                // 1. Dólar Blue (CriptoYa)
                const resDolar = await fetch('https://criptoya.com/api/dolar');
                const dataDolar = await resDolar.json();
                const blue = dataDolar.blue.ask;

                // 2. Criptos con Variación 24h (CoinGecko)
                const resCrypto = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana&price_change_percentage=24h');
                const dataCrypto = await resCrypto.json();

                const formatCripto = (id: string) => {
                    const c = dataCrypto.find((coin: any) => coin.id === id);
                    return {
                        label: c.symbol.toUpperCase(),
                        val: `u$s ${c.current_price.toLocaleString()}`,
                        change: c.price_change_percentage_24h
                    };
                };

                // Armamos la lista final
                setPrecios([
                    { label: "Dólar Blue", val: `$${blue}`, change: 0.25 },
                    formatCripto('bitcoin'),
                    formatCripto('ethereum'),
                    formatCripto('solana'),
                    { label: "Real Brasil", val: `$${Math.round(0.18 * blue)}`, change: -0.15 },
                    { label: "Sol Peruano", val: `$${Math.round(0.27 * blue)}`, change: 0 },
                    { label: "Guaraní PY", val: `$${(0.00013 * blue).toFixed(2)}`, change: 0.05 }
                ]);
            } catch (error) {
                console.error("Error cargando ticker", error);
            }
        };
        fetchPrecios();
        const interval = setInterval(fetchPrecios, 60000); // Actualiza cada 1 min
        return () => clearInterval(interval);
    }, []);

    if (precios.length === 0) return null;

    const RenderItem = ({ item }: any) => {
        const esPositivo = item.change > 0;
        const esNegativo = item.change < 0;
        let colorClass = "text-gray-400"; // Gris si es 0
        let flecha = "◀▶";

        if (esPositivo) {
            colorClass = "text-green-500";
            flecha = "▲";
        } else if (esNegativo) {
            colorClass = "text-red-500";
            flecha = "▼";
        }

        return (
            <div className="flex items-center px-16 border-r border-gray-900 h-full">
                <span className="text-gray-500 text-[10px] font-mono uppercase mr-3 tracking-[2px]">{item.label}</span>
                <span className="text-white text-sm font-bold font-mono mr-3">{item.val}</span>
                <span className={`${colorClass} text-[11px] font-black flex items-center gap-1`}>
                    {flecha} {Math.abs(item.change).toFixed(2)}%
                </span>
            </div>
        );
    };

    return (
        <div className="bg-[#0a0a0a] border-y border-gray-800 overflow-hidden py-2.5 relative shadow-2xl">
            {/* El ticker fluye de izquierda a derecha como pediste */}
            <div className="flex whitespace-nowrap animate-ticker">
                {[...precios, ...precios, ...precios].map((item, i) => (
                    <RenderItem key={i} item={item} />
                ))}
            </div>

            <style jsx global>{`
                @keyframes ticker {
                    0% { transform: translateX(-33.33%); }
                    100% { transform: translateX(0); }
                }
                .animate-ticker {
                    display: inline-flex;
                    animation: ticker 50s linear infinite;
                }
                /* Pausar al pasar el mouse para facilitar