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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Optional description of the book or why it's recommended",
    }),
    defineField({
      name: "executiveSummary",
      title: "Executive Summary",
      type: "text",
      description: "A brief executive summary of the book's main points",
      validation: (Rule) => Rule.required().min(50).max(500),
    }),
    defineField({
      name: "coreConcepts",
      title: "Core Concepts",
      type: "array",
      of: [{ type: "string" }],
      description: "Key concepts and ideas covered in the book",
      validation: (Rule) => Rule.required().min(3).max(10),
    }),
    defineField({
      name: "whyReadThis",
      title: "Why Read This Book",
      type: "text",
      description: "Compelling reasons why someone should read this book",
      validation: (Rule) => Rule.required().min(50).max(300),
    }),
    defineField({
      name: "image",
      title: "Book Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
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
