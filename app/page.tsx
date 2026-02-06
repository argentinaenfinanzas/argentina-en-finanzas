import Mercados from './components/Mercados';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* SECCIÓN LOGO Y NOMBRE */}
      <header className="bg-black text-white pt-8 pb-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          {/* Cuadrado del Logo AF */}
          <div className="bg-white text-black px-3 py-1 font-black text-3xl tracking-tighter border-2 border-white">
            AF
          </div>
          {/* Nombre con tipografía Bloomberg */}
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            Argentina en Finanzas
          </h1>
        </div>

        {/* MENÚ DE CATEGORÍAS */}
        <nav className="max-w-7xl mx-auto mt-8 flex gap-8 text-[12px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-800 pb-4">
          <span className="text-white border-b-2 border-blue-600 pb-4">Economía</span>
          <span className="hover:text-white cursor-pointer transition-colors">Política</span>
          <span className="hover:text-white cursor-pointer transition-colors">Finanzas</span>
          <span className="hover:text-white cursor-pointer transition-colors">Dólar Blue</span>
          <span className="hover:text-white cursor-pointer transition-colors">Cripto</span>
          <span className="hover:text-white cursor-pointer transition-colors">Región</span>
        </nav>
      </header>

      {/* EL TICKER (La "pared" que separa el header de las noticias) */}
      <div className="sticky top-0 z-50 shadow-xl">
        <Mercados />
      </div>

      {/* CONTENIDO DE NOTICIAS (Debajo del ticker) */}
      <section className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Aquí van tus noticias actuales */}
      </section>
    </main>
  );
}
