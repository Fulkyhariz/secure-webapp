import {Sequelize} from 'sequelize';
import * as dotenv from 'dotenv'
dotenv.config()

export default class Database {

    db: string;
    user: string;
    password: string;
    host: string;
    port: number;
    maxPool: number;
    minPool: number;
    database: Sequelize;

    constructor() {
        this.db = process.env.MYSQL_DATABASE;
        this.user = process.env.MYSQL_USER;
        this.password = process.env.MYSQL_PASSWORD;
        this.host = process.env.MYSQL_HOST;
        this.port = Number(process.env.MYSQL_PORT);

        this.database = new Sequelize(this.db, this.user, this.password, {
            host: this.host,
            dialect: 'mssql',
        })

        this.database.authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    }
}