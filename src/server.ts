import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

export default class Server {

    expressInstance: express.Express;

    constructor() {

        this.expressInstance = express();
        this.middlewareSetup();
        this.routingSetup();

    }

    private middlewareSetup() {

        this.expressInstance.use(cors());

        this.expressInstance.use(bodyParser.json());

    }

    private routingSetup() {

    }

}