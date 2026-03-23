'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/shared/api';
import { ApiResponse, Table } from '@/shared/types';

const statusColor: Record<string, string> = {
  free: 'green',
  occupied: 'red',
  reserved: 'orange',
};

export default function TableGrid() {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi<ApiResponse<Table[]>>('/api/tables')
      .then((res) => {
        if (res.success && res.data) setTables(res.data);
      })
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Unknown error'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Wird geladen…</p>;
  if (error) return <p style={{ color: 'red' }}>Fehler: {error}</p>;

  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {tables.map((table) => (
        <div
          key={table.id}
          style={{
            border: `2px solid ${statusColor[table.status] ?? 'grey'}`,
            borderRadius: 8,
            padding: '1rem',
            minWidth: 120,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Tisch {table.number}</div>
          <div>{table.seats} Plätze</div>
          <div style={{ color: statusColor[table.status] ?? 'grey', marginTop: 4 }}>
            {table.status}
          </div>
        </div>
      ))}
    </div>
  );
}
