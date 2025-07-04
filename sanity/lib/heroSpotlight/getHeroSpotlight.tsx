import { client } from "../client";

export async function getHeroSpotlight() {
  const query = `*[_type == "heroSpotlight"] | order(_createdAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    name,
    "imageUrl": image.asset->url,
    description[]{
      ...,
      _type == "image" => {
        asset -> {
          url
        }
      }
    },
    excellenceSection {
      areaOfExcellence, // This will now fetch an array of strings
      descriptionOfExcellence[]{
        ...,
        _type == "image" => {
          asset -> {
            url
          }
        }
      }
    },
    adversities,
    overcomingChallenges[]{
      ...,
      _type == "image" => {
        asset -> {
          url
        }
      }
    },
    inspiration,
    heroMessage[]{
      ...,
      _type == "image" => {
        asset -> {
          url
        }
      }
    }
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
    description[]{
      ...,
      _type == "image" => {
        asset -> {
          url
        }
      }
    },
    excellenceSection {
      areaOfExcellence, // This will now fetch an array of strings
      descriptionOfExcellence[]{
        ...,
        _type == "image" => {
          asset -> {
            url
          }
        }
      }
    },
    adversities,
    overcomingChallenges[]{
      ...,
      _type == "image" => {
        asset -> {
          url
        }
      }
    },
    inspiration,
    heroMessage[]{
      ...,
      _type == "image" => {
        asset -> {
          url
        }
      }
    }
  }`;

  return await client.fetch(query, { id });
}
