import { notFound } from "next/navigation";
import HeroDetailClient from "./hero-detail-client";
import { getHeroById } from "@/sanity/lib/heroSpotlight/getHeroSpotlight";

interface HeroDetailPageProps {
  params: {
    _id: string;
  };
}

export default async function HeroDetailPage({ params }: HeroDetailPageProps) {
  const hero = await getHeroById(params._id);

  if (!hero) {
    notFound();
  }

  return <HeroDetailClient hero={hero} />;
}
