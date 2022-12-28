FROM node:18

WORKDIR /app

COPY nodemon.json nodemon.json
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY prisma prisma

RUN npm install

COPY ./src /app/src

CMD node -r esbuild-register src/server.ts
