'use client';
import { useEffect, useState } from 'react';
import Mercados from './components/Mercados';

export default function Home() {
  const [noticias, setNoticias] = useState([]);
  const [categoria, setCategoria] = useState(0); // 0 es "Todas"

  useEffect(() => {
    const fetchNoticias = async () => {
      const url = categoria === 0 
        ? `https://public-api.wordpress.com/wp/v2/sites/argentinaenfinanzaspanel.wordpress.com/posts?_embed&v=${Date.now()}`
        : `https://public-api.wordpress.com/wp/v2/sites/argentinaenfinanzaspanel.wordpress.com/posts?_embed&categories=${categoria}&v=${Date.now()}`;
      
      const res = await fetch(url);
      const data = await res.json();
      setNoticias(data);
    };
    fetchNoticias();
  }, [categoria]);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#000', fontFamily: 'Arial, sans-serif' }}>
      
      {/* HEADER BLOOMBERG */}
      <header style={{ backgroundColor: '#000', color: '#fff', padding: '40px 20px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ backgroundColor: '#fff', color: '#000', padding: '10px 15px', fontWeight: '900', fontSize: '30px' }}>AF</div>
          <h1 style={{ fontSize: '40px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-1px' }}>Argentina en Finanzas</h1>
        </div>

        {/* NAVEGACIÓN FUNCIONAL */}
        <nav style={{ maxWidth: '1200px', margin: '40px auto 0', display: 'flex', gap: '30px', paddingBottom: '15px' }}>
          {[
            { name: 'Portada', id: 0 },
            { name: 'Economía', id: 1 }, // Cambiá estos IDs según tus categorías de WP
            { name: 'Finanzas', id: 2 },
            { name: 'Dólar', id: 3 }
          ].map((cat) => (
            <span 
              key={cat.id}
              onClick={() => setCategoria(cat.id)}
              style={{ 
                cursor: 'pointer', 
                fontSize: '12px', 
                fontWeight: 'bold', 
                color: categoria === cat.id ? '#fff' : '#666',
                borderBottom: categoria === cat.id ? '3px solid #0058ff' : 'none',
                paddingBottom: '15px'
              }}
            >
              {cat.name}
            </span>
          ))}
        </nav>
      </header>

      {/* TICKER DE MERCADOS */}
      <Mercados />

      {/* NOTICIAS */}
      <div style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '50px' }}>
        <div>
          {noticias.map((post: any) => (
            <article key={post.id} style={{ marginBottom: '60px', borderBottom: '1px solid #eee', paddingBottom: '40px' }}>
              <h2 style={{ fontSize: '50px', fontWeight: '900', lineHeight: '1', marginBottom: '20px' }} 
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              <div style={{ fontSize: '18px', color: '#444', lineHeight: '1.6' }} 
                   dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
            </article>
          ))}
        </div>
        <div style={{ borderLeft: '1px solid #eee', paddingLeft: '40px' }}>
          <h3 style={{ fontWeight: '900', fontSize: '14px', borderBottom: '2px solid #000', paddingBottom: '10px' }}>LO MÁS LEÍDO</h3>
        </div>
      </div>
    </div>
  );
}
