import { notFound } from "next/navigation";
import HeroDetailClient from "./hero-detail-client";
import { getHeroById } from "@/sanity/lib/heroSpotlight/getHeroSpotlight";

interface HeroDetailPageProps {
  params: {
    id: string;
  };
}

export default async function HeroDetailPage({ params }: HeroDetailPageProps) {
  const hero = await getHeroById(params.id);

  if (!hero) {
    notFound();
  }

  return <HeroDetailClient hero={hero} />;
}
