import { UpdateOrderStatusUseCase } from '../src/application/use-cases/UpdateOrderStatusUseCase';

const order: {
  id: string;
  customer_id: string;
  items: any[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'canceled';
  updateStatus: (newStatus: 'pending' | 'preparing' | 'ready' | 'delivered' | 'canceled') => void;
} = {
  id: 'o1',
  customer_id: 'c1',
  items: [],
  total: 0,
  status: 'pending',
  updateStatus(newStatus: 'pending' | 'preparing' | 'ready' | 'delivered' | 'canceled') {
    this.status = newStatus;
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
  async create(orderData: any): Promise<Order> {
    return new Order('new_order_id', orderData.customer_id, orderData.items || [], 'pending', orderData.total || 0);
  }
  async findByCustomerId(customerId: string): Promise<Order[]> {
    return [];
  }
  async updateStatus(orderId: string, status: OrderStatus): Promise<void> {
    if (orderId === this.order.id) {
      this.order.status = status;
    }
  }
  async updateItems(orderId: string, items: any[]): Promise<void> {
    if (orderId === this.order.id) {
      this.order.items = items;
    }
  }
  getOrder() {
    return this.order;
  }
}

describe('UpdateOrderStatusUseCase', () => {
  it('should update status correctly', async () => {
    const orderInstance = new Order('o1', 'c1', [], 'pending', 0);
    const repo = new FakeOrderRepo(orderInstance);
    const useCase = new UpdateOrderStatusUseCase(repo);
    await useCase.execute({ order_id: 'o1', status: 'ready' });
    expect(repo.getOrder().status).toBe('ready');
  });

  it('should fail with invalid order id', async () => {
    const useCase = new UpdateOrderStatusUseCase({
      findById: async () => null,
      updateStatus: async () => { throw new Error('Order not found'); },
      updateItems: async () => {},
      create: async () => { throw new Error('not implemented'); },
      findByCustomerId: async () => []
    });
    await expect(useCase.execute({ order_id: 'fail', status: 'delivered' })).rejects.toThrow('Order not found');
  });
});
