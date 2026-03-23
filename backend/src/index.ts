import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

app.listen(PORT, () => {
  console.log(`🍽️  Gastro-System API running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`   Menu:   http://localhost:${PORT}/api/menu`);
  console.log(`   Orders: http://localhost:${PORT}/api/orders`);
  console.log(`   Tables: http://localhost:${PORT}/api/tables`);
});
