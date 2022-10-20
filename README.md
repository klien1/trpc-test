# trpc-test

A simple form input using TRPC, Prisma, Postgres, Express, and React

# How to use

  1) cd ./trpc-test/  
  2) docker compose up --build -d  
  3) cd ./server  
  4) npm install     
  5) npx prisma generate   
  6) npx prisma db push    
  7) npm start  

# Ports
  1) Client is running on port 3000   
  2) Server is running on port 4000   
  3) Postgres is running on port 5432   

# Endpoints
/api/fetchCourse - display all courses submitted to database    
/api/postCourse - posts courses after some validation
