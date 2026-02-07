"use client";

import { useMemo, useState } from "react";
import Mercados from "./components/Mercados";

type NewsItem = {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  time: string;
  image: string;
  body: string;
};

const categories = [
  "Todas",
  "Economía",
  "Política",
  "Finanzas",
  "Desregulación",
  "Dólar Blue",
  "Criptomonedas",
  "Región",
];

const initialNews: NewsItem[] = [
  {
    id: "1",
    category: "Economía",
    title: "El dólar blue opera estable tras la última licitación",
    subtitle: "El mercado cambiario mantiene un ritmo moderado en la plaza informal.",
    time: "Hace 15 minutos",
    image: "",
    body:
      "Operadores destacaron que la jornada mostró una demanda contenida, mientras la oferta se mantuvo pareja. Analistas esperan señales sobre la política monetaria de corto plazo.",
  },
  {
    id: "2",
    category: "Política",
    title: "El Gobierno analiza nuevas medidas fiscales para el segundo trimestre",
    subtitle: "Se evalúan incentivos para sectores exportadores y ajustes impositivos.",
    time: "Hace 35 minutos",
    image: "",
    body:
      "Fuentes oficiales indican que el paquete incluiría cambios en regímenes especiales y una agenda de simplificación. Se esperan anuncios en los próximos días.",
  },
  {
    id: "3",
    category: "Finanzas",
    title: "Las provincias buscan refinanciar deuda con foco en el mercado local",
    subtitle: "Se priorizan emisiones en pesos y extensión de plazos.",
    time: "Hace 1 hora",
    image: "",
    body:
      "Los equipos financieros negocian con entidades locales para renovar vencimientos. El objetivo es reducir la exposición en moneda extranjera.",
  },
  {
    id: "4",
    category: "Criptomonedas",
    title: "Bitcoin se sostiene arriba de los USD 40.000 con bajo volumen",
    subtitle: "El mercado cripto sigue atento a los datos macro de Estados Unidos.",
    time: "Hace 2 horas",
    image: "",
    body:
      "El impulso se mantiene, aunque con operaciones más moderadas. Traders observan los próximos reportes de inflación y empleo.",
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [formData, setFormData] = useState({
    category: "Economía",
    title: "",
    subtitle: "",
    image: "",
    body: "",
  });

  const filteredNews = useMemo(() => {
    if (selectedCategory === "Todas") return news;
    return news.filter((item) => item.category === selectedCategory);
  }, [news, selectedCategory]);

  const mainStory = filteredNews[0];
  const sideStories = filteredNews.slice(1);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.title.trim() || !formData.subtitle.trim() || !formData.body.trim()) {
      return;
    }

    const newItem: NewsItem = {
      id: `${Date.now()}`,
      category: formData.category,
      title: formData.title.trim(),
      subtitle: formData.subtitle.trim(),
      time: "Recién publicada",
      image: formData.image.trim(),
      body: formData.body.trim(),
    };

    setNews((prev) => [newItem, ...prev]);
    setSelectedCategory("Todas");
    setFormData({
      category: "Economía",
      title: "",
      subtitle: "",
      image: "",
      body: "",
    });
  };

  return (
    <main className="site-shell">
      <header className="site-header">
        <div className="brand">
          <div className="brand-mark">AF</div>
          <div className="brand-text">
            <span className="brand-title">Argentina en Finanzas</span>
            <span className="brand-tagline">Noticias financieras</span>
          </div>
        </div>

        <nav className="site-nav">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`nav-item${selectedCategory === category ? " is-active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </nav>
      </header>

      <section className="content-grid">
        <aside className="news-list">
          <h2 className="section-title">Últimas noticias</h2>
          {sideStories.length === 0 && (
            <p className="news-empty">No hay noticias en esta categoría todavía.</p>
          )}
          {sideStories.map((item) => (
            <article key={item.id} className="news-item">
              <p className="news-kicker">{item.category}</p>
              <h3>{item.title}</h3>
              <p className="news-subtitle">{item.subtitle}</p>
              <p className="news-meta">{item.time}</p>
            </article>
          ))}
        </aside>

        <article className="main-story">
          {mainStory ? (
            <>
              <p className="news-kicker">{mainStory.category} · Hoy</p>
              <h1>{mainStory.title}</h1>
              <p className="lead">{mainStory.subtitle}</p>
              <div className="main-image">
                {mainStory.image ? (
                  <img src={mainStory.image} alt={mainStory.title} />
                ) : (
                  "Imagen principal"
                )}
              </div>
              <p className="body-copy">{mainStory.body}</p>
            </>
          ) : (
            <p className="news-empty">Elegí una categoría con noticias para ver el detalle.</p>
          )}
        </article>

        <aside className="markets-panel">
          <div className="panel-header">
            <h2>Mercados en vivo</h2>
            <span>Últimas 24h</span>
          </div>
          <Mercados />

          <div className="panel-header panel-spaced">
            <h2>Crear noticia</h2>
            <span>Manual</span>
          </div>
          <form className="news-form" onSubmit={handleSubmit}>
            <label>
              Categoría
              <select
                value={formData.category}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, category: event.target.value }))
                }
              >
                {categories.filter((item) => item !== "Todas").map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Título
              <input
                type="text"
                value={formData.title}
                onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
                placeholder="Título de la noticia"
              />
            </label>
            <label>
              Subtítulo
              <input
                type="text"
                value={formData.subtitle}
                onChange={(event) => setFormData((prev) => ({ ...prev, subtitle: event.target.value }))}
                placeholder="Resumen corto"
              />
            </label>
            <label>
              URL de imagen
              <input
                type="text"
                value={formData.image}
                onChange={(event) => setFormData((prev) => ({ ...prev, image: event.target.value }))}
                placeholder="https://..."
              />
            </label>
            <label>
              Cuerpo
              <textarea
                value={formData.body}
                onChange={(event) => setFormData((prev) => ({ ...prev, body: event.target.value }))}
                placeholder="Texto completo de la noticia"
                rows={6}
              />
            </label>
            <button type="submit">Publicar noticia</button>
          </form>
        </aside>
      </section>
    </main>
  );
}
