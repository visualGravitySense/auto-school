import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaArrowRight, FaCheck, FaInfoCircle, 
         FaUsers, FaStar, FaThumbsUp, FaRegClock, FaRegCalendarAlt, FaRegHandshake } from 'react-icons/fa';
import ContactBlock from "../components/ContactBlock"
import HeroBlock from "../components/HeroBlock"
import PaymentsContactForm from "../components/PaymentsContactForm"
import { Row, Col } from 'react-bootstrap';
import ImageGrid from "../components/ImageGrid"

const heroData = {
  imageUrl: '/images/services.jpg',
  title: 'Contact Us',
  subtitle: 'Get in touch with our team of experts',
  features: [
    { icon: <FaPhone />, text: '24/7 Support' },
    { icon: <FaEnvelope />, text: 'Quick Response' },
    { icon: <FaMapMarkerAlt />, text: 'Convenient Location' }
  ],
  ctaText: 'Send Message',
  ctaLink: '#contact-form'
};

const Contact = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('hero');
  const [formFocused, setFormFocused] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // Nudge Theory enhancements
  const [showSocialProof, setShowSocialProof] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('morning'); // Default time preference
  const [showCommitmentPrompt, setShowCommitmentPrompt] = useState(false);
  const [userCommitment, setUserCommitment] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Social proof data
  const socialProofData = {
    recentContacts: 15,
    averageResponseTime: '15 minutes',
    satisfactionRate: '98%',
    activeUsers: Math.floor(Math.random() * 10) + 5 // Random number between 5-15
  };

  // Time slot options with smart defaults
  const timeSlots = [
    { id: 'morning', label: t('contact.timeSlots.morning'), icon: <FaRegClock />, default: true },
    { id: 'afternoon', label: t('contact.timeSlots.afternoon'), icon: <FaRegClock /> },
    { id: 'evening', label: t('contact.timeSlots.evening'), icon: <FaRegClock /> }
  ];

  // Track section visibility for animations
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'info', 'form', 'gallery'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track form focus for System 2 engagement
  const handleFormFocus = (focused) => {
    setFormFocused(focused);
  };

  // Track form progress for motivation
  const handleFormProgress = (progress) => {
    setFormProgress(progress);
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Show social proof notification periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setShowSocialProof(true);
      setTimeout(() => setShowSocialProof(false), 5000);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Handle time slot selection with default option
  const handleTimeSlotSelect = (slotId) => {
    setSelectedTimeSlot(slotId);
    setShowFeedback(true);
    setFeedbackMessage(t('contact.feedback.timeSlotSelected'));
    setTimeout(() => setShowFeedback(false), 3000);
  };

  // Handle user commitment
  const handleCommitment = (commitment) => {
    setUserCommitment(commitment);
    setShowCommitmentPrompt(false);
    setShowFeedback(true);
    setFeedbackMessage(t('contact.feedback.commitmentRecorded'));
    setTimeout(() => setShowFeedback(false), 3000);
  };

    return (
    <div className="contact-page">
      {/* Hero Section - System 1: Initial Impression */}
      <motion.section 
        id="hero"
        className="hero-section"
        initial="hidden"
        animate={activeSection === 'hero' ? "visible" : "hidden"}
        variants={sectionVariants}
        transition={{ duration: 0.5 }}
      >
        <HeroBlock {...heroData} />
      </motion.section>

      {/* Social Proof Section - Nudge Theory */}
      <motion.section 
        className="bg-white py-8 border-b"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <FaUsers className="text-3xl text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">{socialProofData.recentContacts}</div>
              <div className="text-sm text-gray-600">{t('contact.socialProof.recentContacts')}</div>
            </div>
            <div className="p-4">
              <FaRegClock className="text-3xl text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">{socialProofData.averageResponseTime}</div>
              <div className="text-sm text-gray-600">{t('contact.socialProof.responseTime')}</div>
            </div>
            <div className="p-4">
              <FaStar className="text-3xl text-yellow-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">{socialProofData.satisfactionRate}</div>
              <div className="text-sm text-gray-600">{t('contact.socialProof.satisfaction')}</div>
            </div>
            <div className="p-4">
              <FaUsers className="text-3xl text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">{socialProofData.activeUsers}</div>
              <div className="text-sm text-gray-600">{t('contact.socialProof.activeUsers')}</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Info Section - System 1 & 2: Quick Access & Detailed Info */}
      <motion.section 
        id="info"
        className="py-16 bg-gray-50"
        initial="hidden"
        animate={activeSection === 'info' ? "visible" : "hidden"}
        variants={sectionVariants}
        transition={{ delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('contact.infoTitle')}</h2>
            <p className="text-xl text-gray-600">{t('contact.infoSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaPhone className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-lg font-semibold">{t('contact.phone')}</h3>
              </div>
              <p className="text-gray-600">{t('contact.phoneNumber')}</p>
              <a href={`tel:${t('contact.phoneNumber')}`} className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
                {t('contact.callNow')} <FaArrowRight className="ml-2" />
              </a>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <FaEnvelope className="text-green-600 text-xl" />
                </div>
                <h3 className="text-lg font-semibold">{t('contact.email')}</h3>
              </div>
              <p className="text-gray-600">{t('contact.emailAddress')}</p>
              <a href={`mailto:${t('contact.emailAddress')}`} className="mt-4 inline-flex items-center text-green-600 hover:text-green-800">
                {t('contact.sendEmail')} <FaArrowRight className="ml-2" />
              </a>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <FaMapMarkerAlt className="text-purple-600 text-xl" />
                </div>
                <h3 className="text-lg font-semibold">{t('contact.address')}</h3>
              </div>
              <p className="text-gray-600">{t('contact.addressDetails')}</p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-purple-600 hover:text-purple-800">
                {t('contact.viewMap')} <FaArrowRight className="ml-2" />
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Preferred Time Selection - Nudge Theory Default Option */}
      <motion.section 
        className="py-8 bg-gray-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            {t('contact.timePreference')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {timeSlots.map((slot) => (
              <motion.button
                key={slot.id}
                className={`p-4 rounded-lg border-2 ${
                  selectedTimeSlot === slot.id 
                    ? 'border-blue-600 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                } flex items-center justify-center gap-2 transition-all`}
                onClick={() => handleTimeSlotSelect(slot.id)}
                whileHover={{ scale: 1.02 }}
              >
                {slot.icon}
                <span>{slot.label}</span>
                {slot.default && (
                  <span className="ml-2 text-sm text-blue-600">
                    ({t('contact.recommended')})
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Form Section - System 2: Deliberate Action */}
      <motion.section 
        id="form"
        className="py-16"
        initial="hidden"
        animate={activeSection === 'form' ? "visible" : "hidden"}
        variants={sectionVariants}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Row className="mb-4">
            <Col md={6}>
              <div className="container mt-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="text-3xl font-bold mb-6">{t('contact.title')}</h2>
                  
                  {/* Progress indicator for form completion */}
                  {formProgress > 0 && (
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{t('contact.formProgress')}</span>
                        <span className="text-sm font-medium text-gray-700">{formProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <motion.div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          initial={{ width: 0 }}
                          animate={{ width: `${formProgress}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Form focus indicator */}
                  {formFocused && (
                    <motion.div 
                      className="mb-4 p-3 bg-blue-50 rounded-md flex items-start"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <FaInfoCircle className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                      <p className="text-sm text-blue-700">{t('contact.formFocusTip')}</p>
                    </motion.div>
                  )}
                  
                  <PaymentsContactForm 
                    onFocusChange={handleFormFocus}
                    onProgressChange={handleFormProgress}
                  />
                </motion.div>
            </div>
          </Col>

          <Col md={6}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
            <ImageGrid />
              </motion.div>
          </Col>
          </Row>
        </div>
      </motion.section>

      {/* Commitment Device - Nudge Theory */}
      {showCommitmentPrompt && (
        <motion.div 
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <h4 className="text-lg font-semibold mb-4">{t('contact.commitment.title')}</h4>
          <p className="text-gray-600 mb-4">{t('contact.commitment.description')}</p>
          <div className="flex flex-col gap-2">
            <button
              className="commitment-btn"
              onClick={() => handleCommitment('schedule')}
            >
              <FaRegCalendarAlt /> {t('contact.commitment.schedule')}
            </button>
            <button
              className="commitment-btn"
              onClick={() => handleCommitment('learn')}
            >
              <FaRegHandshake /> {t('contact.commitment.learn')}
            </button>
          </div>
        </motion.div>
      )}

      {/* Social Proof Notification */}
      <AnimatePresence>
        {showSocialProof && (
          <motion.div 
            className="social-proof-notification"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            <div className="social-proof-content">
              <FaUsers className="social-proof-icon" />
              <div className="social-proof-text">
                <p className="social-proof-title">{t('contact.socialProof.notification.title')}</p>
                <p className="social-proof-message">
                  {t('contact.socialProof.notification.message', {
                    count: socialProofData.recentContacts
                  })}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback Notification */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div 
            className="feedback-notification"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <div className="feedback-content">
              <FaThumbsUp className="feedback-icon" />
              <p className="feedback-message">{feedbackMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Section - System 1: Visual Appeal */}
      <motion.section 
        id="gallery"
        className="py-16 bg-gray-50"
        initial="hidden"
        animate={activeSection === 'gallery' ? "visible" : "hidden"}
        variants={sectionVariants}
        transition={{ delay: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('contact.galleryTitle')}</h2>
            <p className="text-xl text-gray-600">{t('contact.gallerySubtitle')}</p>
          </div>
          
          <ContactBlock />
        </div>
      </motion.section>
    </div>
    );
  };
  
  export default Contact;