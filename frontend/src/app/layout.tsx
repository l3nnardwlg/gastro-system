import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AGF-Gastro System',
  description: 'Modulares Gastronomieverwaltungssystem',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0 }}>
        <nav
          style={{
            background: '#1a1a2e',
            color: 'white',
            padding: '1rem 2rem',
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center',
          }}
        >
          <strong style={{ fontSize: '1.2rem' }}>🍽️ AGF-Gastro</strong>
          <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="/menu" style={{ color: 'white', textDecoration: 'none' }}>Speisekarte</a>
          <a href="/orders" style={{ color: 'white', textDecoration: 'none' }}>Bestellungen</a>
          <a href="/tables" style={{ color: 'white', textDecoration: 'none' }}>Tische</a>
        </nav>
        <main style={{ padding: '2rem' }}>{children}</main>
      </body>
    </html>
  );
}
