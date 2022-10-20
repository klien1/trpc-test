FROM node:14.20-alpine

WORKDIR /server

COPY ./server /server/

RUN npm install

WORKDIR /app

EXPOSE 3000

COPY ./client/package.json ./

RUN npm install

COPY ./client ./

CMD ["npm", "start"]