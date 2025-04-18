import { Link } from "react-router-dom";
import { FaTelegramPlane, FaWhatsapp, FaHome, FaBook, FaCalendarAlt, FaInfoCircle, FaTag, FaEnvelope, FaUser, FaGlobe, FaChevronDown } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { t, i18n } = useTranslation(); 
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  // Track scroll position for visual feedback (System 1)
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Set active item based on current path (System 2)
  useEffect(() => {
    const path = window.location.pathname;
    setActiveItem(path);
  }, []);

  // Handle language change (System 2)
  const handleLanguageChange = (lang) => {  
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
    setShowLanguageMenu(false);
  };

  // Toggle mobile menu (System 1)
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Navigation items with icons for visual recognition (System 1)
  const navItems = [
    { path: '/', icon: <FaHome className="mr-2" />, label: t('navbar.home') },
    { path: '/courses', icon: <FaBook className="mr-2" />, label: t('navbar.courses') },
    { path: '/schedule', icon: <FaCalendarAlt className="mr-2" />, label: t('navbar.schedule') },
    { path: '/about', icon: <FaInfoCircle className="mr-2" />, label: t('navbar.about') },
    { path: '/price', icon: <FaTag className="mr-2" />, label: t('navbar.price') },
    { path: '/contact', icon: <FaEnvelope className="mr-2" />, label: t('navbar.contact') },
    { path: '/profile', icon: <FaUser className="mr-2" />, label: t('navbar.profile') }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-900 shadow-lg' : 'bg-gray-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - System 1: Visual recognition */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-xl font-bold flex items-center transform hover:scale-105 transition-transform">
              <span className="text-blue-400">Viktorija</span>
            </Link>
          </div>

          {/* Desktop menu - System 2: Deliberate navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-200 ${
                    activeItem === item.path 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveItem(item.path)}
                >
                  {item.icon} {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side buttons - System 1 & 2 integration */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language selector - System 2: Deliberate choice */}
            <div className="relative">
              <button
                className="bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white flex items-center"
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              >
                <FaGlobe className="mr-2" />
                {i18n.language.toUpperCase()}
                <FaChevronDown className="ml-2" />
              </button>
              
              {/* Language dropdown - System 2 */}
              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleLanguageChange('en')}
                    >
                      English
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleLanguageChange('et')}
                    >
                      Eesti
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleLanguageChange('ru')}
                    >
                      Русский
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Social links - System 1: Quick access to familiar platforms */}
            <div className="flex space-x-4">
              <a
                href="https://t.me/viktorijaschool"
                className="text-gray-300 hover:text-white transform hover:scale-110 transition-transform"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <FaTelegramPlane className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/37255555555"
                className="text-gray-300 hover:text-white transform hover:scale-110 transition-transform"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="h-5 w-5" />
              </a>
            </div>
            
            {/* CTA Button - Action Funnel: Clear path to conversion */}
            <Link 
              to="/contact" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-md transform hover:scale-105"
            >
              {t('navbar.bookNow')}
            </Link>
          </div>

          {/* Mobile menu button - System 1: Intuitive access */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - System 1 & 2 integration */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden transition-all duration-300 ease-in-out`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 shadow-lg">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                activeItem === item.path 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
              onClick={() => {
                setActiveItem(item.path);
                setIsOpen(false);
              }}
            >
              {item.icon} {item.label}
            </Link>
          ))}
          
          {/* Mobile language selector - System 2 */}
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5 space-x-3">
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  i18n.language === 'en' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => handleLanguageChange('en')}
              >
                EN
              </button>
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  i18n.language === 'et' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => handleLanguageChange('et')}
              >
                ET
              </button>
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  i18n.language === 'ru' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => handleLanguageChange('ru')}
              >
                RU
              </button>
            </div>
          </div>

          {/* Mobile social links - System 1 */}
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5 space-x-4">
              <a
                href="https://t.me/viktorijaschool"
                className="text-gray-300 hover:text-white transform hover:scale-110 transition-transform"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <FaTelegramPlane className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/37255555555"
                className="text-gray-300 hover:text-white transform hover:scale-110 transition-transform"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Mobile CTA - Action Funnel */}
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="px-5">
              <Link 
                to="/contact" 
                className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-md"
                onClick={() => setIsOpen(false)}
              >
                {t('navbar.bookNow')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
