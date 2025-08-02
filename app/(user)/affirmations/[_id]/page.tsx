// app/(user)/affirmations/[_id]/page.tsx

import { notFound } from "next/navigation";
import AffirmationDetailClient from "./affirmation-detail-client";
import SanityLiveWrapper from "@/app/components/SanityLiveWrapper";
import { getAffirmationById } from "@/sanity/lib/affirmations/getAffirmations";

interface AffirmationDetailPageProps {
  params: {
    _id: string;
  };
}

export default async function AffirmationDetailPage({
  params,
}: AffirmationDetailPageProps) {
  const affirmation = await getAffirmationById(params._id);

  if (!affirmation) {
    notFound();
  }

  return (
    <>
      <AffirmationDetailClient affirmation={affirmation} />
      {/* You can choose to include the SanityLiveWrapper here if you want live updates */}
      <SanityLiveWrapper />
    </>
  );
}
