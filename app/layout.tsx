import type { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <header
          style={{
            borderBottom: "1px solid #e5e5e5",
            padding: "20px 32px",
            marginBottom: "32px",
          }}
        >
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 700,
              marginBottom: "14px",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            Argentina en Finanzas
          </h1>

          <nav
            style={{
              display: "flex",
              gap: "20px",
              fontSize: "13px",
              fontWeight: 500,
              textTransform: "uppercase",
            }}
          >
            <a href="#">Economía</a>
            <a href="#">Política</a>
            <a href="#">Finanzas</a>
            <a href="#">Desregulación</a>
            <a href="#">Dólar Blue</a>
            <a href="#">Criptomonedas</a>
            <a href="#">Región</a>
          </nav>
        </header>

        <main style={{ padding: "0 32px 32px 32px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
