import { ModifyOrderUseCase } from '../src/application/use-cases/ModifyOrderUseCase';
import { MenuItem } from '../src/domain/entities/MenuItem';

const fakeMenuItem = new MenuItem('m1', 'Coke', 'Drink', 5, 'drink');
const fakeOrder = {
  id: 'o1',
  items: [],
  total: 0,
  status: 'pending',
  updateItems(items: any[], total: number) {
    this.items = items;
    this.total = total;
  }
};

import { Order } from '../src/domain/entities/Order';
type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered' | 'canceled';

class FakeOrderRepo {
  private order: Order;
  constructor(orderInstance: Order) {
    this.order = orderInstance;
  }
  async findById(id: string): Promise<Order | null> {
    return id === this.order.id ? this.order : null;
  }
  async update(order: Order): Promise<Order> {
    this.order = order;
    return this.order;
  }
  async create(order: any): Promise<Order> {
    return new Order('new_order_id', order.customer_id, order.items || [], 'pending', order.total || 0);
  }
  async findByCustomerId(customerId: string): Promise<Order[]> {
    return [];
  }
  async updateStatus(orderId: string, status: OrderStatus): Promise<void> {
    if (orderId === this.order.id) {
      this.order.status = status;
    }
  }
  async updateItems(orderId: string, items: any[], total?: number): Promise<void> {
    if (orderId === this.order.id) {
      this.order.items = items;
      if (typeof total === 'number') {
        this.order.total = total;
      }
    }
  }
  getOrder() {
    return this.order;
  }
}
class FakeMenuRepo {
  async findById(id: string) {
    return id === 'm1' ? fakeMenuItem : null;
  }
  async create(item: any) {
    return item;
  }
  async findAll(category?: string, page = 1, limit = 10) {
    return [];
  }
}

describe('ModifyOrderUseCase', () => {
  it('should modify order with valid items', async () => {
    const orderInstance = new Order('o1', 'c1', [], 'pending', 0);
    const repo = new FakeOrderRepo(orderInstance);
    const useCase = new ModifyOrderUseCase(repo, new FakeMenuRepo());
    await useCase.execute({
      order_id: 'o1',
      items: [{ menu_item_id: 'm1', quantity: 2 }]
    });
    expect(repo.getOrder().items.length).toBe(1);
  });

  it('should fail if order not found', async () => {
    const useCase = new ModifyOrderUseCase({
      findById: async () => null,
      update: async () => { throw new Error('Order not found'); },
      create: async () => { throw new Error('not implemented'); },
      findByCustomerId: async () => [],
      updateStatus: async () => {},
      updateItems: async () => {}
    } as any, new FakeMenuRepo());
    await expect(useCase.execute({
      order_id: 'x',
      items: [{ menu_item_id: 'm1', quantity: 1 }]
    })).rejects.toThrow('Order not found');
  });

  it('should fail if order already delivered', async () => {
    const deliveredOrder = new Order('o1', 'c1', [], 'delivered', 0);
    const useCase = new ModifyOrderUseCase({
      findById: async () => deliveredOrder,
      update: async () => { throw new Error('Cannot modify order'); },
      create: async () => { throw new Error('not implemented'); },
      findByCustomerId: async () => [],
      updateStatus: async () => {},
      updateItems: async () => {}
    } as any, new FakeMenuRepo());
    await expect(useCase.execute({
      order_id: 'o1',
      items: [{ menu_item_id: 'm1', quantity: 1 }]
    })).rejects.toThrow('Cannot modify order');
  });
});
