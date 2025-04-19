import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { useTranslation } from 'react-i18next';
import { FaGift, FaEuroSign, FaCheck, FaArrowRight, FaStar, FaRegSmile, FaRegHeart, FaRegLightbulb } from 'react-icons/fa';

const GiftCard = () => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState(500);
  const [isLoading, setIsLoading] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [showPreview, setShowPreview] = useState(false);

  // Track visibility for animation (System 1)
  useEffect(() => {
    const handleScroll = () => {
      const giftCard = document.getElementById('gift-card');
      if (giftCard) {
        const rect = giftCard.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
        setIsVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Predefined amounts for System 1: Quick selection
  const predefinedAmounts = [
    { value: 250, label: "250€" },
    { value: 500, label: "500€" },
    { value: 1000, label: "1000€" }
  ];

  // Benefits for System 1 & 2 integration
  const benefits = [
    {
      icon: <FaRegSmile className="text-yellow-500" />,
      title: t('gift.benefit1Title'),
      description: t('gift.benefit1Description')
    },
    {
      icon: <FaRegHeart className="text-red-500" />,
      title: t('gift.benefit2Title'),
      description: t('gift.benefit2Description')
    },
    {
      icon: <FaRegLightbulb className="text-blue-500" />,
      title: t('gift.benefit3Title'),
      description: t('gift.benefit3Description')
    }
  ];

  const handlePayment = async () => {
    if (!amount || amount <= 0) {
      alert("Enter correct amount");
      return;
    }

    setIsLoading(true);

    try {
      // 1️⃣ create payment in Firestore
      const paymentRef = await addDoc(collection(db, "payments"), {
        amount: parseFloat(amount),
        currency: "EUR",
        status: "paid",
        createdAt: serverTimestamp(),
      });

      // 2️⃣ create invoice data in Firestore
      const invoiceRef = await addDoc(collection(db, "invoices"), {
        paymentId: paymentRef.id,
        amount: parseFloat(amount),
        currency: "EUR",
        issuedAt: serverTimestamp(),
      });

      // 3️⃣ Receive invoice data and refresh UI
      const invoiceDoc = await getDoc(doc(db, "invoices", invoiceRef.id));
      setInvoice({ id: invoiceDoc.id, ...invoiceDoc.data() });
      setShowSuccess(true);

      // Reset amount after successful payment
      setAmount("500");
    } catch (error) {
      console.error("Error with payment creation:", error);
      alert("Error with payment processing")
    }

    setIsLoading(false);
  };

  return (
    <section 
      id="gift-card" 
      className={`py-16 bg-gradient-to-b from-purple-50 to-white transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-purple-100 p-3 rounded-full mb-4">
            <FaGift className="text-purple-600 text-4xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('gift.bestGift')}</h2>
          <p className="text-xl text-gray-600">{t('gift.forFriends')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Gift Card Form - System 1 & 2 integration */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('gift.chooseAmount')}</h3>
            
            {/* Predefined amounts - System 1: Quick selection */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {predefinedAmounts.map((item) => (
                <button
                  key={item.value}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    selectedAmount === item.value
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => {
                    setSelectedAmount(item.value);
                    setAmount(item.value);
                  }}
                >
                  <div className="text-xl font-bold">{item.label}</div>
                </button>
              ))}
            </div>
            
            {/* Custom amount - System 2: Deliberate choice */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">{t('gift.customAmount')}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEuroSign className="text-gray-400" />
                </div>
                <input 
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10 w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                  placeholder="Enter amount"
                />
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mb-6">{t('gift.enterDetails')}</p>
            
            <button 
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 transform hover:scale-105'
              }`}
              onClick={handlePayment}
              disabled={isLoading}
            >
              {isLoading ? t('gift.createPayment') : t('gift.buyGiftCard')}
            </button>
            
            {/* Success message - System 1: Positive feedback */}
            {showSuccess && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <FaCheck className="text-green-500 mr-2" />
                <span className="text-green-700">{t('gift.paymentSuccess')}</span>
              </div>
            )}
          </div>
          
          {/* Preview - System 1 & 2 integration */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('gift.certificatePreview')}</h3>
            
            <div 
              className={`bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-lg border-2 border-purple-200 transition-all duration-500 ${
                showPreview ? 'opacity-100' : 'opacity-50'
              }`}
              onMouseEnter={() => setShowPreview(true)}
              onMouseLeave={() => setShowPreview(false)}
            >
              <div className="text-center mb-4">
                <FaGift className="text-purple-600 text-4xl mx-auto mb-2" />
                <h4 className="text-xl font-bold text-gray-900">{t('gift.giftCertificate')}</h4>
              </div>
              
              <div className="border-t border-purple-200 pt-4 mb-4">
                <p className="text-gray-700 mb-2">{t('gift.amount')}: <span className="font-bold">{amount}€</span></p>
                <p className="text-gray-700 mb-2">{t('gift.validUntil')}: <span className="font-bold">{new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span></p>
              </div>
              
              <div className="text-center text-gray-600 italic">
                {t('gift.certificatePreviewDescription')}
              </div>
            </div>
            
            {/* Invoice - System 2: Deliberate information */}
            {invoice && (
              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">{t('gift.invoice')} #{invoice.id}</h4>
                <p className="text-gray-700 mb-1">{t('gift.amount')}: {invoice.amount} {invoice.currency}</p>
                <p className="text-gray-700">{t('gift.date')}: {new Date(invoice.issuedAt.toDate()).toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Benefits - System 1 & 2 integration */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t('gift.benefitsTitle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:scale-105"
              >
                <div className="text-3xl mb-4">
                  {benefit.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Student Reviews - System 1: Social proof */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">{t('gift.studentReviews')}</h3>
          <div className="flex justify-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <FaStar className="text-yellow-500" />
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <FaStar className="text-yellow-500" />
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <FaStar className="text-yellow-500" />
            </div>
          </div>
        </div>
        
        {/* CTA - Action Funnel */}
        <div className="text-center mt-12">
          <button 
            className="bg-purple-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-purple-700 transition-colors shadow-lg transform hover:scale-105 flex items-center mx-auto"
            onClick={() => window.location.href = '/contact'}
          >
            {t('gift.cta')} <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default GiftCard;
