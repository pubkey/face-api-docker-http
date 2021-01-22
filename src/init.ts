import * as path from 'path';

const MODELS_DIR = path.join(
    __dirname,
    'models'
);

let INIT_PROMISE: null | Promise<void> = null;
export async function initFaceDetection() {
    if (!INIT_PROMISE) {
        INIT_PROMISE = (async () => {

            // tensorflow does things at startup so we load it lazy
            const tf = require('@tensorflow/tfjs-node');
            // https://github.com/tensorflow/tfjs/issues/4029#issuecomment-704833302
            tf.env().set('WEBGL_CPU_FORWARD', false);

            const { Canvas, Image, ImageData } = require('canvas');
            const faceapi = require('face-api.js');
            faceapi.env.monkeyPatch({ Canvas, Image, ImageData } as any);

            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromDisk(MODELS_DIR),
                faceapi.nets.faceLandmark68Net.loadFromDisk(MODELS_DIR),
                faceapi.nets.faceRecognitionNet.loadFromDisk(MODELS_DIR),
                faceapi.nets.faceExpressionNet.loadFromDisk(MODELS_DIR),
                faceapi.nets.ageGenderNet.loadFromDisk(MODELS_DIR)
            ]);
        })();
    }
    return INIT_PROMISE;
}
