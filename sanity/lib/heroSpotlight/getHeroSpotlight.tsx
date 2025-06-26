import { client } from "../client";

export async function getHeroSpotlight() {
  const query = `*[_type == "heroSpotlight"] | order(_createdAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    name,
    "imageUrl": image.asset->url,
    description,
    areaOfExcellence,
    adversities,
    overcomingChallenges
  }`;

  return await client.fetch(query);
}

export async function getHeroById(id: string) {
  const query = `*[_type == "heroSpotlight" && _id == $id][0] {
    _id,
    _createdAt,
    _updatedAt,
    name,
    "imageUrl": image.asset->url,
    description,
    areaOfExcellence,
    adversities,
    overcomingChallenges
  }`;

  return await client.fetch(query, { id });
}
