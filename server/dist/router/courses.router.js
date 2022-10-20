"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRouter = void 0;
const index_1 = require("../index");
const zod_1 = require("zod");
const trpc_config_1 = require("../config/trpc.config");
exports.courseRouter = (0, trpc_config_1.createRouter)()
    .query("fetchCourse", {
    async resolve() {
        let courses;
        try {
            courses = await index_1.prisma.course.findMany({});
        }
        catch (e) {
            console.error(e);
            return {
                error: "We have issues retreiving the data.",
            };
        }
        console.log(courses);
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
        const { id } = result, choices = __rest(result, ["id"]);
        return { choices };
    },
});
//# sourceMappingURL=courses.router.js.map