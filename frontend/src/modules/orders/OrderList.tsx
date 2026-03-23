'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/shared/api';
import { ApiResponse, Order } from '@/shared/types';

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi<ApiResponse<Order[]>>('/api/orders')
      .then((res) => {
        if (res.success && res.data) setOrders(res.data);
      })
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Unknown error'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Wird geladen…</p>;
  if (error) return <p style={{ color: 'red' }}>Fehler: {error}</p>;
  if (orders.length === 0) return <p>Keine Bestellungen vorhanden.</p>;

  return (
    <ul>
      {orders.map((order) => (
        <li key={order.id}>
          Tisch {order.tableId} – {order.items.length} Position(en) – Status:{' '}
          <strong>{order.status}</strong> – Gesamt: €{order.total.toFixed(2)}
        </li>
      ))}
    </ul>
  );
}
