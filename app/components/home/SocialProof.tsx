"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Users, Award, TrendingUp, Star } from "lucide-react";

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

export const SocialProof = () => {
  return (
    <motion.section
      className='flex flex-col justify-between items-center bg-gradient-to-r from-emerald-500 to-blue-500 py-16 text-white'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Badge className='bg-pink-100 mb-4 px-4 py-2 text-pink-700'>
        Our Target
      </Badge>
      <motion.div
        className='gap-8 grid grid-cols-2 md:grid-cols-4 mx-auto px-6 max-w-6xl'
        variants={staggerContainer}
        initial='initial'
        whileInView='animate'
        viewport={{ once: true }}
      >
        {[
          { number: "50M+", label: "Active Members", icon: Users },
          { number: "1,200+", label: "Expert Mentors", icon: Award },
          { number: "500+", label: "Success Stories", icon: TrendingUp },
          { number: "4.9/5", label: "User Rating", icon: Star },
        ].map((stat, index) => (
          <motion.div key={index} className='text-center' variants={fadeInUp}>
            <stat.icon className='mx-auto mb-4 w-8 h-8' />
            <motion.h3
              className='font-bold text-4xl md:text-5xl'
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
            >
              {stat.number}
            </motion.h3>
            <p className='mt-2 text-emerald-100 text-lg'>{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};
