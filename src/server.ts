import express from 'express';
import { detectFaces } from './detect-faces';

const multer = require('multer');
const upload = multer();

export function startServer(): Promise<void> {
    const app = express();

    app.post('/detect', upload.single('image'), async (req, res, next) => {
        console.log('# got image');
        console.dir((req as any).file);

        const imageBuffer: Buffer = (req as any).file.buffer;


        const responseData = await detectFaces(imageBuffer);
        res.json(responseData);
    });

    const port = 8080;
    return new Promise(res => {
        app.listen(port, () => {
            console.log('Started server on port ' + port);
            res();
        });
    });
}
