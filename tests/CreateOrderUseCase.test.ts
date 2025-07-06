import { CreateOrderUseCase } from '../src/application/use-cases/CreateOrderUseCase';
import { MenuItem } from '../src/domain/entities/MenuItem';
import { Customer } from '../src/domain/entities/Customer';

const fakeMenuItem = new MenuItem('1', 'Burger', 'Yummy', 10, 'main_course');
const fakeCustomer = new Customer('c1', 'Cosme', 'cosme@mail.com', '123');

class FakeOrderRepo {
  public orders: any[] = [];
  async create(order: any) { this.orders.push(order); return order; }
  async findByCustomerId(customerId: string) {
    return this.orders.filter(order => order.customer_id === customerId);
  }
  async findById(id: string) {
    return this.orders.find(order => order.id === id) || null;
  }
  async updateStatus(id: string, status: string) {
    const order = this.orders.find(order => order.id === id);
    if (order) order.status = status;
    return order || null;
  }
  async updateItems(id: string, items: any[]) {
    const order = this.orders.find(order => order.id === id);
    if (order) order.items = items;
    return order || null;
  }
}
class FakeMenuRepo {
  private menuItems = [fakeMenuItem];

  async findById(id: string) {
    return this.menuItems.find(item => item.id === id) || null;
  }

  async create(menuItem: any) {
    this.menuItems.push(menuItem);
    return menuItem;
  }

  async findAll() {
    return this.menuItems;
  }
}
class FakeCustomerRepo {
  private customers = [fakeCustomer];

  async findById(id: string) {
    return this.customers.find(c => c.id === id) || null;
  }

  async create(customer: any) {
    this.customers.push(customer);
    return customer;
  }

  async findByEmail(email: string) {
    return this.customers.find(c => c.email === email) || null;
  }
}

describe('CreateOrderUseCase', () => {
  it('should create a valid order', async () => {
    const useCase = new CreateOrderUseCase(new FakeOrderRepo(), new FakeMenuRepo(), new FakeCustomerRepo());
    const order = await useCase.execute({
      customer_id: 'c1',
      items: [{ menu_item_id: '1', quantity: 2 }]
    });
    expect(order.total).toBe(20);
    expect(order.items.length).toBe(1);
  });

  it('should fail with invalid menu_item_id', async () => {
    const useCase = new CreateOrderUseCase(new FakeOrderRepo(), new FakeMenuRepo(), new FakeCustomerRepo());
    await expect(useCase.execute({
      customer_id: 'c1',
      items: [{ menu_item_id: 'notfound', quantity: 1 }]
    })).rejects.toThrow('Invalid menu item');
  });

  it('should fail with invalid customer_id', async () => {
    const useCase = new CreateOrderUseCase(new FakeOrderRepo(), new FakeMenuRepo(), {
      findById: async () => null,
      create: async () => { throw new Error('Not implemented'); },
      findByEmail: async () => null
    });
    await expect(useCase.execute({
      customer_id: 'invalid',
      items: [{ menu_item_id: '1', quantity: 1 }]
    })).rejects.toThrow('Customer not found');
  });
});
