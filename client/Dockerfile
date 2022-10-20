FROM node:14.20-alpine

WORKDIR /app

EXPOSE 3000

COPY package.json ./

RUN npm install --silent

COPY . ./

RUN npx prisma generate

CMD ["npm", "start"]