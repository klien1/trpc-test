# trpc-test

A simple form input using TRPC, Prisma, Postgres, Express, and React

# How to use
cd ./trpc-test/
docker compose up --build -d   
cd server
npm install   
npx prisma generate 
npx prisma db push  
npm start


Client is running on port 3000
Server is running on port 4000
Postgres is running on port 5432

#Endpoints
/api/fetchCourse - display all courses submitted to database
/api/postCourse - posts courses after some validation
