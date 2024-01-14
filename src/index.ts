import * as http from 'http';
import expressServer from './server';
import * as dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 3000;

let expressInstance = new expressServer().expressInstance;

expressInstance.set('port', port);

const server = http.createServer(expressInstance);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(): void {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `Listetning on port ${addr.port}`;
    console.log(bind);
}
