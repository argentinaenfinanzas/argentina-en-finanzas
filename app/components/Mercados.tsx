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

    if (!precios) return <div className="p-4 text-gray-500 font-mono text-xs">ACTUALIZANDO...</div>;

    const Fila = ({ etiqueta, valor, esDolar = false }: any) => (
        <div className="flex justify-between py-2 border-b border-gray-800 font-mono text-sm px-1">
            <span className="text-gray-400 uppercase">{etiqueta}</span>
            <span className="text-white font-bold">
                {esDolar ? "u$s " : "$ "}{valor}
            </span>
        </div>
    );

    return (
        <div className="bg-black text-white w-full max-w-[320px] border-t-2 border-blue-600">
            <div className="bg-blue-600 px-2 py-1 flex justify-between">
                <h2 className="text-[10px] font-black uppercase">Mercados</h2>
                <span className="text-[10px] animate-pulse">● VIVO</span>
            </div>
            
            <div className="p-2">
                <p className="text-[9px] text-blue-400 font-bold mb-1">ARGENTINA</p>
                <Fila etiqueta="Dólar Blue" valor={precios.blue} />

                <p className="text-[9px] text-orange-400 font-bold mt-4 mb-1">CRIPTOMONEDAS</p>
                <Fila etiqueta="Bitcoin" valor={precios.btc} esDolar />
                <Fila etiqueta="Ethereum" valor={precios.eth} esDolar />
                <Fila etiqueta="Solana" valor={precios.sol} esDolar />

                <p className="text-[9px] text-green-400 font-bold mt-4 mb-1">LATAM (EN PESOS)</p>
                <Fila etiqueta="Real Brasil" valor={precios.realArs} />
                <Fila etiqueta="Sol Peruano" valor={precios.solArs} />
                <Fila etiqueta="Guaraní PY" valor={precios.pygArs} />
            </div>
        </div>
    );
}