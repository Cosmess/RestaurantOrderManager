import { ICustomerRepository } from '../../domain/repositories/ICustomerRepository';
import { Customer } from '../../domain/entities/Customer';
import { v4 as uuidv4 } from 'uuid';

interface CreateCustomerRequest {
  name: string;
  email: string;
  phone: string;
}

export class CreateCustomerUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(data: CreateCustomerRequest): Promise<Customer> {
    const existing = await this.customerRepository.findByEmail(data.email);
    if (existing) throw new Error('Email already in use');

    const customer = new Customer(uuidv4(), data.name, data.email, data.phone);
    return await this.customerRepository.create(customer);
  }
}
