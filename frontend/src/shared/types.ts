export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
}

export type OrderStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  tableId: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: string;
  total: number;
}

export type TableStatus = 'free' | 'occupied' | 'reserved';

export interface Table {
  id: string;
  number: number;
  seats: number;
  status: TableStatus;
}
