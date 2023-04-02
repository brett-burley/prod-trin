# syntax=docker/dockerfile:1

FROM node:18-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

CMD [ "npx", "expo", "export:web" ]

COPY . .

CMD [ "npx", "serve", "web-build" ]
