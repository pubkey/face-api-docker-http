# dockerfile for the production build
FROM node:14.15.4

RUN apt-get update && apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev -y

RUN npm i -g node-pre-gyp@0.17.0

RUN mkdir /app
COPY ./ ./app

WORKDIR /app

RUN rm -rf node_modules
RUN npm --build-from-source install --no-audit

EXPOSE 8080
ENTRYPOINT ["npm", "run", "start"]
