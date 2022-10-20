import { prisma } from "../index";
import { z } from "zod";
import { createRouter } from "../config/trpc.config";

export const courseRouter = createRouter()
  .query("fetchCourse", {
    async resolve() {
      const courses = await prisma.course.findMany({});
      return { courses };
    },
  })
  .mutation("postCourse", {
    input: z
      .object({
        choiceA: z.string().trim().optional(),
        choiceB: z.string().trim().optional(),
        choiceC: z.string().trim().optional(),
      })
      .partial()
      .refine(
        (choices) => {
          const calculusRegEx = /^calculus$/i;
          let containsCalculus = false;

          Object.values(choices).forEach((choice) => {
            if (choice.match(calculusRegEx)) {
              containsCalculus = true;
            }
          });

          return containsCalculus;
        },
        { message: "You must include [calculus] as a course" }
      ),
    resolve: async ({ input }) => {
      const { choiceA, choiceB, choiceC } = input;
      let result;
      try {
        result = await prisma.course.create({
          data: {
            choiceA: choiceA ?? "",
            choiceB,
            choiceC,
          },
        });
      } catch (e) {
        console.error(e);
        return {
          error: "We are having trouble adding your courses. Please try again.",
        };
      }
      return { result };
    },
  });
