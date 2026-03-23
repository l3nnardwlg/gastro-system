import { Request, Response } from 'express';
import { ApiResponse } from '../../shared/types';
import { Order } from './orders.types';

const orders: Order[] = [];

export const getAllOrders = (_req: Request, res: Response): void => {
  const response: ApiResponse<Order[]> = { success: true, data: orders };
  res.json(response);
};

export const getOrderById = (req: Request, res: Response): void => {
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) {
    const response: ApiResponse<null> = { success: false, error: 'Order not found' };
    res.status(404).json(response);
    return;
  }
  const response: ApiResponse<Order> = { success: true, data: order };
  res.json(response);
};

export const createOrder = (req: Request, res: Response): void => {
  const newOrder: Order = {
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
    ...req.body,
  };
  orders.push(newOrder);
  const response: ApiResponse<Order> = { success: true, data: newOrder };
  res.status(201).json(response);
};

export const updateOrderStatus = (req: Request, res: Response): void => {
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) {
    const response: ApiResponse<null> = { success: false, error: 'Order not found' };
    res.status(404).json(response);
    return;
  }
  order.status = req.body.status;
  const response: ApiResponse<Order> = { success: true, data: order };
  res.json(response);
};
