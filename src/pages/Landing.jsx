import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import About from "./About";
import Features from "./Features";


const Landing = () => {
  const aboutRef = useRef(null);
  const navigate = useNavigate();

  const handleScrollToDiscover = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const aboutAnimation = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1 },
  };

  const featuresAnimation = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1 },
  };

  const joinAnimation = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1 },
  };

  return (
    <><div className="flex-1 flex flex-col justify-center items-center text-center bg-sky-blue">
      <motion.div
        className="landing-page w-full py-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <section className="w-full py-20">
          <motion.h1
            className="text-5xl lg:text-7xl font-extrabold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            Welcome to <span className="text-blue-900">WellRead!</span>
          </motion.h1>
          <motion.p
            className="text-xl font-bold text-gray-800 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            Empowering Creativity, One Thought at a Time: Wellread, where
            Inspiration Thrives.
          </motion.p>
          <motion.button
            className="mt-8 px-6 py-3 bg-white text-blue-900 font-bold rounded-full"
            whileHover={{ scale: 1.1 }}
            onClick={handleScrollToDiscover}
          >
            Explore
          </motion.button>
        </section>
      </motion.div>

      <motion.section
        id="discover-section"
        className="w-full pt-10 pb-20 bg-white text-blue-900"
        style={{ marginTop: "100px" }}
        ref={aboutRef}
        initial={aboutAnimation.initial}
        animate={aboutAnimation.animate}
        transition={aboutAnimation.transition}
      >
        <About />
      </motion.section>
      <motion.section
        className="w-full py-10 bg-blue-100 text-gray-800"
        initial={featuresAnimation.initial}
        animate={featuresAnimation.animate}
        transition={featuresAnimation.transition}
      >
        <motion.div
          className="container mx-auto md:px-6 px-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Features />
          <motion.div
            className="feature p-6 bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{
              scale: 1.07,
              boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.15)',
              backgroundColor: '#f0f4f8',
              color: '#1a202c',
              cursor: 'default'
            }}
          >
<<<<<<< HEAD
            <h3 className="text-2xl font-bold mb-4 text-blue-900">
              Explore New Ideas
            </h3>
            <p className="text-lg font-semibold">
              WellRead is a hub of creativity, where you can explore a diverse
              range of ideas and perspectives. From thought-provoking articles
              and essays to imaginative fiction and poetry, there’s always
              something new to discover. Dive into our library of
              user-generated content and let your imagination roam free.
            </p>
          </motion.div>
          <motion.div
            className="feature p-6 bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{
              scale: 1.07,
              boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.15)',
              backgroundColor: '#f0f4f8',
              color: '#1a202c',
              cursor: 'default'
            }}
          >
            <h3 className="text-2xl font-bold mb-4 text-blue-900">
              Resources and Tools
            </h3>
            <p className="text-lg font-semibold">
              We provide a variety of resources and tools to help you enhance
              your creativity. Whether you need writing prompts, artistic
              challenges, or tips on improving your craft, WellRead has you
              covered. Our goal is to equip you with everything you need to
              succeed in your creative endeavors.
            </p>
          </motion.div>
      </motion.div>
    </motion.section><motion.section
      className="w-full py-20 bg-white text-gray-800"
      initial={joinAnimation.initial}
      animate={joinAnimation.animate}
      transition={joinAnimation.transition}
    >
=======
            Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="feature p-6 bg-white rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{
                scale: 1.07,
                boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.15)",
                backgroundColor: "#f0f4f8",
                color: "#1a202c",
                cursor: "default",
              }}
            >
              <h3 className="text-2xl font-bold mb-4 text-blue-900">
                Share Your Journey
              </h3>
              <p className="text-lg font-semibold">
                Every creative journey is unique, and at WellRead, we celebrate
                that uniqueness. Share your stories, experiences, and insights
                with our community. Whether you’re just starting out or you’re
                an experienced creator, your journey can inspire others and
                spark new ideas.
              </p>
            </motion.div>
            <motion.div
              className="feature p-6 bg-white rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{
                scale: 1.07,
                boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.15)",
                backgroundColor: "#f0f4f8",
                color: "#1a202c",
                cursor: "default",
              }}
            >
              <h3 className="text-2xl font-bold mb-4 text-blue-900">
                Explore New Ideas
              </h3>
              <p className="text-lg font-semibold">
                WellRead is a hub of creativity, where you can explore a diverse
                range of ideas and perspectives. From thought-provoking articles
                and essays to imaginative fiction and poetry, there’s always
                something new to discover. Dive into our library of
                user-generated content and let your imagination roam free.
              </p>
            </motion.div>
            <motion.div
              className="feature p-6 bg-white rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{
                scale: 1.07,
                boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.15)",
                backgroundColor: "#f0f4f8",
                color: "#1a202c",
                cursor: "default",
              }}
            >
              <h3 className="text-2xl font-bold mb-4 text-blue-900">
                Resources and Tools
              </h3>
              <p className="text-lg font-semibold">
                We provide a variety of resources and tools to help you enhance
                your creativity. Whether you need writing prompts, artistic
                challenges, or tips on improving your craft, WellRead has you
                covered. Our goal is to equip you with everything you need to
                succeed in your creative endeavors.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        className="w-full py-20 bg-white text-gray-800"
        initial={joinAnimation.initial}
        animate={joinAnimation.animate}
        transition={joinAnimation.transition}
      >
>>>>>>> upstream/master
        <motion.div
          className="container mx-auto px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="text-4xl font-bold mb-6 text-blue-900"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Join WellRead Today
          </motion.h2>
          <motion.p
            className="text-lg mb-6 font-semibold"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Connect with like-minded individuals who share your passion for
            creativity. WellRead is a place to share your work, receive
            constructive feedback, and collaborate with others. Our community is
            filled with people who are eager to support and uplift one another,
            making it the perfect place to grow your creative potential. Join
            WellRead today and become part of a community where creativity
            thrives. Together, we can inspire, support, and create a brighter
            future through the power of words and ideas.
          </motion.p>
          <motion.button
            className="mt-8 px-6 py-3 bg-blue-900 text-white font-semibold rounded-full"
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </motion.button>
        </motion.div>
      </motion.section>
      </div>
      </>
  );
};

export default Landing;
