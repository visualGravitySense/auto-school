import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaClipboardList, FaCar, FaGraduationCap, FaFileAlt, FaArrowRight, FaCheck, FaClock, FaUserFriends, FaChartLine } from 'react-icons/fa';

const CourseStructure = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  // Track visibility for animation (System 1)
  useEffect(() => {
    const handleScroll = () => {
      const courseStructure = document.getElementById('course-structure');
      if (courseStructure) {
        const rect = courseStructure.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
        setIsVisible(isVisible);
        
        // Show progress indicator when scrolled past the title
        const title = document.getElementById('course-structure-title');
        if (title) {
          const titleRect = title.getBoundingClientRect();
          setShowProgress(titleRect.bottom < 0);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-advance steps (System 1)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Steps for System 1 & 2 integration
  const steps = [
    {
      icon: <FaClipboardList className="w-8 h-8" />,
      title: t('courseStructure.step1Title'),
      description: t('courseStructure.step1Desc'),
      requirements: [
        t('courseStructure.req1'),
        t('courseStructure.req2'),
        t('courseStructure.req3')
      ],
      color: 'blue'
    },
    {
      icon: <FaCar className="w-8 h-8" />,
      title: t('courseStructure.step2Title'),
      description: t('courseStructure.step2Desc'),
      duration: t('courseStructure.duration1'),
      lessons: t('courseStructure.lessons1'),
      color: 'green'
    },
    {
      icon: <FaGraduationCap className="w-8 h-8" />,
      title: t('courseStructure.step3Title'),
      description: t('courseStructure.step3Desc'),
      duration: t('courseStructure.duration2'),
      lessons: t('courseStructure.lessons2'),
      color: 'yellow'
    },
    {
      icon: <FaFileAlt className="w-8 h-8" />,
      title: t('courseStructure.step4Title'),
      description: t('courseStructure.step4Desc'),
      success: t('courseStructure.successRate'),
      color: 'purple'
    }
  ];

  // Benefits for System 1 & 2 integration
  const benefits = [
    {
      icon: <FaClock className="w-6 h-6" />,
      title: t('courseStructure.benefit1Title'),
      description: t('courseStructure.benefit1Desc')
    },
    {
      icon: <FaUserFriends className="w-6 h-6" />,
      title: t('courseStructure.benefit2Title'),
      description: t('courseStructure.benefit2Desc')
    },
    {
      icon: <FaChartLine className="w-6 h-6" />,
      title: t('courseStructure.benefit3Title'),
      description: t('courseStructure.benefit3Desc')
    }
  ];

  return (
    <section 
      id="course-structure" 
      className={`py-16 bg-white transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          id="course-structure-title"
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('courseStructure.title')}</h2>
          <p className="text-xl text-gray-600">{t('courseStructure.subtitle')}</p>
        </div>

        {/* Progress indicator - System 1: Visual feedback */}
        {showProgress && (
          <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
            <div className="flex flex-col space-y-2">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    activeStep === index 
                      ? `bg-${step.color}-600 scale-125` 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setActiveStep(index)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Course steps - System 1 & 2 integration */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative"
              onMouseEnter={() => setActiveStep(index)}
            >
              <div 
                className={`bg-white p-6 rounded-lg shadow-md h-full transition-all duration-300 ${
                  activeStep === index 
                    ? `ring-2 ring-${step.color}-500 transform scale-105` 
                    : 'hover:shadow-lg'
                }`}
              >
                <div className={`text-${step.color}-600 mb-4`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                
                {step.requirements && (
                  <ul className="list-disc list-inside text-gray-600 mb-4">
                    {step.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {step.duration && (
                  <div className="text-gray-600 flex items-center mb-2">
                    <FaClock className="text-blue-500 mr-2" />
                    <span>{step.duration}</span>
                  </div>
                )}
                
                {step.lessons && (
                  <div className="text-gray-600 flex items-center mb-2">
                    <FaUserFriends className="text-blue-500 mr-2" />
                    <span>{step.lessons}</span>
                  </div>
                )}
                
                {step.success && (
                  <div className="text-green-600 font-semibold flex items-center">
                    <FaChartLine className="mr-2" />
                    <span>{step.success}</span>
                  </div>
                )}
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 transform -translate-y-1/2">
                  <div className={`w-8 h-0.5 bg-${steps[index + 1].color}-300`}></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Benefits - System 1 & 2 integration */}
        <div className="mt-16 bg-gray-50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t('courseStructure.benefitsTitle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:scale-105"
              >
                <div className="text-blue-500 mb-4">
                  {benefit.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA - Action Funnel */}
        <div className="text-center mt-12">
          <button 
            className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors shadow-lg transform hover:scale-105 flex items-center mx-auto"
            onClick={() => window.location.href = '/contact'}
          >
            {t('courseStructure.startNow')} <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CourseStructure; 