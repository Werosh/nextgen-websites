import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ServiceMain from './pages/ServiceMain';
import Navbar from './components/Navbar';
import PricingMain from './pages/Pricing';
import Footer from './components/Footer';
import ContactPage from './pages/ContactPage';
import PageUnderConstruction from './pages/PageUnderConstructing'; // Import the new component
import SEO from './components/SEO';

const App = () => {
  return (
    <Router>
      <div>
        {/* Default SEO - will be overridden by page-specific SEO */}
        <SEO 
          title="NextGen Websites | Professional Web Development Agency"
          description="Custom web development services for businesses. We create stunning, responsive websites that drive results."
          canonicalUrl="/"
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/services" element={<ServiceMain />} />
          <Route path="/pricing" element={<PricingMain />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Under construction page route */}
          <Route path="/under-construction" element={<PageUnderConstruction />} />
          
          {/* Redirect all undefined routes to the under-construction page */}
          <Route path="*" element={<Navigate to="/under-construction" replace />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;