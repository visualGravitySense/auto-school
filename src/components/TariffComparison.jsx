import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaCheck, FaTimes, FaArrowRight, FaStar, FaInfoCircle, FaQuestionCircle } from 'react-icons/fa';
import "./AntiDesignTable.css";

const TariffComparison = () => {
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(null);
  const [showCTA, setShowCTA] = useState(false);

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

  // Plans for System 1 & 2 integration
  const plans = [
    {
      id: 'basic',
      name: t("tariff.basic"),
      price: "250€",
      color: "blue",
      features: [
        { name: t("tariff.lessons"), value: "10", included: true },
        { name: t("tariff.onlineTheory"), value: "", included: false },
        { name: t("tariff.individualInstructor"), value: "", included: false },
        { name: t("tariff.examGibdd"), value: "", included: true }
      ],
      description: t("tariff.basicDescription"),
      popular: false
    },
    {
      id: 'optimal',
      name: t("tariff.optimal"),
      price: "400€",
      color: "green",
      features: [
        { name: t("tariff.lessons"), value: "15", included: true },
        { name: t("tariff.onlineTheory"), value: "", included: true },
        { name: t("tariff.individualInstructor"), value: "", included: false },
        { name: t("tariff.examGibdd"), value: "", included: true }
      ],
      description: t("tariff.optimalDescription"),
      popular: true
    },
    {
      id: 'premium',
      name: t("tariff.premium"),
      price: "600€",
      color: "purple",
      features: [
        { name: t("tariff.lessons"), value: "20", included: true },
        { name: t("tariff.onlineTheory"), value: "", included: true },
        { name: t("tariff.individualInstructor"), value: "", included: true },
        { name: t("tariff.examGibdd"), value: "", included: true }
      ],
      description: t("tariff.premiumDescription"),
      popular: false
    }
  ];

  // Benefits for System 1 & 2 integration
  const benefits = [
    {
      icon: <FaStar className="text-yellow-500" />,
      title: t("tariff.benefit1Title"),
      description: t("tariff.benefit1Description")
    },
    {
      icon: <FaInfoCircle className="text-blue-500" />,
      title: t("tariff.benefit2Title"),
      description: t("tariff.benefit2Description")
    },
    {
      icon: <FaQuestionCircle className="text-green-500" />,
      title: t("tariff.benefit3Title"),
      description: t("tariff.benefit3Description")
    }
  ];

  return (
    <section 
      id="tariff-comparison" 
      className={`py-16 bg-gray-900 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">{t("tariff.title")}</h2>
          <p className="text-xl text-gray-300">{t("tariff.subtitle")}</p>
        </div>

        {/* Plans comparison - System 1 & 2 integration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 ${
                selectedPlan === plan.id 
                  ? `ring-2 ring-${plan.color}-500 transform scale-105` 
                  : 'hover:shadow-lg'
              } ${plan.popular ? 'relative' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 text-sm font-semibold rounded-tl-lg">
                  {t("tariff.popular")}
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-white mb-4">{plan.price}</div>
                <p className="text-gray-300 mb-6">{plan.description}</p>
                
                <ul className="space-y-4 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      {feature.included ? (
                        <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      ) : (
                        <FaTimes className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                      )}
                      <div>
                        <span className="text-white">{feature.name}</span>
                        {feature.value && (
                          <span className="text-gray-300 ml-1">({feature.value})</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`w-full py-3 px-4 rounded-md font-semibold text-white transition-colors ${
                    selectedPlan === plan.id 
                      ? `bg-${plan.color}-600 hover:bg-${plan.color}-700` 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {t("tariff.selectPlan")}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits - System 1 & 2 integration */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-md mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">{t("tariff.benefitsTitle")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:scale-105"
              >
                <div className="text-3xl mb-4">
                  {benefit.icon}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{benefit.title}</h4>
                <p className="text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ - System 2: Deliberate thinking */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-md mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">{t("tariff.faqTitle")}</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div 
                key={item}
                className="bg-gray-700 p-4 rounded-lg"
                onMouseEnter={() => setShowTooltip(item)}
                onMouseLeave={() => setShowTooltip(null)}
              >
                <h4 className="text-lg font-semibold text-white mb-2">{t(`tariff.faq${item}Question`)}</h4>
                <p className="text-gray-300">{t(`tariff.faq${item}Answer`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA - Action Funnel */}
        <div className="text-center">
          <button 
            className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors shadow-lg transform hover:scale-105 flex items-center mx-auto"
            onClick={() => window.location.href = '/contact'}
          >
            {t("tariff.cta")} <FaArrowRight className="ml-2" />
          </button>
        </div>

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
