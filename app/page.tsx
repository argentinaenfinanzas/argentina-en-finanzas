export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Mercados from './components/Mercados';

export default async function Home() {
  // Traemos la noticia directamente con un truco para que no se guarde en cache
  const res = await fetch(`https://public-api.wordpress.com/wp/v2/sites/argentinaenfinanzaspanel.wordpress.com/posts?_embed&timestamp=${Date.now()}`, { cache: 'no-store' });
  const noticias = await res.json();

  return (
    <main className="min-h-screen bg-white text-black">
      {/* SI VES ESTO, EL CÓDIGO FINALMENTE SE ACTUALIZÓ */}
      <div className="bg-yellow-400 text-black text-center font-bold py-2">
        CONEXIÓN EN VIVO CON WORDPRESS ACTIVA
      </div>

      <header className="bg-black text-white p-8">
        <h1 className="text-4xl font-bold">AF - Argentina en Finanzas</h1>
      </header>

      <Mercados />

      <div className="p-10">
        {noticias.map((post: any) => (
          <div key={post.id} className="mb-10 border-b pb-5">
            <h2 className="text-3xl font-black" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            <div className="mt-4 text-gray-700" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </div>
        ))}
      </div>
    </main>
  );
}
