"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRouter = void 0;
const index_1 = require("../index");
const zod_1 = require("zod");
const trpc_config_1 = require("../config/trpc.config");
exports.courseRouter = (0, trpc_config_1.createRouter)()
    .query("fetchCourse", {
    async resolve() {
        const courses = await index_1.prisma.course.findMany({});
        return { courses };
    },
})
    .mutation("postCourse", {
    input: zod_1.z
        .object({
        choiceA: zod_1.z.string().trim().optional(),
        choiceB: zod_1.z.string().trim().optional(),
        choiceC: zod_1.z.string().trim().optional(),
    })
        .partial()
        .refine((choices) => {
        const calculusRegEx = /^calculus$/i;
        let containsCalculus = false;
        Object.values(choices).forEach((choice) => {
            if (choice.match(calculusRegEx)) {
                containsCalculus = true;
            }
        });
        return containsCalculus;
    }, { message: "You must include [calculus] as a course" }),
    resolve: async ({ input }) => {
        const { choiceA, choiceB, choiceC } = input;
        let result;
        try {
            result = await index_1.prisma.course.create({
                data: {
                    choiceA: choiceA !== null && choiceA !== void 0 ? choiceA : "",
                    choiceB,
                    choiceC,
                },
            });
        }
        catch (e) {
            console.error(e);
            return {
                error: "We are having trouble adding your courses. Please try again.",
            };
        }
        return { result };
    },
});
//# sourceMappingURL=courses.router.js.map