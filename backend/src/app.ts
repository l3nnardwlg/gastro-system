import express from 'express';
import cors from 'cors';
import menuRouter from './modules/menu/menu.router';
import ordersRouter from './modules/orders/orders.router';
import tablesRouter from './modules/tables/tables.router';

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'gastro-system-api' });
});

// Module routes
app.use('/api/menu', menuRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/tables', tablesRouter);

export default app;
