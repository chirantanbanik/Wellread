import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
  };

  const featureData = [
    {
      title: "Share Your Journey",
      description:
        "Every creative journey is unique, and at WellRead, we celebrate that uniqueness. Share your stories, experiences, and insights with our community. Whether you’re just starting out or you’re an experienced creator, your journey can inspire others and spark new ideas.",
    },
    {
      title: "Explore New Ideas",
      description:
        "WellRead is a hub of creativity, where you can explore a diverse range of ideas and perspectives. From thought-provoking articles and essays to imaginative fiction and poetry, there’s always something new to discover. Dive into our library of user-generated content and let your imagination roam free.",
    },
    {
      title: "Resources and Tools",
      description:
        "We provide a variety of resources and tools to help you enhance your creativity. Whether you need writing prompts, artistic challenges, or tips on improving your craft, WellRead has you covered. Our goal is to equip you with everything you need to succeed in your creative endeavors.",
    },
  ];

  return (
    <div className="flex-1 flex flex-col justify-center items-center text-center bg-sky-blue">
      <motion.div
        className="landing-page w-full py-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <section className="w-full py-20">
          <motion.h1
            className="text-5xl lg:text-7xl flex justify-center flex-wrap gap-4 font-extrabold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            Welcome to
            <span className="text-blue-900 ">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString("WellRead!")
                    .pauseFor(2500)
                    .start()
                    .callFunction(() => {
                      typewriter.stop();
                    });
                }}
              />
            </span>
          </motion.h1>
          <motion.p
            className="text-xl font-bold text-gray-800 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .pauseFor(2000)
                  .typeString(
                    "Empowering Creativity, One Thought at a Time: Wellread, where Inspiration Thrives."
                  )
                  .start()
                  .callFunction(() => {
                    typewriter.stop();
                  });
              }}
              options={{
                delay: 20,
              }}
            />
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
        <div className="container mx-auto px-6 md:px-10 lg:px-20">
          <h2 className="text-4xl font-bold mb-6 text-center">
            About WellRead
          </h2>
          <p className="sm:text-md text-lg mb-6 text-black text-center font-bold">
            Welcome to WellRead, a vibrant platform dedicated to fostering
            creativity and inspiration. At WellRead, we believe in the power of
            words and ideas to change the world. At WellRead, our mission is to
            empower individuals to express their creativity and inspire others.
            We aim to create a supportive and dynamic environment where every
            voice is heard, and every idea can flourish. Whether you're a
            writer, artist, or thinker, you’ll find a community that values your
            unique perspective.
          </p>
        </div>
      </motion.section>
      <motion.section
        className="w-full py-10 bg-blue-100 text-gray-800"
        initial={featuresAnimation.initial}
        animate={featuresAnimation.animate}
        transition={featuresAnimation.transition}
      >
        <motion.div
          className="container mx-auto px-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="text-4xl font-bold mb-12 mt-4 text-blue-900"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Features
          </motion.h2>
          <Slider {...settings}>
            {featureData.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-item p-6 mx-10 my-4 bg-white rounded-lg shadow-lg transform transition-transform duration-300"
              >
                <h3 className="text-2xl font-bold mb-4 text-blue-900">
                  {feature.title}
                </h3>
                <p className="text-lg font-semibold">{feature.description}</p>
              </motion.div>
            ))}
          </Slider>
        </motion.div>
      </motion.section>
      <style jsx>{`
        .slick-slide {
          margin: 0 20px; 
        }
        .feature-item {
          height: 350px;
          transition: transform 0.5s ease, box-shadow 0.5s ease, border-radius 0.5s ease;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        } 
        .feature-item:hover {
          scale: 1.07;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
          border-radius: 10%;
        } 
          .slick-track {
          margin: 0;
          }
      `}</style>

      <motion.section
        className="w-full py-20 bg-white text-gray-800"
        initial={joinAnimation.initial}
        animate={joinAnimation.animate}
        transition={joinAnimation.transition}
      >
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
  );
};

export default Landing;
