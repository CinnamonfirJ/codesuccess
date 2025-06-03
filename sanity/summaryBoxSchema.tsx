import { defineType, defineField } from "sanity";

export const summaryBoxSchema = defineType({
  name: "summaryBox",
  title: "Summary Box",
  type: "object",
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
