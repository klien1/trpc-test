FROM node:14.20-alpine

WORKDIR /server

COPY ./server /server/

WORKDIR /app

EXPOSE 3000

COPY ./client/package.json ./

RUN npm install --prefix ./client

COPY ./client ./

CMD ["npm", "start"]