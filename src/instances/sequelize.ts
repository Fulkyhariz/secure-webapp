import {Sequelize}  from 'sequelize'
import {config} from 'dotenv'; 

const dotenv = config({path:'../../.env'});
const db = 'expressapp'
const username = 'root'
const password = 'root'

export const sequelize = new Sequelize(db, username, password, {
  dialect: "mysql",
  port: 3306,
});

sequelize.authenticate()