FROM node:alpine

WORKDIR /app

EXPOSE 4000

COPY package.json ./

COPY prisma .env tsconfig.json ./

RUN npm install

COPY . ./

RUN npx prisma generate

CMD ["npm", "start"]