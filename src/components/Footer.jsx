import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart
} from "react-icons/fa";

// Reusable animation components
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

// Social media icon component
const SocialIcon = ({ icon, href }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-sm hover:bg-blue-50"
      whileHover={{ scale: 1.1, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.95 }}
      aria-label="Social media link"
    >
      {icon}
    </motion.a>
  );
};

const Footer = () => {
  // Get current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-blue-800 to-blue-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full bg-blue-600 opacity-10 -top-48 -right-48"></div>
        <div className="absolute w-96 h-96 rounded-full bg-blue-700 opacity-10 -bottom-48 -left-48"></div>
      </div>
      
      {/* Wave SVG Top Border */}
      <div className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="fill-white w-full block">
          <path d="M0,64L48,53.3C96,43,192,21,288,16C384,11,480,21,576,37.3C672,53,768,75,864,69.3C960,64,1056,32,1152,16C1248,0,1344,0,1392,0L1440,0L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <ScrollReveal direction="up" delay={0.1} className="flex flex-col">
            <h3 className="text-xl font-bold mb-6 relative">
              NextGen Websites
              <div className="absolute bottom-0 left-0 w-12 h-1 bg-blue-400 mt-1"></div>
            </h3>
            <p className="text-blue-100 mb-6">
              We create stunning websites that drive results for businesses of all sizes.
              Our team blends creativity with technical expertise to deliver exceptional digital experiences.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-3 mt-auto">
              <SocialIcon icon={<FaFacebookF />} href="https://facebook.com" />
              <SocialIcon icon={<FaTwitter />} href="https://twitter.com" />
              <SocialIcon icon={<FaInstagram />} href="https://instagram.com" />
              <SocialIcon icon={<FaLinkedinIn />} href="https://linkedin.com" />
              <SocialIcon icon={<FaYoutube />} href="https://youtube.com" />
            </div>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal direction="up" delay={0.2} className="flex flex-col">
            <h3 className="text-xl font-bold mb-6 relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-12 h-1 bg-blue-400 mt-1"></div>
            </h3>
            <ul className="space-y-3">
              {["Home", "Services", "Pricing"].map((link, index) => (
                <li key={index}>
                  <motion.a 
                    href={`/${link.toLowerCase()}`}
                    className="text-blue-100 hover:text-white flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    <motion.span 
                      className="block w-2 h-0.5 bg-blue-300 mr-2"
                      whileHover={{ width: 8 }}
                    ></motion.span>
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal direction="up" delay={0.3} className="flex flex-col">
            <h3 className="text-xl font-bold mb-6 relative">
              Contact Us
              <div className="absolute bottom-0 left-0 w-12 h-1 bg-blue-400 mt-1"></div>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-blue-300 mt-1 mr-3" />
                <span className="text-blue-100">
                  123 Web Avenue, Digital City, DC 12345
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-blue-300 mr-3" />
                <span className="text-blue-100">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-blue-300 mr-3" />
                <span className="text-blue-100">info@nextgenwebsites.com</span>
              </li>
            </ul>
          </ScrollReveal>

          {/* Newsletter */}
          <ScrollReveal direction="up" delay={0.4} className="flex flex-col">
            <h3 className="text-xl font-bold mb-6 relative">
              Newsletter
              <div className="absolute bottom-0 left-0 w-12 h-1 bg-blue-400 mt-1"></div>
            </h3>
            <p className="text-blue-100 mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-lg flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-100"
              />
              <motion.button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </ScrollReveal>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-100 text-center md:text-left mb-4 md:mb-0">
              © {currentYear} NextGen Websites. All rights reserved.
            </p>
            
            <motion.p 
              className="text-blue-100 flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              Made with <FaHeart className="text-red-400 mx-1" /> in  NextGen Websites
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;