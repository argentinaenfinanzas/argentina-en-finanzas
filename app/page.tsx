'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [noticias, setNoticias] = useState([]);
  const [precios, setPrecios] = useState([]);

  useEffect(() => {
    // 1. Carga de Noticias (WP)
    fetch(`https://public-api.wordpress.com/wp/v2/sites/argentinaenfinanzaspanel.wordpress.com/posts?_embed&v=${Date.now()}`)
      .then(res => res.json()).then(data => setNoticias(data));

    // 2. Carga de Precios (CriptoYa + CoinGecko)
    const fetchPrecios = async () => {
      try {
        const [resD, resC] = await Promise.all([
          fetch('https://criptoya.com/api/dolar'),
          fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana&price_change_percentage=24h')
        ]);
        const d = await resD.json();
        const c = await resC.json();
        const getC = (id) => c.find(x => x.id === id);
        
        setPrecios([
          { label: "DÓLAR BLUE", val: `$${d.blue.ask}`, ch: 0.2 },
          { label: "BTC", val: `u$s ${getC('bitcoin')?.current_price.toLocaleString()}`, ch: getC('bitcoin')?.price_change_percentage_24h },
          { label: "ETH", val: `u$s ${getC('ethereum')?.current_price.toLocaleString()}`, ch: getC('ethereum')?.price_change_percentage_24h },
          { label: "REAL/ARS", val: `$${Math.round(0.18 * d.blue.ask)}`, ch: -0.1 }
        ]);
      } catch (e) { console.log(e); }
    };
    fetchPrecios();
  }, []);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#000', fontFamily: 'Arial, sans-serif', margin: 0 }}>
      
      {/* HEADER NEGRO INTEGRADO */}
      <header style={{ backgroundColor: '#000', color: '#fff', padding: '40px 20px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ backgroundColor: '#fff', color: '#000', padding: '12px 18px', fontWeight: '1000', fontSize: '32px', border: '3px solid #fff', lineHeight: 1 }}>AF</div>
          <h1 style={{ fontSize: '48px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-2px', margin: 0 }}>Argentina en Finanzas</h1>
        </div>
        <nav style={{ maxWidth: '1200px', margin: '40px auto 0', display: 'flex', gap: '30px', paddingBottom: '15px', borderBottom: '1px solid #222' }}>
          {['Economía', 'Finanzas', 'Mercados', 'Crypto'].map((n, i) => (
            <span key={i} style={{ fontSize: '12px', fontWeight: 'bold', color: i === 0 ? '#fff' : '#555', borderBottom: i === 0 ? '3px solid #0058ff' : 'none', paddingBottom: '15px', textTransform: 'uppercase' }}>{n}</span>
          ))}
        </nav>
      </header>

      {/* TICKER BLINDADO (REEMPLAZA AL COMPONENTE QUE FALLABA) */}
      <div style={{ backgroundColor: '#000', height: '45px', overflow: 'hidden', display: 'flex', alignItems: 'center', borderBottom: '2px solid #111' }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'slide 25s linear infinite' }}>
          {[...precios, ...precios, ...precios].map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '0 35px', borderRight: '1px solid #222' }}>
              <span style={{ color: '#666', fontSize: '10px', fontWeight: 'bold', marginRight: '8px' }}>{p.label}</span>
              <span style={{ color: '#fff', fontSize: '13px', fontWeight: '900', marginRight: '8px' }}>{p.val}</span>
              <span style={{ color: p.ch > 0 ? '#00ff00' : '#ff0000', fontSize: '11px', fontWeight: 'bold' }}>{p.ch > 0 ? '▲' : '▼'} {Math.abs(p.ch).toFixed(2)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* NOTICIAS DE WORDPRESS */}
      <div style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '60px' }}>
        <div>
          {noticias.map((post: any) => (
            <article key={post.id} style={{ marginBottom: '70px', borderBottom: '1px solid #eee', paddingBottom: '40px' }}>
              <span style={{ color: '#0058ff', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Urgente</span>
              <h2 style={{ fontSize: '55px', fontWeight: '900', lineHeight: '1.05', marginTop: '15px', letterSpacing: '-2px' }} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              <div style={{ fontSize: '20px', color: '#333', lineHeight: '1.5', marginTop: '20px' }} dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
              <p style={{ marginTop: '30px', fontSize: '11px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase' }}>{new Date(post.date).toLocaleDateString('es-AR')} • REDACCIÓN AF</p>
            </article>
          ))}
        </div>
        <aside style={{ borderLeft: '1px solid #eee', paddingLeft: '40px' }}>
          <h3 style={{ fontWeight: '1000', fontSize: '15px', borderBottom: '2px solid #000', paddingBottom: '10px', textTransform: 'uppercase' }}>Lo más leído</h3>
          <p style={{ color: '#bbb', fontStyle: 'italic', marginTop: '20px', fontSize: '13px' }}>Las noticias de tendencia se sincronizan automáticamente desde el panel de control.</p>
        </aside>
      </div>

      <style>{`
        @keyframes slide { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
        body { margin: 0; padding: 0; }
      `}</style>
    </div>
  );
}
