import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "../../../server/src/router/router";

export const trpc = createReactQueryHooks<AppRouter>();
