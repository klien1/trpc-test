import { courseRouter } from "./courses.router";
import { createRouter } from "../config/trpc.config";

export const appRouter = createRouter().merge(courseRouter);

export type AppRouter = typeof appRouter;
