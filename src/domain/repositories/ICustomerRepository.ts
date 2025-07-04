import { Customer } from '../entities/Customer';

export interface ICustomerRepository {
  create(customer: Customer): Promise<Customer>;
  findByEmail(email: string): Promise<Customer | null>;
  findById(id: string): Promise<Customer | null>;
}
