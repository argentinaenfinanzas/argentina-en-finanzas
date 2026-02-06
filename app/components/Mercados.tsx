'use client';
import { useEffect, useState } from 'react';

export default function Mercados() {
    const [precios, setPrecios] = useState<any>(null);

    useEffect(() => {
        const fetchPrecios = async () => {
            try {
                const resDolar = await fetch('https://criptoya.com/api/dolar');
                const dataDolar = await resDolar.json();
                const blue = dataDolar.blue.ask;

                const resCrypto = await fetch('https://api.binance.com/api/v3/ticker/price?symbols=["BTCUSDT","ETHUSDT","SOLUSDT"]');
                const dataCrypto = await resCrypto.json();

                setPrecios([
                    { label: "Dólar Blue", val: `$${blue}` },
                    { label: "Bitcoin", val: `u$s ${parseFloat(dataCrypto.find((c: any) => c.symbol === "BTCUSDT").price).toLocaleString()}` },
                    { label: "Ethereum", val: `u$s ${parseFloat(dataCrypto.find((c: any) => c.symbol === "ETHUSDT").price).toLocaleString()}` },
                    { label: "Solana", val: `u$s ${parseFloat(dataCrypto.find((c: any) => c.symbol === "SOLUSDT").price).toLocaleString()}` },
                    { label: "Real Brasil", val: `$${Math.round(0.18 * blue)}` },
                    { label: "Sol Peruano", val: `$${Math.round(0.27 * blue)}` },
                    { label: "Guaraní PY", val: `$${(0.00013 * blue).toFixed(2)}` }
                ]);
            } catch (error) {
                console.error("Error", error);
            }
        };
        fetchPrecios();
    }, []);

    if (!precios) return null;

    return (
        <div className="bg-black border-y border-gray-800 overflow-hidden py-2">
            <div className="flex whitespace-nowrap animate-marquee">
                {/* Repetimos la lista para que el loop sea infinito y fluido */}
                {[...precios, ...precios].map((item, i) => (
                    <div key={i} className="flex items-center px-8">
                        <span className="text-gray-400 text-[11px] font-mono uppercase tracking-tighter mr-2">
                            {item.label}
                        </span>
                        <span className="text-white text-sm font-bold font-mono">
                            {item.val}
                        </span>
                        <span className="ml-2 text-green-500 text-[10px]">▲</span>
                    </div>
                ))}
            </div>

            <style jsx global>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    display: inline-flex;
                    animation: marquee 30s linear infinite;
                }
            `}</style>
        </div>
    );
}