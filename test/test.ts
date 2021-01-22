import * as assert from 'assert';
import * as path from 'path';
import * as fs from 'fs';
import got from 'got';
import type {
    Express
} from 'express';
import { startServer } from '../src/server';
import { DetectedFace } from '../src/detect-faces';

async function getExampleImage(): Promise<Buffer> {
    const data = await fs.readFileSync(path.join(__dirname, 'face.jpg'));
    return data;
}


const port = 9090;
const initServer: Promise<Express> = startServer(port);

describe('service', function () {
    this.timeout(10 * 1000);
    describe('init', () => {
        it('start server', async () => {
            await initServer;
        });
    });
    describe('base64', () => {
        it('should detect a face', async () => {
            const buf = await getExampleImage();
            const base64data = buf.toString('base64');
            const postData = {
                image: base64data
            };
            const response = await got.post<DetectedFace[]>({
                url: 'http://localhost:' + port + '/base64',
                responseType: 'json',
                json: postData
            });
            const result = response.body;
            assert.ok(result);
            assert.strictEqual(1, result.length);
        });
    });
    describe('cleanup', () => {
        it('stop server', async () => {
            const server = await initServer;
            server.close();
        })
    });
});
