import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCheck, FaQuestionCircle } from 'react-icons/fa';

const Decision = () => {
  const { t } = useTranslation();
  const [selectedPackage, setSelectedPackage] = useState(null);

  const packages = [
    {
      id: 'basic',
      name: t('pricing.basicPackage'),
      price: '299',
      description: t('pricing.decision.basicDesc')
    },
    {
      id: 'standard',
      name: t('pricing.standardPackage'),
      price: '499',
      description: t('pricing.decision.standardDesc')
    },
    {
      id: 'premium',
      name: t('pricing.premiumPackage'),
      price: '799',
      description: t('pricing.decision.premiumDesc')
    }
  ];

  const handlePackageSelect = (packageId) => {
    setSelectedPackage(packageId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {t('pricing.decision.title')}
        </h2>
        <p className="text-xl text-gray-600">
          {t('pricing.decision.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {packages.map((pkg) => (
          <motion.div
            key={pkg.id}
            className={`relative rounded-lg p-6 cursor-pointer transition-all duration-300 ${
              selectedPackage === pkg.id
                ? 'bg-blue-50 border-2 border-blue-500'
                : 'bg-white border border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => handlePackageSelect(pkg.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.name}</h3>
              <div className="text-3xl font-bold text-gray-900 mb-4">${pkg.price}</div>
              <p className="text-gray-600 mb-4">{pkg.description}</p>
              {selectedPackage === pkg.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 right-4"
                >
                  <FaCheck className="text-green-500 text-xl" />
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        {selectedPackage ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <p className="text-xl text-gray-900">
              {t('pricing.decision.selected', { package: packages.find(p => p.id === selectedPackage)?.name })}
            </p>
            <motion.button
              className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium flex items-center justify-center mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/contact'}
            >
              <span>{t('pricing.decision.proceed')}</span>
              <FaArrowRight className="ml-2" />
            </motion.button>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <FaQuestionCircle />
            <span>{t('pricing.decision.selectPackage')}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Decision; 