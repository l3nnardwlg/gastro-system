'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/shared/api';
import { ApiResponse, MenuItem } from '@/shared/types';

export default function MenuList() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi<ApiResponse<MenuItem[]>>('/api/menu')
      .then((res) => {
        if (res.success && res.data) setItems(res.data);
      })
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Unknown error'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Wird geladen…</p>;
  if (error) return <p style={{ color: 'red' }}>Fehler: {error}</p>;

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <strong>{item.name}</strong> – {item.category} – €{item.price.toFixed(2)}
          {!item.available && <span style={{ color: 'grey' }}> (nicht verfügbar)</span>}
        </li>
      ))}
    </ul>
  );
}
