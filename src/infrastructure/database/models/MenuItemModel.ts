import sequelize from '../config/database';

import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';

export class MenuItemModel extends Model<InferAttributes<MenuItemModel>, InferCreationAttributes<MenuItemModel>> {
  declare id: string;
  declare name: string;
  declare description: string;
  declare price: number;
  declare category: 'starter' | 'main_course' | 'dessert' | 'drink';
}

MenuItemModel.init({
  id: { type: DataTypes.UUID, primaryKey: true },
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  price: DataTypes.FLOAT,
  category: DataTypes.ENUM('starter', 'main_course', 'dessert', 'drink')
}, { sequelize, modelName: 'MenuItem' });

export default MenuItemModel;
