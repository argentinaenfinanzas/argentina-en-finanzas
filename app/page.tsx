import Mercados from './components/Mercados';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* HEADER ESTILO BLOOMBERG */}
      <header className="bg-black text-white p-6 pb-0">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          {/* Logo AF Cuadrado */}
          <div className="border-2 border-white px-2 py-1 font-black text-2xl tracking-tighter">
            AF
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            Argentina en Finanzas
          </h1>
        </div>
        
        {/* Categorías */}
        <nav className="max-w-7xl mx-auto mt-6 flex gap-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-900 pb-4">
          <span className="text-white">Economía</span>
          <span>Política</span>
          <span>Finanzas</span>
          <span>Dólar Blue</span>
        </nav>
      </header>

      {/* EL TICKER - Ahora con su propio espacio para que no se encime */}
      <div className="relative block w-full bg-black h-[50px]">
         <Mercados />
      </div>

      {/* NOTICIAS - Con margen superior para que no se peguen al ticker */}
      <div className="max-w-7xl mx-auto mt-10 p-6">
        {/* Aquí va tu código de noticias actual */}
      </div>
    </main>
  );
}