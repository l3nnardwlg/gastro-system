export type TableStatus = 'free' | 'occupied' | 'reserved';

export interface Table {
  id: string;
  number: number;
  seats: number;
  status: TableStatus;
}
