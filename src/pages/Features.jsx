import React from 'react'
import { motion } from 'framer-motion';

function Features() {
  return (
    <>
        <motion.h2
                className='text-4xl font-bold mb-12 mt-4 text-blue-900'
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                Features
        </motion.h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <motion.div
                  className='feature p-6 bg-white rounded-lg shadow-lg'
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  whileHover={{
                    scale: 1.07,
                    boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.15)",
                    backgroundColor: "#f0f4f8",
                    color: "#1a202c",
                    cursor: "default",
                  }}
                >
                  <h3 className='text-2xl font-bold mb-4 text-blue-900'>Share Your Journey</h3>
                  <p className='text-lg font-semibold'>Every creative journey is unique, and at WellRead, we celebrate that uniqueness. Share your stories, experiences, and insights with our community. Whether you’re just starting out or you’re an experienced creator, your journey can inspire others and spark new ideas.</p>
                </motion.div>
                <motion.div
                  className='feature p-6 bg-white rounded-lg shadow-lg'
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  whileHover={{
                    scale: 1.07,
                    boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.15)",
                    backgroundColor: "#f0f4f8",
                    color: "#1a202c",
                    cursor: "default",
                  }}
                >
                  <h3 className='text-2xl font-bold mb-4 text-blue-900'>Explore New Ideas</h3>
                  <p className='text-lg font-semibold'>WellRead is a hub of creativity, where you can explore a diverse range of ideas and perspectives. From thought-provoking articles and essays to imaginative fiction and poetry, there’s always something new to discover. Dive into our library of user-generated content and let your imagination roam free.</p>
                </motion.div>
                <motion.div
                  className='feature p-6 bg-white rounded-lg shadow-lg'
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  whileHover={{
                    scale: 1.07,
                    boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.15)",
                    backgroundColor: "#f0f4f8",
                    color: "#1a202c",
                    cursor: "default",
                  }}
                >
                  <h3 className='text-2xl font-bold mb-4 text-blue-900'>Resources and Tools</h3>
                  <p className='text-lg font-semibold'>We provide a variety of resources and tools to help you enhance your creativity. Whether you need writing prompts, artistic challenges, or tips on improving your craft, WellRead has you covered. Our goal is to equip you with everything you need to succeed in your creative endeavors.</p>
                </motion.div>
              </div>
    </>
  )
}

export default Features