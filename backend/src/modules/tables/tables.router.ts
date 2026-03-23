import { Router } from 'express';
import { getAllTables, getTableById, updateTableStatus } from './tables.controller';

const router = Router();

router.get('/', getAllTables);
router.get('/:id', getTableById);
router.patch('/:id/status', updateTableStatus);

export default router;
