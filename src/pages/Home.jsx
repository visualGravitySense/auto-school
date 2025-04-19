import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { DecisionContext } from '../contexts/DecisionContext';
import { FaInfoCircle, FaCheck, FaTimes, FaQuestion, FaArrowRight, FaStar, FaClock, 
         FaGraduationCap, FaUsers, FaCar, FaCertificate, FaPhoneAlt, FaEnvelope, 
         FaMapMarkerAlt, FaChevronDown } from 'react-icons/fa';
import '../styles/Home.css';

// Import components
import HeroBlock from '../components/HeroBlock';
import GiftCard from '../components/GiftCard';
import Advantages from '../components/Advantages';
import TariffComparison from '../components/TariffComparison';
import Testimonials from '../components/Testimonials';
import SocialProof from '../components/SocialProof';
import CourseStructure from '../components/CourseStructure';

const Home = () => {
  const { t } = useTranslation();
  const { decisionState, updateDecisionConfidence, 
          trackInformationSeeking, updateDecisionFactors, trackDecisionProgress, 
          trackUserBehavior } = useContext(DecisionContext);

  // Enhanced decision tracking
  const [userInteractions, setUserInteractions] = useState([]);
  const [sectionVisibility, setSectionVisibility] = useState({});
  const [decisionMetrics, setDecisionMetrics] = useState({
    timeInSection: {},
    scrollDepth: 0,
    interactions: []
  });
  
  // HomePage state
  const [activeSection, setActiveSection] = useState('hero');
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // Hero data optimized for System 1 & 2 integration
  const heroData = {
    imageUrl: '/images/services.jpg',
    title: t('home.hero.title'),
    subtitle: t('home.hero.subtitle'),
    ctaText: t('home.hero.ctaText'),
    ctaLink: '/contact',
    features: [
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
    ]
  };

  // Stats optimized for System 1: Quick recognition
  const stats = [
    { value: '15+', label: t('home.stats.experience'), icon: <FaStar className="text-yellow-500" /> },
    { value: '98%', label: t('home.stats.passRate'), icon: <FaCertificate className="text-green-500" /> },
    { value: '1000+', label: t('home.stats.graduates'), icon: <FaUsers className="text-blue-500" /> }
  ];

  // Track scroll position and section visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Update scroll depth
      const scrollDepth = (scrollPosition / (documentHeight - windowHeight)) * 100;
      setDecisionMetrics(prev => ({ ...prev, scrollDepth }));
      
      // Calculate scroll progress
      const progress = (scrollPosition / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);
      
      // Track section visibility
      const sections = ['hero', 'consideration', 'evaluation', 'decision', 'action'];
      const sectionElements = sections.map(section => 
        document.getElementById(section)
      );
      
      const newVisibility = {};
      for (let i = 0; i < sectionElements.length; i++) {
        if (sectionElements[i]) {
          const rect = sectionElements[i].getBoundingClientRect();
          const isVisible = rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2;
          newVisibility[sections[i]] = isVisible;
          
          if (isVisible) {
            setActiveSection(sections[i]);
          }
        }
      }
      setSectionVisibility(newVisibility);
      
      // Show sticky CTA after scrolling past hero section
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        setShowStickyCTA(rect.bottom < 0);
      }
      
      // Hide scroll indicator after first scroll
      if (scrollPosition > 100) {
        setShowScrollIndicator(false);
      }
      
      // Update information seeking metrics
      trackInformationSeeking({
        scrollDepth,
        visibleSections: Object.entries(newVisibility)
          .filter(([, isVisible]) => isVisible)
          .map(([id]) => id)
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackInformationSeeking]);

  // Track user interactions
  useEffect(() => {
    const handleInteraction = (event) => {
      const interaction = {
        type: event.type,
        target: event.target.id || event.target.className,
        timestamp: Date.now(),
        position: {
          x: event.clientX,
          y: event.clientY
        }
      };
      
      setUserInteractions(prev => [...prev, interaction]);
      trackUserBehavior(interaction);
    };

    const events = ['click', 'hover', 'focus'];
    events.forEach(eventType => {
      document.addEventListener(eventType, handleInteraction);
    });

    return () => {
      events.forEach(eventType => {
        document.removeEventListener(eventType, handleInteraction);
      });
    };
  }, [trackUserBehavior]);

  // Track time spent in sections
  useEffect(() => {
    const interval = setInterval(() => {
      setDecisionMetrics(prev => {
        const newTimeInSection = { ...prev.timeInSection };
        Object.entries(sectionVisibility).forEach(([sectionId, isVisible]) => {
          if (isVisible) {
            newTimeInSection[sectionId] = (newTimeInSection[sectionId] || 0) + 1;
          }
        });
        return { ...prev, timeInSection: newTimeInSection };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [sectionVisibility]);

  // Update decision factors based on user behavior
  useEffect(() => {
    const factors = {
      price: calculatePriceFactor(),
      quality: calculateQualityFactor(),
      convenience: calculateConvenienceFactor(),
      reputation: calculateReputationFactor()
    };
    
    updateDecisionFactors(factors);
  }, [userInteractions, decisionMetrics, updateDecisionFactors]);

  // Helper functions for calculating decision factors
  const calculatePriceFactor = () => {
    const priceInteractions = userInteractions.filter(i => 
      i.target.includes('price') || i.target.includes('cost')
    ).length;
    return Math.min(priceInteractions / 10, 1);
  };

  const calculateQualityFactor = () => {
    const qualityInteractions = userInteractions.filter(i => 
      i.target.includes('quality') || i.target.includes('features')
    ).length;
    return Math.min(qualityInteractions / 8, 1);
  };

  const calculateConvenienceFactor = () => {
    const convenienceInteractions = userInteractions.filter(i => 
      i.target.includes('schedule') || i.target.includes('location')
    ).length;
    return Math.min(convenienceInteractions / 6, 1);
  };

  const calculateReputationFactor = () => {
    const reputationInteractions = userInteractions.filter(i => 
      i.target.includes('review') || i.target.includes('testimonial')
    ).length;
    return Math.min(reputationInteractions / 5, 1);
  };

  // Update decision progress
  useEffect(() => {
    const progress = {
      alternativesConsidered: calculateAlternativesConsidered(),
      comparisonsMade: calculateComparisonsMade(),
      criteriaEvaluated: calculateCriteriaEvaluated()
    };
    
    trackDecisionProgress(progress);
  }, [userInteractions, decisionMetrics, trackDecisionProgress]);

  // Helper functions for calculating decision progress
  const calculateAlternativesConsidered = () => {
    const uniqueAlternatives = new Set(
      userInteractions
        .filter(i => i.target.includes('package') || i.target.includes('plan'))
        .map(i => i.target)
    );
    return uniqueAlternatives.size;
  };

  const calculateComparisonsMade = () => {
    return userInteractions.filter(i => 
      i.target.includes('compare') || i.target.includes('versus')
    ).length;
  };

  const calculateCriteriaEvaluated = () => {
    const criteria = ['price', 'quality', 'features', 'schedule', 'location'];
    return criteria.filter(criterion => 
      userInteractions.some(i => i.target.includes(criterion))
    ).length;
  };

  return (
    <div className="home-page">
      {/* Global progress bar */}
      <div 
        className="global-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />
      
      {/* Main content */}
      <main className="main-content">
        {/* SYSTEM 1: INTUITIVE, FAST, AUTOMATIC THINKING */}
        {/* This section uses visual cues, emotions, and familiar patterns to appeal to System 1 */}
        <section
          id="hero"
          className={`hero-section ${
            activeSection === 'hero' ? 'opacity-100' : 'opacity-90'
          }`}
        >
          <HeroBlock {...heroData} />
          
          {/* Quick stats with visual cues for System 1 processing */}
          <div className="stats-container">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="stat-card"
                >
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Scroll indicator for System 1 guidance */}
          {showScrollIndicator && (
            <div className="scroll-indicator">
              <p className="scroll-text">{t('home.scrollDown')}</p>
              <div>
                <FaChevronDown className="scroll-icon" />
              </div>
            </div>
          )}
        </section>

        {/* SYSTEM 2: DELIBERATE, SLOW, LOGICAL THINKING */}
        {/* This section provides detailed information and requires conscious processing */}
        <section
          id="consideration"
          className={`consideration-section ${
            activeSection === 'consideration' ? 'opacity-100' : 'opacity-90'
          }`}
        >
          <div className="section-container">
            <div className="section-header">
              <h2>{t('home.consideration.title')}</h2>
              <p>{t('home.consideration.subtitle')}</p>
            </div>
            
            <Advantages />
          </div>
        </section>

        {/* SYSTEM 1 & 2 INTEGRATION - Combining intuitive and deliberate thinking */}
        <section
          id="evaluation"
          className={`evaluation-section ${
            activeSection === 'evaluation' ? 'opacity-100' : 'opacity-90'
          }`}
        >
          <div className="section-container">
            {/* Social proof appeals to System 1 */}
            <div className="social-proof-container">
              <SocialProof />
            </div>
            
            {/* Course structure appeals to System 2 */}
            <div className="course-structure-container">
              <CourseStructure />
            </div>
          </div>
        </section>

        {/* SYSTEM 2: DELIBERATE DECISION MAKING */}
        {/* This section requires careful consideration and comparison */}
        <section
          id="decision"
          className={`decision-section ${
            activeSection === 'decision' ? 'opacity-100' : 'opacity-90'
          }`}
        >
          <div className="section-container">
            <div className="section-header">
              <h2>{t('home.decision.title')}</h2>
              <p>{t('home.decision.subtitle')}</p>
            </div>
            
            <TariffComparison />
            
            <div className="gift-card-container">
              <h3>{t('home.giftCard.title')}</h3>
              <p>{t('home.giftCard.subtitle')}</p>
              <GiftCard />
            </div>
          </div>
        </section>

        {/* SYSTEM 1 & 2 INTEGRATION - Final push with both emotional and logical appeals */}
        <section
          id="action"
          className={`action-section ${
            activeSection === 'action' ? 'opacity-100' : 'opacity-90'
          }`}
        >
          <div className="section-container">
            {/* Testimonials appeal to System 1 */}
            <div className="section-header">
              <h2>{t('home.testimonials.title')}</h2>
              <p>{t('home.testimonials.subtitle')}</p>
            </div>
            
            <Testimonials />
            
            {/* Clear CTA with both emotional and logical elements */}
            <div className="cta-container">
              <h3>{t('home.cta.title')}</h3>
              <p>{t('home.cta.subtitle')}</p>
              <a 
                href="/contact" 
                className="cta-button"
                onClick={() => updateDecisionConfidence(0.2)}
              >
                {t('home.cta.button')} <FaArrowRight className="cta-icon" />
              </a>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>{t('footer.contact')}</h4>
            <ul>
              <li><FaPhoneAlt /> {t('footer.phone')}</li>
              <li><FaEnvelope /> {t('footer.email')}</li>
              <li><FaMapMarkerAlt /> {t('footer.address')}</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>{t('footer.quickLinks')}</h4>
            <ul>
              <li><a href="/about">{t('footer.about')}</a></li>
              <li><a href="/services">{t('footer.services')}</a></li>
              <li><a href="/contact">{t('footer.contact')}</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>{t('footer.followUs')}</h4>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><FaUsers /></a>
              <a href="#" aria-label="Instagram"><FaUsers /></a>
              <a href="#" aria-label="Twitter"><FaUsers /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
        </div>
      </footer>
      
      {/* Fixed UI elements */}
      <div className="fixed-ui-elements">
        {/* Section indicator to show users where they are in the decision process */}
        <div className="section-indicator">
          <div className="indicator-dots">
            {['hero', 'consideration', 'evaluation', 'decision', 'action'].map((section) => (
              <div 
                key={section}
                className={`indicator-dot ${
                  activeSection === section ? 'active' : ''
                }`}
                onClick={() => {
                  document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Decision Progress Indicator */}
        <div className="decision-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ 
                width: `${decisionState.decisionConfidence * 100}%` 
              }}
            />
          </div>
          <div className="progress-labels">
            <span>{t('home.progress.start')}</span>
            <span>{t('home.progress.deciding')}</span>
            <span>{t('home.progress.ready')}</span>
          </div>
          <div className="progress-icons">
            <FaQuestion className={decisionState.decisionConfidence < 0.3 ? 'active' : ''} />
            <FaTimes className={decisionState.decisionConfidence >= 0.3 && decisionState.decisionConfidence < 0.7 ? 'active' : ''} />
            <FaCheck className={decisionState.decisionConfidence >= 0.7 ? 'active' : ''} />
          </div>
        </div>
        
        {/* SYSTEM 1: INTUITIVE ACCESS - Persistent CTA that follows the user */}
        <AnimatePresence>
          {showStickyCTA && (
            <div className="sticky-cta">
              <a 
                href="/contact" 
                className="sticky-cta-button"
                onClick={() => updateDecisionConfidence(0.2)}
              >
                <span>{t('home.stickyCta.text')}</span>
                <FaArrowRight className="sticky-cta-icon" />
              </a>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
  