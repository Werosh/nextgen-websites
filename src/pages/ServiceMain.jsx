import React, { useState, useEffect } from "react";
import {
  FaBolt,
  FaCode,
  FaShoppingCart,
  FaSearch,
  FaTools,
  FaCheck,
  FaShareAlt,
  FaArrowRight,
} from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa";

import { motion, useAnimation } from "framer-motion";
import SEO from "../components/SEO";

// Reusable components
const ScrollReveal = ({
  children,
  direction = "up",
  className = "",
  delay = 0,
}) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: delay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Animated Limited Time Offer Component
const AnimatedLimitedOffer = () => {
  const floatControls = useAnimation();
  const pulseControls = useAnimation();

  useEffect(() => {
    // Floating animation
    floatControls.start({
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    });

    // Pulse/glow animation
    pulseControls.start({
      boxShadow: [
        "0 0 0 0 rgba(249, 115, 22, 0.4)",
        "0 0 0 15px rgba(249, 115, 22, 0)",
        "0 0 0 0 rgba(249, 115, 22, 0)",
      ],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  }, [floatControls, pulseControls]);

  return (
    <motion.div
      className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-6 rounded-xl relative overflow-hidden"
      animate={floatControls}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl"
        animate={pulseControls}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <FaBolt className="text-white text-2xl" />
          <h3 className="text-2xl font-bold uppercase">Limited Time Offer</h3>
          <FaBolt className="text-white text-2xl" />
        </div>

        <motion.div
          className="text-center mb-4"
          animate={{
            rotate: [0, 2, 0, -2, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <p className="text-xl md:text-2xl font-bold">
            Get a website for our LOWEST price EVER!
          </p>
        </motion.div>

        <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
          <ul className="space-y-2">
            <li className="flex items-center">
              <FaCheck className="text-white mr-2" />
              <span>No setup fees or hidden costs</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-white mr-2" />
              <span>Cancel anytime - no long-term contract</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-white mr-2" />
              <span>All features in selected plan included</span>
            </li>
          </ul>
        </div>

        <div className="mt-4 text-center">
          <a href="/contact">
            <motion.button
              className="bg-white text-orange-600 hover:bg-orange-50 font-bold py-3 px-8 rounded-lg shadow-lg transition flex items-center justify-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Claim Offer Now!</span>
              <FaArrowRight />
            </motion.button>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const StaggerContainer = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

const ServiceCard = ({ service }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
      whileHover="hover"
      className="bg-white rounded-lg shadow-lg p-8 border border-gray-100 group relative overflow-hidden"
    >
      {/* Background glow effect */}
      <motion.div
        variants={{
          hover: {
            opacity: 1,
            scale: 1.5,
            transition: { duration: 0.4 },
          },
        }}
        className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 z-0"
      />

      <div className="flex flex-col items-center text-center relative z-10">
        {/* Icon container with enhanced animations */}
        <motion.div
          variants={{
            hover: {
              scale: 1.15,
              rotate: 5,
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
              transition: { duration: 0.3 },
            },
          }}
          className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white"
        >
          {/* Icon with its own animation */}
          <motion.div
            variants={{
              hover: {
                scale: 1.2,
                transition: {
                  duration: 0.2,
                  delay: 0.1,
                  type: "spring",
                  stiffness: 400,
                },
              },
            }}
          >
            {service.icon}
          </motion.div>
        </motion.div>

        {/* Title with animation */}
        <motion.h3
          variants={{
            hover: {
              scale: 1.05,
              color: "#1E40AF", // dark blue
              transition: { duration: 0.3 },
            },
          }}
          className="text-xl font-bold mb-3 text-gray-800"
        >
          {service.title}
        </motion.h3>

        {/* Description with subtle animation */}
        <motion.p
          variants={{
            hover: {
              y: -5,
              transition: { duration: 0.4 },
            },
          }}
          className="text-gray-600 mb-6"
        >
          {service.description}
        </motion.p>

        {/* Adding a "Learn More" button that appears on hover */}
        <a href="/pricing">
          <motion.button
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 0, y: 20 },
              hover: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.3, delay: 0.1 },
              },
            }}
            className="px-5 py-2 bg-blue-600 text-white rounded-full font-medium text-sm hover:bg-blue-700"
          >
            Get Started
          </motion.button>
        </a>
      </div>

      {/* Animated border effect */}
      <motion.div
        variants={{
          hover: {
            opacity: 1,
            transition: { duration: 0.3 },
          },
        }}
        className="absolute inset-0 border-2 border-blue-400 rounded-lg opacity-0"
      />
    </motion.div>
  );
};

const ServiceMain = () => {
  const services = [
    {
      id: "design",
      title: "Website Design",
      description:
        "We create custom, responsive designs that reflects any business brand identity and provide exceptional user experience.",
      icon: <FaLaptopCode size={24} />,
    },
    {
      id: "development",
      title: "Website Development",
      description:
        "Modern, high-performance websites built with the latest technologies and full custom stack coded solutions to meet your business needs",
      icon: <FaCode size={24} />,
    },
    {
      id: "ecommerce",
      title: "E-Commerce Solutions",
      description:
        "Feature-rich online stores with secure payment gateways and intuitive inventory management for all your E-Commerce needs.",
      icon: <FaShoppingCart size={24} />,
    },
    {
      id: "seo",
      title: "SEO Optimization",
      description:
        "Boost your search rankings and drive more organic traffic to increase your online visibility.",
      icon: <FaSearch size={24} />,
    },
    {
      id: "maintenance",
      title: "Website Maintenance",
      description:
        "Regular updates, security monitoring, and technical support to keep your website updated and running smoothly.",
      icon: <FaTools size={24} />,
    },
    {
      id: "social",
      title: "Social Media Integration",
      description:
        "Seamless connection with social platforms to expand your reach and engage with your audience.",
      icon: <FaShareAlt size={24} />,
    },
  ];

  // Real client testimonials
  const testimonials = [
    {
      name: "Eddy Li",
      role: "Car Wash Owner",
      comment:
        "I honestly didn't think I needed a website, but after NextGen set one up for me, I started getting way more bookings. It was quick, affordable, and it looks way better than I expected. Wish I did it sooner",
    },
    {
      name: "Shelley Zhang",
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
        "The maintenance service is worth every penny. Our site is always up-to-date and secure, letting me focus on my business. They even came to site to take some photos!",
    },
  ];

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <SEO
        title="Our Services | NextGen Websites"
        description="Explore our comprehensive web development services including custom website design, e-commerce solutions, and SEO optimization."
        keywords="web development services, custom websites, e-commerce development, website maintenance, SEO services"
        canonicalUrl="/services"
      />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-blue-600 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-blue-700 opacity-20">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white opacity-10"
                style={{
                  width: `${Math.random() * 20 + 5}px`,
                  height: `${Math.random() * 20 + 5}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 10 + 5}s`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="md:w-1/2 mb-10 md:mb-0"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 mt-10">
                  Transform Your{" "}
                  <span className="text-yellow-300">Digital Presence</span>
                </h1>
                <p className="text-lg md:text-xl font-semibold  opacity-90 text-black">
                  We provide innovative solutions that help businesses grow and
                  thrive in the digital world.
                </p>
                <div className="flex flex-wrap gap-4"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="md:w-1/2"
              >
                <div className="relative">
                  <div className="absolute -top-10 -left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-50" />
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-300 rounded-full opacity-30" />
                  <div className="relative bg-white p-4 rounded-lg shadow-2xl">
                    <div className="grid grid-cols-2 gap-4">
                      {services.slice(0, 4).map((service, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ y: -5 }}
                          className="bg-gray-50 p-4 rounded-md flex flex-col items-center justify-center"
                        >
                          <div className="text-blue-600 mb-2">
                            {service.icon}
                          </div>
                          <p className="text-gray-800 text-sm font-medium text-center">
                            {service.title}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 right-0"
            style={{
              y: scrollPosition * 0.2,
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#ffffff"
                fillOpacity="1"
                d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,197.3C672,192,768,160,864,160C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </motion.div>
        </section>

        {/* Services Section */}
        <section id="services" className="bg-white py-0">
          <div className="container mx-auto px-6">
            <ScrollReveal direction="up" className="text-center mb-16">
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
                <ServiceCard key={service.id} service={service} />
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Limited Time Offer Section */}
        <section className=" container mx-auto px-6 py-20 mt-15">
          <ScrollReveal direction="up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <AnimatedLimitedOffer />
              </div>

              <div className="md:col-span-2 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Why Pay Thousands Upfront?
                </h2>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="bg-blue-100 rounded-full p-3 h-min">
                      <FaCheck className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        No Massive Upfront Costs
                      </h3>
                      <p className="text-gray-600">
                        Most web developers charge $5,000 to $40,000 upfront.
                        Our subscription model spreads the cost, making
                        professional websites accessible to all businesses.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-blue-100 rounded-full p-3 h-min">
                    <FaCheck className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Continuous Updates & Maintenance
                    </h3>
                    <p className="text-gray-600">
                      Unlike traditional agencies that charge extra for updates,
                      our subscription includes ongoing maintenance, security
                      updates, and technical support.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-blue-100 rounded-full p-3 h-min">
                    <FaCheck className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Only 3 Month Lock In Period
                    </h3>
                    <p className="text-gray-600">
                      Try any plan for a minimum of 3 months. Experience our service, 
                      see your website come to life, and only continue if you're 
                      completely satisfied. (Only applies to monthly subscriptions)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Call to Action */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-6">
            <ScrollReveal direction="up">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-10 md:p-16 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-white opacity-10" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-8 md:mb-0 md:mr-8">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                      Ready to Get Started?
                    </h3>
                    <p className="text-lg opacity-90 max-w-lg">
                      Let's transform your business with our expert services and
                      innovative solutions.
                    </p>
                  </div>
                  <a href="tel:+15551234567">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300 shadow-lg"
                    >
                      Contact Us Today
                    </motion.button>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Testimonials - Updated with real reviews */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6">
            <ScrollReveal direction="up" className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                What Our Clients Say
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Don't just take our word for it — hear what our satisfied
                clients have to say.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {testimonials.map((testimonial, index) => (
                <ScrollReveal key={index} direction="up" delay={index * 0.1}>
                  <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 shadow-sm h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 italic mb-6 flex-grow">
                      "{testimonial.comment}"
                    </p>
                    <div className="flex items-center mt-auto">
                      <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Google Reviews Button */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-6">
            <ScrollReveal direction="up">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  See What Others Are Saying
                </h3>
                <motion.a
                  href="https://maps.app.goo.gl/YxoTgWAeP6mu23Gn9"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                    fill="#fff"
                  >
                    <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm10 10.5V16h-4v-4h-2v4h-4v-4h-2v4h-4v2h4v4h-4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4v-2h-4v-4h4v-1.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                    <path d="M22 16v4h4v-4h-4zm0 6v4h4v-4h-4z" />
                  </svg>
                  See Our Google Reviews
                </motion.a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServiceMain;
