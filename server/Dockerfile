
FROM node:latest

WORKDIR /server

COPY package*.json ./
COPY .env.prod ./.env

RUN npm install

COPY . .

EXPOSE 3335

CMD ["npm", "start"]
