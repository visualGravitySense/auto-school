import React, { useState, useEffect } from 'react';
// import HeroBlock from "../components/HeroBlock"
import { useTranslation } from 'react-i18next';
import { FaArrowRight, FaCheck, FaStar, FaClock, FaGraduationCap, FaInfoCircle, FaCalendar, FaUser, FaSync, FaArrowUp, FaThumbsUp, FaUsers, FaRegClock, FaRegCalendarAlt } from 'react-icons/fa';
import { Card, Button, Row, Col, Container, Table, Accordion, Badge, Alert } from 'react-bootstrap';
import { AnimatePresence } from 'framer-motion';

// HeroBlock component with enhanced UX
const HeroBlock2 = ({ imageUrl }) => {
  const { t } = useTranslation();
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
    handleScroll();
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
      className={`hero-block py-8 md:py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t('courses.hero.title', 'Наши курсы вождения')}
            </h1>
            <p className="text-lg md:text-xl mb-4 md:mb-6">
              {t('courses.hero.description', 'Профессиональное обучение вождению с опытными инструкторами')}
            </p>
            
            {/* Features section - System 1 & 2 integration */}
            <div className="mt-4 md:mt-8 space-y-2 md:space-y-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`flex items-center space-x-3 md:space-x-4 p-3 md:p-4 rounded-lg transition-all duration-300 ${
                    activeFeature === index 
                      ? 'bg-white bg-opacity-20 text-black transform scale-105' 
                      : 'bg-white bg-opacity-10'
                  }`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className="text-xl md:text-2xl">{feature.icon}</div>
                  <div>
                    <h3 className="font-bold text-sm md:text-base">{feature.title}</h3>
                    <p className="text-xs md:text-sm opacity-90">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-6 md:mt-8 bg-white text-blue-700 px-4 md:px-6 py-2 md:py-3 rounded-md font-semibold hover:bg-blue-100 transition-colors flex items-center transform hover:scale-105 text-sm md:text-base">
              {t('courses.hero.buttonText', 'Записаться на курс')} <FaArrowRight className="ml-2" />
            </button>
          </div>
          <div className="w-full md:w-1/2 mt-6 md:mt-0">
            <img 
              src={imageUrl} 
              alt="Driving courses" 
              className="rounded-lg shadow-xl w-full h-auto transform hover:scale-105 transition-transform duration-500" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBlock2;