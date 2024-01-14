import database from '../config/db';
import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

let db = new database().database;

export interface UserInterface {
    name: string;
    lastname: string;
    age: number;
}

interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    id: CreationOptional<number>;
    name: string;
    lastname: string;
    age: number;
  }

export const User = db.define<UserModel>('User', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    name: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    age : {
        type: DataTypes.INTEGER.UNSIGNED
    }
  });