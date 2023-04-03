# syntax=docker/dockerfile:1

FROM node:latest

ENV NODE_ENV=production

EXPOSE 19000 19001 19002 19006

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --global expo-cli@latest npm@latest

RUN npm install

COPY . .

CMD [ "npx", "expo", "start", "--web" ]
