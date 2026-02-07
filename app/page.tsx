export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Mercados from './components/Mercados';

async function getNoticias() {
  try {
    const res = await fetch(`https://public-api.wordpress.com/wp/v2/sites/argentinaenfinanzaspanel.wordpress.com/posts?_embed&v=${Date.now()}`, { cache: 'no-store' });
    return res.json();
  } catch (e) { return []; }
}

export default async function Home() {
  const noticias = await getNoticias();

  return (
    <main style={{ backgroundColor: 'white', minHeight: '100vh', color: 'black', fontFamily: 'Arial, sans-serif' }}>
      
      {/* HEADER NEGRO BLOOMBERG */}
      <header style={{ backgroundColor: 'black', color: 'white', padding: '40px 20px 0 20px', borderBottom: '1px solid #333' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* LOGO AF */}
          <div style={{ backgroundColor: 'white', color: 'black', padding: '10px 15px', fontWeight: '1000', fontSize: '35px', border: '2px solid white', lineHeight: '1' }}>
            AF
          </div>
          <div>
            <h1 style={{ fontSize: '45px', fontWeight: '900', textTransform: 'uppercase', margin: '0', letterSpacing: '-2px' }}>
              Argentina en Finanzas
            </h1>
            <p style={{ color: '#666', fontSize: '11px', fontWeight: 'bold', letterSpacing: '3px', margin: '5px 0 0 0' }}>NOTICIAS FINANCIERAS</p>
          </div>
        </div>

        {/* MENU */}
        <nav style={{ maxWidth: '1200px', margin: '40px auto 0', display: 'flex', gap: '30px', borderBottom: '1px solid #222', paddingBottom: '15px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#666' }}>
          <span style={{ color: 'white', borderBottom: '3px solid #0058ff', paddingBottom: '15px' }}>Economía</span>
          <span>Finanzas</span>
          <span>Dólar</span>
          <span>Cripto</span>
        </nav>
      </header>

      {/* TICKER DE MERCADOS (PARED NEGRA) */}
      <div style={{ backgroundColor: 'black', width: '100%', borderBottom: '1px solid #222', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Mercados />
        </div>
      </div>

      {/* CUERPO DE NOTICIAS */}
      <div style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '60px' }}>
          
          {/* COLUMNA PRINCIPAL */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
              <div style={{ width: '10px', height: '10px', backgroundColor: 'red', borderRadius: '50%' }}></div>
              <h3 style={{ fontWeight: '900', fontSize: '14px', textTransform: 'uppercase' }}>Mercado Ahora</h3>
            </div>

            {noticias.map((post: any) => (
              <article key={post.id} style={{ marginBottom: '60px', borderBottom: '1px solid #eee', paddingBottom: '40px' }}>
                <span style={{ color: '#0058ff', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase' }}>Urgente</span>
                <h2 style={{ fontSize: '55px', fontWeight: '900', lineHeight: '1', marginTop: '15px', letterSpacing: '-1px' }} 
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <div style={{ marginTop: '20px', color: '#444', fontSize: '20px', lineHeight: '1.5' }} 
                     dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                <p style={{ marginTop: '30px', fontSize: '12px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase' }}>
                  {new Date(post.date).toLocaleDateString('es-AR')} • POR REDACCIÓN AF
                </p>
              </article>
            ))}
          </div>

          {/* BARRA LATERAL */}
          <div style={{ borderLeft: '1px solid #eee', paddingLeft: '40px' }}>
            <h3 style={{ fontWeight: '900', fontSize: '16px', textTransform: 'uppercase', borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '30px' }}>
              Lo más leído
            </h3>
            <p style={{ color: '#999', fontStyle: 'italic' }}>
              Configurá las categorías en WordPress para que aparezcan aquí automáticamente.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
