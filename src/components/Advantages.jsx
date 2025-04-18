import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { FaArrowRight, FaCheck, FaStar, FaClock, FaGraduationCap, FaUsers, FaCar, FaCertificate, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Advantages = () => {
  const { t } = useTranslation();
  const [activeAdvantage, setActiveAdvantage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  // Track visibility for animation (System 1)
  useEffect(() => {
    const handleScroll = () => {
      const advantages = document.getElementById('advantages-section');
      if (advantages) {
        const rect = advantages.getBoundingClientRect();
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

  // Auto-advance advantages (System 1)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAdvantage(prev => (prev + 1) % advantages.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  // Advantages for System 1 & 2 integration
  const advantages = [
    {
      icon: <FaGraduationCap className="text-blue-500" />,
      title: t("advantages.experience.title"),
      description: t("advantages.experience.description"),
      color: "blue"
    },
    {
      icon: <FaCar className="text-green-500" />,
      title: t("advantages.flexibility.title"),
      description: t("advantages.flexibility.description"),
      color: "green"
    },
    {
      icon: <FaUsers className="text-yellow-500" />,
      title: t("advantages.instructors.title"),
      description: t("advantages.instructors.description"),
      color: "yellow"
    },
    {
      icon: <FaCertificate className="text-purple-500" />,
      title: t("advantages.success.title"),
      description: t("advantages.success.description"),
      color: "purple"
    }
  ];

  // Contact methods for System 1 & 2 integration
  const contactMethods = [
    {
      icon: <FaPhoneAlt className="text-blue-500" />,
      title: t("advantages.contact.phone.title"),
      value: t("advantages.contact.phone.value"),
      action: t("advantages.contact.phone.action"),
      link: "tel:+1234567890"
    },
    {
      icon: <FaEnvelope className="text-green-500" />,
      title: t("advantages.contact.email.title"),
      value: t("advantages.contact.email.value"),
      action: t("advantages.contact.email.action"),
      link: "mailto:info@drivingschool.com"
    },
    {
      icon: <FaMapMarkerAlt className="text-yellow-500" />,
      title: t("advantages.contact.location.title"),
      value: t("advantages.contact.location.value"),
      action: t("advantages.contact.location.action"),
      link: "https://maps.google.com"
    }
  ];

  return (
    <section 
      id="advantages-section" 
      className={`py-16 bg-gray-50 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("advantages.title")}</h2>
          <p className="text-xl text-gray-600">{t("advantages.subtitle")}</p>
        </div>

        {/* Advantages grid - System 1 & 2 integration */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {advantages.map((adv, index) => (
            <div 
              key={index} 
              className={`bg-white p-6 rounded-lg shadow-md transition-all duration-300 ${
                activeAdvantage === index 
                  ? `ring-2 ring-${adv.color}-500 transform scale-105` 
                  : 'hover:shadow-lg'
              }`}
              onMouseEnter={() => setActiveAdvantage(index)}
            >
              <div className={`text-${adv.color}-500 mb-4 text-3xl`}>
                {adv.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{adv.title}</h3>
              <p className="text-gray-600">{adv.description}</p>
            </div>
          ))}
        </div>

        {/* Contact methods - System 1 & 2 integration */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t("advantages.contact.title")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <a 
                key={index}
                href={method.link}
                className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors duration-300"
              >
                <div className="text-2xl mr-4">
                  {method.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{method.title}</h4>
                  <p className="text-gray-600">{method.value}</p>
                  <span className="text-blue-600 text-sm flex items-center mt-1">
                    {method.action} <FaArrowRight className="ml-1 text-xs" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* CTA - Action Funnel */}
        <div className="text-center">
          <button 
            className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors shadow-lg transform hover:scale-105 flex items-center mx-auto"
            onClick={() => window.location.href = '/contact'}
          >
            {t("advantages.cta")} <FaArrowRight className="ml-2" />
          </button>
        </div>

        {/* Sticky CTA - System 1: Persistent trigger */}
        {showCTA && (
          <div className="fixed bottom-4 right-4 z-50">
            <a 
              href="/contact" 
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors shadow-lg flex items-center transform hover:scale-105"
            >
              <span>{t("advantages.stickyCta")}</span>
              <FaArrowRight className="ml-2" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Advantages;