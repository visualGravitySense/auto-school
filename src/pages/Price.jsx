import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import TariffComparison from '../components/TariffComparison';
import PricingOverview from '../components/PricingOverview';
import DetailedComparison from '../components/DetailedComparison';
import Decision from '../components/Decision';

const Price = () => {
  const { t } = useTranslation();
  const [currentSection, setCurrentSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'comparison', 'decision'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - System 1: Initial Impression */}
      <motion.section 
        className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {t('pricing.choosePath')}
            </motion.h1>
            <motion.p 
              className="text-xl mb-8"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {t('pricing.selectPackage')}
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Pricing Overview - System 2: Initial Analysis */}
      <motion.section 
        id="overview"
        className="py-16"
        initial="hidden"
        animate={currentSection === 'overview' ? "visible" : "hidden"}
        variants={sectionVariants}
        transition={{ delay: 0.4 }}
      >
        <PricingOverview />
      </motion.section>

      {/* Detailed Comparison - System 2: Deep Analysis */}
      <motion.section 
        id="comparison"
        className="py-16 bg-gray-100"
        initial="hidden"
        animate={currentSection === 'comparison' ? "visible" : "hidden"}
        variants={sectionVariants}
        transition={{ delay: 0.5 }}
      >
        <DetailedComparison />
      </motion.section>

      {/* Decision Section - Integration of Both Systems */}
      <motion.section 
        id="decision"
        className="py-16"
        initial="hidden"
        animate={currentSection === 'decision' ? "visible" : "hidden"}
        variants={sectionVariants}
        transition={{ delay: 0.6 }}
      >
        <Decision />
      </motion.section>
    </div>
  );
};

export default Price;