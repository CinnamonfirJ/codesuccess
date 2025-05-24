"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp, Users, Award, Star, Calendar, Heart } from "lucide-react"

interface ExpandableSectionProps {
  title: string
  children: React.ReactNode
  icon?: React.ReactNode
}

const ExpandableSection = ({ title, children, icon }: ExpandableSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full p-4 text-left hover:bg-teal-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-medium">{title}</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isExpanded && <div className="p-4 pt-0 pl-11 space-y-2 text-sm animate-slideDown">{children}</div>}
    </div>
  )
}

export default function RightSidebar() {
  return (
    <div className="h-full bg-white">
      <div className="p-6 border-b border-gray-200">
        <h2 className="font-bold text-lg text-center">Opportunities</h2>
      </div>

      <div className="divide-y divide-gray-200">
        <ExpandableSection title="Mentorship & Live Events" icon={<Calendar className="h-5 w-5 text-navy" />}>
          <a href="#" className="block py-2 hover:text-coral transition-colors">
            Upcoming Workshops
          </a>
          <a href="#" className="block py-2 hover:text-coral transition-colors">
            Find a Mentor
          </a>
          <a href="#" className="block py-2 hover:text-coral transition-colors">
            Live Q&A Sessions
          </a>
        </ExpandableSection>

        <ExpandableSection title="Challenges & Competitions" icon={<Award className="h-5 w-5 text-coral" />}>
          <a href="#" className="block py-2 hover:text-coral transition-colors">
            Coding Challenges
          </a>
          <a href="#" className="block py-2 hover:text-coral transition-colors">
            Creative Competitions
          </a>
          <a href="#" className="block py-2 hover:text-coral transition-colors">
            Win Rewards
          </a>
        </ExpandableSection>

        <ExpandableSection title="Our Heroes" icon={<Star className="h-5 w-5 text-teal" />}>
          <a href="#" className="block py-2 hover:text-coral transition-colors">
            Tech Innovators
          </a>
          <a href="#" className="block py-2 hover:text-coral transition-colors">
            Social Entrepreneurs
          </a>
          <a href="#" className="block py-2 hover:text-coral transition-colors">
            Community Leaders
          </a>
        </ExpandableSection>

        <ExpandableSection title="Special Guests" icon={<Users className="h-5 w-5 text-navy" />}>
          <a href="#" className="block py-2 hover:text-coral transition-colors">
            Upcoming Guests
          </a>
          <a href="#" className="block py-2 hover:text-coral transition-colors">
            Past Interviews
          </a>
          <a href="#" className="block py-2 hover:text-coral transition-colors">
            Submit Questions
          </a>
        </ExpandableSection>

        <ExpandableSection title="Success Stories" icon={<Heart className="h-5 w-5 text-coral" />}>
          <a href="#" className="block py-2 hover:text-coral transition-colors">
            Member Testimonials
          </a>
          <a href="#" className="block py-2 hover:text-coral transition-colors">
            Career Transformations
          </a>
          <a href="#" className="block py-2 hover:text-coral transition-colors">
            Share Your Story
          </a>
        </ExpandableSection>

        <ExpandableSection title="Our Role Models" icon={<Star className="h-5 w-5 text-teal" />}>
          <a href="#" className="block py-2 hover:text-coral transition-colors">
            Industry Leaders
          </a>
          <a href="#" className="block py-2 hover:text-coral transition-colors">
            Community Champions
          </a>
          <a href="#" className="block py-2 hover:text-coral transition-colors">
            Nominate a Role Model
          </a>
        </ExpandableSection>
      </div>
    </div>
  )
}
