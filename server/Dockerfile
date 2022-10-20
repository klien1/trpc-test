FROM node:19-alpine

WORKDIR /app

EXPOSE 4000

COPY package.json ./

RUN npm install

COPY . ./

RUN npx prisma migrate dev

RUN npx prisma generate

CMD ["npm", "start"]