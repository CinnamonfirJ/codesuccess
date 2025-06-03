import { defineType, defineField } from "sanity";

// schemas/module.js
export const moduleSchema = defineType({
  name: "module",
  title: "Module",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Module Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Module Description",
      type: "text",
    }),
    defineField({
      name: "studySessions",
      title: "Study Sessions",
      type: "array",
      of: [{ type: "studySession" }], // Use an inline object for study sessions
    }),
  ],
});
