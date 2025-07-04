import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { Order } from '../../domain/entities/Order';
import OrderModel from '../database/models/OrderModel';

export class OrderRepository implements IOrderRepository {
  async create(order: Order): Promise<Order> {
    await OrderModel.create(order);
    return order;
  }

  async findByCustomerId(customerId: string, page = 1, limit = 10): Promise<Order[]> {
    const offset = (page - 1) * limit;
    const results = await OrderModel.findAll({ where: { customer_id: customerId }, offset, limit });
    return results.map(r => new Order(r.id, r.customer_id, r.items, r.status, r.total));
  }

  async findById(id: string): Promise<Order | null> {
    const r = await OrderModel.findByPk(id);
    return r ? new Order(r.id, r.customer_id, r.items, r.status, r.total) : null;
  }

  async updateStatus(
    id: string,
    status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'canceled'
  ): Promise<void> {
    await OrderModel.update({ status }, { where: { id } });
  }

  async updateItems(id: string, items: { menu_item_id: string; quantity: number; }[], total?: number): Promise<void> {
    await OrderModel.update({ items, total }, { where: { id } });
  }
}
