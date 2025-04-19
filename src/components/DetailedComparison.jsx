import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';

const DetailedComparison = () => {
  const { t } = useTranslation();
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      id: 'lessons',
      name: t('pricing.comparison.lessons'),
      description: t('pricing.comparison.lessonsDesc'),
      basic: '10',
      standard: '20',
      premium: '30'
    },
    {
      id: 'theory',
      name: t('pricing.comparison.theory'),
      description: t('pricing.comparison.theoryDesc'),
      basic: true,
      standard: true,
      premium: true
    },
    {
      id: 'practiceTests',
      name: t('pricing.comparison.practiceTests'),
      description: t('pricing.comparison.practiceTestsDesc'),
      basic: t('pricing.comparison.basic'),
      standard: t('pricing.comparison.unlimited'),
      premium: t('pricing.comparison.unlimited')
    },
    {
      id: 'support',
      name: t('pricing.comparison.support'),
      description: t('pricing.comparison.supportDesc'),
      basic: t('pricing.comparison.email'),
      standard: t('pricing.comparison.priority'),
      premium: t('pricing.comparison.support247')
    },
    {
      id: 'mockExams',
      name: t('pricing.comparison.mockExams'),
      description: t('pricing.comparison.mockExamsDesc'),
      basic: '0',
      standard: '1',
      premium: '3'
    },
    {
      id: 'instructor',
      name: t('pricing.comparison.instructor'),
      description: t('pricing.comparison.instructorDesc'),
      basic: false,
      standard: false,
      premium: true
    }
  ];

  const renderValue = (value) => {
    if (typeof value === 'boolean') {
      return value ? (
        <FaCheck className="text-green-500 text-xl" />
      ) : (
        <FaTimes className="text-red-500 text-xl" />
      );
    }
    return <span className="text-gray-900">{value}</span>;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('pricing.comparison.features')}
              </th>
              <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('pricing.basicPackage')}
              </th>
              <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('pricing.standardPackage')}
              </th>
              <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('pricing.premiumPackage')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {features.map((feature) => (
              <motion.tr
                key={feature.id}
                className={hoveredFeature === feature.id ? 'bg-gray-50' : ''}
                onHoverStart={() => setHoveredFeature(feature.id)}
                onHoverEnd={() => setHoveredFeature(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">{feature.name}</div>
                    <div className="ml-2 relative group">
                      <FaInfoCircle className="text-gray-400 cursor-pointer" />
                      <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="p-2 text-sm text-gray-600">{feature.description}</div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {renderValue(feature.basic)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {renderValue(feature.standard)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {renderValue(feature.premium)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailedComparison; 