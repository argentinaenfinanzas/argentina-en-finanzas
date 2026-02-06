'use client';
import { useEffect, useState } from 'react';

export default function Mercados() {
    const [precios, setPrecios] = useState<any>(null);

    useEffect(() => {
        const fetchPrecios = async () => {
            try {
                const res = await fetch('https://criptoya.com/api/dolar');
                const dataDolar = await res.json();
                
                // Traemos BTC, ETH y SOL de Binance
                const resCrypto = await fetch('https://api.binance.com/api/v3/ticker/price?symbols=["BTCUSDT","ETHUSDT","SOLUSDT"]');
                const dataCrypto = await resCrypto.json();

                setPrecios({
                    blue: dataDolar.blue.ask,
                    oficial: dataDolar.oficial.ask,
                    btc: parseFloat(dataCrypto.find((c: any) => c.symbol === "BTCUSDT").price).toLocaleString(),
                    eth: parseFloat(dataCrypto.find((c: any) => c.symbol === "ETHUSDT").price).toLocaleString(),
                    sol: parseFloat(dataCrypto.find((c: any) => c.symbol === "SOLUSDT").price).toLocaleString(),
                    pen: "3.72", // Sol Peruano
                    pyg: "7.430"  // Guaraní Paraguayo
                });
            } catch (error) {
                console.error("Error cargando mercados", error);
            }
        };
        fetchPrecios();
        const interval = setInterval(fetchPrecios, 60000);
        return () => clearInterval(interval);
    }, []);

    if (!precios) return <div className="p-4 text-gray-500 font-mono text-xs">CONECTANDO A BLOOMBERG...</div>;

    const ItemMercado = ({ label, valor, moneda = "USD" }: any) => (
        <div className="flex justify-between items-center py-2 border-b border-gray-800 font-mono text-sm hover:bg-gray-900 px-2 transition-colors">
            <span className="text-gray-400 uppercase tracking-tighter">{label}</span>
            <span className="text-white font-bold">
                {moneda === "ARS" ? "$" : ""}{valor} 
                <span className="text-[10px] ml-1 text-green-400">▲</span>
            </span>
        </div>
    );

    return (
        <div className="bg-black text-white w-full border-t-2 border-blue-600 shadow-2xl">
            {/* Header Estilo Terminal */}
            <div className="bg-blue-600 px-2 py-1 flex justify-between items-center">
                <h2 className="text-[10px] font-black uppercase tracking-widest text-white">Mercados en Vivo</h2>
                <span className="text-[10px] animate-pulse">● LIVE</span>
            </div>
            
            <div className="p-1">
                {/* Argentina */}
                <div className="bg-gray-900/50 p-2 mb-1">
                    <p className="text-[9px] text-blue-400 font-bold uppercase mb-1">Argentina</p>
                    <ItemMercado label="Dólar Blue" valor={precios.blue} moneda="ARS" />
                    <ItemMercado label="Dólar Oficial" valor={precios.oficial} moneda="ARS" />
                </div>

                {/* Crypto */}
                <div className="bg-gray-900/50 p-2 mb-1">
                    <p className="text-[9px] text-orange-400 font-bold uppercase mb-1">Digital Assets</p>
                    <ItemMercado label="Bitcoin" valor={precios.btc} />
                    <ItemMercado label="Solana" valor={precios.sol} />
                </div>

                {/* Latam */}
                <div className="bg-gray-900/50 p-2">
                    <p className="text-[9px] text-green-400 font-bold uppercase mb-1">Region FX</p>
                    <ItemMercado label="Sol Peruano" valor={precios.pen} />
                    <ItemMercado label="Guaraní PY" valor={precios.pyg} />
                </div>
            </div>
        </div>
    );
}