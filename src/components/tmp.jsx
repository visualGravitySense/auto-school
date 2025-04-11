import { Link } from "react-router-dom";
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
  };

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Viktorija</Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={handleNavCollapse}
          aria-controls="navbarContent" 
          aria-expanded={!isNavCollapsed} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/">{t('navbar.home')}</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/courses">{t('navbar.courses')}</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">{t('navbar.about')}</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/price">{t('navbar.price')}</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">{t('navbar.contact')}</Link></li>
          </ul>

          <div className="d-flex align-items-center">
            <div className="language-selector me-3">
              {/* <button 
                onClick={() => handleLanguageChange('en')} 
                className="btn btn-outline-light btn-sm me-2"
                aria-label="Switch to English"
              >
                EN
              </button> */}
              <button 
                onClick={() => handleLanguageChange('et')} 
                className="btn btn-outline-light btn-sm me-2"
                aria-label="Switch to Estonian"
              >
                ET
              </button>
              <button 
                onClick={() => handleLanguageChange('ru')} 
                className="btn btn-outline-light btn-sm"
                aria-label="Switch to Russian"
              >
                RU
              </button>
            </div>
            
            <div className="social-links">
              <a href="https://t.me/viktorijaschool" className="text-primary me-2" aria-label="Telegram">
                <FaTelegramPlane size={20} />
              </a>
              <a href="https://wa.me/37255555555" className="text-success" aria-label="WhatsApp">
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
