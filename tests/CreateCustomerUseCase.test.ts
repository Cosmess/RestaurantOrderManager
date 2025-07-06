import { CreateCustomerUseCase } from '../src/application/use-cases/CreateCustomerUseCase';
import { Customer } from '../src/domain/entities/Customer';

class FakeCustomerRepository {
  private customers: Customer[] = [];

  async create(customer: Customer): Promise<Customer> {
    this.customers.push(customer);
    return customer;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    return this.customers.find(c => c.email === email) || null;
  }

  async findById(id: string): Promise<Customer | null> {
    return this.customers.find(c => c.id === id) || null;
  }
}

describe('CreateCustomerUseCase', () => {
  it('should create a new customer', async () => {
    const repo = new FakeCustomerRepository();
    const useCase = new CreateCustomerUseCase(repo);

    const customer = await useCase.execute({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123456789'
    });

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John Doe');
    expect(customer.email).toBe('john@example.com');
  });

  it('should not allow duplicate emails', async () => {
    const repo = new FakeCustomerRepository();
    const useCase = new CreateCustomerUseCase(repo);

    await useCase.execute({ name: 'Jane', email: 'jane@example.com', phone: '111' });

    await expect(
      useCase.execute({ name: 'Jane2', email: 'jane@example.com', phone: '222' })
    ).rejects.toThrow('Email already in use');
  });
});
