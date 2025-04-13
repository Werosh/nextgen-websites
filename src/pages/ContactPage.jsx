import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaArrowRight,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import { IoMdMailUnread } from "react-icons/io";

// Reusable animation components
const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  className = "",
}) => {
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
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
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

const ContactBox = ({ icon, title, content, hoverColor }) => {
  return (
    <StaggerItem className="w-full">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 group relative overflow-hidden h-full"
        whileHover={{
          y: -10,
          boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
          transition: { duration: 0.3 },
        }}
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
            className={`w-16 h-16 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white`}
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
              {icon}
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
            {title}
          </motion.h3>

          {/* Content with subtle animation */}
          <motion.div
            variants={{
              hover: {
                y: -5,
                transition: { duration: 0.4 },
              },
            }}
            className="text-gray-600"
          >
            {content}
          </motion.div>
        </div>
      </motion.div>
    </StaggerItem>
  );
};

const FormField = ({
  label,
  type = "text",
  placeholder,
  name,
  required = false,
  textarea = false,
}) => {
  return (
    <div className="mb-6">
      <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows="4"
          placeholder={placeholder}
          required={required}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white"
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white"
        />
      )}
    </div>
  );
};

const ContactPage = () => {
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus("sending");

    setTimeout(() => {
      setFormStatus("success");
      // Reset form
      e.target.reset();

      // Reset status after 3 seconds
      setTimeout(() => {
        setFormStatus(null);
      }, 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      title: "Telephone",
      content: (
        <p>
          0467 561 550
        </p>
      ),
      icon: <FaPhoneAlt size={24} />,
      hoverColor: "blue",
    },
    {
      title: "E-Mail",
      content: (
        <div className="space-y-2">
          <p>
            contact@nextgenwebsites.info
          </p>
        </div>
      ),
      icon: <IoMdMailUnread size={24} />,
      hoverColor: "green",
    },
    {
      title: "Business Hours",
      content: (
        <div className="space-y-2">
          <p>Monday - Friday: 10AM - 5PM</p>
          <p>Saturday: 10AM - 3PM</p>
          <p>Sunday: Closed</p>
        </div>
      ),
      icon: <FaClock size={24} />,
      hoverColor: "purple",
    },
    {
      title: "Follow Us",
      content: (
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href="#"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="#"
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61574986987621"
            className="text-blue-700 hover:text-blue-900 transition-colors"
            target="_blank"
          >
            <FaFacebook size={20} />
          </a>
          <a
            href="#"
            className="text-pink-600 hover:text-pink-800 transition-colors"
          >
            <FaInstagram size={20} />
          </a>
        </div>
      ),
      icon: <FaEnvelope size={24} />,
      hoverColor: "pink",
    },
  ];

  return (
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
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Let's <span className="text-yellow-300">Connect</span>
              </h1>
              <p className="text-lg md:text-xl font-bold mt-15 opacity-90 text-gray-900">
                We'd love to hear from you! Get in touch with our team for any
                questions, feedback, or project inquiries.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0"
          style={{
            y: 0.2,
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

      {/* Combined Contact Section - Info Boxes and Form Side by Side */}
      <section className=" bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal direction="up" className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Get In Touch
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're here to help and answer any questions you might have. We
              look forward to hearing from you!
            </p>
          </ScrollReveal>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Contact Info Boxes - 2x2 Grid */}
            <div className="lg:w-1/2">
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactInfo.map((item, index) => (
                  <ContactBox
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    content={item.content}
                    hoverColor={item.hoverColor}
                  />
                ))}
              </StaggerContainer>
            </div>

            {/* Contact Form */}
            <div className="lg:w-1/2">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full">
                <div className="bg-blue-600 text-white p-8">
                  <h3 className="text-2xl font-bold mb-4">Send us a Message</h3>
                  <p className="text-blue-100">
                    Fill out the form and our team will get back to you as soon
                    as possible.
                  </p>
                </div>

                <div className="p-8">
                  <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        label="First Name"
                        name="firstName"
                        placeholder="John"
                        required
                      />
                      <FormField
                        label="Last Name"
                        name="lastName"
                        placeholder="Doe"
                        required
                      />
                    </div>

                    <FormField
                      label="Email Address"
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      required
                    />

                    <FormField
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      placeholder="(555) 123-4567"
                    />

                    <FormField
                      label="Your Message"
                      name="message"
                      placeholder="Please tell us how we can help you..."
                      required
                      textarea
                    />

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                      disabled={formStatus === "sending"}
                    >
                      {formStatus === "sending" ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 mr-2"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <FaArrowRight />
                        </>
                      )}
                    </motion.button>

                    {formStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        Thank you! Your message has been sent successfully.
                      </motion.div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <ScrollReveal direction="up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about our services and
              process.
            </p>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto">
            <StaggerContainer className="space-y-6">
              {[
                {
                  question: "How soon can you respond to my inquiry?",
                  answer:
                    "We typically respond to all inquiries within 24 business hours. For urgent matters, please call our office directly.",
                },
                {
                  question: "Do you work with international clients?",
                  answer:
                    "Yes, we proudly serve clients worldwide. Our team based in Australia can accommodate different time zones for meetings and project collaboration.",
                },
                {
                  question:
                    "What information should I prepare before contacting you?",
                  answer:
                    "To help us serve you better, please have a basic overview of your project, timeline expectations, and budget considerations ready when you reach out.",
                },
                {
                  question:
                    "Can I schedule a consultation before committing to a project?",
                  answer:
                    "Absolutely! We offer free initial consultations to discuss your needs and determine if we're the right fit for your project.",
                },
              ].map((faq, index) => (
                <StaggerItem key={index}>
                  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <ScrollReveal direction="up">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-10 md:p-16 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10" />
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-white opacity-10" />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
                <div className="mb-8 md:mb-0 md:mr-8 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Need a faster response?
                  </h3>
                  <p className="text-lg opacity-90 max-w-lg">
                    Call us directly or schedule a video consultation with one
                    of our experts.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a
                    href="tel:+15551234567"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                  >
                    <FaPhoneAlt /> Call Now
                  </motion.a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
