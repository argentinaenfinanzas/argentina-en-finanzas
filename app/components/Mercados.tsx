'use client';

import { useEffect, useState } from 'react';

export default function Mercados() {
  const [blue, setBlue] = useState('-');
  const [btc, setBtc] = useState('-');

  useEffect(() => {
    // Obtener Dólar Blue
    fetch('https://api.bluelytics.com.ar/v2/latest')
      .then((r) => r.json())
      .then((d) => setBlue(`$${d.blue.value_sell}`))
      .catch(() => setBlue('-'));

    // Obtener Bitcoin
    fetch('https://api.coindesk.com/v1/bpi/currentprice/USD.json')
      .then((r) => r.json())
      .then((d) => setBtc(`USD ${Math.round(d.bpi.USD.rate_float)}`))
      .catch(() => setBtc('-'));
  }, []);

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      <li style={{ marginBottom: '8px' }}>
        <strong>Dólar Blue:</strong> <span style={{ color: '#2ecc71' }}>{blue}</span>
      </li>
      <li>
        <strong>Bitcoin:</strong> <span style={{ color: '#f1c40f' }}>{btc}</span>
      </li>
    </ul>
  );
}