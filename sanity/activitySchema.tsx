import { defineType, defineField } from "sanity";

export const activitySchema = defineType({
  name: "activity",
  title: "Activity",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Activity Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "instructions",
      title: "Instructions",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "reflectionPrompt",
      title: "Reflection Prompt Question For Activity",
      type: "text",
    }),
  ],
});
