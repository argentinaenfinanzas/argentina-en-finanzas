export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Mercados from './components/Mercados';

async function getNoticias() {
  try {
    const res = await fetch(`https://public-api.wordpress.com/wp/v2/sites/argentinaenfinanzaspanel.wordpress.com/posts?_embed&v=${Date.now()}`, { 
      cache: 'no-store' 
    });
    return res.json();
  } catch (e) { return []; }
}

export default async function Home() {
  const noticias = await getNoticias();

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* HEADER ESTILO BLOOMBERG */}
      <header className="bg-black text-white pt-8 pb-0 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          {/* Logo AF Cuadrado */}
          <div className="bg-white text-black px-3 py-1 font-black text-3xl tracking-tighter border-2 border-white">
            AF
          </div>
          <div className="flex flex-col">
            <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">
              Argentina en Finanzas
            </h1>
            <span className="text-[10px] text-gray-500 font-bold tracking-[0.2em] mt-1">NOTICIAS FINANCIERAS</span>
          </div>
        </div>

        {/* MENÚ DE CATEGORÍAS */}
        <nav className="max-w-7xl mx-auto mt-8 flex gap-8 text-[11px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-800 pb-4">
          <span className="text-white border-b-2 border-blue-600 pb-4">Economía</span>
          <span className="hover:text-white cursor-pointer transition-colors">Finanzas</span>
          <span className="hover:text-white cursor-pointer transition-colors">Dólar Blue</span>
          <span className="hover:text-white cursor-pointer transition-colors">Criptomonedas</span>
        </nav>
      </header>

      {/* PARED NEGRA (TICKER CON COLORES) */}
      <div className="bg-black w-full relative z-50 border-b border-gray-900 shadow-2xl">
        <Mercados />
      </div>

      {/* CONTENIDO DE NOTICIAS */}
      <div className="max-w-7xl mx-auto mt-12 p-6 w-full text-black">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* COLUMNA PRINCIPAL (WORDPRESS) */}
          <div className="md:col-span-8">
            <h3 className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">Destacados</h3>
            {noticias.map((post: any) => (
              <article key={post.id} className="mb-12 group cursor-pointer">
                <h2 className="text-4xl font-black leading-[1.1] group-hover:text-blue-800 transition-colors" 
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <div className="mt-4 text-gray-600 text-lg leading-relaxed line-clamp-3" 
                     dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                <div className="mt-6 flex items-center gap-4">
                   <span className="text-[10px] bg-gray-100 px-2 py-1 font-bold uppercase tracking-tighter">
                     {new Date(post.date).toLocaleDateString('es-AR')}
                   </span>
                </div>
              </article>
            ))}
          </div>

          {/* BARRA LATERAL (OPCIONAL) */}
          <div className="md:col-span-4 border-l border-gray-100 pl-8 hidden md:block">
            <h3 className="text-black font-black text-sm uppercase tracking-tighter mb-6">Últimas Noticias</h3>
            <div className="space-y-8">
               <div className="border-b border-gray-50 pb-4 italic text-gray-400 text-sm">
                 Las noticias secundarias aparecerán aquí a medida que las categorices en el panel.
               </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
