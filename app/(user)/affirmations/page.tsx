// pages/affirmations/index.tsx (or app/affirmations/page.tsx)
import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import AffirmationClient from "./affirmation-client";

export default function AffirmationsPage() {
  return (
    <div className='bg-gradient-to-br from-slate-50 via-pink-50 to-rose-50 min-h-screen'>
      <div className='mx-auto px-6 py-8 container'>
        <Link href='/homepage'>
          <Button variant='ghost' className='gap-2'>
            <ArrowLeft className='w-4 h-4' />
            Back to Home
          </Button>
        </Link>
        <div className='mb-12 text-center'>
          <h1 className='mb-4 font-bold text-gray-900 text-4xl md:text-5xl'>
            Daily Affirmations
          </h1>
          <p className='mx-auto max-w-3xl text-gray-600 text-xl'>
            Nourish your mind with positive thoughts and empowering statements.
            These affirmations are designed to inspire confidence, resilience,
            and personal growth every day.
          </p>
        </div>

        <Suspense
          fallback={
            <div className='gap-8 grid md:grid-cols-2 lg:grid-cols-3'>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className='bg-white shadow-lg rounded-lg overflow-hidden animate-pulse'
                >
                  <div className='bg-gray-300 h-48'></div>
                  <div className='p-6'>
                    <div className='bg-gray-300 mb-2 rounded h-5'></div>
                    <div className='bg-gray-200 mb-4 rounded w-3/4 h-4'></div>
                    <div className='bg-gray-200 mb-2 rounded h-3'></div>
                    <div className='bg-gray-200 rounded w-2/3 h-3'></div>
                  </div>
                </div>
              ))}
            </div>
          }
        >
          <AffirmationClient />
        </Suspense>
      </div>
    </div>
  );
}
