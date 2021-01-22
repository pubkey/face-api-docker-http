# face-api-docker-http
A microservice for face-api.js to detect faces in images via HTTP requests

Runs [face-api.js](https://github.com/justadudewhohacks/face-api.js/) together with an express server.


Docker compose:

```yml
  face-api:
    build: https://github.com/pubkey/face-api-docker-http.git
    ports:
      - "5006:5006"
```

Example curl request:

```bash
curl \
       -F 'image=@./face.jpg'                 \
       -f http://localhost:5006/upload > out.json
```

Example request with [got](https://github.com/sindresorhus/got):

```typescript
const buffer = await fs.readFileSync(path.join(__dirname, 'face.jpg'));
const base64data = buffer.toString('base64');
const postData = {
    image: base64data
};
const response = await got.post<DetectedFace[]>({
    url: 'http://localhost:5006/base64',
    responseType: 'json',
    json: postData
});
```


Example result:

```json
[
  {
    detection: {
      _imageDims: [Object],
      _score: 0.6555111617967467,
      _classScore: 0.6555111617967467,
      _className: '',
      _box: [Object]
    },
    landmarks: { _imgDims: [Object], _shift: [Object], _positions: [Array] },
    unshiftedLandmarks: { _imgDims: [Object], _shift: [Object], _positions: [Array] },
    alignedRect: {
      _imageDims: [Object],
      _score: 0.6555111617967467,
      _classScore: 0.6555111617967467,
      _className: '',
      _box: [Object]
    },
    gender: 'male',
    genderProbability: 0.9573085904121399,
    age: 30.663358688354492
  }
]

```
