import React, { useState } from "react";
import { motion } from "framer-motion";
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
} from "react-icons/fa";

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
      <div className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
        <div className="flex items-center gap-1">
          <FaTags className="text-blue-600" />
          <span>Save 20%</span>
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
          <FaCheck className={`${isPopular ? "text-white" : "text-green-500"} mr-3 flex-shrink-0`} />
        ) : (
          <FaTimes className={`${isPopular ? "text-blue-200" : "text-gray-400"} mr-3 flex-shrink-0`} />
        )}
        <span className={included 
          ? (isPopular ? "text-white" : "text-gray-600") 
          : (isPopular ? "text-blue-200" : "text-gray-400")}>
          {text}
        </span>
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
          whileHover={{ y: -8, boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.25)" }}
          transition={{ duration: 0.3 }}
        >
          {isPopular && (
            <div className="absolute -right-12 top-8 bg-yellow-400 text-blue-900 font-bold py-1 px-10 transform rotate-45 text-sm">
              MOST POPULAR
            </div>
          )}
  
          <div className="p-8 border-b border-opacity-20 text-center relative">
            <div className="mb-4 inline-block">
              {plan.icon}
            </div>
            <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
            <p className={`mb-6 ${isPopular ? "text-blue-100" : "text-gray-500"}`}>
              {plan.description}
            </p>
            <div className="flex items-center justify-center mb-6">
              <span className="text-4xl font-bold">
                {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
              </span>
              <span className={`ml-2 ${isPopular ? "text-blue-100" : "text-gray-500"}`}>
                /{isYearly ? "year" : "month"}
              </span>
            </div>
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
          </div>
  
          <div className={`p-8 flex-grow ${isPopular ? "text-blue-50" : "text-gray-600"}`}>
            <h4 className={`text-lg font-semibold mb-4 ${isPopular ? "text-white" : "text-gray-800"}`}>
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

const PricingMain = () => {
  const [isYearly, setIsYearly] = useState(false);

  const pricingPlans = [
    {
      name: "Starter",
      description: "Perfect for small businesses",
      monthlyPrice: "$49",
      yearlyPrice: "$470",
      icon: <FaRocket className="text-4xl text-blue-600" />,
      features: [
        { text: "5-page responsive website", included: true },
        { text: "Mobile-friendly design", included: true },
        { text: "Contact form integration", included: true },
        { text: "Basic SEO setup", included: true },
        { text: "1 revision round", included: true },
        { text: "Social media integration", included: true },
        { text: "Content management system", included: false },
        { text: "E-commerce functionality", included: false },
        { text: "Custom animations", included: false },
        { text: "24/7 Priority support", included: false },
      ],
    },
    {
      name: "Professional",
      description: "For growing businesses",
      monthlyPrice: "$99",
      yearlyPrice: "$950",
      icon: <FaStar className="text-4xl text-yellow-400" />,
      features: [
        { text: "10-page responsive website", included: true },
        { text: "Mobile-friendly design", included: true },
        { text: "Contact form integration", included: true },
        { text: "Advanced SEO optimization", included: true },
        { text: "3 revision rounds", included: true },
        { text: "Social media integration", included: true },
        { text: "Content management system", included: true },
        { text: "Basic e-commerce (up to 20 products)", included: true },
        { text: "Custom animations", included: false },
        { text: "24/7 Priority support", included: false },
      ],
    },
    {
      name: "Enterprise",
      description: "For larger organizations",
      monthlyPrice: "$199",
      yearlyPrice: "$1,910",
      icon: <FaCrown className="text-4xl text-purple-600" />,
      features: [
        { text: "Unlimited pages", included: true },
        { text: "Mobile-friendly design", included: true },
        { text: "Advanced contact form & CRM integration", included: true },
        { text: "Premium SEO optimization", included: true },
        { text: "Unlimited revision rounds", included: true },
        { text: "Advanced social media integration", included: true },
        { text: "Advanced content management system", included: true },
        { text: "Full e-commerce functionality", included: true },
        { text: "Custom animations & interactions", included: true },
        { text: "24/7 Priority support", included: true },
      ],
    },
  ];

  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards including Visa, MasterCard, and American Express. We also accept PayPal and bank transfers for annual subscriptions.",
    },
    {
      question: "Can I switch between plans later?",
      answer:
        "Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll be prorated for the remainder of your billing cycle. When downgrading, changes will take effect at the start of your next billing cycle.",
    },
    {
      question: "Is there a setup fee?",
      answer:
        "No, there are no setup fees for any of our plans. The price you see is the total you'll pay.",
    },
    {
      question: "Do you offer custom solutions beyond these plans?",
      answer:
        "Absolutely! If you have specific requirements that aren't covered by our standard plans, we'd be happy to provide a custom quote. Contact our sales team for more information.",
    },
    {
      question: "What happens when my subscription ends?",
      answer:
        "Subscriptions automatically renew at the end of your billing cycle. You can cancel auto-renewal at any time through your account dashboard.",
    },
  ];

  return (
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
              Choose the perfect plan for your business needs. All plans include
              our award-winning web design and development services.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <PricingToggle isYearly={isYearly} setIsYearly={setIsYearly} />
          </ScrollReveal>

          <StaggerContainer
            staggerDelay={0.15}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10"
          >
            {pricingPlans.map((plan, index) => (
              <PriceCard
                key={index}
                plan={plan}
                isYearly={isYearly}
                isPopular={index === 1}
                index={index}
              />
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-gray-50">
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
                    "Mobile-friendly Design",
                    "Contact Form",
                    "SEO Optimization",
                    "Revision Rounds",
                    "Social Media Integration",
                    "Content Management System",
                    "E-commerce Functionality",
                    "Custom Animations",
                    "24/7 Priority Support",
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
                            "5 pages",
                            "10 pages",
                            "Unlimited",
                          ],
                          "Mobile-friendly Design": [
                            <FaCheck className="text-green-500 mx-auto" />,
                            <FaCheck className="text-green-500 mx-auto" />,
                            <FaCheck className="text-green-500 mx-auto" />,
                          ],
                          "Contact Form": [
                            "Basic",
                            "Advanced",
                            "Advanced with CRM",
                          ],
                          "SEO Optimization": ["Basic", "Advanced", "Premium"],
                          "Revision Rounds": [
                            "1 round",
                            "3 rounds",
                            "Unlimited",
                          ],
                          "Social Media Integration": [
                            <FaCheck className="text-green-500 mx-auto" />,
                            <FaCheck className="text-green-500 mx-auto" />,
                            "Advanced",
                          ],
                          "Content Management System": [
                            <FaTimes className="text-gray-400 mx-auto" />,
                            <FaCheck className="text-green-500 mx-auto" />,
                            "Advanced",
                          ],
                          "E-commerce Functionality": [
                            <FaTimes className="text-gray-400 mx-auto" />,
                            "Up to 20 products",
                            "Unlimited products",
                          ],
                          "Custom Animations": [
                            <FaTimes className="text-gray-400 mx-auto" />,
                            <FaTimes className="text-gray-400 mx-auto" />,
                            <FaCheck className="text-green-500 mx-auto" />,
                          ],
                          "24/7 Priority Support": [
                            <FaTimes className="text-gray-400 mx-auto" />,
                            <FaTimes className="text-gray-400 mx-auto" />,
                            <FaCheck className="text-green-500 mx-auto" />,
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

      {/* FAQ Section */}
      <section className="py-20 bg-white">
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
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
                Get 3 months free with annual billing
              </h2>
              <p className="text-lg text-blue-100">
                Sign up for any annual plan today and get an additional 3 months
                at no extra cost.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <motion.button
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-10 rounded-lg shadow-xl transition flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Start Your Free Trial</span>
                <FaArrowRight />
              </motion.button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonial Banner */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <ScrollReveal direction="up">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-xl mx-1" />
                  ))}
                </div>
              </div>
              <p className="text-xl md:text-2xl font-medium text-gray-700 italic max-w-4xl mx-auto mb-8">
                "We've tried several web design agencies in the past, but none
                delivered the quality and attention to detail that NextGen
                Websites has. Their Professional plan was exactly what we
                needed, and the ROI has been incredible."
              </p>
              <div>
                <h4 className="font-bold text-gray-800">Michael Chen</h4>
                <p className="text-gray-500">E-commerce Entrepreneur</p>
              </div>
            </div>
          </ScrollReveal>
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
  );
};

export default PricingMain;
