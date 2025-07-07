"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function CookiePolicy() {
  return (
    <main className='bg-gradient-to-br from-white to-blue-50 px-6 py-24 min-h-screen'>
      <motion.div
        className='mx-auto max-w-4xl'
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Badge className='bg-emerald-100 mb-6 px-4 py-2 text-emerald-700'>
          Cookie Policy
        </Badge>

        <h1 className='mb-6 font-bold text-gray-900 text-4xl md:text-5xl'>
          Our Use of Cookies
        </h1>

        <p className='mb-8 text-gray-700 text-lg'>
          This Cookie Policy explains how CodeSuccex uses cookies and similar
          technologies to improve your experience on our website (
          <strong>codesuccex.com</strong>).
        </p>

        <div className='space-y-8 text-gray-700 text-lg leading-relaxed'>
          <div>
            <h2 className='mb-2 font-bold text-gray-900 text-xl'>
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small text files stored on your device when you visit
              our site. They help us enhance functionality, analyze traffic, and
              personalize your experience.
            </p>
          </div>

          <div>
            <h2 className='mb-2 font-bold text-gray-900 text-xl'>
              2. Types of Cookies We Use
            </h2>
            <ul className='space-y-2 list-disc list-inside'>
              <li>
                <strong>Essential Cookies:</strong> Necessary for core website
                functions like security and navigation.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Used to collect anonymous
                data on how visitors interact with our site (e.g., via Google
                Analytics).
              </li>
              <li>
                <strong>Preference Cookies:</strong> Help us remember your site
                preferences and settings.
              </li>
              <li>
                <strong>Marketing Cookies:</strong> May be used in the future to
                display relevant ads or sponsored content.
              </li>
            </ul>
          </div>

          <div>
            <h2 className='mb-2 font-bold text-gray-900 text-xl'>
              3. Managing Cookies
            </h2>
            <p>
              You can choose to accept or decline cookies through your browser
              settings. Most browsers automatically accept cookies, but you can
              usually modify your settings to decline them if you prefer. Note
              that disabling cookies may impact your experience on the platform.
            </p>
          </div>

          <div>
            <h2 className='mb-2 font-bold text-gray-900 text-xl'>
              4. Third-Party Cookies
            </h2>
            <p>
              We may allow trusted third-party tools (like Google Analytics) to
              set cookies on your device to collect data about how you use our
              platform. These third parties have their own privacy and cookie
              policies.
            </p>
          </div>

          <div>
            <h2 className='mb-2 font-bold text-gray-900 text-xl'>
              5. Changes to This Policy
            </h2>
            <p>
              We may update this Cookie Policy periodically. Any changes will be
              reflected on this page, and you will be notified of significant
              updates via email or on-site notification.
            </p>
          </div>

          <div>
            <h2 className='mb-2 font-bold text-gray-900 text-xl'>
              6. Contact Us
            </h2>
            <p>
              If you have any questions about our use of cookies or data
              practices, please reach out through our{" "}
              <a
                href='/contact'
                className='text-emerald-600 hover:text-emerald-800 underline'
              >
                Contact Us
              </a>{" "}
              form.
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
