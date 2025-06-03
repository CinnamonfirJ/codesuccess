import { defineType, defineField } from "sanity";

// schemas/studySession.js
export const studySessionSchema = defineType({
  name: "studySession",
  title: "Study Session",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Study Session Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "quotes",
      title: "Famous Quotes",
      type: "array",
      of: [{ type: "quote" }], // Reference the quote object type
    }),
    defineField({
      name: "content",
      title: "Text/Reading/Content",
      type: "array",
      of: [
        { type: "block" }, // Sanity's portable text for rich content
        { type: "image" }, // Allow images within the content
        // Add other custom content types if needed (e.g., code blocks, embeds)
      ],
    }),
    defineField({
      name: "activity",
      title: "Activity",
      type: "activity", // Reference the activity object type
    }),
    defineField({
      name: "rolePlay",
      title: "Role Play",
      type: "rolePlay", // Reference the rolePlay object type
    }),
    defineField({
      name: "summaryBox",
      title: "Summary Box",
      type: "summaryBox", // Reference the summaryBox object type
    }),
    defineField({
      name: "takeawayJournalingPrompts",
      title: "Takeaway Journaling Prompts",
      type: "array",
      of: [{ type: "takeawayJournalingPrompt" }], // Reference the prompt object type
    }),
  ],
});
