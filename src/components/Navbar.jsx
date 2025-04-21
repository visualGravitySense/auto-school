import { Link } from "react-router-dom";
import { FaTelegramPlane, FaWhatsapp, FaHome, FaBook, FaCalendarAlt, FaInfoCircle, FaTag, FaEnvelope, FaUser, FaGlobe, FaChevronDown } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const { t, i18n } = useTranslation(); 
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.navbar-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [activeItem]);

  // Track scroll position
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

  // Set active item based on current path
  useEffect(() => {
    const path = window.location.pathname;
    setActiveItem(path);
  }, []);

  const handleLanguageChange = (lang) => {  
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
    setShowLanguageMenu(false);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setShowLanguageMenu(false);
  };

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
    <>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-content">
            <Link to="/" className="navbar-brand" onClick={() => setIsOpen(false)}>
              <span className="text-blue-400">Viktorija</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex navbar-menu">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`navbar-item ${activeItem === item.path ? 'active' : ''}`}
                  onClick={() => setActiveItem(item.path)}
                >
                  {item.icon} {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop Right Side */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="language-selector">
                <button
                  className="language-button"
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                >
                  <FaGlobe />
                  {i18n.language.toUpperCase()}
                  <FaChevronDown />
                </button>
                
                {showLanguageMenu && (
                  <div className="language-dropdown">
                    <button
                      className="language-option"
                      onClick={() => handleLanguageChange('en')}
                    >
                      English
                    </button>
                    <button
                      className="language-option"
                      onClick={() => handleLanguageChange('et')}
                    >
                      Eesti
                    </button>
                    <button
                      className="language-option"
                      onClick={() => handleLanguageChange('ru')}
                    >
                      Русский
                    </button>
                  </div>
                )}
              </div>

              <div className="social-links">
                <a
                  href="https://t.me/viktorijaschool"
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTelegramPlane />
                </a>
                <a
                  href="https://wa.me/37255555555"
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp />
                </a>
              </div>
              
              <Link 
                to="/contact" 
                className="navbar-cta"
              >
                {t('navbar.bookNow')}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="navbar-toggle"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {!isOpen ? (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="mobile-menu-container open">
              <div className="mobile-menu-content">
                {navItems.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className={`navbar-item ${activeItem === item.path ? 'active' : ''}`}
                    onClick={() => {
                      setActiveItem(item.path);
                      setIsOpen(false);
                    }}
                  >
                    {item.icon} {item.label}
                  </Link>
                ))}
                
                <div className="mobile-extras">
                  <div className="language-selector">
                    <button
                      className="language-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowLanguageMenu(!showLanguageMenu);
                      }}
                    >
                      <FaGlobe />
                      {i18n.language.toUpperCase()}
                      <FaChevronDown />
                    </button>
                    
                    {showLanguageMenu && (
                      <div className="language-dropdown">
                        <button
                          className="language-option"
                          onClick={() => handleLanguageChange('en')}
                        >
                          English
                        </button>
                        <button
                          className="language-option"
                          onClick={() => handleLanguageChange('et')}
                        >
                          Eesti
                        </button>
                        <button
                          className="language-option"
                          onClick={() => handleLanguageChange('ru')}
                        >
                          Русский
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="social-links">
                    <a
                      href="https://t.me/viktorijaschool"
                      className="social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTelegramPlane />
                    </a>
                    <a
                      href="https://wa.me/37255555555"
                      className="social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaWhatsapp />
                    </a>
                  </div>
                  
                  <Link 
                    to="/contact" 
                    className="navbar-cta"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('navbar.bookNow')}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* Overlay for mobile menu */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />}
    </>
  );
};

export default Navbar;
