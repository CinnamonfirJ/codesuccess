import { defineType, defineField } from "sanity";

export const readingListSchema = defineType({
  name: "readingList",
  title: "Reading List",
  type: "document",
  fields: [
    // 1. Book Information
    defineField({
      name: "bookTitle",
      title: "Book Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Book Information",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "author",
          title: "Author",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "cover", // Renamed from 'image' to match your 'Cover'
          title: "Cover",
          type: "image",
          options: {
            hotspot: true,
          },
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // 2. Executive Summary

    defineField({
      name: "executiveSummary",
      title: "Executive Summary",
      type: "text",
      validation: (Rule) => Rule.required().min(50).max(500),
    }),

    // 3. *Core Concepts, *Main Point

    defineField({
      name: "coreConceptsSection", // Name for the object grouping core concepts
      title: "Core Concepts Section",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "coreConcepts",
          title: "Core Concepts",
          type: "array",
          of: [{ type: "string", title: "Point" }],
          validation: (Rule) => Rule.required().min(3).max(10),
        }),
        defineField({
          name: "mainPoints",
          title: "Main Points",
          type: "array",
          of: [{ type: "block" }, { type: "image" }],
          description: "Explain the main points of the book",
        }),
      ],
    }), // 4. *Why Read the Book, *Here's why it's a must-read., *Final Word
    defineField({
      name: "whyReadSection", // Name for the object grouping "Why Read" fields
      title: "Why Read The Book",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "whyReadThis",
          title: "Why Read This Book",
          type: "text",
          validation: (Rule) => Rule.required().min(50).max(300),
        }),
        defineField({
          name: "whyMustRead",
          title: "Here's Why It's a Must-Read",
          type: "text",
          validation: (Rule) => Rule.required().min(50).max(300),
        }),
        defineField({
          name: "finalWord",
          title: "Final Word",
          type: "text",
          validation: (Rule) => Rule.required().min(20).max(200),
        }),
      ],
    }), // 5. Linkurl
    defineField({
      name: "linkUrl",
      title: "Link URL",
      type: "url",
    }),
  ],
});
