"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <main className='bg-white px-6 py-24 min-h-screen'>
      <motion.div
        className='mx-auto max-w-4xl'
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Badge className='bg-emerald-100 mb-6 px-4 py-2 text-emerald-700'>
          Privacy Policy
        </Badge>
        <h1 className='mb-8 font-bold text-gray-900 text-4xl md:text-5xl'>
          Your Privacy Matters
        </h1>

        <p className='mb-6 text-gray-700 leading-relaxed'>
          At <strong>codesuccex.com</strong>, your privacy is important to us.
          This Privacy Policy explains what information we collect and how we
          use it.
        </p>

        <ol className='space-y-6 pl-6 text-gray-700 leading-relaxed list-decimal'>
          <li>
            <strong>Information We Collect</strong>
            <br />
            We collect your name and email address.
          </li>
          <li>
            <strong>How We Collect It</strong>
            <br />
            Information is gathered through forms and interactions such as
            posting comments. We also use cookies for analytics and preferences.
          </li>
          <li>
            <strong>How We Use Your Data</strong>
            <br />
            To personalize content, send updates, improve the platform, and
            support sponsored content delivery.
          </li>
          <li>
            <strong>Third-Party Sharing</strong>
            <br />
            We do not currently share your data with third parties. Any future
            changes will be announced.
          </li>
          <li>
            <strong>Cookies</strong>
            <br />
            We use cookies to monitor traffic and remember preferences.
            Disabling cookies may limit some functionality.
          </li>
          <li>
            <strong>Opt-Out and Data Deletion</strong>
            <br />
            You may unsubscribe from emails or request deletion of your data via
            our{" "}
            <a className='text-emerald-600 underline' href='/contact'>
              Contact Us
            </a>{" "}
            form.
          </li>
          <li>
            <strong>Children’s Privacy</strong>
            <br />
            Users under 18 must obtain consent from a parent or guardian before
            registering.
          </li>
          <li>
            <strong>Security</strong>
            <br />
            We implement appropriate security measures, but no system is 100%
            secure.
          </li>
          <li>
            <strong>Policy Updates</strong>
            <br />
            We may revise this policy and notify users via email or site
            announcement.
          </li>
          <li>
            <strong>Contact Us</strong>
            <br />
            For any privacy-related concerns, reach out through our{" "}
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
