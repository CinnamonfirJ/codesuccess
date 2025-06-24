import { defineType, defineField } from "sanity";

export const readingListSchema = defineType({
  name: "readingList",
  title: "Reading List",
  type: "document",
  fields: [
    defineField({
      name: "bookTitle",
      title: "Book Title",
      type: "string",
      description: "The title of the book",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Optional description of the book or why it's recommended",
    }),
    defineField({
      name: "image",
      title: "Book Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "alt",
      type: "slug",
      title: "Alternative text",
      options: {
        source: "bookTitle",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "linkUrl",
      title: "Link URL",
      type: "url",
      description: "A link to purchase, preview, or read the book online",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          type: "string",
          options: {
            list: [
              { title: "Mindset", value: "mindset" },
              { title: "Motivation", value: "motivation" },
              { title: "Purpose Discovery", value: "purpose-discovery" },
              { title: "Financial Literacy", value: "financial-literacy" },
              {
                title: "Communication",
                value: "communication",
              },
              {
                title: "Confidence",
                value: "confidence",
              },
              {
                title: "Emotional Intelligence",
                value: "emotional-intelligence",
              },
            ],
          },
        },
      ],
      description: "Select one or more categories for this book",
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
  ],
});
