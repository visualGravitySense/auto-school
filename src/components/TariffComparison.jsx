import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaCheck, FaTimes, FaArrowRight, FaStar, FaInfoCircle, FaQuestionCircle } from 'react-icons/fa';
import "./AntiDesignTable.css";
import { motion } from 'framer-motion';
import { Table, Button, Badge, Tooltip, OverlayTrigger } from 'react-bootstrap';

// Comparison data with detailed features
const comparisonData = {
    features: [
        { id: 'lessons', name: 'Driving Lessons', description: 'Number of practical driving lessons included' },
        { id: 'theory', name: 'Theory Materials', description: 'Access to online theory materials and resources' },
        { id: 'tests', name: 'Practice Tests', description: 'Access to practice tests and mock exams' },
        { id: 'support', name: 'Support', description: 'Level of customer support provided' },
        { id: 'mock_exams', name: 'Mock Exams', description: 'Number of mock exams included' },
        { id: 'instructor', name: 'Personal Instructor', description: 'Dedicated personal instructor' }
    ],
    packages: [
        {
            id: 'basic',
            name: 'Basic Package',
            color: '#4a90e2',
            features: {
                lessons: '10',
                theory: true,
                tests: 'Basic',
                support: 'Email',
                mock_exams: '0',
                instructor: false
            }
        },
        {
            id: 'standard',
            name: 'Standard Package',
            color: '#50c878',
            features: {
                lessons: '20',
                theory: true,
                tests: 'Unlimited',
                support: 'Priority',
                mock_exams: '1',
                instructor: false
            }
        },
        {
            id: 'premium',
            name: 'Premium Package',
            color: '#9b59b6',
            features: {
                lessons: '30',
                theory: true,
                tests: 'Unlimited',
                support: '24/7',
                mock_exams: '3',
                instructor: true
            }
        }
    ]
};

const TariffComparison = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [showFeatureInfo, setShowFeatureInfo] = useState(false);
  const [featureInfo, setFeatureInfo] = useState('');

  // Track visibility for animation (System 1)
  useEffect(() => {
    const handleScroll = () => {
      const comparison = document.getElementById('tariff-comparison');
      if (comparison) {
        const rect = comparison.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
        setIsVisible(isVisible);
        
        // Show CTA when scrolled to the bottom of the section
        const bottom = rect.bottom;
        setShowCTA(bottom < window.innerHeight + 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle feature hover (System 1 - Intuitive)
  const handleFeatureHover = (feature) => {
    setHoveredFeature(feature.id);
    setFeatureInfo(feature.description);
    setShowFeatureInfo(true);
  };

  // Handle feature leave (System 1 - Intuitive)
  const handleFeatureLeave = () => {
    setHoveredFeature(null);
    setShowFeatureInfo(false);
  };

  // Render feature value with appropriate icon
  const renderFeatureValue = (value, packageId) => {
    if (typeof value === 'boolean') {
      return value ? (
        <FaCheck className="feature-icon check" style={{ color: comparisonData.packages.find(p => p.id === packageId)?.color }} />
      ) : (
        <FaTimes className="feature-icon times" />
      );
    }
    return <span className="feature-value">{value}</span>;
  };

  return (
    <section 
      id="tariff-comparison" 
      className={`py-16 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-black mb-4">{t("tariff.title")}</h2>
          <p className="text-xl text-gray-500">{t("tariff.subtitle")}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="comparison-container"
        >
          <Table responsive className="comparison-table">
          <thead>
              <tr>
                <th className="feature-column">Features</th>
                {comparisonData.packages.map((package_, index) => (
                  <motion.th 
                    key={package_.id}
                    className="package-column"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{ 
                      backgroundColor: package_.color,
                      color: 'white'
                    }}
                  >
                    <div className="package-header">
                      <h3>{package_.name}</h3>
                      {package_.id === 'standard' && (
                        <Badge bg="warning" className="popular-badge">
                          <FaStar /> Best Value
                        </Badge>
                      )}
                    </div>
                  </motion.th>
                ))}
            </tr>
          </thead>
          <tbody>
              {comparisonData.features.map((feature, index) => (
                <motion.tr 
                  key={feature.id}
                  className={hoveredFeature === feature.id ? 'hovered' : ''}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onMouseEnter={() => handleFeatureHover(feature)}
                  onMouseLeave={handleFeatureLeave}
                >
                  <td className="feature-name">
                    <div className="feature-name-container">
                      <span>{feature.name}</span>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id={`tooltip-${feature.id}`}>
                            {feature.description}
                          </Tooltip>
                        }
                      >
                        <FaInfoCircle className="info-icon" />
                      </OverlayTrigger>
                    </div>
              </td>
                  {comparisonData.packages.map((package_) => (
                    <td 
                      key={`${feature.id}-${package_.id}`}
                      className="feature-value-cell"
                      style={{ 
                        borderColor: package_.color,
                        backgroundColor: hoveredFeature === feature.id ? `${package_.color}10` : 'transparent'
                      }}
                    >
                      {renderFeatureValue(package_.features[feature.id], package_.id)}
              </td>
                  ))}
                </motion.tr>
              ))}
          </tbody>
          </Table>

          {/* Feature information tooltip */}
          {showFeatureInfo && (
            <motion.div 
              className="feature-info-tooltip"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <div className="tooltip-content">
                <FaQuestionCircle className="tooltip-icon" />
                <span>{featureInfo}</span>
              </div>
            </motion.div>
          )}

          {/* Call to action */}
          <motion.div 
            className="comparison-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3>{t('tariff.readyToChoose')}</h3>
            <p>{t('tariff.selectBestFit')}</p>
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {t('tariff.viewPackagesAgain')}
            </Button>
          </motion.div>
        </motion.div>

        {/* Sticky CTA - System 1: Persistent trigger */}
        {showCTA && (
          <div className="fixed bottom-4 right-4 z-50">
            <a 
              href="/contact" 
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors shadow-lg flex items-center transform hover:scale-105"
            >
              <span>{t("tariff.stickyCta")}</span>
              <FaArrowRight className="ml-2" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default TariffComparison;
