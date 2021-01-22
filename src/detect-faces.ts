import { initFaceDetection } from './init';


import type {
    WithAge,
    WithGender,
    WithFaceLandmarks,
    FaceDetection,
    FaceLandmarks68
} from 'face-api.js';

export type DetectedFace = WithAge<WithGender<WithFaceLandmarks<{
    detection: FaceDetection;
}, FaceLandmarks68>>>;

const tf = require('@tensorflow/tfjs-node');
const faceapi = require('face-api.js');

export async function detectFaces(image: Buffer): Promise<DetectedFace[]> {
    await initFaceDetection();

    const imgTensor = tf.node.decodeJpeg(image);

    const detections = await faceapi.detectAllFaces(
        imgTensor as any,
        new faceapi.TinyFaceDetectorOptions()
    ).withFaceLandmarks().withAgeAndGender();

    // we have to do json-parsing to get a plain json object with no hidden getters
    return JSON.parse(JSON.stringify(detections));
}
