import { startServer } from './server';
import { initFaceDetection } from './init';

async function start() {
    await initFaceDetection();
    const server = await startServer(8080);
}

start();
