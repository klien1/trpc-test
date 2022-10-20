"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const courses_router_1 = require("./courses.router");
const trpc_config_1 = require("../config/trpc.config");
exports.appRouter = (0, trpc_config_1.createRouter)().merge(courses_router_1.courseRouter);
//# sourceMappingURL=router.js.map