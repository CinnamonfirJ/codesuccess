"use client";

import { useState, useEffect } from "react";
import { Search, Star, Trophy, Users } from "lucide-react";
// import { Search, Filter, Star, Trophy, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { getHeroSpotlight } from "@/sanity/lib/heroSpotlight/getHeroSpotlight";
import HeroSpotlightItem from "@/app/components/hero-spotlight-item";

interface Hero {
  _id: string;
  _createdAt?: string | null;
  _updatedAt?: string | null;
  name?: string | null;
  imageUrl?: string | null;
  description?: string | null;
  areaOfExcellence?: string | null;
  adversities?: string[] | null;
  overcomingChallenges?: string | null;
}

export default function HeroSpotlightClient() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [filteredHeroes, setFilteredHeroes] = useState<Hero[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  // Get unique areas of excellence for filter
  const areas = Array.from(
    new Set(heroes.map((hero) => hero.areaOfExcellence).filter(Boolean))
  ).sort();

  useEffect(() => {
    async function fetchHeroes() {
      try {
        const heroData = await getHeroSpotlight();
        setHeroes(Array.isArray(heroData) ? heroData : []);
      } catch (error) {
        console.error("Failed to fetch heroes:", error);
        setHeroes([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchHeroes();
  }, []);

  useEffect(() => {
    let filtered = heroes;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (hero) =>
          hero.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hero.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hero.areaOfExcellence
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Filter by area of excellence
    if (selectedArea !== "all") {
      filtered = filtered.filter(
        (hero) => hero.areaOfExcellence === selectedArea
      );
    }

    setFilteredHeroes(filtered);
  }, [heroes, searchTerm, selectedArea]);

  if (isLoading) {
    return (
      <div className='gap-8 grid md:grid-cols-2 lg:grid-cols-3'>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className='bg-white shadow-lg rounded-lg overflow-hidden animate-pulse'
          >
            <div className='bg-gray-300 h-64'></div>
            <div className='p-6'>
              <div className='bg-gray-300 mb-2 rounded h-4'></div>
              <div className='bg-gray-200 mb-4 rounded w-2/3 h-4'></div>
              <div className='bg-gray-200 mb-2 rounded h-3'></div>
              <div className='bg-gray-200 rounded w-3/4 h-3'></div>
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
              placeholder='Search heroes by name, story, or expertise...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10'
            />
          </div>
          <div className='flex gap-2'>
            {/* <Select value={selectedArea} onValueChange={setSelectedArea}>
              <SelectTrigger className='w-48'>
                <Filter className='mr-2 w-4 h-4' />
                <SelectValue placeholder='Filter by area' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Areas</SelectItem>
                {areas.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
          </div>
        </div>

        {/* Stats */}
        <div className='flex items-center gap-6 mt-4 pt-4 border-t'>
          <div className='flex items-center gap-2'>
            <Users className='w-4 h-4 text-blue-500' />
            <span className='text-gray-600 text-sm'>
              {filteredHeroes.length}{" "}
              {filteredHeroes.length === 1 ? "Hero" : "Heroes"}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Trophy className='w-4 h-4 text-yellow-500' />
            <span className='text-gray-600 text-sm'>
              {areas.length} Areas of Excellence
            </span>
          </div>
        </div>
      </div>

      {/* Heroes Grid */}
      {filteredHeroes.length > 0 ? (
        <div className='gap-8 grid md:grid-cols-2 lg:grid-cols-3'>
          {filteredHeroes.map((hero) => (
            <HeroSpotlightItem key={hero._id} hero={hero} />
          ))}
        </div>
      ) : (
        <div className='py-16 text-center'>
          <div className='flex justify-center items-center bg-gray-100 mx-auto mb-6 rounded-full w-24 h-24'>
            <Star className='w-12 h-12 text-gray-400' />
          </div>
          <h3 className='mb-2 font-semibold text-gray-900 text-xl'>
            No Heroes Found
          </h3>
          <p className='mb-6 text-gray-600'>
            {searchTerm || selectedArea !== "all"
              ? "Try adjusting your search or filter criteria."
              : "No heroes have been added yet. Check back soon!"}
          </p>
          {(searchTerm || selectedArea !== "all") && (
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedArea("all");
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
