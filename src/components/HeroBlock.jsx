import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './HeroBlock.css';

import PopUp from "./PopUp";
import ContactForm from "./ContactForm";

import { useTranslation } from 'react-i18next';
import { FaArrowRight, FaCheck, FaStar, FaClock, FaGraduationCap } from 'react-icons/fa';

const HeroBlock = ({ buttonLink, imageUrl }) => {
  const { t } = useTranslation();
  
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  
  // Track visibility for animation (System 1)
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero-section');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
        setIsVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate features (System 1)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Features for System 1 & 2 integration
  const features = [
    {
      icon: <FaGraduationCap className="text-blue-500" />,
      title: t('hero.features.experience.title'),
      description: t('hero.features.experience.description')
    },
    {
      icon: <FaStar className="text-yellow-500" />,
      title: t('hero.features.quality.title'),
      description: t('hero.features.quality.description')
    },
    {
      icon: <FaClock className="text-green-500" />,
      title: t('hero.features.flexibility.title'),
      description: t('hero.features.flexibility.description')
    }
  ];

  return (
    <section 
      id="hero-section" 
      className={`hero-block transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <div className="text-black min-h-screen flex items-center justify-center relative overflow-hidden">
              {/* Decorative items - System 1: Visual appeal */}
              <div className="absolute top-16 left-24 transform -rotate-12 z-10">
                <div className="relative w-24 h-5 bg-yellow-400">
                  <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full bg-pink-300"></div>
                  <div className="absolute top-0 -right-5 w-0 h-0 border-l-8 border-l-yellow-400 border-y-5 border-y-transparent"></div>
                </div>
              </div>
              
              <div className="absolute top-12 right-24 z-10">
                <div className="w-16 h-16 rounded-full bg-teal-500 border-2 border-cyan-300 relative">
                  <div className="absolute top-2 left-5 w-8 h-5 rounded-full bg-cyan-300 opacity-50"></div>
                </div>
              </div>
              
              <div className="absolute bottom-20 right-32 z-10">
                <div className="w-12 h-20 bg-yellow-400 rounded-full relative">
                  <div className="absolute -bottom-2 left-4 w-5 h-4 bg-yellow-500 rounded-md"></div>
                </div>
              </div>
              
              <div className="absolute bottom-24 left-28 z-10">
                <div className="w-20 h-16 bg-blue-400 relative rounded-md">
                  <div className="absolute top-1 left-1 w-16 h-12 bg-white opacity-30 rounded-sm"></div>
                </div>
              </div>
              
              <div className="absolute top-48 left-48 z-10">
                <div className="w-16 h-16 rounded-full bg-purple-600"></div>
              </div>
              
              <div className="absolute top-40 right-56 z-10">
                <div className="w-24 h-24 rounded-full bg-amber-600 border-4 border-amber-400 flex items-center justify-center">
                  <span className="text-4xl font-black">A</span>
                </div>
              </div>
              
              {/* Main content - System 1 & 2 integration */}
              <div className="text-center z-20 max-w-4xl px-4">
                <h1 className="leading-none">
                  <span className="block font-black text-6xl uppercase tracking-tight mb-2 md:text-7xl">
                    {t('hero.title.part1')}
                  </span>
                  <span className="block font-extrabold text-7xl uppercase text-amber-400 mb-2 md:text-8xl">
                    {t('hero.title.part2')}
                  </span>
                  <span className="block font-black text-6xl uppercase tracking-tight mb-2 md:text-7xl">
                    {t('hero.title.part3')}
                  </span>
                  <span className="block font-black text-6xl uppercase tracking-tight mb-2 md:text-7xl">
                    {t('hero.title.part4')}
                  </span>
                  <span className="block font-bold text-5xl text-blue-400 uppercase tracking-wider md:text-6xl">
                    {t('hero.title.part5')}
                  </span>
                </h1>
                <p className="font-medium text-xl text-black mt-8 max-w-2xl mx-auto">
                  {t('hero.description')}
                </p>
                
                {/* Features - System 1 & 2 integration */}
                <div className="mt-8 flex flex-col space-y-4">
                  {features.map((feature, index) => (
                    <div 
                      key={index}
                      className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ${
                        activeFeature === index 
                          ? 'bg-blue-50 shadow-md transform scale-105' 
                          : 'bg-gray-50'
                      }`}
                      onMouseEnter={() => setActiveFeature(index)}
                    >
                      <div className="text-2xl">{feature.icon}</div>
                      <div className="text-left">
                        <h3 className="font-bold text-lg">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* CTA - Action Funnel */}
                <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button 
                    onClick={() => setIsPopUpOpen(true)}
                    variant="primary" 
                    className="hero-btn transform hover:scale-105 transition-transform flex items-center justify-center"
                  >
                    {t('hero.buttonText')} <FaArrowRight className="ml-2" />
                  </Button>
                  <Button 
                    variant="outline-primary" 
                    href={buttonLink} 
                    className="hero-btn-outline transform hover:scale-105 transition-transform flex items-center justify-center"
                  >
                    {t('hero.learnMore')} <FaCheck className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <img 
              src={imageUrl} 
              alt="Hero" 
              className="img-fluid hero-image transform hover:scale-105 transition-transform duration-500" 
            />
          </Col>
        </Row>
      </Container>

      <PopUp isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)}>
        <ContactForm />
      </PopUp>
    </section>
  );
};

export default HeroBlock;
