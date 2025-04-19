import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaArrowRight, FaCheck, FaInfoCircle } from 'react-icons/fa';
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