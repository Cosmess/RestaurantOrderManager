import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes
} from 'sequelize';
import sequelize from '../config/database';

export class OrderModel extends Model<
  InferAttributes<OrderModel>,
  InferCreationAttributes<OrderModel>
> {
  declare id: string;
  declare customer_id: string;
  declare items: Array<{ menu_item_id: string; quantity: number }>;
  declare status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'canceled';
  declare total: number;
}

OrderModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    customer_id: DataTypes.UUID,
    items: DataTypes.JSONB,
    status: DataTypes.ENUM('pending', 'preparing', 'ready', 'delivered', 'canceled'),
    total: DataTypes.FLOAT
  },
  {
    sequelize,
    modelName: 'Order'
  }
);

export default OrderModel;
