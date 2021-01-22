import { startServer } from './server';

async function start() {
    const server = await startServer(5006);
}

start();
