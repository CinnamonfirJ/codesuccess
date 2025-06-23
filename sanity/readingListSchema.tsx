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
      description: "Optional description of the book or why it’s recommended",
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
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Fiction", value: "fiction" },
          { title: "Non-fiction", value: "non-fiction" },
          { title: "Self-help", value: "self-help" },
          { title: "Technology", value: "technology" },
          { title: "Business", value: "business" },
          { title: "Personal Growth", value: "growth" },
          { title: "Spiritual", value: "spiritual" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
