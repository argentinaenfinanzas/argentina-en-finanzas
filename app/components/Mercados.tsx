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

    if (!precios) return <div className="p-4 text-gray-500 font-mono text-xs">CONECTANDO A TERMINAL...</div>;

    const Fila = ({ etiqueta, valor, esDolar = false }: any) => (
        <div className="flex justify-between items-center py-2 border-b border-gray-800 font-mono text-sm px-2 hover:bg-gray-900 transition-colors">
            <span className="text-gray-400 uppercase tracking-tighter">{etiqueta}</span>
            <span className="text-white font-bold">
                {esDolar ? "u$s " : "$ "}{valor}
                <span className="text-[10px] ml-1 text-green-400">▲</span>
            </span>
        </div>
    );

    return (
        <div className="bg-black text-white w-full max-w-[320px] border-t-2 border-blue-600 shadow-2xl">
            <div className="bg-blue-600 px-3 py-1 flex justify-between items-center">
                <h2 className="text-[10px] font-black uppercase tracking-widest">Mercados en Vivo</h2>
                <span className="text-[9px] animate-pulse font-bold">● VIVO</span>
            </div>
            
            <div className="p-1">
                <div className="p-2">
                    <p className="text-[9px] text-blue-400 font-bold mb-1 border-b border-blue-900/30 pb-1">ARGENTINA</p>
                    <Fila etiqueta="Dólar Blue" valor={precios.blue} />
                </div>

                <div className="p-2">
                    <p className="text-[9px] text-orange-400 font-bold mb-1 border-b border-orange-900/30 pb-1">CRIPTOMONEDAS</p>
                    <Fila etiqueta="Bitcoin" valor={precios.btc} esDolar />
                    <Fila etiqueta="Ethereum" valor={precios.eth} esDolar />
                    <Fila etiqueta="Solana" valor={precios.sol} esDolar />
                </div>

                <div className="p-2">
                    <p className="text-[9px] text-green-400 font-bold mb-1 border-b border-green-900/30 pb-1">LATAM (EN PESOS)</p>
                    <Fila etiqueta="Real Brasil" valor={precios.realArs} />
                    <Fila etiqueta="Sol Peruano" valor={precios.solArs} />
                    <Fila etiqueta="Guaraní PY" valor={precios.pygArs} />
                </div>
            </div>
            <div className="p-2 text-center opacity-30">
                <p className="text-[8px] uppercase tracking-[3px]">Bloomberg Terminal</p>
            </div>
        </div>
    );
}