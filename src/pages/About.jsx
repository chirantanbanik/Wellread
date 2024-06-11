import React from 'react'
import { motion } from 'framer-motion';

function About() {
  return (
    <div className='container mx-auto px-6 md:px-10 lg:px-20'>
             <motion.h2
                className='text-4xl font-bold mb-12 mt-4 text-blue-900'
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                About us
            </motion.h2>
            <motion.div
                  className='feature p-6 bg-white rounded-lg shadow-lg'
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
            >
              <p className='sm:text-md text-lg mb-6 text-black text-center font-bold'>
                Welcome to WellRead, a vibrant platform dedicated to fostering creativity and inspiration. At WellRead, we believe in the power of words and ideas to change the world.
                At WellRead, our mission is to empower individuals to express their creativity and inspire others. We aim to create a supportive and dynamic environment where every voice is heard, and every idea can flourish. Whether you're a writer, artist, or thinker, you’ll find a community that values your unique perspective.
              </p>
            </motion.div>
              
    </div>
  )
}

export default About