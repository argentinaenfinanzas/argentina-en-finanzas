'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [noticias, setNoticias] = useState([]);
  const [precios, setPrecios] = useState([]);

  useEffect(() => {
    // 1. Carga de Noticias (Conexión confirmada con tu WP)
    fetch(`https://public-api.wordpress.com/wp/v2/sites/argentinaenfinanzaspanel.wordpress.com/posts?_embed&v=${Date.now()}`)
      .then(res => res.json()).then(data => setNoticias(data));

    // 2. Carga de Mercados (Dólar + Cripto)
    const cargarMercados = async () => {
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
          { label: "SOL", val: `u$s ${c[2]?.current_price.toLocaleString()}`, ch: c[2]?.price_change_percentage_24h },
          { label: "REAL/ARS", val: `$${Math.round(0.18 * d.blue.ask)}`, ch: -0.05 }
        ]);
      } catch (e) { console.error(e); }
    };
    cargarMercados();
  }, []);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#000', fontFamily: 'Helvetica, Arial, sans-serif', margin: 0 }}>
      
      {/* HEADER BLOOMBERG NEGRO */}
      <header style={{ backgroundColor: '#000', color: '#fff', padding: '40px 20px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ backgroundColor: '#fff', color: '#000', padding: '12px 18px', fontWeight: '1000', fontSize: '32px', border: '3px solid #fff', lineHeight: 1 }}>AF</div>
          <h1 style={{ fontSize: '48px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-2px', margin: 0 }}>Argentina en Finanzas</h1>
        </div>
        
        {/* CATEGORÍAS FUNCIONALES (Próximo paso: enlazar IDs) */}
        <nav style={{ maxWidth: '1200px', margin: '40px auto 0', display: 'flex', gap: '30px', paddingBottom: '15px', borderBottom: '1px solid #222' }}>
          {['Economía', 'Finanzas', 'Mercados', 'Crypto'].map((n, i) => (
            <span key={i} style={{ fontSize: '12px', fontWeight: 'bold', color: i === 0 ? '#fff' : '#555', borderBottom: i === 0 ? '3px solid #0058ff' : 'none', paddingBottom: '15px', textTransform: 'uppercase', cursor: 'pointer' }}>{n}</span>
          ))}
        </nav>
      </header>

      {/* TICKER FINANCIERO (ESTILO TERMINAL) */}
      <div style={{ backgroundColor: '#000', height: '45px', overflow: 'hidden', display: 'flex', alignItems: 'center', borderBottom: '2px solid #111' }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'slideTicker 30s linear infinite' }}>
          {[...precios, ...precios, ...precios].map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '0 35px', borderRight: '1px solid #222' }}>
              <span style={{ color: '#666', fontSize: '10px', fontWeight: 'bold', marginRight: '8px' }}>{p.label}</span>
              <span style={{ color: '#fff', fontSize: '13px', fontWeight: '900', marginRight: '8px' }}>{p.val}</span>
              <span style={{ color: p.ch > 0 ? '#00ff00' : '#ff0000', fontSize: '11px', fontWeight: 'bold' }}>{p.ch > 0 ? '▲' : '▼'} {Math.abs(p.ch).toFixed(2)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* SECCIÓN DE NOTICIAS DE WORDPRESS */}
      <div style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '60px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px', borderBottom: '2px solid #000' }}>
            <h3 style={{ fontWeight: '1000', fontSize: '16px', textTransform: 'uppercase', margin: '0 0 5px 0' }}>Últimas Noticias</h3>
          </div>

          {noticias.length > 0 ? noticias.map((post: any) => (
            <article key={post.id} style={{ marginBottom: '80px', borderBottom: '1px solid #eee', paddingBottom: '50px' }}>
              <span style={{ color: '#0058ff', fontWeight: 'bold', fontSize: '13px', textTransform: 'uppercase' }}>Urgente</span>
              <h2 style={{ fontSize: '60px', fontWeight: '900', lineHeight: '1', marginTop: '15px', letterSpacing: '-2px' }} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              <div style={{ fontSize: '22px', color: '#333', lineHeight: '1.4', marginTop: '20px', fontWeight: 400 }} dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
              <p style={{ marginTop: '30px', fontSize: '11px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase' }}>{new Date(post.date).toLocaleDateString('es-AR')} • POR REDACCIÓN AF</p>
            </article>
          )) : <p style={{ color: '#999' }}>Sincronizando con el panel central...</p>}
        </div>

        {/* BARRA LATERAL ESTILO BLOOMBERG */}
        <aside style={{ borderLeft: '1px solid #eee', paddingLeft: '40px' }}>
          <h3 style={{ fontWeight: '1000', fontSize: '15px', borderBottom: '2px solid #000', paddingBottom: '10px', textTransform: 'uppercase' }}>Lo más leído</h3>
          <div style={{ marginTop: '20px', fontSize: '14px', lineHeight: '1.6', color: '#666', fontStyle: 'italic' }}>
            Configurá las categorías en tu panel de WordPress para filtrar noticias aquí automáticamente.
          </div>
        </aside>
      </div>

      <style>{`
        @keyframes slideTicker { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
        body { margin: 0; padding: 0; overflow-x: hidden; }
      `}</style>
    </div>
  );
}
