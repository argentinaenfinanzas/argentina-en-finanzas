import Mercados from './components/Mercados';

// Función para traer noticias de tu WordPress gratuito
async function getNoticias() {
  try {
    const res = await fetch('https://public-api.wordpress.com/wp/v2/sites/argentinaenfinanzaspanel.wordpress.com/posts?_embed', { 
      next: { revalidate: 60 } 
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error cargando noticias:", error);
    return [];
  }
}

export default async function Home() {
  const noticias = await getNoticias();

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* HEADER PRINCIPAL */}
      <header className="bg-black text-white pt-8 pb-0 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          {/* Logo AF Cuadrado */}
          <div className="bg-white text-black px-3 py-1 font-black text-3xl tracking-tighter border-2 border-white">
            AF
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            Argentina en Finanzas
          </h1>
        </div>

        {/* MENÚ DE CATEGORÍAS */}
        <nav className="max-w-7xl mx-auto mt-8 flex gap-8 text-[12px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-800 pb-4">
          <span className="text-white border-b-2 border-blue-600 pb-4 cursor-pointer">Noticias</span>
          <span className="hover:text-white cursor-pointer transition-colors">Economía</span>
          <span className="hover:text-white cursor-pointer transition-colors">Finanzas</span>
          <span className="hover:text-white cursor-pointer transition-colors">Dólar Blue</span>
          <span className="hover:text-white cursor-pointer transition-colors">Cripto</span>
        </nav>
      </header>

      {/* PARED NEGRA (TICKER DE MERCADOS) */}
      <div className="bg-black w-full relative z-50 shadow-2xl border-b border-gray-900">
        <Mercados />
      </div>

      {/* LISTADO DE NOTICIAS EXTERNAS */}
      <div className="max-w-7xl mx-auto mt-12 p-6 w-full text-black">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {noticias.length > 0 ? (
            noticias.map((post: any) => (
              <div key={post.id} className="border-b md:border-b-0 md:border-r border-gray-100 pr-0 md:pr-8 pb-8">
                <span className="text-blue-600 font-bold text-[10px] uppercase tracking-widest">Reciente</span>
                <h2 
                  className="text-2xl font-black mt-2 leading-tight hover:text-blue-700 cursor-pointer" 
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
                />
                <div 
                  className="text-gray-600 mt-4 text-sm line-clamp-3 leading-relaxed" 
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} 
                />
                <p className="text-[10px] text-gray-400 mt-6 uppercase font-bold tracking-tighter">
                  {new Date(post.date).toLocaleDateString('es-AR')}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-20">
              <p className="text-gray-400 italic text-lg">Subí tu primera noticia al panel de WordPress para verla aquí.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
