import { ICustomerRepository } from '../../domain/repositories/ICustomerRepository';
import { Customer } from '../../domain/entities/Customer';
import CustomerModel from '../database/models/CustomerModel';

export class CustomerRepository implements ICustomerRepository {
  async create(customer: Customer): Promise<Customer> {
    await CustomerModel.create(customer);
    return customer;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const model = await CustomerModel.findOne({ where: { email } });
    return model ? new Customer(model.id, model.name, model.email, model.phone) : null;
  }

  async findById(id: string): Promise<Customer | null> {
    const model = await CustomerModel.findByPk(id);
    return model ? new Customer(model.id, model.name, model.email, model.phone) : null;
  }
}
