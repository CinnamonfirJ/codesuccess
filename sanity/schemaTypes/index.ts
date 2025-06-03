import { type SchemaTypeDefinition } from "sanity";
import { courseSchema } from "../courseSchema";
import { moduleSchema } from "../moduleSchema";
import { studySessionSchema } from "../studySessionSchema";
import { quotesSchema } from "../quotesSchema";
import { summaryBoxSchema } from "../summaryBoxSchema";
import { takeawayJournalingPromptSchema } from "../journalingSchema";
import { reflectionQuestionSchema } from "../reflectionQuestionsSchema";
import { activitySchema } from "../activitySchema";
import { rolePlaySchema } from "../rolePlaySchema";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    courseSchema,
    moduleSchema,
    studySessionSchema,
    quotesSchema,
    activitySchema,
    rolePlaySchema,
    summaryBoxSchema,
    takeawayJournalingPromptSchema,
    reflectionQuestionSchema,
  ],
};
