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

                setPrecios({
                    blue: blue,
                    btc: parseFloat(dataCrypto.find((c: any) => c.symbol === "BTCUSDT").price).toLocaleString(),
                    eth: parseFloat(dataCrypto.find((c: any) => c.symbol === "ETHUSDT").price).toLocaleString(),
                    sol: parseFloat(dataCrypto.find((c: any) => c.symbol === "SOLUSDT").price).toLocaleString(),
                    realArs: Math.round(0.18 * blue),
                    solArs: Math.round(0.27 * blue),
                    pygArs: (0.00013 * blue).toFixed(2)
                });
            } catch (error) {
                console.error("Error", error);
            }
        };
        fetchPrecios();
    }, []);

    if (!precios) return <div className="p-4 text-gray-500 font-mono text-xs text-center">CONECTANDO...</div>;

    return (
        <div className="bg-black text-white w-full max-w-[320px] border-t-2 border-blue-600 font-mono">
            <div className="bg-blue-600 px-3 py-1 flex justify-between items-center text-[10px] font-bold uppercase">
                <span>Mercados en Vivo</span>
                <span className="animate-pulse text-red-200">● LIVE</span>
            </div>
            
            <div className="p-2 space-y-1">
                {/* Argentina */}
                <div className="flex justify-between py-1 border-b border-gray-800">
                    <span className="text-gray-400">Dolar Blue</span>
                    <span className="font-bold">$ {precios.blue}</span>
                </div>

                {/* Crypto */}
                <div className="flex justify-between py-1 border-b border-gray-800">
                    <span className="text-gray-400">Bitcoin</span>
                    <span className="font-bold">u$s {precios.btc}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-800">
                    <span className="text-gray-400">Ethereum</span>
                    <span className="font-bold">u$s {precios.eth}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-800">
                    <span className="text-gray-400">Solana</span>
                    <span className="font-bold">u$s {precios.sol}</span>
                </div>

                {/* Latam */}
                <div className="flex justify-between py-1 border-b border-gray-800">
                    <span className="text-gray-400">Real Brasil</span>
                    <span className="font-bold">$ {precios.realArs}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-800">
                    <span className="text-gray-400">Sol Peruano</span>
                    <span className="font-bold">$ {precios.solArs}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-800">
                    <span className="text-gray-400">Guaraní PY</span>
                    <span className="font-bold">$ {precios.pygArs}</span>
                </div>
            </div>
        </div>
    );
}