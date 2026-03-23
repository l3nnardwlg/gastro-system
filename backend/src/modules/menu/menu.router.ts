import { Router } from 'express';
import { getAllMenuItems, getMenuItemById, createMenuItem } from './menu.controller';

const router = Router();

router.get('/', getAllMenuItems);
router.get('/:id', getMenuItemById);
router.post('/', createMenuItem);

export default router;
