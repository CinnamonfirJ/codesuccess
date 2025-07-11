import { defineType, defineField } from "sanity";

export const reflectionQuestionSchema = defineType({
  name: "reflectionQuestion",
  title: "Questions For Reflection",
  type: "object",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
