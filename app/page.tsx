"use client";

import { HeroSection } from "./components/home/HeroSection";
import { SocialProof } from "./components/home/SocialProof";
import { FeaturesSection } from "./components/home/FeaturesSection";
import { TestimonialsSection } from "./components/home/TestimonialsSection";
import { CTASection } from "./components/home/CTASection";

export default function LandingPage() {
  return (
    <div className='flex flex-col min-h-screen overflow-hidden'>
      <HeroSection />
      <SocialProof />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      {/* Footer is already included in layout.tsx */}
    </div>
  );
}
