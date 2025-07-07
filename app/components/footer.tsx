import React from "react";

const FooterSection = () => {
  return (
    <footer className='bg-gray-900 px-6 py-16 text-white'>
      <div className='mx-auto max-w-6xl'>
        <div className='gap-8 grid md:grid-cols-4 mb-8'>
          <div>
            <h3 className='mb-4 font-bold text-emerald-400 text-2xl'>
              CodeSuccex
            </h3>
            <p className='text-gray-400 leading-relaxed'>
              Empowering Nigerian youth to unlock their potential and achieve
              extraordinary success.
            </p>
          </div>
          <div>
            <h4 className='mb-4 font-semibold text-lg'>Platform</h4>
            <ul className='space-y-2 text-gray-400'>
              <li>
                <a
                  href='/homepage'
                  className='hover:text-white transition-colors'
                >
                  Courses
                </a>
              </li>
              <li>
                <a
                  href='/homepage'
                  className='hover:text-white transition-colors'
                >
                  Mentorship
                </a>
              </li>
              <li>
                <a
                  href='/homepage'
                  className='hover:text-white transition-colors'
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href='/homepage'
                  className='hover:text-white transition-colors'
                >
                  Success Stories
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='mb-4 font-semibold text-lg'>Support</h4>
            <ul className='space-y-2 text-gray-400'>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href='/contact'
                  className='hover:text-white transition-colors'
                >
                  Contact Us
                </a>
              </li>
              {/* <li>
                <a href='#' className='hover:text-white transition-colors'>
                  FAQ
                </a>
              </li> */}
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Live Chat
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='mb-4 font-semibold text-lg'>Legal</h4>
            <ul className='space-y-2 text-gray-400'>
              <li>
                <a
                  href='/privacy'
                  className='hover:text-white transition-colors'
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href='/terms' className='hover:text-white transition-colors'>
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href='/cookie'
                  className='hover:text-white transition-colors'
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='pt-8 border-gray-800 border-t text-gray-400 text-center'>
          <p>
            &copy; 2025 CodeSuccex. All rights reserved. Built with ❤️ for
            Nigerian youth.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
