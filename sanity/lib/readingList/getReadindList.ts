import { sanityFetch } from "../live";
import { defineQuery } from "groq";

export async function getReadingList() {
  const getReadingListQuery = defineQuery(`*[_type == "readingList"] {
    _id,
    bookTitle,
    description,
    image {
      asset -> {
        url
      }
    },
    alt,
    linkUrl,
    category,
    _createdAt
  }
`);

  const readingList = await sanityFetch({ query: getReadingListQuery });
  return readingList.data;
}
