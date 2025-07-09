import React from 'react';
import Header from '../components/Header';
import Features from '../components/Features';
import HeroSection from '../components/HeroSection';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
      <div>
        <Header />
        <HeroSection />
        <Features />
        <CTA />
        <Footer />
      </div>
    );
};

export default HomePage;