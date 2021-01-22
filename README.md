# face-api-docker-http
A microservice for face-api.js to detect faces in images via HTTP requests

Runs [face-api.js](https://github.com/justadudewhohacks/face-api.js/) together with an express server.


Docker compose:

```yml
  face-api:
    build: https://github.com/pubkey/face-api-docker-http/blob/main/Dockerfile
    ports:
      - "8080:8080"
```

Example request:

```bash
curl \
       -F 'image=@./face.jpg'                 \
       -f http://localhost:8080/detect > out.json
```
