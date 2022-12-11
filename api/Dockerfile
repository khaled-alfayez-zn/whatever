FROM node:latest

EXPOSE 3000

WORKDIR /usr/src/first-app/

COPY package*.json ./
RUN npm install

ENV PG_HOST=postgres
ENV PG_USER=postgres
ENV PG_PASSWORD=password123
ENV PG_DATABASE=companies

COPY . .

CMD [ "npm", "start" ]