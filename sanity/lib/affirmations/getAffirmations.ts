import { client } from "../client";

export async function getAffirmations() {
  const query = `*[_type == "affirmation"] | order(_createdAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    title,
    category,
    description,
    subCategory,
    affirmationList,
    isChallenge,
    challengeDay,
    challengeTheme,
    dailyFocusActivity,
    reflectionQuestion
  }`;

  return await client.fetch(query);
}

export async function getAffirmationById(id: string) {
  const query = `*[_type == "affirmation" && _id == $id][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    category,
    description,
    subCategory,
    affirmationList,
    isChallenge,
    challengeDay,
    challengeTheme,
    dailyFocusActivity,
    reflectionQuestion
  }`;

  return await client.fetch(query, { id });
}
