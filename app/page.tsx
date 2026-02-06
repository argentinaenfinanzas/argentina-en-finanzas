import Mercados from './components/Mercados';

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* --- HEADER BLOOMBERG STYLE --- */}
      <header className="bg-black text-white pt-8 pb-0 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          {/* Logo AF Cuadrado */}
          <div className="bg-white text-black px-3 py-1 font-black text-3xl tracking-tighter border-2 border-white">
            AF
          </div>
          {/* Título con Tipografía Pesada */}
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            Argentina en Finanzas
          </h1>
        </div>

        {/* MENÚ DE CATEGORÍAS */}
        <nav className="max-w-7xl mx-auto mt-8 flex gap-8 text-[12px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-800 pb-4">
          <span className="text-white border-b-2 border-blue-600 pb-4 cursor-pointer">Economía</span>
          <span className="hover:text-white cursor-pointer transition-colors">Política</span>
          <span className="hover:text-white cursor-pointer transition-colors">Finanzas</span>
          <span className="hover:text-white cursor-pointer transition-colors">Dólar Blue</span>
          <span className="hover:text-white cursor-pointer transition-colors">Cripto</span>
          <span className="hover:text-white cursor-pointer transition-colors">Región</span>
        </nav>
      </header>

      {/* --- EL TICKER (LA PARED NEGRA) --- */}
      {/* El z-50 y relative aseguran que nada pase por arriba */}
      <div className="bg-black w-full relative z-50 shadow-xl border-b border-gray-900">
        <Mercados />
      </div>

      {/* --- CUERPO DE NOTICIAS --- */}
      {/* El mt-10 da el espacio necesario para que no se pegue al ticker */}
      <div className="max-w-7xl mx-auto mt-10 p-6 w-full text-black">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* NOTICIA PRINCIPAL (EJEMPLO) */}
          <div className="md:col-span-2 border-r border-gray-100 pr-8">
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Economía</span>
            <h2 className="text-4xl font-black mt-2 leading-tight">
              El Gobierno acelera la desregulación financiera y busca nuevas inversiones
            </h2>
            <p className="text-gray-600 mt-4 text-lg">
              El Ministerio de Economía anunció una serie de medidas que buscan flexibilizar el mercado de capitales local para atraer divisas.
            </p>
            <div className="mt-6 h-80 bg-gray-100 rounded-sm">
                {/* Aquí iría tu imagen de noticia */}
            </div>
          </div>

          {/* COLUMNA LATERAL */}
          <div className="flex flex-col gap-8">
            <div>
              <span className="text-red-600 font-bold text-xs uppercase">Último momento</span>
              <h3 className="text-xl font-bold mt-2">El dólar blue opera estable tras la última suba</h3>
              <p className="text-sm text-gray-500 mt-2">Hace 15 minutos</p>
            </div>
            <div className="border-t pt-6">
              <span className="text-orange-600 font-bold text-xs uppercase">Mercados</span>
              <h3 className="text-xl font-bold mt-2">Bitcoin supera los máximos históricos en medio del optimismo global</h3>
              <p className="text-sm text-gray-500 mt-2">Hace 2 horas</p>
            </div>
          </div>

        </section>
      </div>
    </main>
  );
}