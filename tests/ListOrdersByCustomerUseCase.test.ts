import { ListOrdersByCustomerUseCase } from '../src/application/use-cases/ListOrdersByCustomerUseCase';

import { Order } from '../src/domain/entities/Order';

type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered' | 'canceled';

class FakeOrderRepo {
  async findByCustomerId(customer_id: string, page: number, limit: number): Promise<Order[]> {
    return [
      new Order('o1', customer_id, [], 'pending', 20),
      new Order('o2', customer_id, [], 'pending', 15)
    ];
  }

  async create(order: any): Promise<Order> {
    return new Order('new_order_id', order.customer_id, order.items || [], 'pending', order.total || 0);
  }

  async findById(order_id: string): Promise<Order | null> {
    if (order_id === 'o1') {
      return new Order('o1', 'c1', [], 'pending', 20);
    }
    return null;
  }

  async updateStatus(order_id: string, status: OrderStatus): Promise<void> {
    // no-op for test
  }

  async updateItems(order_id: string, items: any[]): Promise<void> {
    // no-op for test
  }
}

describe('ListOrdersByCustomerUseCase', () => {
  it('should return orders for customer', async () => {
    const useCase = new ListOrdersByCustomerUseCase(new FakeOrderRepo());
    const orders = await useCase.execute({ customer_id: 'c1', page: 1, limit: 10 });
    expect(orders.length).toBe(2);
    expect(orders[0].id).toBe('o1');
  });
});
