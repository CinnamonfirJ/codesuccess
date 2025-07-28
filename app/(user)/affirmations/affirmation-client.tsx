// app/affirmations/affirmation-client.tsx

"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAffirmations } from "@/sanity/lib/affirmations/getAffirmations";
import AffirmationCard from "@/app/components/affirmation-card";

interface PortableTextBlock {
  _key: string;
  _type: "block";
  children: { _key: string; _type: "span"; marks: string[]; text: string }[];
  markDefs: any[];
  style: string;
}

interface PortableTextImage {
  _key: string;
  _type: "image";
  asset: {
    url: string;
  };
  alt?: string;
  [key: string]: any;
}

type PortableTextContent = (PortableTextBlock | PortableTextImage)[];

interface Affirmation {
  _id: string;
  _createdAt?: string | null;
  _updatedAt?: string | null;
  title?: string | null;
  category?: string | null;
  description?: PortableTextContent | null;
  subCategory?: string | null;
  affirmationList?: string[] | null;
  isChallenge?: boolean | null;
  challengeDay?: number | null;
  challengeTheme?: string | null;
  dailyFocusActivity?: string | null;
  reflectionQuestion?: string | null;
}

export default function AffirmationClient() {
  // Corrected component name
  const [affirmations, setAffirmations] = useState<Affirmation[]>([]); // Corrected state names
  const [filteredAffirmations, setFilteredAffirmations] = useState<
    Affirmation[]
  >([]); // Corrected state names
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all"); // Corrected state names
  const [isLoading, setIsLoading] = useState(true);

  const getPlainText = (blocks: PortableTextContent | null): string => {
    // Add Array.isArray check here!
    if (!Array.isArray(blocks) || blocks.length === 0) {
      return "";
    }

    return blocks
      .filter((block) => block._type === "block")
      .map((block) =>
        (block as PortableTextBlock).children.map((span) => span.text).join("")
      )
      .join(" ")
      .toLowerCase();
  };

  const categories = Array.from(
    new Set(affirmations.map((affirmation) => affirmation.category))
  )
    .filter(Boolean)
    .sort() as string[];

  useEffect(() => {
    async function fetchAffirmations() {
      try {
        const affirmationData = await getAffirmations();
        setAffirmations(Array.isArray(affirmationData) ? affirmationData : []);
      } catch (error) {
        console.error("Failed to fetch affirmations:", error);
        setAffirmations([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAffirmations();
  }, []);

  useEffect(() => {
    let filtered = affirmations; // Use affirmations
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (
          affirmation // Use affirmation
        ) =>
          affirmation.title?.toLowerCase().includes(lowerCaseSearchTerm) ||
          getPlainText(affirmation.description || null).includes(
            // This is where the problematic call happens
            lowerCaseSearchTerm
          ) ||
          affirmation.category?.toLowerCase().includes(lowerCaseSearchTerm) ||
          affirmation.subCategory
            ?.toLowerCase()
            .includes(lowerCaseSearchTerm) ||
          affirmation.affirmationList?.some((item) =>
            item.toLowerCase().includes(lowerCaseSearchTerm)
          ) ||
          affirmation.challengeTheme
            ?.toLowerCase()
            .includes(lowerCaseSearchTerm) ||
          affirmation.dailyFocusActivity
            ?.toLowerCase()
            .includes(lowerCaseSearchTerm) ||
          affirmation.reflectionQuestion
            ?.toLowerCase()
            .includes(lowerCaseSearchTerm)
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (affirmation) => affirmation.category === selectedCategory
      );
    }

    setFilteredAffirmations(filtered);
  }, [affirmations, searchTerm, selectedCategory]); // Corrected dependencies

  if (isLoading) {
    return (
      <div className='gap-8 grid md:grid-cols-2 lg:grid-cols-3'>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className='bg-white shadow-lg rounded-lg overflow-hidden animate-pulse'
          >
            <div className='bg-gray-300 h-48'></div>{" "}
            {/* Adjusted height for affirmation cards */}
            <div className='p-6'>
              <div className='bg-gray-300 mb-2 rounded h-5'></div>
              <div className='bg-gray-200 mb-4 rounded w-3/4 h-4'></div>
              <div className='bg-gray-200 mb-2 rounded h-3'></div>
              <div className='bg-gray-200 rounded w-2/3 h-3'></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='space-y-8'>
      {/* Search and Filter Controls */}
      <div className='bg-white shadow-sm p-6 rounded-lg'>
        <div className='flex md:flex-row flex-col gap-4'>
          <div className='relative flex-1'>
            <Search className='top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform' />
            <Input
              placeholder='Search affirmations by title, content, or category...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10'
            />
          </div>
          <div className='flex gap-2'>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className='w-48'>
                <Filter className='mr-2 w-4 h-4' />
                <SelectValue placeholder='Filter by category' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats */}
        <div className='flex items-center gap-6 mt-4 pt-4 border-t'>
          <div className='flex items-center gap-2'>
            <Heart className='w-4 h-4 text-pink-500' />
            <span className='text-gray-600 text-sm'>
              {filteredAffirmations.length}{" "}
              {filteredAffirmations.length === 1
                ? "Affirmation"
                : "Affirmations"}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Filter className='w-4 h-4 text-purple-500' />
            <span className='text-gray-600 text-sm'>
              {categories.length} Categories
            </span>
          </div>
        </div>
      </div>

      {/* Affirmations Grid */}
      {filteredAffirmations.length > 0 ? (
        <div className='gap-8 grid md:grid-cols-2 lg:grid-cols-3'>
          {filteredAffirmations.map((affirmation) => (
            <AffirmationCard key={affirmation._id} affirmation={affirmation} />
          ))}
        </div>
      ) : (
        <div className='py-16 text-center'>
          <div className='flex justify-center items-center bg-gray-100 mx-auto mb-6 rounded-full w-24 h-24'>
            <Heart className='w-12 h-12 text-gray-400' />
          </div>
          <h3 className='mb-2 font-semibold text-gray-900 text-xl'>
            No Affirmations Found
          </h3>
          <p className='mb-6 text-gray-600'>
            {searchTerm || selectedCategory !== "all"
              ? "Try adjusting your search or filter criteria."
              : "No affirmations have been added yet. Check back soon!"}
          </p>
          {(searchTerm || selectedCategory !== "all") && (
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              variant='outline'
            >
              Clear Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
