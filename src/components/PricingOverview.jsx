import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaCheck, FaStar, FaArrowRight } from 'react-icons/fa';

const PricingOverview = () => {
  const { t } = useTranslation();
  const [hoveredPackage, setHoveredPackage] = useState(null);

  const packages = [
    {
      id: 'basic',
      name: t('pricing.basicPackage'),
      price: '299',
      period: t('pricing.month'),
      features: [
        t('pricing.features.lessons', { count: 10 }),
        t('pricing.features.theory'),
        t('pricing.features.basicTests'),
        t('pricing.features.emailSupport')
      ],
      cta: t('pricing.getStarted'),
      popular: false
    },
    {
      id: 'standard',
      name: t('pricing.standardPackage'),
      price: '499',
      period: t('pricing.month'),
      features: [
        t('pricing.features.lessons', { count: 20 }),
        t('pricing.features.theory'),
        t('pricing.features.unlimitedTests'),
        t('pricing.features.prioritySupport'),
        t('pricing.features.mockExam', { count: 1 })
      ],
      cta: t('pricing.bestValue'),
      popular: true
    },
    {
      id: 'premium',
      name: t('pricing.premiumPackage'),
      price: '799',
      period: t('pricing.month'),
      features: [
        t('pricing.features.lessons', { count: 30 }),
        t('pricing.features.theory'),
        t('pricing.features.unlimitedTests'),
        t('pricing.features.support247'),
        t('pricing.features.mockExam', { count: 3 }),
        t('pricing.features.personalInstructor')
      ],
      cta: t('pricing.getPremium'),
      popular: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <motion.div
            key={pkg.id}
            className={`relative rounded-lg shadow-lg overflow-hidden ${
              pkg.popular ? 'border-2 border-blue-500 transform scale-105' : 'border border-gray-200'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onHoverStart={() => setHoveredPackage(pkg.id)}
            onHoverEnd={() => setHoveredPackage(null)}
          >
            {pkg.popular && (
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-tl-lg rounded-bl-lg flex items-center">
                <FaStar className="mr-1" />
                <span>{t('pricing.popular')}</span>
              </div>
            )}
            
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-extrabold text-gray-900">${pkg.price}</span>
                <span className="ml-1 text-gray-500">/{pkg.period}</span>
              </div>
              
              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <motion.button
                className={`w-full py-3 px-4 rounded-md font-medium flex items-center justify-center ${
                  pkg.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{pkg.cta}</span>
                <FaArrowRight className="ml-2" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PricingOverview; 