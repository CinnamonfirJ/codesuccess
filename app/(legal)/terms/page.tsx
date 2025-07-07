"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import React from "react";

export default function TermsOfService() {
  return (
    <main className='bg-white px-6 py-24 min-h-screen'>
      <motion.div
        className='mx-auto max-w-4xl'
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Badge className='bg-emerald-100 mb-6 px-4 py-2 text-emerald-700'>
          Terms & Conditions
        </Badge>
        <h1 className='mb-8 font-bold text-gray-900 text-4xl md:text-5xl'>
          Terms of Service
        </h1>

        <p className='mb-6 text-gray-700 leading-relaxed'>
          Welcome to <strong>codesuccex.com</strong>, a digital platform
          operated by Naija Resilients Edutainment Limited, located in Zaria,
          Nigeria. By accessing or using this website, you agree to be bound by
          these Terms and Conditions. If you do not agree, please do not use our
          services.
        </p>

        <ol className='space-y-6 pl-6 text-gray-700 leading-relaxed list-decimal'>
          <li>
            <strong>Use of Our Platform</strong>
            <br />
            Codesuccex.com is a youth-centered social impact platform offering
            curated lessons, real-life stories, and tools for Nigerian youth.
          </li>
          <li>
            <strong>User Registration</strong>
            <br />
            You are responsible for keeping your account secure. Provide
            accurate, complete, and updated information.
          </li>
          <li>
            <strong>User-Generated Content</strong>
            <br />
            You retain ownership of your content but grant us a license to use
            and display it. Do not post abusive, misleading, or unlawful
            content.
          </li>
          <li>
            <strong>Advertisements and Sponsored Content</strong>
            <br />
            We may display ads including banners, posts, and popups for
            informational or promotional purposes.
          </li>
          <li>
            <strong>Platform Rules</strong>
            <br />
            Respect others. No impersonation, spam, or illegal content. Users
            under 18 need guardian consent.
          </li>
          <li>
            <strong>Intellectual Property</strong>
            <br />
            All content on the site belongs to Naija Resilients Edutainment
            Limited. Do not copy or redistribute without permission.
          </li>
          <li>
            <strong>Termination</strong>
            <br />
            We reserve the right to suspend or terminate accounts at our
            discretion for violations.
          </li>
          <li>
            <strong>Limitation of Liability</strong>
            <br />
            We are not liable for user content or third-party links and
            advertisements.
          </li>
          <li>
            <strong>Modifications</strong>
            <br />
            We may revise these Terms at any time. Continued use implies
            acceptance of changes.
          </li>
          <li>
            <strong>Contact</strong>
            <br />
            Questions? Contact us via our{" "}
            <a className='text-emerald-600 underline' href='/contact'>
              Contact Us
            </a>{" "}
            form.
          </li>
        </ol>
      </motion.div>
    </main>
  );
}
