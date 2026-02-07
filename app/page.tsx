export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Mercados from './components/Mercados';

async function getNoticias() {
  try {
    // Agregamos un número aleatorio al final para romper el cache del servidor
    const res = await fetch(`https://public-api.wordpress.com/wp/v2/sites/argentinaenfinanzaspanel.wordpress.com/posts?_embed&v=${Math.random()}`, { 
      cache: 'no-store'
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const noticias = await getNoticias();

  return (
    <main className="min-h-screen bg-white">
      {/* TEXTO DE PRUEBA PARA SABER SI ACTUALIZÓ */}
      <div className="bg-red-600 text-white text-center py-1 font-bold text-xs">
        WEB ACTUALIZADA: CONECTADO A WORDPRESS
      </div>

      <header className="bg-black text-white pt-8 pb-0 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="bg-white text-black px-3 py-1 font-black text-3xl border-2 border-white">
            AF
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            Argentina en Finanzas
          </h1>
        </div>
      </header>

      <div className="bg-black w-full relative z-50 shadow-2xl">
        <Mercados />
      </div>

      <div className="max-w-7xl mx-auto mt-12 p-6 text-black">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {noticias.length > 0 ? (
            noticias.map((post: any) => (
              <div key={post.id} className="border-r border-gray-100 pr-8 pb-8">
                <h2 className="text-2xl font-black leading-tight" 
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <div className="text-gray-600 mt-4 text-sm line-clamp-3" 
                     dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
              </div>
            ))
          ) : (
            <p>Conexión exitosa, pero no hay noticias públicas aún.</p>
          )}
        </div>
      </div>
    </main>
  );
}
