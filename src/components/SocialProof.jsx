import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaStar, FaUserGraduate, FaCar, FaAward } from 'react-icons/fa';

const SocialProof = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: <FaUserGraduate className="w-8 h-8" />, number: "1000+", text: t('socialProof.graduates') },
    { icon: <FaCar className="w-8 h-8" />, number: "98%", text: t('socialProof.passRate') },
    { icon: <FaAward className="w-8 h-8" />, number: "15+", text: t('socialProof.yearsExperience') },
  ];

  const testimonials = [
    {
      name: "Anna K.",
      role: t('socialProof.student'),
      text: t('socialProof.testimonial1'),
      rating: 5
    },
    {
      name: "Mihkel T.",
      role: t('socialProof.student'),
      text: t('socialProof.testimonial2'),
      rating: 5
    },
    {
      name: "Maria S.",
      role: t('socialProof.student'),
      text: t('socialProof.testimonial3'),
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('socialProof.trustedBy')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-blue-600 mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('socialProof.whatStudentsSay')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 w-5 h-5" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-gray-500">{testimonial.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('socialProof.joinSuccess')}</h3>
          <p className="text-gray-600 mb-8">{t('socialProof.startJourney')}</p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors">
            {t('socialProof.getStarted')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default SocialProof; 