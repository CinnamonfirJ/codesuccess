import { defineType, defineField } from "sanity";

export const takeawayJournalingPromptSchema = defineType({
  name: "takeawayJournalingPrompt",
  title: "Takeaway Journaling Prompt",
  type: "object",
  fields: [
    defineField({
      name: "prompt",
      title: "Prompt",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
