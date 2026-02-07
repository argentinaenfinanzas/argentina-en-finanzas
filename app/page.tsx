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
    <main className="min-h-screen bg-white flex flex-col font-sans">
      {/* HEADER NEGRO CON LOGO AF */}
      <header className="bg-black text-white pt-10 pb-0 px-6 border-b border-gray-900">
        <div className="max-w-7xl mx-auto flex items-center gap-5">
          {/* LOGO AF CUADRADO TIPO BLOOMBERG */}
          <div className="bg-white text-black px-4 py-2 font-[1000] text-4xl tracking-tighter border-2 border-white leading-none">
            AF
          </div>
          <div className="flex flex-col">
            <h1 className="text-4xl font-[900] uppercase tracking-tighter leading-none">
              Argentina en Finanzas
            </h1>
            <span className="text-[11px] text-gray-500 font-bold tracking-[0.3em] mt-1 uppercase">Noticias Financieras</span>
          </div>
        </div>

        {/* NAVEGACIÓN */}
        <nav className="max-w-7xl mx-auto mt-10 flex gap-10 text-[12px] font-bold text-gray-500 uppercase tracking-[0.15em] border-b border-gray-800 pb-4">
          <span className="text-white border-b-4 border-blue-600 pb-4 cursor-pointer">Economía</span>
          <span className="hover:text-white cursor-pointer transition-colors">Política</span>
          <span className="hover:text-white cursor-pointer transition-colors">Finanzas</span>
          <span className="hover:text-white cursor-pointer transition-colors">Dólar Blue</span>
          <span className="hover:text-white cursor-pointer transition-colors">Criptomonedas</span>
        </nav>
      </header>

      {/* LA PARED NEGRA (TICKER) */}
      <div className="bg-black w-full relative z-50 shadow-2xl overflow-hidden border-b border-gray-900">
        <Mercados />
      </div>

      {/* CUERPO DE NOTICIAS */}
      <div className="max-w-7xl mx-auto mt-12 p-6 w-full text-black">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          
          {/* COLUMNA DE NOTICIAS (WORDPRESS) */}
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 mb-8">
               <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
               <h3 className="text-black font-black text-sm uppercase tracking-tighter">Mercado Hoy</h3>
            </div>

            {noticias.length > 0 ? noticias.map((post: any) => (
              <article key={post.id} className="mb-16 border-b border-gray-100 pb-12 last:border-0 group cursor-pointer">
                <span className="text-blue-700 font-bold text-xs uppercase tracking-widest">Finanzas</span>
                <h2 className="text-5xl font-[900] leading-[1.05] mt-3 group-hover:text-blue-900 transition-colors" 
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <div className="mt-5 text-gray-600 text-xl leading-relaxed line-clamp-3 font-medium" 
                     dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                <div className="mt-8 flex items-center gap-3">
                   <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                   <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                     Por Redacción AF • {new Date(post.date).toLocaleDateString('es-AR')}
                   </span>
                </div>
              </article>
            )) : (
              <p className="text-gray-400 italic">Cargando noticias desde el panel...</p>
            )}
          </div>

          {/* BARRA LATERAL ESTILO TERMINAL */}
          <div className="md:col-span-4 border-l border-gray-100 pl-10 hidden md:block">
            <h3 className="text-black font-black text-sm uppercase tracking-tighter mb-8 border-b-2 border-black pb-2">Últimas Noticias</h3>
            <div className="space-y-10">
               {/* Aquí podrías poner un segundo fetch para noticias breves */}
               <p className="text-gray-400 text-sm italic leading-relaxed">
                 Las noticias secundarias aparecerán aquí automáticamente según su categoría en WordPress.
               </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
