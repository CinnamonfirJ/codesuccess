import { defineType, defineField } from "sanity";

export const heroSpotlightSchema = defineType({
  name: "heroSpotlight",
  title: "Hero Spotlight",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Hero's Name",
      type: "string",
      description: "The name of the hero being spotlighted",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Hero's Image",
      type: "image",
      description: "An image of the hero",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
      description: "A brief overview of the hero's life and achievements",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excellenceSection",
      title: "Excellence Section",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "areaOfExcellence",
          title: "Areas of Excellence", // Changed title to plural
          type: "array", // Changed to array
          of: [{ type: "string" }], // Array of strings
          description:
            "Fields or areas the hero is known for (e.g., Education, Innovation)",
          validation: (Rule) => Rule.required().min(1), // Added min(1) validation
        }),
        defineField({
          name: "descriptionOfExcellence",
          title: "Description of Excellence",
          type: "array",
          of: [{ type: "block" }, { type: "image" }],
          description: "Describe how this person excels.",
        }),
      ],
    }),
    defineField({
      name: "adversities",
      title: "Adversities Faced",
      type: "array",
      of: [{ type: "string" }],
      description: "Challenges or hardships the hero encountered",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "overcomingChallenges",
      title: "How They Overcame Challenges",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
      description: "Narrative of how they fought through difficulties",
    }),
    defineField({
      name: "inspiration",
      title: "Why Our Hero Inspires Us",
      type: "array",
      of: [{ type: "string" }],
      description: "Reasons why this hero is an inspiration to others",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "heroMessage",
      title: "Hero's Message to the World",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
      description: "The hero's message to the world",
    }),
  ],
});
