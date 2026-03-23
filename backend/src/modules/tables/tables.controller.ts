import { Request, Response } from 'express';
import { ApiResponse } from '../../shared/types';
import { Table } from './tables.types';

const tables: Table[] = [
  { id: '1', number: 1, seats: 4, status: 'free' },
  { id: '2', number: 2, seats: 2, status: 'free' },
  { id: '3', number: 3, seats: 6, status: 'free' },
];

export const getAllTables = (_req: Request, res: Response): void => {
  const response: ApiResponse<Table[]> = { success: true, data: tables };
  res.json(response);
};

export const getTableById = (req: Request, res: Response): void => {
  const table = tables.find((t) => t.id === req.params.id);
  if (!table) {
    const response: ApiResponse<null> = { success: false, error: 'Table not found' };
    res.status(404).json(response);
    return;
  }
  const response: ApiResponse<Table> = { success: true, data: table };
  res.json(response);
};

export const updateTableStatus = (req: Request, res: Response): void => {
  const table = tables.find((t) => t.id === req.params.id);
  if (!table) {
    const response: ApiResponse<null> = { success: false, error: 'Table not found' };
    res.status(404).json(response);
    return;
  }
  table.status = req.body.status;
  const response: ApiResponse<Table> = { success: true, data: table };
  res.json(response);
};
