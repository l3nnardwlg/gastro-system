import { Router } from 'express';
import { getAllOrders, getOrderById, createOrder, updateOrderStatus } from './orders.controller';

const router = Router();

router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.patch('/:id/status', updateOrderStatus);

export default router;
