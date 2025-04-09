import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  FaRocket,
  FaBars,
  FaTimes,
  FaHome,
  FaTools,
  FaTag,
  FaEnvelope,
  FaChevronDown,
} from "react-icons/fa";
import { BiSolidPhoneCall } from "react-icons/bi";
import LogoImg from "../images/logo.png"


const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Get the current active page from the location path
  const getActivePageFromPath = (path) => {
    if (path === "/") return "home";
    return path.replace("/", "");
  };
  
  const [activePage, setActivePage] = useState(getActivePageFromPath(location.pathname));

  // Handle scroll event to change navbar appearance only
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Update active page when location changes
  useEffect(() => {
    setActivePage(getActivePageFromPath(location.pathname));
  }, [location.pathname]);

  // Navigation links
  const navLinks = [
    { title: "Home", href: "/home", icon: <FaHome /> },
    { title: "Services", href: "/services", icon: <FaTools /> },
    { title: "Pricing", href: "/pricing", icon: <FaTag /> },
    { title: "Contact", href: "/contact", icon: <FaEnvelope /> },
  ];

  // Handle closing the mobile menu when a link is clicked
  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white shadow-lg py-2"
          : " backdrop-blur-sm bg-white/70 py-4"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
          
            <img src={LogoImg} alt="" className="h-10" />
            <span className="text-xl font-bold text-gray-800">
              NextGen<span className="text-blue-600">Websites</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <div className="bg-gray-100 rounded-full p-1 flex items-center shadow-inner">
              {navLinks.map((link, index) => {
                const isActive = link.href === "/" 
                  ? activePage === "home" 
                  : link.href.replace("/", "") === activePage;
                return (
                  <motion.div
                    key={index}
                    className="relative"
                  >
                    <Link
                      to={link.href}
                      className={`relative px-5 py-2 font-medium transition rounded-full flex items-center gap-2 ${
                        isActive
                          ? "text-white"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                      onClick={handleNavClick}
                    >
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-blue-600 rounded-full"
                          layoutId="navbar-indicator"
                          transition={{ type: "spring", duration: 0.6 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        {link.icon}
                        {link.title}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </nav>

          {/* CTA Button with Dropdown */}
          <div className="hidden md:block relative">
            <a href="/contact" >
              <motion.button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow-md transition flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Call Now
                <BiSolidPhoneCall
                  className={`transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </motion.button>
            </a>

            
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden flex items-center justify-center w-10 h-10 bg-blue-50 rounded-full text-blue-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? (
              <FaTimes className="text-lg" />
            ) : (
              <FaBars className="text-lg" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-6 py-4">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, index) => {
                  const isActive = link.href === "/" 
                    ? activePage === "home" 
                    : link.href.replace("/", "") === activePage;
                  return (
                    <Link
                      key={index}
                      to={link.href}
                      className={`flex items-center gap-4 px-4 py-3 rounded-lg transition ${
                        isActive
                          ? "bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={handleNavClick}
                    >
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center gap-4 w-full"
                      >
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-full ${
                            isActive ? "bg-blue-100" : "bg-gray-100"
                          }`}
                        >
                          {link.icon}
                        </div>
                        <span>{link.title}</span>
                        {isActive && (
                          <motion.div
                            className="ml-auto bg-blue-600 w-2 h-2 rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          />
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-2">
                  Ready to get started?
                </p>
                <motion.button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <a
                    href="#quote"
                    className="text-center text-sm text-gray-600 bg-gray-50 py-2 rounded hover:bg-gray-100 transition"
                  >
                    Request Quote
                  </a>
                  <a
                    href="#demo"
                    className="text-center text-sm text-gray-600 bg-gray-50 py-2 rounded hover:bg-gray-100 transition"
                  >
                    Book Demo
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;