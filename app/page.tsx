import Mercados from "./components/Mercados";

export default function Home() {
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
          <a href="#">Economía</a>
          <a href="#">Política</a>
          <a href="#">Finanzas</a>
          <a href="#">Desregulación</a>
          <a href="#">Dólar Blue</a>
          <a href="#">Criptomonedas</a>
          <a href="#">Región</a>
        </nav>
      </header>

      <section className="content-grid">
        <aside className="news-list">
          <h2 className="section-title">Últimas noticias</h2>
          <article className="news-item">
            <p className="news-kicker">Economía</p>
            <h3>El dólar blue opera estable tras la última licitación</h3>
            <p className="news-meta">Hace 15 minutos</p>
          </article>
          <article className="news-item">
            <p className="news-kicker">Política</p>
            <h3>El Gobierno analiza nuevas medidas fiscales para el segundo trimestre</h3>
            <p className="news-meta">Hace 35 minutos</p>
          </article>
          <article className="news-item">
            <p className="news-kicker">Finanzas</p>
            <h3>Las provincias buscan refinanciar deuda con foco en el mercado local</h3>
            <p className="news-meta">Hace 1 hora</p>
          </article>
          <article className="news-item">
            <p className="news-kicker">Criptomonedas</p>
            <h3>Bitcoin se sostiene arriba de los USD 40.000 con bajo volumen</h3>
            <p className="news-meta">Hace 2 horas</p>
          </article>
        </aside>

        <article className="main-story">
          <p className="news-kicker">Economía · Hoy</p>
          <h1>El Gobierno acelera la desregulación del sistema financiero</h1>
          <p className="lead">
            El Ejecutivo prepara nuevas medidas para flexibilizar el mercado y atraer inversiones en el corto
            plazo.
          </p>
          <div className="main-image">Imagen principal</div>
          <p className="body-copy">
            Analistas del sector destacaron que el paquete incluiría ajustes en el marco regulatorio y una agenda
            de simplificación para entidades financieras y fintech.
          </p>
        </article>

        <aside className="markets-panel">
          <div className="panel-header">
            <h2>Mercados en vivo</h2>
            <span>Actualizado</span>
          </div>
          <Mercados />
        </aside>
      </section>
    </main>
  );
}
