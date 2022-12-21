FROM node:16 as builder

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY src src
COPY rollup.config.js rollup.config.js
COPY tsconfig.json tsconfig.json

RUN npm run build


FROM nginx

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
