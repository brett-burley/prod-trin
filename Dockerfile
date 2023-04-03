# syntax=docker/dockerfile:1

FROM node:latest

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --global expo-cli@latest npm@latest

RUN npm install

COPY . .

CMD [ "npx", "serve", "web-build" ]
