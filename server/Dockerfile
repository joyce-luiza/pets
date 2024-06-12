
FROM node:latest

WORKDIR /server

COPY package*.json ./
COPY .env.prod ./

RUN rm -rf node_modules
RUN npm install

COPY . .

EXPOSE 3335

CMD ["npm", "start"]
