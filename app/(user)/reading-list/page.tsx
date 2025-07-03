import { getReadingList } from "@/sanity/lib/readingList/getReadindList";
import ReadingListClient from "./reading.content";

export default async function ReadingListPage() {
  try {
    const books = await getReadingList();

    // Ensure we have an array
    // const booksArray = Array.isArray(books) ? books : [];
    // console.log(booksArray);

    return <ReadingListClient initialBooks={books} />;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Could not connect to Sanity. Please check your environment variables.";
    console.error("Error fetching reading list:", error);
    return <ReadingListClient initialBooks={[]} error={errorMessage} />;
  }
}
