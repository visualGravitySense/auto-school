import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaArrowRight, FaCheck, FaStar, FaClock, FaGraduationCap, FaUsers, FaCar, FaCertificate, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import HeroBlock from '../components/HeroBlock';
import GiftCard from '../components/GiftCard';
import Advantages from '../components/Advantages';
import TariffComparison from '../components/TariffComparison';
import Testimonials from '../components/Testimonials';
import SocialProof from '../components/SocialProof';
import CourseStructure from '../components/CourseStructure';

const HomePage = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  
  // Track visibility for animation (System 1)
  useEffect(() => {
    const handleScroll = () => {
      // Determine which section is currently in view
      const sections = ['hero', 'consideration', 'evaluation', 'decision', 'action'];
      const sectionElements = sections.map(section => 
        document.getElementById(section)
      );
      
      for (let i = 0; i < sectionElements.length; i++) {
        if (sectionElements[i]) {
          const rect = sectionElements[i].getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
      
      // Show sticky CTA after scrolling past hero section
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        setShowStickyCTA(rect.bottom < 0);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero data for System 1 & 2 integration
  const heroData = {
    imageUrl: '/images/services.jpg',
    title: t('home.hero.title'),
    subtitle: t('home.hero.subtitle'),
    ctaText: t('home.hero.ctaText'),
    ctaLink: '/contact'
  };

  // Stats for System 1: Quick recognition
  const stats = [
    { value: '15+', label: t('home.stats.experience'), icon: <FaStar className="text-yellow-500" /> },
    { value: '98%', label: t('home.stats.passRate'), icon: <FaCertificate className="text-green-500" /> },
    { value: '1000+', label: t('home.stats.graduates'), icon: <FaUsers className="text-blue-500" /> }
  ];

  // Features for System 1 & 2 integration
  const features = [
    {
      icon: <FaGraduationCap className="text-blue-500" />,
      title: t('home.features.experience.title'),
      description: t('home.features.experience.description')
    },
    {
      icon: <FaCar className="text-green-500" />,
      title: t('home.features.flexibility.title'),
      description: t('home.features.flexibility.description')
    },
    {
      icon: <FaClock className="text-yellow-500" />,
      title: t('home.features.schedule.title'),
      description: t('home.features.schedule.description')
    }
  ];

  return (
    <div className="min-h-screen">
      {/* SYSTEM 1: INTUITIVE, FAST, AUTOMATIC THINKING */}
      {/* This section uses visual cues, emotions, and familiar patterns to appeal to System 1 */}
      <section 
        id="hero" 
        className={`bg-gradient-to-b from-blue-50 to-white transition-all duration-500 ${
          activeSection === 'hero' ? 'opacity-100' : 'opacity-90'
        }`}
      >
        <HeroBlock {...heroData} />
        
        {/* Quick stats with visual cues for System 1 processing */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:scale-105"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SYSTEM 2: DELIBERATE, SLOW, LOGICAL THINKING */}
      {/* This section provides detailed information and requires conscious processing */}
      <section 
        id="consideration" 
        className={`py-16 bg-white transition-all duration-500 ${
          activeSection === 'consideration' ? 'opacity-100' : 'opacity-90'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">{t('home.consideration.title')}</h2>
            <p className="mt-4 text-xl text-gray-600">{t('home.consideration.subtitle')}</p>
          </div>
          
          <Advantages />
        </div>
      </section>

      {/* SYSTEM 1 & 2 INTEGRATION - Combining intuitive and deliberate thinking */}
      <section 
        id="evaluation" 
        className={`py-16 bg-gray-50 transition-all duration-500 ${
          activeSection === 'evaluation' ? 'opacity-100' : 'opacity-90'
        }`}
      >
        {/* Social proof appeals to System 1 */}
        <div className="mb-16">
          <SocialProof />
        </div>
        
        {/* Course structure appeals to System 2 */}
        <div>
          <CourseStructure />
        </div>
      </section>

      {/* SYSTEM 2: DELIBERATE DECISION MAKING */}
      {/* This section requires careful consideration and comparison */}
      <section 
        id="decision" 
        className={`py-16 bg-white transition-all duration-500 ${
          activeSection === 'decision' ? 'opacity-100' : 'opacity-90'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">{t('home.decision.title')}</h2>
            <p className="mt-4 text-xl text-gray-600">{t('home.decision.subtitle')}</p>
          </div>
          
          <TariffComparison />
          
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('home.giftCard.title')}</h3>
            <p className="text-gray-600 mb-8">{t('home.giftCard.subtitle')}</p>
            <GiftCard />
          </div>
        </div>
      </section>

      {/* SYSTEM 1 & 2 INTEGRATION - Final push with both emotional and logical appeals */}
      <section 
        id="action" 
        className={`py-16 bg-blue-50 transition-all duration-500 ${
          activeSection === 'action' ? 'opacity-100' : 'opacity-90'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Testimonials appeal to System 1 */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">{t('home.testimonials.title')}</h2>
            <p className="mt-4 text-xl text-gray-600">{t('home.testimonials.subtitle')}</p>
          </div>
          
          <Testimonials />
          
          {/* Clear CTA with both emotional and logical elements */}
          <div className="mt-16 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{t('home.cta.title')}</h3>
            <p className="text-xl text-gray-600 mb-8">{t('home.cta.subtitle')}</p>
            <a 
              href="/contact" 
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg transform hover:scale-105"
            >
              {t('home.cta.button')} <FaArrowRight className="inline ml-2" />
            </a>
          </div>
        </div>
      </section>
      
      {/* SYSTEM 1: INTUITIVE ACCESS - Persistent CTA that follows the user */}
      {showStickyCTA && (
        <div className="fixed bottom-4 right-4 z-50">
          <a 
            href="/contact" 
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors shadow-lg flex items-center transform hover:scale-105"
          >
            <span>{t('home.stickyCta.text')}</span>
            <FaArrowRight className="ml-2" />
          </a>
        </div>
      )}
      
      {/* Progress indicator to show users where they are in the decision process */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        <div className="flex flex-col space-y-2">
          {['hero', 'consideration', 'evaluation', 'decision', 'action'].map((section) => (
            <div 
              key={section}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section 
                  ? 'bg-blue-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => {
                document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage; 