import { Order } from '../entities/Order';

export interface IOrderRepository {
  create(order: Order): Promise<Order>;
  findByCustomerId(customerId: string, page: number, limit: number): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  updateStatus(id: string, status: string): Promise<void>;
  updateItems(id: string, items: { menu_item_id: string; quantity: number }[], total?: number): Promise<void>;
}
