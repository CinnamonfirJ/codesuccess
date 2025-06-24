import { defineType, defineField } from "sanity";

// schemas/studySession.js
export const studySessionSchema = defineType({
  name: "studySession",
  title: "Study Session",
  type: "document",
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
    // Replace the generic content field with structured sections
    defineField({
      name: "conceptDefinition",
      title: "Concept Definition and Explanations",
      type: "array",
      of: [
        { type: "block" }, // Sanity's portable text for rich content
        { type: "image" }, // Allow images within the content
      ],
      description:
        "Define and explain the core concepts being taught in this session",
    }),
    defineField({
      name: "whyItMatters",
      title: "Why it Matters",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
      description: "Explain the importance and relevance of this concept",
    }),
    defineField({
      name: "whatThisMeansForYou",
      title: "What this means for You",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
      description: "Personal application and direct impact on the learner",
    }),
    defineField({
      name: "commonMisconceptions",
      title: "Common Misconceptions",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
      description: "Address common myths or misunderstandings about this topic",
    }),
    defineField({
      name: "realLifeExample",
      title: "Real-life Example",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
      description: "Concrete examples that illustrate the concept in action",
    }),
    defineField({
      name: "whyTimeToActIsNow",
      title: "Why the Time to act is Now",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
      description: "Create urgency and motivation for immediate action",
    }),
    defineField({
      name: "openLetterToYou",
      title: "Open Letter to You",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
      description:
        "Personal, direct message to inspire and motivate the learner",
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
