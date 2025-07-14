import { defineType, defineField } from "sanity";

export const affirmationSchema = defineType({
  name: "affirmation",
  title: "Affirmation",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "e.g., Daily Affirmations, Affirmations for Self-Confidence",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          {
            title: "Overcoming Unemployment & Financial Struggles",
            value: "unemployment-financial-struggles",
          },
          {
            title: "Self-Confidence and Identity",
            value: "self-confidence-identity",
          },
          {
            title: "Purpose Discovery & Direction",
            value: "purpose-discovery-direction",
          },
          {
            title: "Motivation and Resilience",
            value: "motivation-resilience",
          },
          {
            title: "Mental Health & Inner Peace",
            value: "mental-health-inner-peace",
          },
          {
            title: "Rising Above Peer Pressure & Societal Comparison",
            value: "peer-pressure-societal-comparison",
          },
          {
            title: "Academic and Skill Growth",
            value: "academic-skill-growth",
          },
          { title: "Faith and Divine Grace", value: "faith-divine-grace" },
          {
            title: "Personal Growth and Success",
            value: "personal-growth-success",
          },
          // Add more categories as needed from your document
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description:
        "Brief explanation of the affirmation category (e.g., To help individuals dealing with job scarcity).",
    }),
    defineField({
      name: "subCategory",
      title: "Sub-Category",
      type: "string",
      description: "e.g., For Clarity and Purpose (optional)",
      // hidden: ({ document }) => document.category !== "personal-growth-success", // Removed as requested
      options: {
        list: [
          { title: "For Clarity and Purpose", value: "clarity-purpose" },
          { title: "For Drive and Motivation", value: "drive-motivation" },
          {
            title: "For Confidence and Self-Worth",
            value: "confidence-self-worth",
          },
          { title: "For Overcoming Setbacks", value: "overcoming-setbacks" },
          {
            title: "For Self-Discipline and Consistency",
            value: "self-discipline-consistency",
          },
          { title: "For Courage and Action", value: "courage-action" },
          {
            title: "To Empower Individuals from Difficult Backgrounds",
            value: "difficult-backgrounds-empowerment",
          },
        ],
      },
    }),
    defineField({
      name: "affirmationList",
      title: "Affirmation List",
      type: "array",
      of: [{ type: "string" }],
      description: "List of affirmations for this category/subcategory.",
    }),
    defineField({
      name: "isChallenge",
      title: "Is Part of 7-Day Challenge?",
      type: "boolean",
      description:
        "Check if this affirmation set is part of the 7-day challenge.",
    }),
    defineField({
      name: "challengeDay",
      title: "Challenge Day",
      type: "number",
      description: "Day number if part of the 7-day challenge (1-7).",
      // hidden: ({ document }) => !document.isChallenge, // Removed as requested
      validation: (Rule) => Rule.min(1).max(7).integer(),
    }),
    defineField({
      name: "challengeTheme",
      title: "Challenge Theme",
      type: "string",
      description:
        "Theme for the challenge day (e.g., I Am More Than My Struggles).",
      // hidden: ({ document }) => !document.isChallenge, // Removed as requested
    }),
    defineField({
      name: "dailyFocusActivity",
      title: "Daily Focus Activity",
      type: "text",
      description: "Activity for the challenge day.",
      // hidden: ({ document }) => !document.isChallenge, // Removed as requested
    }),
    defineField({
      name: "reflectionQuestion",
      title: "Reflection Question",
      type: "text",
      description: "Reflection question for the challenge day.",
      // hidden: ({ document }) => !document.isChallenge, // Removed as requested
    }),
  ],
});

export const sevenDayChallengeSchema = defineType({
  name: "sevenDayChallenge",
  title: "7-Day Affirmation Challenge",
  type: "document",
  fields: [
    defineField({
      name: "challengeTitle",
      title: "Challenge Title",
      type: "string",
      initialValue: "7-Day Affirmation Challenge",
      readOnly: true,
    }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "string",
      initialValue: "Speak it. Believe it. Become it.",
      readOnly: true,
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      type: "text",
      description: "General introduction for the challenge.",
      initialValue:
        "Each day includes a theme, affirmations, a daily focus activity, and a reflection question.",
      readOnly: true,
    }),
    defineField({
      name: "days",
      title: "Challenge Days",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "dayNumber",
              title: "Day Number",
              type: "number",
              validation: (Rule) => Rule.required().min(1).max(7).integer(),
            }),
            defineField({
              name: "dayTitle",
              title: "Day Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "theme",
              title: "Theme",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "affirmations",
              title: "Affirmations",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: "dailyFocusActivity",
              title: "Daily Focus Activity",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "reflectionQuestion",
              title: "Reflection Question",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "dayTitle",
              subtitle: "dayNumber",
            },
            prepare({ title, subtitle }) {
              return {
                title: `Day ${subtitle}: ${title}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().length(7), // Ensure all 7 days are present
    }),
    defineField({
      name: "finalNote",
      title: "Final Note",
      type: "array",
      of: [{ type: "block" }],
      description: "The concluding message for the challenge.",
    }),
  ],
  // Optional: Add a custom preview to make it clear this is the single 7-day challenge document
  preview: {
    select: {
      title: "challengeTitle",
    },
    prepare({ title }) {
      return {
        title: title,
      };
    },
  },
});
