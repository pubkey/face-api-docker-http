# dockerfile for the production build
FROM node:14

RUN mkdir /app
COPY ./ ./app

WORKDIR /app

RUN npm install

EXPOSE 8080
ENTRYPOINT ["npm", "run", "start"]
