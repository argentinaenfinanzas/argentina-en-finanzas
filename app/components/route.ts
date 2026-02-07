export const dynamic = "force-dynamic";

type Precio = {
  label: string;
  val: string;
  change: number;
};

type Coin = {
  id: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
};

const fallbackPrecios: Precio[] = [
  { label: "Dólar Blue", val: "N/D", change: 0 },
  { label: "BTC", val: "N/D", change: 0 },
  { label: "ETH", val: "N/D", change: 0 },
  { label: "SOL", val: "N/D", change: 0 },
  { label: "Real Brasil", val: "N/D", change: 0 },
  { label: "Sol Peruano", val: "N/D", change: 0 },
];

export async function GET() {
  try {
    const resDolar = await fetch("https://criptoya.com/api/dolar", {
      next: { revalidate: 120 },
    });
    if (!resDolar.ok) {
      throw new Error("Respuesta inválida al consultar el dólar");
    }
    const dataDolar = await resDolar.json();
    const blue = Number(dataDolar?.blue?.ask ?? 0);

    const resCrypto = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana&price_change_percentage=24h",
      { next: { revalidate: 120 } }
    );
    if (!resCrypto.ok) {
      throw new Error("Respuesta inválida al consultar criptomonedas");
    }
    const dataCrypto: Coin[] = await resCrypto.json();

    const format = (id: string): Precio => {
      const coin = dataCrypto.find((item) => item.id === id);
      const currentPrice = coin?.current_price;
      const change = coin?.price_change_percentage_24h;
      return {
        label: coin ? coin.symbol.toUpperCase() : id.toUpperCase(),
        val:
          typeof currentPrice === "number"
            ? `US$ ${currentPrice.toLocaleString()}`
            : "N/D",
        change: typeof change === "number" ? change : 0,
      };
    };

    if (!blue) {
      throw new Error("Datos incompletos para el dólar blue");
    }

    const precios: Precio[] = [
      { label: "Dólar Blue", val: `$${blue}`, change: 0.25 },
      format("bitcoin"),
      format("ethereum"),
      format("solana"),
      { label: "Real Brasil", val: `$${Math.round(0.18 * blue)}`, change: -0.15 },
      { label: "Sol Peruano", val: `$${Math.round(0.27 * blue)}`, change: 0 },
    ];

    return Response.json({ precios });
  } catch (error) {
    console.error(error);
    return Response.json({ precios: fallbackPrecios }, { status: 200 });
  }
}
