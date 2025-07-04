import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes
} from 'sequelize';
import sequelize from '../config/database';

export class CustomerModel extends Model<
  InferAttributes<CustomerModel>,
  InferCreationAttributes<CustomerModel>
> {
  declare id: string;
  declare name: string;
  declare email: string;
  declare phone: string;
}

CustomerModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    phone: DataTypes.STRING
  },
  {
    sequelize,
    modelName: 'Customer'
  }
);

export default CustomerModel;
