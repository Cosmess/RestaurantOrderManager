import { MenuItem } from '../entities/MenuItem';

export interface IMenuRepository {
  create(item: MenuItem): Promise<MenuItem>;
  findById(id: string): Promise<MenuItem | null>;
  findAll(category?: string, page?: number, limit?: number): Promise<MenuItem[]>;
}
