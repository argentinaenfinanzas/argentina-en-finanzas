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
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#000000', fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
      
      {/* HEADER NEGRO MACIZO */}
      <header style={{ backgroundColor: '#000000', color: '#ffffff', padding: '50px 20px 0 20px', borderBottom: '1px solid #333' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '25px' }}>
          {/* LOGO AF CUADRADO */}
          <div style={{ backgroundColor: '#ffffff', color: '#000000', padding: '12px 18px', fontWeight: '900', fontSize: '38px', border: '3px solid #ffffff', lineHeight: '1', display: 'inline-block' }}>
            AF
          </div>
          <div>
            <h1 style={{ fontSize: '50px', fontWeight: '900', textTransform: 'uppercase', margin: 0, letterSpacing: '-2px', lineHeight: '0.9' }}>
              Argentina en Finanzas
            </h1>
            <p style={{ color: '#555555', fontSize: '12px', fontWeight: 'bold', letterSpacing: '4px', margin: '8px 0 0 0' }}>TERMINAL DE NOTICIAS</p>
          </div>
        </div>

        {/* MENU BLOOMBERG */}
        <nav style={{ maxWidth: '1200px', margin: '45px auto 0', display: 'flex', gap: '35px', paddingBottom: '15px', fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase' }}>
          <span style={{ color: '#ffffff', borderBottom: '4px solid #0058ff', paddingBottom: '15px', cursor: 'pointer' }}>Economía</span>
          <span style={{ color: '#666666' }}>Finanzas</span>
          <span style={{ color: '#666666' }}>Mercados</span>
          <span style={{ color: '#666666' }}>Crypto</span>
        </nav>
      </header>

      {/* LA PARED NEGRA (TICKER) */}
      <div style={{ backgroundColor: '#000000', width: '100%', borderBottom: '2px solid #111', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Mercados />
        </div>
      </div>

      {/* CUERPO DE NOTICIAS WORDPRESS */}
      <div style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', borderBottom: '2px solid #000' }}>
            <h3 style={{ fontWeight: '900', fontSize: '18px', textTransform: 'uppercase', margin: '0 0 5px 0' }}>Noticias Destacadas</h3>
          </div>

          {noticias.length > 0 ? noticias.map((post: any) => (
            <article key={post.id} style={{ marginBottom: '80px', borderBottom: '1px solid #eeeeee', paddingBottom: '50px' }}>
              <span style={{ color: '#0058ff', fontWeight: 'bold', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Mercados en Vivo</span>
              <h2 style={{ fontSize: '65px', fontWeight: '900', lineHeight: '1', marginTop: '15px', letterSpacing: '-2px', color: '#000000' }} 
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              <div style={{ marginTop: '25px', color: '#333333', fontSize: '22px', lineHeight: '1.4', fontWeight: '400', maxWidth: '900px' }} 
                   dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
              <p style={{ marginTop: '35px', fontSize: '12px', fontWeight: 'bold', color: '#aaaaaa', textTransform: 'uppercase' }}>
                {new Date(post.date).toLocaleDateString('es-AR')} • ARGENTINA EN FINANCIAS
              </p>
            </article>
          )) : (
            <p style={{ fontSize: '20px', color: '#666' }}>Cargando noticias desde el panel central...</p>
          )}
        </div>
      </div>
    </div>
  );
}
