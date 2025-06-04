import { defineType, defineField } from "sanity";

export const rolePlaySchema = defineType({
  name: "rolePlay",
  title: "Role Play",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Role Play Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "scenario",
      title: "Scenario",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "instructions",
      title: "Instructions",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "variation",
      title: "Variation",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "reflectionPrompt",
      title: "Reflection Prompt Question For RolePlay",
      type: "text",
    }),
  ],
});
