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
      type: "text",
      description: "A short summary about the hero",
      validation: (Rule) => Rule.required().min(20),
    }),
    defineField({
      name: "areaOfExcellence",
      title: "Area of Excellence",
      type: "string",
      description:
        "Field or area the hero is known for (e.g. Education, Innovation)",
      validation: (Rule) => Rule.required(),
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
      type: "text",
      description: "Narrative of how they fought through difficulties",
      validation: (Rule) => Rule.required().min(20),
    }),
  ],
});
