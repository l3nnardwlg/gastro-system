import { Request, Response } from 'express';
import { ApiResponse } from '../../shared/types';
import { MenuItem } from './menu.types';

// In-memory store – replace with a database in production
const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Schnitzel',
    description: 'Klassisches Wiener Schnitzel',
    price: 14.9,
    category: 'Hauptgericht',
    available: true,
  },
  {
    id: '2',
    name: 'Caesar Salad',
    description: 'Frischer Salat mit Caesar-Dressing',
    price: 9.5,
    category: 'Vorspeise',
    available: true,
  },
];

export const getAllMenuItems = (_req: Request, res: Response): void => {
  const response: ApiResponse<MenuItem[]> = { success: true, data: menuItems };
  res.json(response);
};

export const getMenuItemById = (req: Request, res: Response): void => {
  const item = menuItems.find((i) => i.id === req.params.id);
  if (!item) {
    const response: ApiResponse<null> = { success: false, error: 'Item not found' };
    res.status(404).json(response);
    return;
  }
  const response: ApiResponse<MenuItem> = { success: true, data: item };
  res.json(response);
};

export const createMenuItem = (req: Request, res: Response): void => {
  const newItem: MenuItem = { id: String(Date.now()), ...req.body };
  menuItems.push(newItem);
  const response: ApiResponse<MenuItem> = { success: true, data: newItem };
  res.status(201).json(response);
};
