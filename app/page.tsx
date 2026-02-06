import Mercados from './components/Mercados';

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* HEADER PRINCIPAL */}
      <header className="bg-black text-white pt-8 pb-0 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          {/* Logo AF Cuadrado como el original */}
          <div className="bg-white text-black px-3 py-1 font-black text-3xl tracking-tighter border-2 border-white">
            AF
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            Argentina en Finanzas
          </h1>
        </div>

        {/* NAVEGACIÓN DE CATEGORÍAS */}
        <nav className="max-w-7xl mx-auto mt-8 flex gap-8 text-[12px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-800 pb-4">
          <span className="text-white border-b-2 border-blue-600 pb-4 cursor-pointer">Economía</span>
          <span className="hover:text-white cursor-pointer transition-colors">Política</span>
          <span className="hover:text-white cursor-pointer transition-colors">Finanzas</span>
          <span className="hover:text-white cursor-pointer transition-colors">Dólar Blue</span>
          <span className="hover:text-white cursor-pointer transition-colors">Cripto</span>
        </nav>
      </header>

      {/* LA PARED NEGRA (CONTENEDOR DEL TICKER) */}
      {/* Esto separa visualmente el header de las noticias y evita que se mezclen */}
      <div className="bg-black w-full relative z-50 shadow-2xl">
        <Mercados />
      </div>

      {/* CUERPO DE NOTICIAS CON MARGEN */}
      {/* El mt-12 es la clave para que las noticias no se metan debajo del ticker */}
      <div className="max-w-7xl mx-auto mt-12 p-6 w-full text-black">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* COLUMNA PRINCIPAL */}
          <div className="md:col-span-2 border-r border-gray-100 pr-8">
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Economía • Hoy</span>
            <h2 className="text-4xl font-black mt-2 leading-tight">
              El Gobierno acelera la desregulación del sistema financiero
            </h2>
            <p className="text-gray-600 mt-4 text-lg leading-relaxed">
              El Ejecutivo prepara nuevas medidas para flexibilizar el mercado financiero y atraer inversiones.
            </p>
            {/* Espacio para imagen de noticia */}
            <div className="mt-8 h-96 bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 italic">
               Imagen de la noticia principal
            </div>
          </div>

          {/* COLUMNA LATERAL */}
          <div className="flex flex-col gap-10">
            <div className="border-b border-gray-100 pb-6">
              <span className="text-gray-900 font-bold text-xs uppercase tracking-widest">Mercados en Vivo</span>
              <h3 className="text-xl font-bold mt-4 leading-snug">El dólar blue opera estable tras la última licitación</h3>
              <p className="text-sm text-gray-400 mt-2 font-mono uppercase">Dólar Blue</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold leading-snug">Criptomonedas: Bitcoin se mantiene por encima de los USD 40.000</h3>
              <p className="text-sm text-gray-400 mt-2 font-mono uppercase">Criptomonedas</p>
            </div>
          </div>

        </section>
      </div>
    </main>
  );
}