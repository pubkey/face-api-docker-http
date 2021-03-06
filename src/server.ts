import express from 'express';
import * as bodyParser from 'body-parser';

import { detectFaces } from './detect-faces';
import { Server } from 'http';
const multer = require('multer');
const upload = multer();

export function startServer(port: number): Promise<Server> {
    const app = express();
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

    // info to show it is up
    app.get('/', async (req, res) => {
        res.json({
            up: true
        });
    });

    // image upload method
    app.post('/upload', upload.single('image'), async (req, res) => {
        console.log('# got image via upload');
        console.dir((req as any).file);
        const imageBuffer: Buffer = (req as any).file.buffer;
        const responseData = await detectFaces(imageBuffer);
        res.json(responseData);
    });

    // base64 method
    app.post('/base64', async (req, res) => {
        console.log('# got image as base64');
        const base64 = req.body.image;
        const imageBuffer = Buffer.from(base64, 'base64');
        const responseData = await detectFaces(imageBuffer);
        res.json(responseData);
    });


    return new Promise(res => {
        const server = app.listen(port, '0.0.0.0', () => {
            console.log('Started server on port ' + port);
            res(server);
        });
    });
}
