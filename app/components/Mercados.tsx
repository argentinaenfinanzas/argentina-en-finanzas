'use client';
import { useEffect, useState } from 'react';

export default function Mercados() {
    const [precios, setPrecios] = useState<any>(null);

    useEffect(() => {
        const fetchPrecios = async () => {
            try {
                const res = await fetch('https://criptoya.com/api/dolar');
                const dataDolar = await res.json();
                const resCrypto = await fetch('https://api.binance.com/api/v3/ticker/price?symbols=["BTCUSDT","ETHUSDT","SOLUSDT"]');
                const dataCrypto = await resCrypto.json();

                setPrecios({
                    blue: dataDolar.blue.ask,
                    oficial: dataDolar.oficial.ask,
                    btc: parseFloat(dataCrypto.find((c: any) => c.symbol === "BTCUSDT").price).toLocaleString(),
                    sol: parseFloat(dataCrypto.find((c: any) => c.symbol === "SOLUSDT").price).toLocaleString(),
                    pen: "3.72", 
                    pyg: "7.430"
                });
            } catch (error) {
                console.error("Error", error);
            }
        };
        fetchPrecios();
    }, []);

    if (!precios) return <div className="p-4 text-gray-500 font-mono text-xs text-center">CONECTANDO A BLOOMBERG...</div>;

    const Item = ({ label, valor }: any) => (
        <div className="flex justify-between py-2 border-b border-gray-800 font-mono text-sm px-2">
            <span className="text-gray-400 uppercase">{label}</span>
            <span className="text-white font-bold">{valor} <span className="text-green-400 text-[10px]">▲</span></span>
        </div>
    );

    return (
        <div className="bg-black text-white w-full border-t-2 border-blue-600">
            <div className="bg-blue-600 px-2 py-1 flex justify-between">
                <h2 className="text-[10px] font-black uppercase">Mercados en Vivo</h2>
                <span className="text-[10px] animate-pulse">● LIVE</span>
            </div>
            <div className="p-1">
                <Item label="Dólar Blue" valor={`$${precios.blue}`} />
                <Item label="Bitcoin" valor={`$${precios.btc}`} />
                <Item label="Solana" valor={`$${precios.sol}`} />
                <Item label="Sol Peruano" valor={precios.pen} />
                <Item label="Guaraní PY" valor={precios.pyg} />
            </div>
        </div>
    );
}