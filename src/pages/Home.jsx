import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { DecisionContext } from '../contexts/DecisionContext';
import { FaInfoCircle, FaCheck, FaTimes, FaQuestion, FaArrowRight, FaStar, FaClock, 
         FaGraduationCap, FaUsers, FaCar, FaCertificate, FaPhoneAlt, FaEnvelope, 
         FaMapMarkerAlt, FaChevronDown, FaThumbsUp, FaRegClock, FaRegCalendarAlt,
         FaRegHandshake, FaRegLightbulb, FaRegChartBar } from 'react-icons/fa';
import '../styles/Home.css';

// Import components
import HeroBlock from '../components/HeroBlock';
import HeroBlock2 from '../components/HeroBlock2';
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
  
  // Nudge Theory enhancements
  const [showCommitmentPrompt, setShowCommitmentPrompt] = useState(false);
  const [userCommitment, setUserCommitment] = useState(null);
  const [showSocialProof, setShowSocialProof] = useState(false);
  const [activePackage, setActivePackage] = useState('standard'); // Default option
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showAnchoring, setShowAnchoring] = useState(false);
  const [anchoringValue, setAnchoringValue] = useState(0);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

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
  
  // Nudge Theory: Anchoring values for price comparison
  const anchoringPrices = {
    premium: 999,
    standard: 699,
    basic: 499
  };

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
            
            // Nudge Theory: Show social proof when user reaches decision section
            if (sections[i] === 'decision' && !showSocialProof) {
              setShowSocialProof(true);
              setTimeout(() => setShowSocialProof(false), 5000); // Hide after 5 seconds
            }
            
            // Nudge Theory: Show commitment prompt when user reaches action section
            if (sections[i] === 'action' && !userCommitment && !showCommitmentPrompt) {
              setShowCommitmentPrompt(true);
            }
            
            // Nudge Theory: Show anchoring effect when user reaches pricing section
            if (sections[i] === 'decision' && !showAnchoring) {
              setShowAnchoring(true);
              setAnchoringValue(anchoringPrices[activePackage]);
            }
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
  }, [trackInformationSeeking, showSocialProof, userCommitment, showCommitmentPrompt, activePackage, showAnchoring]);

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
      
      // Nudge Theory: Provide immediate feedback on important interactions
      if (interaction.target.includes('package') || interaction.target.includes('plan')) {
        setShowFeedback(true);
        setFeedbackMessage(t('home.feedback.packageSelected'));
        setTimeout(() => setShowFeedback(false), 3000);
      }
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
  }, [trackUserBehavior, t]);

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
    const priceInteractions = userInteractions.filter(i => {
      const targetStr = typeof i.target === 'string' ? i.target : i.target.toString();
      return targetStr.includes('price') || targetStr.includes('cost');
    }).length;
    return Math.min(priceInteractions / 10, 1);
  };

  const calculateQualityFactor = () => {
    const qualityInteractions = userInteractions.filter(i => {
      const targetStr = typeof i.target === 'string' ? i.target : i.target.toString();
      return targetStr.includes('quality') || targetStr.includes('features');
    }).length;
    return Math.min(qualityInteractions / 8, 1);
  };

  const calculateConvenienceFactor = () => {
    const convenienceInteractions = userInteractions.filter(i => {
      const targetStr = typeof i.target === 'string' ? i.target : i.target.toString();
      return targetStr.includes('schedule') || targetStr.includes('location');
    }).length;
    return Math.min(convenienceInteractions / 6, 1);
  };

  const calculateReputationFactor = () => {
    const reputationInteractions = userInteractions.filter(i => {
      const targetStr = typeof i.target === 'string' ? i.target : i.target.toString();
      return targetStr.includes('review') || targetStr.includes('testimonial');
    }).length;
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
        .filter(i => {
          const targetStr = typeof i.target === 'string' ? i.target : i.target.toString();
          return targetStr.includes('package') || targetStr.includes('plan');
        })
        .map(i => i.target)
    );
    return uniqueAlternatives.size;
  };

  const calculateComparisonsMade = () => {
    return userInteractions.filter(i => {
      const targetStr = typeof i.target === 'string' ? i.target : i.target.toString();
      return targetStr.includes('compare') || targetStr.includes('versus');
    }).length;
  };

  const calculateCriteriaEvaluated = () => {
    const criteria = ['price', 'quality', 'features', 'schedule', 'location'];
    return criteria.filter(criterion => 
      userInteractions.some(i => {
        const targetStr = typeof i.target === 'string' ? i.target : i.target.toString();
        return targetStr.includes(criterion);
      })
    ).length;
  };
  
  // Nudge Theory: Handle package selection with default option
  const handlePackageSelect = (packageId) => {
    setActivePackage(packageId);
    updateDecisionConfidence(0.2);
    
    // Show feedback
    setShowFeedback(true);
    setFeedbackMessage(t('home.feedback.packageSelected'));
    setTimeout(() => setShowFeedback(false), 3000);
  };
  
  // Nudge Theory: Handle user commitment
  const handleCommitment = (commitment) => {
    setUserCommitment(commitment);
    setShowCommitmentPrompt(false);
    updateDecisionConfidence(0.3);
    
    // Show feedback
    setShowFeedback(true);
    setFeedbackMessage(t('home.feedback.commitmentRecorded'));
    setTimeout(() => setShowFeedback(false), 3000);
  };

    return (
    <div className="home-page">
      {/* Global progress bar */}
      <motion.div 
        className="global-progress-bar"
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Main content */}
      <main className="main-content">
        {/* SYSTEM 1: INTUITIVE, FAST, AUTOMATIC THINKING */}
        {/* This section uses visual cues, emotions, and familiar patterns to appeal to System 1 */}
        <motion.section
          id="hero"
          className="hero-section"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div className="hero-content" variants={fadeInUp}>
            {/* <HeroBlock {...heroData} /> */}
            <HeroBlock2 />
          </motion.div>
          
          {/* Quick stats with visual cues for System 1 processing */}
          <motion.div 
            className="stats-container"
            variants={fadeInUp}
          >
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="stat-card"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Scroll indicator for System 1 guidance */}
          <AnimatePresence>
            {showScrollIndicator && (
              <motion.div 
                className="scroll-indicator"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <p className="scroll-text">{t('home.scrollDown')}</p>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <FaChevronDown className="scroll-icon" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* SYSTEM 2: DELIBERATE, SLOW, LOGICAL THINKING */}
        {/* This section provides detailed information and requires conscious processing */}
        <motion.section
          id="consideration"
          className="consideration-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="section-container">
            <motion.div className="section-header" variants={fadeInUp}>
              <h2>{t('home.consideration.title')}</h2>
              <p>{t('home.consideration.subtitle')}</p>
            </motion.div>
            
            <Advantages />
          </div>
        </motion.section>

        {/* SYSTEM 1 & 2 INTEGRATION - Combining intuitive and deliberate thinking */}
        <motion.section
          id="evaluation"
          className="evaluation-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="section-container">
            {/* Social proof appeals to System 1 */}
            <motion.div className="social-proof-container" variants={fadeInUp}>
              <SocialProof />
            </motion.div>
            
            {/* Course structure appeals to System 2 */}
            <motion.div className="course-structure-container" variants={fadeInUp}>
              <CourseStructure />
            </motion.div>
          </div>
        </motion.section>

        {/* SYSTEM 2: DELIBERATE DECISION MAKING */}
        {/* This section requires careful consideration and comparison */}
        <motion.section
          id="decision"
          className="decision-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="section-container">
            <motion.div className="section-header" variants={fadeInUp}>
              <h2>{t('home.decision.title')}</h2>
              <p>{t('home.decision.subtitle')}</p>
            </motion.div>
            
            {/* Nudge Theory: Default option highlighted */}
            <div className="package-selection">
              <h3>{t('home.packages.title')}</h3>
              <p>{t('home.packages.subtitle')}</p>
              
              <div className="package-options">
                <div 
                  className={`package-option ${activePackage === 'basic' ? 'active' : ''}`}
                  onClick={() => handlePackageSelect('basic')}
                >
                  <h4>{t('home.packages.basic.title')}</h4>
                  <p className="package-price">{t('home.packages.basic.price')}</p>
                  <ul>
                    <li>{t('home.packages.basic.feature1')}</li>
                    <li>{t('home.packages.basic.feature2')}</li>
                    <li>{t('home.packages.basic.feature3')}</li>
                  </ul>
                  <button className="package-select-btn">
                    {activePackage === 'basic' ? t('home.packages.selected') : t('home.packages.select')}
                  </button>
                </div>
                
                <div 
                  className={`package-option ${activePackage === 'standard' ? 'active' : ''}`}
                  onClick={() => handlePackageSelect('standard')}
                >
                  <div className="package-badge">{t('home.packages.recommended')}</div>
                  <h4>{t('home.packages.standard.title')}</h4>
                  <p className="package-price">{t('home.packages.standard.price')}</p>
                  <ul>
                    <li>{t('home.packages.standard.feature1')}</li>
                    <li>{t('home.packages.standard.feature2')}</li>
                    <li>{t('home.packages.standard.feature3')}</li>
                    <li>{t('home.packages.standard.feature4')}</li>
                  </ul>
                  <button className="package-select-btn">
                    {activePackage === 'standard' ? t('home.packages.selected') : t('home.packages.select')}
                  </button>
                </div>
                
                <div 
                  className={`package-option ${activePackage === 'premium' ? 'active' : ''}`}
                  onClick={() => handlePackageSelect('premium')}
                >
                  <h4>{t('home.packages.premium.title')}</h4>
                  <p className="package-price">{t('home.packages.premium.price')}</p>
                  <ul>
                    <li>{t('home.packages.premium.feature1')}</li>
                    <li>{t('home.packages.premium.feature2')}</li>
                    <li>{t('home.packages.premium.feature3')}</li>
                    <li>{t('home.packages.premium.feature4')}</li>
                    <li>{t('home.packages.premium.feature5')}</li>
                  </ul>
                  <button className="package-select-btn">
                    {activePackage === 'premium' ? t('home.packages.selected') : t('home.packages.select')}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Nudge Theory: Anchoring effect for price comparison */}
            {showAnchoring && (
              <div className="anchoring-container">
                <h4>{t('home.anchoring.title')}</h4>
                <p>{t('home.anchoring.subtitle')}</p>
                <div className="anchoring-comparison">
                  <div className="anchoring-value">
                    <span className="anchoring-label">{t('home.anchoring.otherSchools')}</span>
                    <span className="anchoring-price">€{anchoringValue + 200}</span>
                  </div>
                  <div className="anchoring-value">
                    <span className="anchoring-label">{t('home.anchoring.ourPrice')}</span>
                    <span className="anchoring-price">€{anchoringPrices[activePackage]}</span>
                    <span className="anchoring-savings">{t('home.anchoring.savings', { amount: 200 })}</span>
                  </div>
                </div>
              </div>
            )}

            <TariffComparison />

            <motion.div className="gift-card-container" variants={fadeInUp}>
              <h3>{t('home.giftCard.title')}</h3>
              <p>{t('home.giftCard.subtitle')}</p>
              <GiftCard />
            </motion.div>
          </div>
        </motion.section>

        {/* SYSTEM 1 & 2 INTEGRATION - Final push with both emotional and logical appeals */}
        <motion.section
          id="action"
          className="action-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="section-container">
            {/* Testimonials appeal to System 1 */}
            <motion.div className="section-header" variants={fadeInUp}>
              <h2>{t('home.testimonials.title')}</h2>
              <p>{t('home.testimonials.subtitle')}</p>
            </motion.div>
            
            <Testimonials />
            
            {/* Nudge Theory: Commitment device */}
            {showCommitmentPrompt && (
              <div className="commitment-container">
                <h3>{t('home.commitment.title')}</h3>
                <p>{t('home.commitment.subtitle')}</p>
                <div className="commitment-options">
                  <button 
                    className="commitment-btn"
                    onClick={() => handleCommitment('interested')}
                  >
                    <FaRegLightbulb /> {t('home.commitment.interested')}
                  </button>
                  <button 
                    className="commitment-btn"
                    onClick={() => handleCommitment('planning')}
                  >
                    <FaRegCalendarAlt /> {t('home.commitment.planning')}
                  </button>
                  <button 
                    className="commitment-btn"
                    onClick={() => handleCommitment('ready')}
                  >
                    <FaRegHandshake /> {t('home.commitment.ready')}
                  </button>
                </div>
              </div>
            )}
            
            {/* Clear CTA with both emotional and logical elements */}
            <motion.div className="cta-container" variants={fadeInUp}>
              <h3>{t('home.cta.title')}</h3>
              <p>{t('home.cta.subtitle')}</p>
              <motion.a 
                href="/contact" 
                className="cta-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('home.cta.button')} <FaArrowRight className="cta-icon" />
              </motion.a>
            </motion.div>
          </div>
        </motion.section>
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
        <motion.div 
          className="section-indicator"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="indicator-dots">
            {['hero', 'consideration', 'evaluation', 'decision', 'action'].map((section) => (
              <motion.div 
                key={section}
                className={`indicator-dot ${activeSection === section ? 'active' : ''}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Decision Progress Indicator */}
        <motion.div 
          className="decision-progress"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${decisionState.decisionConfidence * 100}%` }}
              transition={{ duration: 0.5 }}
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
        </motion.div>
        
        {/* Nudge Theory: Social proof notification */}
        <AnimatePresence>
          {showSocialProof && (
            <motion.div 
              className="social-proof-notification"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
            >
              <div className="social-proof-content">
                <FaUsers className="social-proof-icon" />
                <div className="social-proof-text">
                  <p className="social-proof-title">{t('home.socialProof.title')}</p>
                  <p className="social-proof-message">{t('home.socialProof.message')}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Nudge Theory: Feedback notification */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div 
              className="feedback-notification"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div className="feedback-content">
                <FaThumbsUp className="feedback-icon" />
                <p className="feedback-message">{feedbackMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* SYSTEM 1: INTUITIVE ACCESS - Persistent CTA that follows the user */}
        <AnimatePresence>
          {showStickyCTA && (
            <motion.div 
              className="sticky-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <motion.a 
                href="/contact" 
                className="sticky-cta-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{t('home.stickyCta.text')}</span>
                <FaArrowRight className="sticky-cta-icon" />
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
    );
  };
  
  export default Home;
  