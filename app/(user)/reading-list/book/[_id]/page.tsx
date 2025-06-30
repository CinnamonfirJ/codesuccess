import { notFound } from "next/navigation";
import ReadingListDetailClient from "./reading-list-detail-client"; // Adjust path if needed
import { getReadingListItemById } from "@/sanity/lib/readingList/getReadingListById";

interface ReadingListDetailPageProps {
  params: {
    _id: string;
  };
}

export default async function ReadingListDetailPage({
  params,
}: ReadingListDetailPageProps) {
  const readingListItem = await getReadingListItemById(params._id);

  if (!readingListItem) {
    notFound();
  }

  return <ReadingListDetailClient item={readingListItem} />;
}
