import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaClipboardList, FaCar, FaGraduationCap, FaFileAlt } from 'react-icons/fa';

const CourseStructure = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: <FaClipboardList className="w-8 h-8" />,
      title: t('courseStructure.step1Title'),
      description: t('courseStructure.step1Desc'),
      requirements: [
        t('courseStructure.req1'),
        t('courseStructure.req2'),
        t('courseStructure.req3')
      ]
    },
    {
      icon: <FaCar className="w-8 h-8" />,
      title: t('courseStructure.step2Title'),
      description: t('courseStructure.step2Desc'),
      duration: t('courseStructure.duration1'),
      lessons: t('courseStructure.lessons1')
    },
    {
      icon: <FaGraduationCap className="w-8 h-8" />,
      title: t('courseStructure.step3Title'),
      description: t('courseStructure.step3Desc'),
      duration: t('courseStructure.duration2'),
      lessons: t('courseStructure.lessons2')
    },
    {
      icon: <FaFileAlt className="w-8 h-8" />,
      title: t('courseStructure.step4Title'),
      description: t('courseStructure.step4Desc'),
      success: t('courseStructure.successRate')
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('courseStructure.title')}</h2>
          <p className="text-xl text-gray-600">{t('courseStructure.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <div className="text-blue-600 mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                
                {step.requirements && (
                  <ul className="list-disc list-inside text-gray-600 mb-4">
                    {step.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                )}
                
                {step.duration && (
                  <div className="text-gray-600">
                    <p>{step.duration}</p>
                    <p>{step.lessons}</p>
                  </div>
                )}
                
                {step.success && (
                  <div className="text-green-600 font-semibold">
                    {step.success}
                  </div>
                )}
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 transform -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-gray-300"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors">
            {t('courseStructure.startNow')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CourseStructure; 