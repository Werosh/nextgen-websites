import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaRocket,
  FaLaptopCode,
  FaHeadset,
  FaChartLine,
  FaCog,
  FaCheckCircle,
  FaStar,
  FaQuoteRight,
  FaPencilRuler,
  FaMobileAlt,
  FaTools,
  FaHashtag,
} from "react-icons/fa";

import WebDevImg from "../images/next-gen-back.png";
import TeamImg from "../images/team.jpg";

import SEO from "../components/SEO";

// Enhanced animation components
const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  className = "",
  viewport = { once: true, margin: "-100px" },
}) => {
  // Set initial and animate values based on direction
  const getInitialValues = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 50 };
      case "down":
        return { opacity: 0, y: -50 };
      case "left":
        return { opacity: 0, x: 50 };
      case "right":
        return { opacity: 0, x: -50 };
      case "scale":
        return { opacity: 0, scale: 0.8 };
      default:
        return { opacity: 0 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={getInitialValues()}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      transition={{ duration: 0.7, delay }}
      viewport={viewport}
    >
      {children}
    </motion.div>
  );
};

// Staggered children animation component
const StaggerContainer = ({ children, staggerDelay = 0.1, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Child component for StaggerContainer
const StaggerItem = ({ children, direction = "up", className = "" }) => {
  const variants = {
    hidden:
      direction === "up"
        ? { opacity: 0, y: 50 }
        : direction === "down"
        ? { opacity: 0, y: -50 }
        : direction === "left"
        ? { opacity: 0, x: 50 }
        : direction === "right"
        ? { opacity: 0, x: -50 }
        : { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
};

// Parallax scroll component (enhanced)
const ParallaxSection = ({
  children,
  offsetMultiplier = 0.2,
  direction = "up",
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const multiplier =
    direction === "down" ? -offsetMultiplier : offsetMultiplier;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${multiplier * 100}%`]
  );

  return (
    <motion.div ref={ref} style={{ y }} className="w-full h-full">
      {children}
    </motion.div>
  );
};

// Service Card Component updated with staggered animations
const ServiceCard = ({ service, index }) => {
  return (
    <StaggerItem>
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition border-t-4 border-blue-600 relative overflow-hidden group">
        <div className="absolute -right-12 -top-12 bg-blue-100 rounded-full w-24 h-24 opacity-20 group-hover:scale-150 transition-all duration-500"></div>
        <div className="relative z-10">
          {service.icon}
          <h3 className="text-xl font-bold mb-2">{service.title}</h3>
          <p className="text-gray-600">{service.description}</p>
        </div>
      </div>
    </StaggerItem>
  );
};

// Testimonial Card Component updated
const TestimonialCard = ({ testimonial, index }) => {
  // Alternate direction based on index for a zigzag effect
  const direction = index % 2 === 0 ? "left" : "right";

  return (
    <StaggerItem direction={direction}>
      <div className="bg-white rounded-xl shadow-lg p-6 relative border-l-4 border-blue-600">
        <FaQuoteRight className="absolute top-4 right-4 text-blue-100 text-4xl" />
        <div className="flex items-center mb-4">
          <div className="bg-blue-600 rounded-full h-12 w-12 flex items-center justify-center text-white font-bold text-xl mr-4">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold">{testimonial.name}</h4>
            <p className="text-sm text-gray-500">{testimonial.role}</p>
          </div>
        </div>
        <p className="text-gray-600 italic mb-4">{testimonial.comment}</p>
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
      </div>
    </StaggerItem>
  );
};

// TypewriterText component (unchanged)
const TypewriterText = () => {
  const phrases = [
    "Restaurant.",
    "Plumbing Business.",
    "Landscaping Business.",
    "Carwash.",
    "Salon.",
    "Law Firm.",
    "Blog.",
    "HVAC.",
    "Sneaker Shop.",
    "Cafe.",
    "Food Truck.",
    "Bakery.",
    "Gym.",
    "Bookstore.",
    "Tutoring Service.",
    "Music School.",
    "Window Cleaning.",
    "Business.", // Kept this as you had it originally
  ];

  const [shuffledPhrases, setShuffledPhrases] = useState([]);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Shuffle phrases when component mounts
  useEffect(() => {
    const shuffleArray = (array) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    setShuffledPhrases(shuffleArray(phrases));
  }, []);

  useEffect(() => {
    // If shuffledPhrases is empty or we're paused, don't do anything
    if (shuffledPhrases.length === 0 || isPaused) return;

    const currentPhrase = shuffledPhrases[currentPhraseIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(currentPhrase.substring(0, currentText.length + 1));

          // When typing is complete
          if (currentText === currentPhrase) {
            setIsPaused(true); // Set to paused instead of deleting immediately

            // After delay, start deleting
            setTimeout(() => {
              setIsPaused(false);
              setIsDeleting(true);
            }, 1000); // 1 seconds pause
          }
        } else {
          setCurrentText(currentPhrase.substring(0, currentText.length - 1));

          if (currentText === "") {
            setIsDeleting(false);
            setCurrentPhraseIndex(
              (prevIndex) => (prevIndex + 1) % shuffledPhrases.length
            );
          }
        }
      },
      isDeleting ? 70 : 75
    );

    return () => clearTimeout(timeout);
  }, [currentText, currentPhraseIndex, isDeleting, isPaused, shuffledPhrases]);

  return (
    <motion.span
      className="text-blue-600 font-bold"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {currentText}
    </motion.span>
  );
};

const LandingPage = () => {
  const services = [
    {
      icon: <FaPencilRuler className="text-blue-600 text-4xl mb-4" />,
      title: "Website Design",
      description:
        "Beautiful, responsive designs that reflect your brand identity and engage your visitors.",
    },
    {
      icon: <FaLaptopCode className="text-blue-600 text-4xl mb-4" />,
      title: "Website Development",
      description:
        "Custom websites built with the latest technologies to ensure speed, security, and scalability.",
    },
    {
      icon: <FaTools className="text-blue-600 text-4xl mb-4" />,
      title: "Maintenance",
      description:
        "Regular updates, security patches, and technical support to keep your website running smoothly.",
    },
    {
      icon: <FaChartLine className="text-blue-600 text-4xl mb-4" />,
      title: "SEO Optimization",
      description:
        "Boost your online visibility and attract more qualified traffic to your website.",
    },
    {
      icon: <FaHashtag className="text-blue-600 text-4xl mb-4" />,
      title: "Social Media Integration",
      description:
        "Seamless connections with your social platforms to expand your digital footprint.",
    },
    {
      icon: <FaMobileAlt className="text-blue-600 text-4xl mb-4" />,
      title: "Responsive Design",
      description:
        "Websites that look and function perfectly on all devices, from desktops to smartphones.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Restaurant Owner",
      comment:
        "The website they designed for my restaurant not only looks stunning but has increased our online reservations by 70%. Their SEO work has put us on the map!",
    },
    {
      name: "Michael Chen",
      role: "E-commerce Entrepreneur",
      comment:
        "Their team delivered a website that exceeded my expectations. The social media integration has helped us grow our following and drive sales.",
    },
    {
      name: "Rebecca Torres",
      role: "Law Firm Partner",
      comment:
        "Professional, responsive, and detail-oriented. Our new website has significantly improved our client acquisition process.",
    },
    {
      name: "David Wilson",
      role: "Landscaping Business Owner",
      comment:
        "The maintenance service is worth every penny. Our site is always up-to-date and secure, letting me focus on my business.",
    },
  ];

  // Track scroll position for some advanced effects
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.5]);

  return (
    <>
      <SEO
        title="NextGen Websites | Top Web Development Agency"
        description="Transform your online presence with our expert web development services. Modern, responsive websites that drive business growth."
        keywords="web agency, professional websites, React development, responsive design, SEO-friendly websites"
        canonicalUrl="/"
      />

      <div className="bg-white text-gray-800 overflow-hidden">
        {/* Hero Section with Typewriter and Angular Geometric Background */}
        <section
          id="home"
          className="relative bg-gradient-to-b from-blue-50 to-white h-screen flex items-center overflow-hidden"
        >
          {/* Unique Angular Background Art Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Intersecting Angular Shapes */}
            <div className="absolute w-96 h-96 border-4 border-blue-800 top-0 left-1/4 opacity-20 transform rotate-12"></div>
            <div className="absolute w-80 h-80 border-4 border-blue-900 top-10 left-1/3 opacity-15 transform -rotate-6"></div>

            {/* Large Crossing Rectangles */}
            <div className="absolute w-full h-64 bg-blue-900 -top-20 -left-20 opacity-20 transform -rotate-12 origin-top-left"></div>
            <div className="absolute w-full h-64 bg-blue-500 -bottom-20 -right-20 opacity-15 transform rotate-12 origin-bottom-right"></div>

            {/* Angular Box Shapes that Cross Each Other */}
            <div className="absolute w-64 h-64 border-8 border-blue-500 top-1/4 -left-10 opacity-30 transform rotate-45"></div>
            <div className="absolute w-96 h-96 border-8 border-blue-900 bottom-1/4 right-1/4 opacity-20 transform -rotate-15"></div>

            {/* Diagonal Lines */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-0 left-0 w-full h-full border-t-2 border-blue-900 transform rotate-6"></div>
              <div className="absolute top-0 left-0 w-full h-full border-t-2 border-blue-900 transform -rotate-6"></div>
            </div>

            {/* Abstract Polygon Elements */}
            <div className="absolute top-1/3 left-1/3">
              <div className="w-40 h-40 bg-blue-600 opacity-30 transform rotate-45"></div>
            </div>
            <div className="absolute bottom-1/4 right-1/3">
              <div className="w-32 h-32 bg-blue-900 opacity-20 transform -rotate-12"></div>
            </div>

            {/* Parallelograms */}
            <div className="absolute top-1/2 left-0 w-72 h-28 bg-blue-500 opacity-20 transform skew-x-12"></div>
            <div className="absolute bottom-1/3 right-0 w-72 h-28 bg-blue-900 opacity-15 transform -skew-x-12"></div>

            {/* Diamond Grid Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5">
              <div className="absolute w-full h-full border-4 border-blue-900 transform rotate-45"></div>
              <div className="absolute w-full h-full border-4 border-blue-900 transform -rotate-45"></div>
            </div>

            {/* Overlapping Rectangles */}
            <div className="absolute w-64 h-32 border-4 border-blue-700 top-20 right-20 opacity-20"></div>
            <div className="absolute w-32 h-64 border-4 border-blue-500 top-10 right-40 opacity-25"></div>

            {/* Responsive considerations - Mobile-specific elements */}
            <div className="absolute w-32 h-32 border-4 border-blue-900 top-10 left-10 opacity-30 transform rotate-12 md:hidden"></div>
          </div>

          <div className="container mx-auto px-6 py-20 md:py-32 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <ScrollReveal direction="left" className="md:w-1/2 mb-12 md:mb-0">
                <div className="relative">
                  <span className="absolute -left-4 -top-4 text-5xl text-blue-500">
                    "
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 relative">
                    Build a website for your <br />
                    <div className="h-12 md:h-14 lg:h-16 flex items-center">
                      <TypewriterText />
                    </div>
                  </h1>
                  <span className="absolute -right-4 bottom-0 text-5xl text-blue-200">
                    "
                  </span>
                </div>
                <p className="text-lg md:text-xl text-gray-600 mb-8">
                  Elevate your online presence with cutting-edge web solutions
                  tailored for your business needs at a fraction of the cost.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/pricing">
                    <motion.button
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Get Started</span>
                      <FaRocket className="text-white" />
                    </motion.button>
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.2} className="md:w-1/2">
                <div className="relative">
                  <div className="bg-blue-600 rounded-3xl w-full h-64 md:h-80 lg:h-96 flex items-center justify-center transform rotate-1 shadow-xl">
                    <img
                      src={WebDevImg}
                      alt="Website Design"
                      className="rounded-lg shadow-xl scale-90 transform -rotate-2 hover:rotate-0 transition-all duration-500"
                    />
                  </div>
                  <motion.div
                    className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg"
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3">
                      <FaRocket className="text-blue-600 text-xl" />
                      <span className="font-semibold">Launch Fast</span>
                    </div>
                  </motion.div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Wave separator */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="text-white fill-current h-12 md:h-16 w-full"
            >
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
            </svg>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="bg-blue-50 mb-20 relative overflow-hidden"
        >
          <ParallaxSection offsetMultiplier={0.1} direction="up">
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-200 rounded-full opacity-30"></div>
            <div className="absolute -left-20 -top-20 w-96 h-96 bg-blue-100 rounded-full opacity-30"></div>
          </ParallaxSection>

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <ScrollReveal direction="left" className="md:w-1/2 mb-10 md:mb-0">
                <div className="relative">
                  <div className="bg-blue-600 rounded-tl-lg rounded-br-lg p-1 transform rotate-3 shadow-xl">
                    <img
                      src={TeamImg}
                      alt="Team"
                      className="rounded transform -rotate-6 translate-x-4 -translate-y-4 hover:rotate-0 transition-all duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                    <span className="font-semibold text-blue-600">
                      Since 2020
                    </span>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  About NextGen Websites
                </h2>
                <div className="w-20 h-1 bg-blue-600 mb-6"></div>
                <p className="text-lg text-gray-600 mb-6">
                  At NextGen Websites, we believe that getting online shouldn’t
                  cost a fortune. We’re passionate about helping small
                  businesses, startups, and local legends step confidently into
                  the digital world without the crazy price tags.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  Our mission is simple: make beautiful, functional websites
                  accessible to everyone — no time wasting, no hidden fees, no
                  BS. Just clean and honest pricing that works. It’s all about
                  pushing into the next generation of business, together.
                </p>

                <StaggerContainer className="grid grid-cols-2 gap-6">
                  {[
                    { number: "200+", label: "Projects Completed" },
                    { number: "50+", label: "Happy Clients" },
                    { number: "5+", label: "Years Experience" },
                    { number: "24/7", label: "Customer Support" },
                  ].map((stat, index) => (
                    <StaggerItem
                      key={index}
                      direction={index % 2 === 0 ? "up" : "down"}
                    >
                      <div className="text-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition hover:-translate-y-1">
                        <h3 className="text-3xl font-bold text-blue-600 mb-2">
                          {stat.number}
                        </h3>
                        <p className="text-gray-600">{stat.label}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section id="services" className="bg-white mb-20 ">
          <div className="container mx-auto px-6">
            <ScrollReveal direction="up" className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Our Services
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We offer comprehensive web solutions to help your business
                thrive in the digital landscape.
              </p>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} service={service} index={index} />
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="py-20 bg-white relative overflow-hidden"
        >
          <ParallaxSection direction="down">
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50 to-transparent opacity-70"></div>
          </ParallaxSection>

          <div className="container mx-auto px-6 relative z-10">
            <ScrollReveal direction="up" className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                What Our Clients Say
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our clients have to
                say about working with us.
              </p>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </StaggerContainer>
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
