import { client } from "../client";

export async function getReadingListItemById(id: string) {
  try {
    const query = `*[_type == "readingList" && _id == $id][0] {
      _id,
      bookTitle,
      name {
        author,
        cover {
          asset -> {
            url
          }
        },
      },
      executiveSummary,
      coreConceptsSection {
        coreConcepts,
        mainPoints[]{
          ...,
          _type == "image" => {
            asset -> {
              url
            }
          }
        }
      },
      whyReadSection {
        whyReadThis[]{
          ...,
          _type == "image" => {
            asset -> {
              url
            }
          }
        },
        whyMustRead[]{
          ...,
          _type == "image" => {
            asset -> {
              url
            }
          }
        },
        finalWord[]{
          ...,
          _type == "image" => {
            asset -> {
              url
            }
          }
        }
      },
      linkUrl,
      categories,
      _createdAt
    }`;

    const readingListItem = await client.fetch(query, { id });
    return readingListItem;
  } catch (error) {
    console.error(`Error fetching reading list item with ID ${id}:`, error);
    throw error;
  }
}
