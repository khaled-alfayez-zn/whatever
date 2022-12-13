FROM node:19-alpine as builder

WORKDIR /usr/src/first-app/

COPY package*.json ./
RUN npm install

COPY index.js ./

FROM node:19-alpine

EXPOSE 3000

WORKDIR /usr/src/first-app/

ENV PG_HOST=postgres
ENV PG_USER=postgres
ENV PG_PASSWORD=password123
ENV PG_DATABASE=companies

COPY --from=builder /usr/src/first-app/node_modules node_modules
COPY --from=builder /usr/src/first-app/index.js index.js

CMD [ "node", "index.js" ]
