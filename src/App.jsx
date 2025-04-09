import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ServiceMain from './pages/ServiceMain';
import Navbar from './components/Navbar';
import PricingMain from './pages/Pricing';
import Footer from './components/Footer';
import ContactPage from './pages/ContactPage';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/services" element={<ServiceMain />} />
          <Route path="/pricing" element={<PricingMain />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;