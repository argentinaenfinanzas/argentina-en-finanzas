import Mercados from './components/Mercados';

export default function HomePage() {
  return (
    <div 
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "32px",
        padding: "32px",
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: "sans-serif"
      }}
    >
      {/* COLUMNA PRINCIPAL (NOTICIAS) */}
      <section>
        <article style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "32px", lineHeight: "1.2", fontWeight: "700" }}>
            El Gobierno acelera la desregulación del sistema financiero
          </h2>
          <p style={{ color: "#555", marginTop: "8px", fontSize: "14px" }}>
            Economía · Hoy
          </p>
          <p style={{ marginTop: "12px", fontSize: "18px", lineHeight: "1.5" }}>
            El Ejecutivo prepara nuevas medidas para flexibilizar el mercado
            financiero y atraer inversiones.
          </p>
        </article>

        <article style={{ marginBottom: "24px", borderTop: "1px solid #eee", paddingTop: "16px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
            El dólar blue opera estable tras la última licitación
          </h3>
          <p style={{ color: "#555", marginTop: "4px" }}>
            Dólar Blue
          </p>
        </article>

        <article style={{ borderTop: "1px solid #eee", paddingTop: "16px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
            Criptomonedas: Bitcoin se mantiene por encima de los USD 40.000
          </h3>
          <p style={{ color: "#555", marginTop: "4px" }}>
            Criptomonedas
          </p>
        </article>
      </section>

      {/* COLUMNA DERECHA (MERCADOS) */}
      <aside style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px", height: "fit-content" }}>
        <h4 style={{ 
          fontSize: "16px", 
          marginBottom: "16px", 
          borderBottom: "2px solid #111", 
          paddingBottom: "8px",
          textTransform: "uppercase" 
        }}>
          Mercados en vivo
        </h4>
        
        {/* Aquí llamamos al componente de los precios */}
        <Mercados />

      </aside>
    </div>
  );
}
