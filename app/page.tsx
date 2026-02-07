'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [noticias, setNoticias] = useState([]);
  const [precios, setPrecios] = useState([]);

  useEffect(() => {
    // 1. Fetch de Noticias desde tu WordPress
    fetch(`https://public-api.wordpress.com/wp/v2/sites/argentinaenfinanzaspanel.wordpress.com/posts?_embed&v=${Date.now()}`)
      .then(res => res.json()).then(data => setNoticias(data));

    // 2. Fetch de Mercados
    const cargarDatos = async () => {
      try {
        const [resD, resC] = await Promise.all([
          fetch('https://criptoya.com/api/dolar'),
          fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana&price_change_percentage=24h')
        ]);
        const d = await resD.json();
        const c = await resC.json();
        setPrecios([
          { label: "DÓLAR BLUE", val: `$${d.blue.ask}`, ch: 0.15 },
          { label: "BTC", val: `u$s ${c[0]?.current_price.toLocaleString()}`, ch: c[0]?.price_change_percentage_24h },
          { label: "ETH", val: `u$s ${c[1]?.current_price.toLocaleString()}`, ch: c[1]?.price_change_percentage_24h },
          { label: "SOL", val: `u$s ${c[2]?.current_price.toLocaleString()}`, ch: c[2]?.price_change_percentage_24h }
        ]);
      } catch (e) { console.log(e); }
    };
    cargarDatos();
  }, []);

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', margin: 0, padding: 0, fontFamily: 'Arial, sans-serif' }}>
      
      {/* HEADER BLOOMBERG - FORZADO NEGRO */}
      <header style={{ backgroundColor: '#000', color: '#fff', padding: '50px 20px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ backgroundColor: '#fff', color: '#000', padding: '12px 20px', fontWeight: '900', fontSize: '35px', border: '4px solid #fff' }}>
            AF
          </div>
          <h1 style={{ fontSize: '55px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-3px', margin: 0 }}>
            Argentina en Finanzas
          </h1>
        </div>
        <nav style={{ maxWidth: '1200px', margin: '40px auto 0', display: 'flex', gap: '30px', paddingBottom: '15px', borderBottom: '1px solid #333' }}>
          {['Economía', 'Finanzas', 'Mercados', 'Cripto'].map((n, i) => (
            <span key={i} style={{ color: i === 0 ? '#fff' : '#666', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: i === 0 ? '4px solid #0058ff' : 'none', paddingBottom: '15px' }}>
              {n}
            </span>
          ))}
        </nav>
      </header>

      {/* TICKER INTEGRADO - FORZADO NEGRO */}
      <div style={{ backgroundColor: '#000', height: '50px', display: 'flex', alignItems: 'center', overflow: 'hidden', borderBottom: '2px solid #111' }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'scroll 30s linear infinite' }}>
          {[...precios, ...precios, ...precios].map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '0 40px', borderRight: '1px solid #222' }}>
              <span style={{ color: '#555', fontSize: '10px', fontWeight: 'bold', marginRight: '10px' }}>{p.label}</span>
              <span style={{ color: '#fff', fontSize: '14px', fontWeight: '900', marginRight: '10px' }}>{p.val}</span>
              <span style={{ color: p.ch > 0 ? '#00ff00' : '#ff0000', fontSize: '12px', fontWeight: 'bold' }}>
                {p.ch > 0 ? '▲' : '▼'} {Math.abs(p.ch).toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* NOTICIAS DE WORDPRESS */}
      <main style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '60px' }}>
        <div>
          {noticias.map((post: any) => (
            <article key={post.id} style={{ marginBottom: '80px', borderBottom: '1px solid #eee', paddingBottom: '40px' }}>
              <h2 style={{ fontSize: '60px', fontWeight: '900', lineHeight: '0.95', letterSpacing: '-2px', color: '#000', margin: '0 0 20px 0' }} 
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              <div style={{ fontSize: '22px', color: '#333', lineHeight: '1.4' }} 
                   dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
            </article>
          ))}
        </div>
        <aside style={{ borderLeft: '1px solid #eee', paddingLeft: '40px' }}>
          <h3 style={{ fontWeight: '900', fontSize: '15px', borderBottom: '3px solid #000', paddingBottom: '10px', textTransform: 'uppercase' }}>Lo más leído</h3>
        </aside>
      </main>

      <style>{`
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
        body { margin: 0; padding: 0; }
      `}</style>
    </div>
  );
}
