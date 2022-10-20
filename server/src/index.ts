import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";
import { PORT } from "./constants";
import { appRouter } from "./router/router";
import { PrismaClient } from "@prisma/client";
import { createContext } from "./config/trpc.config";

export const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  "/api",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(PORT, () => console.log("Server is running on port: ", PORT));
