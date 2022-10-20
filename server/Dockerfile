FROM node:alpine

WORKDIR /app

EXPOSE 4000

COPY package.json ./

COPY prisma .env tsconfig.json ./

RUN npm install

COPY . ./

RUN npx prisma generate

RUN npx prisma migrate dev

RUN npx prisma db push

CMD ["npm", "start"]