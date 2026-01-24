"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const TestimonialsSection = () => {
  return (
    <section className='bg-gradient-to-br from-gray-50 to-emerald-50 px-6 py-24'>
      <motion.div
        className='mx-auto max-w-6xl'
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className='mb-16 text-center'>
          <Badge className='bg-emerald-100 mb-4 px-4 py-2 text-emerald-700'>
            Success Stories
          </Badge>
          <h2 className='mb-6 font-bold text-gray-900 text-4xl md:text-5xl'>
            Real People. Real Results.
          </h2>
        </div>

        <motion.div
          className='gap-8 grid md:grid-cols-3'
          variants={staggerContainer}
          initial='initial'
          whileInView='animate'
          viewport={{ once: true }}
        >
          {[
            {
              name: "Mr. Arogunmasa Samuel Peter",
              role: "Vice Principal, Therbow School",
              content:
                "The Codesuccex initiative offers students a powerful opportunity and clear roadmap to be empowered, guided, and exposed to the right ingredients for lasting success. I wholeheartedly recommend the CodeSuccex platform.",
              rating: 5,
            },
            {
              name: "Mrs. Helen Marcus",
              role: "Teacher, Therbow School",
              content:
                "Codesuccex is the real deal. It proves that true success doesn’t come from connections, but from self-discovery, personal development, and relying on God. CodeSuccex is the platform that empowers young people to become the best version of themselves.",
              rating: 5,
            },
            {
              name: "Mr. Joseph Bright Chindo",
              role: "HOD Sciences, Christ Schools",
              content:
                "CodeSuccex is a platform that opens our students’ eyes to the truth that, regardless of their circumstances or family background, they have everything it takes to succeed in life. We deeply appreciate this platform. Its message is timeless—no one ever outgrows what CodeSuccex offers.",
              rating: 5,
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className='bg-white shadow-xl border-0 h-full'>
                <CardContent className='p-8'>
                  <div className='flex mb-4'>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className='fill-current w-5 h-5 text-yellow-400'
                      />
                    ))}
                  </div>
                  <p className='mb-6 text-gray-700 text-lg leading-relaxed'>
                    &#34;{testimonial.content}&#34;
                  </p>
                  <div className='flex items-center'>
                    <div className='flex justify-center items-center bg-gradient-to-r from-emerald-400 to-blue-400 mr-4 rounded-full w-12 h-12 font-bold text-white text-lg'>
                      {testimonial.name?.charAt(0) || "?"}
                    </div>
                    <div>
                      <h4 className='font-semibold text-gray-900'>
                        {testimonial.name}
                      </h4>
                      <p className='text-gray-600'>{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
