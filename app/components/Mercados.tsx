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
                        val: c ? `u$s ${c.current_price.toLocaleString()}` : "N/D",
                        change: c ? c.price_change_percentage_24h : 0
                    };
                };

                setPrecios([
                    { label: "Dólar Blue", val: `$${blue}`, change: 0.15 },
                    formatCripto('bitcoin'),
                    formatCripto('ethereum'),
                    formatCripto('solana'),
                    { label: "Real Brasil", val: `$${Math.round(0.18 * blue)}`, change: -0.05 },
                    { label: "Sol Peruano", val: `$${Math.round(0.27 * blue)}`, change: 0.02 }
                ]);
            } catch (e) { console.error(e); }
        };
        fetchPrecios();
        const interval = setInterval(fetchPrecios, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ backgroundColor: '#000000', height: '45px', overflow: 'hidden', display: 'flex', alignItems: 'center', borderTop: '1px solid #222' }}>
            <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'tickerMove 30s linear infinite' }}>
                {[...precios, ...precios, ...precios].map((item, i) => {
                    const color = item.change > 0 ? '#00ff00' : item.change < 0 ? '#ff0000' : '#888';
                    const flecha = item.change > 0 ? '▲' : item.change < 0 ? '▼' : '▶';
                    return (
                        <div key={i} style={{ display: 'inline-flex', alignItems: 'center', padding: '0 40px', borderRight: '1px solid #111' }}>
                            <span style={{ color: '#555', fontSize: '10px', fontWeight: 'bold', marginRight: '10px' }}>{item.label}</span>
                            <span style={{ color: '#fff', fontSize: '13px', fontWeight: '900', marginRight: '10px' }}>{item.val}</span>
                            <span style={{ color: color, fontSize: '11px', fontWeight: 'bold' }}>{flecha} {Math.abs(item.change).toFixed(2)}%</span>
                        </div>
                    );
                })}
            </div>
            <style>{`
                @keyframes tickerMove {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
            `}</style>
        </div>
    );
}
