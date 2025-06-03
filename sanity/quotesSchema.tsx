import { defineType, defineField } from "sanity";

// schemas/quotes.js
export const quotesSchema = defineType({
  name: "quote",
  title: "Quote",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Quote Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
