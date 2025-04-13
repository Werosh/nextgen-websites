import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Helmet } from "react-helmet";

import {
  FaRocket,
  FaStar,
  FaCrown,
  FaCheck,
  FaTimes,
  FaArrowRight,
  FaBolt,
  FaQuestionCircle,
  FaTags,
  FaShoppingCart,
  FaRegBuilding,
  FaHandshake,
} from "react-icons/fa";

import LimitedOffer from "../components/LimitedOffer";

// Reusable animation components from your existing code
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

// Pricing Toggle Component
const PricingToggle = ({ isYearly, setIsYearly }) => {
  return (
    <div className="flex items-center justify-center gap-3 mb-10">
      <span
        className={`text-lg ${
          !isYearly ? "font-semibold text-blue-600" : "text-gray-500"
        }`}
      >
        Monthly
      </span>
      <div
        className="w-16 h-8 bg-blue-100 rounded-full p-1 cursor-pointer relative"
        onClick={() => setIsYearly(!isYearly)}
      >
        <motion.div
          className="w-6 h-6 bg-blue-600 rounded-full absolute"
          animate={{ x: isYearly ? 32 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
      <span
        className={`text-lg ${
          isYearly ? "font-semibold text-blue-600" : "text-gray-500"
        }`}
      >
        Yearly
      </span>
      <div className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 text-base font-semibold rounded-full">
        <div className="flex items-center gap-1">
          <FaTags className="text-blue-600" />
          <span>save 20%</span>
        </div>
      </div>
    </div>
  );
};

// Feature Check Item Component
const FeatureItem = ({ included, text, isPopular }) => {
  return (
    <div className="flex items-center py-2">
      {included ? (
        <FaCheck
          className={`${
            isPopular ? "text-white" : "text-green-500"
          } mr-3 flex-shrink-0`}
        />
      ) : (
        <FaTimes
          className={`${
            isPopular ? "text-blue-200" : "text-gray-400"
          } mr-3 flex-shrink-0`}
        />
      )}
      <span
        className={
          included
            ? isPopular
              ? "text-white"
              : "text-gray-600"
            : isPopular
            ? "text-blue-200"
            : "text-gray-400"
        }
      >
        {text}
      </span>
    </div>
  );
};

// Price Badge Component (showing old and new price)
const PriceBadge = ({ oldPrice, newPrice }) => {
  return (
    <div className="flex items-center justify-center mb-2">
      <div className="bg-red-50 px-3 py-1 rounded-full">
        <span className="text-red-500 font-medium line-through mr-2 text-2xl">
          {oldPrice}
        </span>
      </div>
    </div>
  );
};

// Price Card Component
const PriceCard = ({ plan, isYearly, isPopular, index }) => {
  const bgClasses = isPopular
    ? "bg-gradient-to-br from-blue-600 to-blue-800 text-white border-blue-500"
    : "bg-white text-gray-800 border-gray-200 hover:border-blue-300";

  return (
    <StaggerItem
      direction={index % 2 === 0 ? "up" : "down"}
      className="flex flex-col h-full"
    >
      <motion.div
        className={`rounded-2xl shadow-lg ${bgClasses} border-2 overflow-hidden flex flex-col h-full relative`}
        whileHover={{
          y: -8,
          boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.25)",
        }}
        transition={{ duration: 0.3 }}
      >
        {isPopular && (
          <div className="absolute -right-12 top-8 bg-yellow-400 text-blue-900 font-bold py-1 px-10 transform rotate-45 text-sm">
            MOST POPULAR
          </div>
        )}

        <div className="p-8 border-b border-opacity-20 text-center relative">
          <div className="mb-4 inline-block">{plan.icon}</div>
          <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
          <p
            className={`mb-4 ${isPopular ? "text-blue-100" : "text-gray-500"}`}
          >
            {plan.description}
          </p>

          {/* Price comparison */}
          <PriceBadge
            oldPrice={isYearly ? plan.oldYearlyPrice : plan.oldMonthlyPrice}
            newPrice={isYearly ? plan.yearlyPrice : plan.monthlyPrice}
          />

          <div className="flex items-center justify-center mb-6">
            <span className="text-4xl font-bold">
              {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
            </span>
            <span
              className={`ml-2 ${
                isPopular ? "text-blue-100" : "text-gray-500"
              }`}
            >
              /{isYearly ? "year" : "month"}
            </span>
          </div>
          <a href="/contact">
            <motion.button
              className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 ${
                isPopular
                  ? "bg-white text-blue-600 hover:bg-blue-50"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Get Started</span>
              <FaArrowRight />
            </motion.button>
          </a>
        </div>

        <div
          className={`p-8 flex-grow ${
            isPopular ? "text-blue-50" : "text-gray-600"
          }`}
        >
          <h4
            className={`text-lg font-semibold mb-4 ${
              isPopular ? "text-white" : "text-gray-800"
            }`}
          >
            Features include:
          </h4>
          <div className="space-y-2">
            {plan.features.map((feature, idx) => (
              <FeatureItem
                key={idx}
                included={feature.included}
                text={feature.text}
                isPopular={isPopular}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </StaggerItem>
  );
};

// Competitor Price Comparison
const CompetitorComparison = () => {
  return (
    <ScrollReveal direction="up" className="mt-16 ">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden container mx-auto px-6 relative z-10">
        <div className="bg-gray-50 py-6 px-8 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800">
            How Our Pricing Compares
          </h3>
          <p className="text-gray-600 mt-2">
            See how much you save with our web development services compared to
            industry averages.
          </p>
        </div>

        <div className="p-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Service Type
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Average Industry Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-blue-600 uppercase tracking-wider">
                    Our Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-green-600 uppercase tracking-wider">
                    Your Savings
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    Basic Website (5 pages)
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    $3,000 - $5,000 upfront
                  </td>
                  <td className="px-6 py-4 text-blue-600 font-bold">
                    $49/month
                  </td>
                  <td className="px-6 py-4 text-green-600 font-bold">
                    Up to 87% savings
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    Business Website (5-10 pages)
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    $5,000 - $10,000 upfront
                  </td>
                  <td className="px-6 py-4 text-blue-600 font-bold">
                    $75/month
                  </td>
                  <td className="px-6 py-4 text-green-600 font-bold">
                    Up to 90% savings
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    Advanced Business Website
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    $10,000 - $25,000 upfront
                  </td>
                  <td className="px-6 py-4 text-blue-600 font-bold">
                    $199/month
                  </td>
                  <td className="px-6 py-4 text-green-600 font-bold">
                    Up to 92% savings
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    E-commerce Website
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    $15,000 - $40,000 upfront
                  </td>
                  <td className="px-6 py-4 text-blue-600 font-bold">
                    $299/month
                  </td>
                  <td className="px-6 py-4 text-green-600 font-bold">
                    Up to 95% savings
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              <strong>Why are we so much more affordable?</strong> Our
              subscription model eliminates the massive upfront costs typically
              charged by web development agencies. You get a professional,
              custom-built website with ongoing maintenance and updates for a
              fraction of the cost. Say no more to overpriced websites!
            </p>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

// FAQ Component
const FAQ = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-gray-200 py-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-gray-800">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-gray-600 pt-4">{answer}</p>
      </motion.div>
    </motion.div>
  );
};



// features in plans
const PricingMain = () => {
  const [isYearly, setIsYearly] = useState(false);

  const pricingPlans = [
    {
      name: "Single Page",
      description: "Perfect for Simple Websites",
      monthlyPrice: "$49",
      yearlyPrice: "$470",
      oldMonthlyPrice: "$99",
      oldYearlyPrice: "$950",
      icon: <FaRocket className="text-4xl text-blue-600" />,
      features: [
        { text: "Custom Designed Single Page", included: true },
        { text: "Custom Domain", included: true },
        { text: "Responsive Layout", included: true },
        { text: "Fast-loading Optimisation", included: true },
        { text: "Basic SEO Setup", included: true },
        { text: "Social Media Integration", included: false },
        { text: "Contact Form", included: false },
        { text: "Google Maps and Reviews Integration", included: false },
        { text: "Modern Animations", included: false },
      ],
    },
    {
      name: "Multi Page",
      description: "For Growing Businesses",
      monthlyPrice: "$75",
      yearlyPrice: "$720",
      oldMonthlyPrice: "$125",
      oldYearlyPrice: "$1200",
      icon: <FaRegBuilding className="text-4xl text-yellow-400" />,
      features: [
        { text: <strong>Everything in Single Page</strong>, included: true },
        { text: "3-6 Custom Pages", included: true },
        { text: "Contact Form with Emails", included: true },
        { text: "Google Maps and Reviews Integrations", included: true },
        { text: "Modern Animations", included: true },
        { text: "Social Media Integration", included: true },
        { text: "SEO Optimisation", included: true },
        // { text: "Call to Action Button", included: true },
        { text: "Booking or Calendar Integration", included: false },
        { text: "Live Chat Integration", included: false },
      ],
    },
    {
      name: "Advanced Business",
      description: "For Larger Organisations",
      monthlyPrice: "$149",
      yearlyPrice: "$1,430",
      oldMonthlyPrice: "$249",
      oldYearlyPrice: "$2,390",
      icon: <FaHandshake className="text-4xl text-purple-600" />,
      features: [
        { text: <strong>Everything in Multi Page</strong>, included: true },
        { text: "5-10 Custom Pages", included: true },
        { text: "Booking or Calendar Integration", included: true },
        { text: "Live Chat Integration", included: true },
        { text: "Email Subscription Setup", included: true },
        { text: "Custom Admin Dashboard", included: true },
        { text: "Performance Optimisation", included: true },
        { text: "eCommerce Features", included: false },
        { text: "Payment Gateway Setup", included: false },
      ],
    },
    {
      name: "E-Commerce",
      description: "For Online Stores",
      monthlyPrice: "$299",
      yearlyPrice: "$2,870",
      oldMonthlyPrice: "$349",
      oldYearlyPrice: "$3,350",
      icon: <FaShoppingCart className="text-4xl text-green-600" />,
      features: [
        {
          text: <strong>Everything in Advanced Business</strong>,
          included: true,
        },
        { text: "Payment Gateway Setup", included: true },
        { text: "Inventory System", included: true },
        { text: "Shipping & Tax Config", included: true },
        { text: "User Account & Login System", included: true },
        { text: "Product Filtering & Search", included: true },
        { text: "Discount & Coupon System", included: true },
        { text: "Order Tracking System", included: true },
        { text: "Abandoned Cart Recovery", included: true },
      ],
    },
  ];

  const faqs = [
    {
      question: "Why is your pricing so much lower than other web developers?",
      answer:
        "Instead of charging large upfront fees, we use a subscription model that spreads the cost over time. This makes professional web development accessible to businesses of all sizes while ensuring you get ongoing maintenance, updates, and support included in your monthly fee.",
    },
    {
      question: "Is there a lock-in period for monthly plans?",
      answer:
        "Yes, there is a minimum commitment of 3 months for monthly plans. This helps us keep pricing low while still delivering high-quality service and support.",

    },
    
      {
        question: "Can I request updates or changes later?",
        answer:
          "Absolutely. All of our plans include ongoing support and minor updates — like changing text, swapping images, or updating contact info. For larger changes such as adding new pages or advanced features, we can provide a custom quote or recommend upgrading to a higher plan.",
      },
    {
      question: "Can I switch between plans later?",
      answer:
        "Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll be prorated for the remainder of your billing cycle. When downgrading, changes will take effect at the start of your next billing cycle.",
    },
    {
      question: "How long does it take to launch my website?",
      answer:
        "Most websites are completed within 7–14 business days, depending on the plan and how quickly you provide content and feedback.",
    },
    {
      question: "Do you offer custom solutions and specific features beyond these plans?",
      answer:
        "Absolutely! If you have specific requirements that aren't covered by our standard plans, we'd be happy to provide a custom quote. Contact our team for more information.",
    },
  ];

  return (
    <>
      <Helmet>
              {/* Primary Meta Tags */}
      <title>Affordable Website Pricing Plans | Starting at $49/month | NextGen Websites</title>
      <meta
        name="description"
        content="Get a professional website with no upfront costs - our affordable pricing plans start from just $49/month. Save up to 95% compared to traditional web agencies. First month free!"
      />
      <meta
        name="keywords"
        content="website pricing, affordable web development, custom website plans, web design subscription, monthly website payment, business website pricing, ecommerce website cost, web design packages, professional web development, no upfront website cost"
      />

      {/* Canonical URL */}
      <link rel="canonical" href="https://www.nextgenwebsites.info/pricing" />

      {/* Language and Direction */}
      <html lang="en" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.nextgenwebsites.info/pricing" />
      <meta property="og:title" content="Website Pricing Plans | Save Up to 95% | NextGen Websites" />
      <meta property="og:description" content="Professional website development starting at $49/month with no upfront costs. Choose from Single Page, Multi Page, Advanced Business, or E-Commerce plans." />
      <meta property="og:image" content="https://www.nextgenwebsites.info/images/pricing-page-preview.jpg" />
      <meta property="og:site_name" content="NextGen Websites" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.nextgenwebsites.info/pricing" />
      <meta property="twitter:title" content="Affordable Website Pricing | No Upfront Costs | NextGen Websites" />
      <meta property="twitter:description" content="Get a professional website from $49/month with no large upfront fees. Save up to 95% compared to traditional web development costs." />
      <meta property="twitter:image" content="https://www.nextgenwebsites.info/images/pricing-page-preview.jpg" />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="NextGen Websites" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#3B82F6" /> {/* Blue color from your design */}
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="7 days" />

      {/* Geolocation Meta Tags */}
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="San Francisco" /> {/* Update with your location */}

      {/* Structured Data - Pricing Table */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Website Pricing Plans | NextGen Websites",
          "description": "Affordable website pricing plans with no upfront costs. Professional web development starting at $49/month.",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.nextgenwebsites.info"
            }, {
              "@type": "ListItem",
              "position": 2,
              "name": "Pricing",
              "item": "https://www.nextgenwebsites.info/pricing"
            }]
          },
          "publisher": {
            "@type": "Organization",
            "name": "NextGen Websites",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.nextgenwebsites.info/images/logo.png",
              "width": 600,
              "height": 60
            }
          },
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "Offer",
                "position": 1,
                "name": "Single Page Website",
                "description": "Perfect for simple websites and landing pages. Includes custom design, responsive layout, and basic SEO setup.",
                "price": "49.00",
                "priceCurrency": "USD",
                "priceValidUntil": "2026-12-31",
                "url": "https://www.nextgenwebsites.info/pricing#single-page",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "position": 2,
                "name": "Multi Page Website",
                "description": "Ideal for growing businesses with 3-6 custom pages, contact form, and social media integration.",
                "price": "75.00",
                "priceCurrency": "USD",
                "priceValidUntil": "2026-12-31",
                "url": "https://www.nextgenwebsites.info/pricing#multi-page",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "position": 3,
                "name": "Advanced Business Website",
                "description": "Complete solution for larger organizations with 5-10 pages, booking integration, and custom admin dashboard.",
                "price": "149.00",
                "priceCurrency": "USD",
                "priceValidUntil": "2026-12-31",
                "url": "https://www.nextgenwebsites.info/pricing#advanced-business",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "position": 4,
                "name": "E-Commerce Website",
                "description": "Full-featured online store with payment processing, inventory management, and order tracking system.",
                "price": "299.00",
                "priceCurrency": "USD",
                "priceValidUntil": "2026-12-31",
                "url": "https://www.nextgenwebsites.info/pricing#ecommerce",
                "availability": "https://schema.org/InStock"
              }
            ]
          }
        }
        `}
      </script>

      {/* FAQ Schema */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Why is your pricing so much lower than other web developers?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Instead of charging large upfront fees, we use a subscription model that spreads the cost over time. This makes professional web development accessible to businesses of all sizes while ensuring you get ongoing maintenance, updates, and support included in your monthly fee."
              }
            },
            {
              "@type": "Question",
              "name": "Is there a lock-in period for monthly plans?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, there is a minimum commitment of 3 months for monthly plans. This helps us keep pricing low while still delivering high-quality service and support."
              }
            },
            {
              "@type": "Question",
              "name": "Can I request updates or changes later?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. All of our plans include ongoing support and minor updates — like changing text, swapping images, or updating contact info. For larger changes such as adding new pages or advanced features, we can provide a custom quote or recommend upgrading to a higher plan."
              }
            },
            {
              "@type": "Question",
              "name": "Can I switch between plans later?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll be prorated for the remainder of your billing cycle. When downgrading, changes will take effect at the start of your next billing cycle."
              }
            },
            {
              "@type": "Question",
              "name": "How long does it take to launch my website?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most websites are completed within 7–14 business days, depending on the plan and how quickly you provide content and feedback."
              }
            },
            {
              "@type": "Question",
              "name": "Do you offer custom solutions and specific features beyond these plans?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely! If you have specific requirements that aren't covered by our standard plans, we'd be happy to provide a custom quote. Contact our team for more information."
              }
            }
          ]
        }
        `}
      </script>

      {/* Organization Schema */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "NextGen Websites",
          "url": "https://www.nextgenwebsites.info",
          "logo": "https://www.nextgenwebsites.info/images/logo.png",
          "sameAs": [
            "https://www.facebook.com/profile.php?id=61574986987621",
            "https://www.twitter.com/nextgenwebsites",
            "https://www.linkedin.com/company/nextgenwebsites",
            "https://www.instagram.com/nextgenwebsites"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-800-123-4567",
            "contactType": "customer service",
            "availableLanguage": ["English"]
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Web Development Street",
            "addressLocality": "San Francisco",
            "addressRegion": "CA",
            "postalCode": "94103",
            "addressCountry": "US"
          },
          "offers": [
            {
              "@type": "Offer",
              "name": "Single Page Website",
              "price": "49.00",
              "priceCurrency": "USD"
            },
            {
              "@type": "Offer",
              "name": "Multi Page Website",
              "price": "75.00",
              "priceCurrency": "USD"
            },
            {
              "@type": "Offer",
              "name": "Advanced Business Website",
              "price": "149.00",
              "priceCurrency": "USD"
            },
            {
              "@type": "Offer",
              "name": "E-Commerce Website",
              "price": "299.00",
              "priceCurrency": "USD"
            }
          ]
        }
        `}
      </script>

      {/* Review Schema */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "Service",
            "name": "NextGen Websites - Web Development Services"
          },
          "author": {
            "@type": "Person",
            "name": "Eddy Li"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "datePublished": "2024-11-15",
          "reviewBody": "We were quoted $5,000 by other web developers for our business site. With this service, we got a beautiful custom website for just $75/month with all the features we needed plus ongoing support. The value is incredible!"
        }
        `}
      </script>

      {/* Aggregate Rating Schema */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "NextGen Websites Pricing Plans",
          "url": "https://www.nextgenwebsites.info/pricing",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "124",
            "bestRating": "5"
          }
        }
        `}
      </script>
    
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute -top-10 -right-10 w-96 h-96 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-100 rounded-full opacity-50 blur-3xl"></div>

            {/* Diagonal Grid Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30">
              <div className="absolute w-full h-full border border-blue-200 transform rotate-45"></div>
              <div className="absolute w-full h-full border border-blue-200 transform -rotate-45"></div>
            </div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <ScrollReveal direction="up" className="text-center mb-8">
              <motion.span
                className="px-4 py-1 rounded-full bg-blue-100 text-blue-600 font-medium text-sm inline-block mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Simple, transparent pricing
              </motion.span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
                Plans for businesses of all{" "}
                <span className="relative">
                  <span className="relative z-10 text-blue-600">sizes</span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-3 bg-blue-100 z-0"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                  />
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We understand that starting a website can feel overwhelming.
                That’s why we keep our prices simple, affordable, and fair.
                Choose the perfect plan for your business needs.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <PricingToggle isYearly={isYearly} setIsYearly={setIsYearly} />
            </ScrollReveal>

            {/* <FloatingBadge /> */}
            <LimitedOffer />

            <StaggerContainer
              staggerDelay={0.15}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10"
            >
              {pricingPlans.map((plan, index) => (
                <PriceCard
                  key={index}
                  plan={plan}
                  isYearly={isYearly}
                  isPopular={index === 1} // Multi Page plan is popular
                  index={index}
                />
              ))}
            </StaggerContainer>
          </div>

          {/* Competitor Price Comparison */}
          <CompetitorComparison />

           {/* Features Comparison */}
        <section className=" bg-gray-50 py-20">
          <div className="container mx-auto px-6">
            <ScrollReveal direction="up" className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Compare All Features
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A detailed breakdown of what's included in each plan to help you
                make the right choice.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-5 text-left text-lg font-semibold text-gray-500 uppercase tracking-wider">
                        Feature
                      </th>
                      {pricingPlans.map((plan, index) => (
                        <th
                          key={index}
                          className={`px-6 py-5 text-center ${
                            index === 1
                              ? "bg-blue-50 text-blue-800"
                              : "text-gray-800"
                          }`}
                        >
                          <div className="font-bold text-xl">{plan.name}</div>
                          <div className="text-sm opacity-75">
                            {isYearly ? plan.yearlyPrice : plan.monthlyPrice}/
                            {isYearly ? "year" : "month"}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      "Number of Pages",
                      "Custom Domain",
                      "Responsive Design",
                      "Contact Form",
                      "SEO Optimization",
                      "Social Media Integration",
                      "Modern Animations",
                      "Image Gallery",
                      "Booking Integration",
                      "E-commerce Functionality",
                    
                    ].map((feature, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="px-6 py-4 text-gray-700 font-medium">
                          {feature}
                        </td>
                        {pricingPlans.map((plan, j) => {
                          const featureDetail = {
                            "Number of Pages": [
                              "1 page",
                              "3-6 pages",
                              "5-10 pages",
                              "Unlimited",
                            ],
                            "Custom Domain": [
                              <FaCheck className="text-green-500 mx-auto" />,
                              <FaCheck className="text-green-500 mx-auto" />,
                              <FaCheck className="text-green-500 mx-auto" />,
                              <FaCheck className="text-green-500 mx-auto" />,
                            ],
                            "Responsive Design": [
                              <FaCheck className="text-green-500 mx-auto" />,
                              <FaCheck className="text-green-500 mx-auto" />,
                              <FaCheck className="text-green-500 mx-auto" />,
                              <FaCheck className="text-green-500 mx-auto" />,
                            ],
                            "Contact Form": [
                              <FaTimes className="text-gray-400 mx-auto" />,
                              "Basic",
                              "Advanced",
                              "Advanced",
                            ],
                            "SEO Optimization": [
                              <FaTimes className="text-gray-400 mx-auto" />,
                              "Basic",
                              "Advanced",
                              "Premium",
                            ],
                            "Social Media Integration": [
                              <FaTimes className="text-gray-400 mx-auto" />,
                              <FaCheck className="text-green-500 mx-auto" />,
                              <FaCheck className="text-green-500 mx-auto" />,
                              <FaCheck className="text-green-500 mx-auto" />,
                            ],
                            "Modern Animations": [
                              <FaTimes className="text-gray-400 mx-auto" />,
                              <FaCheck className="text-green-500 mx-auto" />,
                              <FaCheck className="text-green-500 mx-auto" />,
                              <FaCheck className="text-green-500 mx-auto" />,
                            ],
                            "Image Gallery": [
                              <FaTimes className="text-gray-400 mx-auto" />,
                              <FaCheck className="text-green-500 mx-auto" />,
                              <FaCheck className="text-green-500 mx-auto" />,
                              <FaCheck className="text-green-500 mx-auto" />,
                            ],
                            "Booking Integration": [
                              <FaTimes className="text-gray-400 mx-auto" />,
                              <FaTimes className="text-gray-400 mx-auto" />,
                              <FaCheck className="text-green-500 mx-auto" />,
                              <FaCheck className="text-green-500 mx-auto" />,
                            ],
                            "E-commerce Functionality": [
                              <FaTimes className="text-gray-400 mx-auto" />,
                              <FaTimes className="text-gray-400 mx-auto" />,
                              <FaTimes className="text-gray-400 mx-auto" />,
                              "Full Store",
                            ],
                          
                          };

                          return (
                            <td
                              key={j}
                              className={`px-6 py-4 text-center text-sm ${
                                j === 1 ? "bg-blue-50" : ""
                              }`}
                            >
                              {featureDetail[feature][j]}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>
          </div>
        </section>

          {/* Testimonial Banner */}
          <section className="py-15 mt-10 bg-gray-50">
            <div className="container mx-auto px-6">
              <ScrollReveal direction="up">
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className="text-yellow-400 text-xl mx-1"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xl md:text-2xl font-medium text-gray-700 italic max-w-4xl mx-auto mb-8">
                    "We were quoted $5,000 by other web developers for our
                    business site. With this service, we got a beautiful custom
                    website for just $75/month with all the features we needed
                    plus ongoing support. The value is incredible!"
                  </p>
                  <div>
                    <h4 className="font-bold text-gray-800">Eddy Li</h4>
                    <p className="text-gray-500">Owner of Sparkling Car Care</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 mt-20 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute w-96 h-96 rounded-full bg-blue-500 opacity-20 -top-20 -right-20"></div>
              <div className="absolute w-96 h-96 rounded-full bg-blue-700 opacity-20 -bottom-40 -left-20"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <ScrollReveal
                  direction="left"
                  className="text-white mb-10 lg:mb-0 lg:mr-10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <FaBolt className="text-yellow-300 text-xl" />
                    <span className="font-semibold text-yellow-300">
                      Limited Time Offer
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Get Our Lowest Prices +  20% OFF With Annual Billing
                  </h2>
                  <p className="text-lg text-blue-100">
                    Sign up for any annual plan today and get both our low price
                    and 20% off the annual price. DOUBLE WHAMMY!
                  </p>
                </ScrollReveal>

                <ScrollReveal direction="right" delay={0.2}>
                  <motion.button
                    className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-10 rounded-lg shadow-xl transition flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Claim Now</span>
                    <FaArrowRight />
                  </motion.button>
                </ScrollReveal>
              </div>
            </div>
          </section>
        </section>
       

       

        {/* FAQ Section */}
        <section className="pt-3 pb-20 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <ScrollReveal direction="up" className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Frequently Asked Questions
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">
                Got questions? We've got answers.
              </p>
            </ScrollReveal>

            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <FAQ key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>

        {/* Money-back Guarantee */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
              <FaQuestionCircle className="text-3xl text-blue-600" />
              <p className="text-lg text-gray-700">
                All plans come with a{" "}
                <span className="font-bold text-blue-600">
                  30-day money-back guarantee
                </span>
                . If you're not completely satisfied, we'll refund your payment.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PricingMain;
