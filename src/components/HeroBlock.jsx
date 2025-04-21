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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
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

    // Handle resize for responsive design
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleScroll(); // Check on initial load
    handleResize(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
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
      <Container fluid className="px-0 px-md-4">
          <Row className="align-items-center">
          <Col md={6} className="order-2 order-md-1">
            <div className="text-black min-h-[50vh] md:min-h-screen flex items-center justify-center relative overflow-hidden py-4 md:py-0">
              {/* Mobile decorative elements */}
              {isMobile && (
                <div className="mobile-decorative-elements">
                  <div className="absolute top-2 right-2 z-10">
                    <div className="w-10 h-10 rounded-full bg-amber-600 border-2 border-amber-400 flex items-center justify-center">
                      <span className="text-xl font-black text-white">A</span>
                </div>
                  </div>
                  <div className="absolute bottom-2 left-2 z-10">
                    <div className="w-8 h-8 rounded-full bg-blue-400"></div>
                  </div>
                </div>
              )}
                
              {/* Main content */}
              <div className="text-center z-20 w-full px-4 md:px-6">
                <h1 className="leading-tight">
                  <span className="block font-black text-3xl sm:text-4xl md:text-6xl uppercase tracking-tight mb-1 md:mb-2">
                    {t('hero.title.part1')}
                  </span>
                  <span className="block font-extrabold text-4xl sm:text-5xl md:text-7xl uppercase text-amber-400 mb-1 md:mb-2">
                    {t('hero.title.part2')}
                  </span>
                  <span className="block font-black text-3xl sm:text-4xl md:text-6xl uppercase tracking-tight mb-1 md:mb-2">
                    {t('hero.title.part3')}
                  </span>
                  <span className="block font-black text-3xl sm:text-4xl md:text-6xl uppercase tracking-tight mb-1 md:mb-2">
                    {t('hero.title.part4')}
                  </span>
                  <span className="block font-bold text-2xl sm:text-3xl md:text-5xl text-blue-400 uppercase tracking-wider">
                    {t('hero.title.part5')}
                  </span>
                </h1>
                
                <p className="font-medium text-base sm:text-lg text-black mt-3 md:mt-6 max-w-2xl mx-auto">
                  {t('hero.description')}
                </p>
                
                {/* Features */}
                <div className="mt-4 md:mt-8 flex flex-col space-y-2 md:space-y-4">
                  {features.map((feature, index) => (
                    <div 
                      key={index}
                      className={`flex items-center space-x-3 p-2 md:p-4 rounded-lg transition-all duration-300 ${
                        activeFeature === index 
                          ? 'bg-blue-50 shadow-sm transform scale-102' 
                          : 'bg-gray-50'
                      }`}
                      onClick={() => setActiveFeature(index)}
                      onTouchStart={() => setActiveFeature(index)}
                    >
                      <div className="text-lg md:text-2xl flex-shrink-0">{feature.icon}</div>
                      <div className="text-left flex-grow min-w-0">
                        <h3 className="font-bold text-sm md:text-lg truncate">{feature.title}</h3>
                        <p className="text-gray-600 text-xs md:text-base line-clamp-2">{feature.description}</p>
                      </div>
                  </div>
                  ))}
                </div>
                
                {/* CTA */}
                <div className="mt-4 md:mt-8 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                <Button 
                  onClick={() => setIsPopUpOpen(true)}
                  variant="primary" 
                    className="hero-btn flex items-center justify-center"
                  >
                    {t('hero.buttonText')} <FaArrowRight className="ml-2" />
                  </Button>
                  <Button 
                    variant="outline-primary" 
                  href={buttonLink} 
                    className="hero-btn-outline flex items-center justify-center"
                  >
                    {t('hero.learnMore')} <FaCheck className="ml-2" />
                </Button>
                </div>
              </div>
            </div>
          </Col>
          
          <Col md={6} className="order-1 order-md-2 px-4 md:px-6">
            <div className="hero-image-container">
              <img 
                src={imageUrl} 
                alt="Hero" 
                className="w-full hero-image" 
              />
            </div>
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
