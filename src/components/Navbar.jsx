// import { Link } from "react-router-dom";
// import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
// import { useTranslation } from 'react-i18next';

// const Navbar = () => {
//   const { t, i18n } = useTranslation(); 
//   // const { t } = useTranslation();

//   // const handleLanguageChange = (lang) => {  
//   //   i18n.changeLanguage(lang);  // This changes the language
//   //   localStorage.setItem("i18nextLng", lang); // Сохраняем язык
//   // };

//   const handleLanguageChange = (lang) => {  
//     console.log("Меняем язык на:", lang); // ✅ Проверка в консоли
//     i18n.changeLanguage(lang);
//     localStorage.setItem("i18nextLng", lang);
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      
//       <div className="container">
//         <Link className="navbar-brand" to="/">Viktorija</Link>
//         <div className="collapse navbar-collapse">
//           {/* <a href="/">{t("navbar.home")}</a> */}
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item"><Link className="nav-link" to="/">{t('navbar.home')}</Link></li>
//             <li className="nav-item"><Link className="nav-link" to="/courses">{t('navbar.courses')}</Link></li>
//             <li className="nav-item"><Link className="nav-link" to="/about">{t('navbar.about')}</Link></li>
//             <li className="nav-item"><Link className="nav-link" to="/price">{t('navbar.price')}</Link></li>
//             <li className="nav-item"><Link className="nav-link" to="/contact">{t('navbar.contact')}</Link></li>
//           </ul>

//           {/* Переключение языков */}
//           <button onClick={() => handleLanguageChange('en')}>ee</button>
//           <button onClick={() => handleLanguageChange('et')}>ru</button>
//           {/* <button onClick={() => handleLanguageChange('ru')}>ru</button> */}
//           {/* <button onClick={() => i18n.changeLanguage('et')} className="btn btn-outline-light mx-2">EE</button>
//           <button onClick={() => i18n.changeLanguage('ru')} className="btn btn-outline-light">RU</button> */}
//         </div>

//         <div>
//           <a href="https://t.me/yourtelegram" className="text-primary" aria-label="Telegram">
//             <FaTelegramPlane size={20} />
//           </a>
//           <a href="https://wa.me/yourwhatsapp" className="text-success mx-3" aria-label="WhatsApp">
//             <FaWhatsapp size={20} />
//           </a>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { Link } from "react-router-dom";
import { FaTelegramPlane, FaWhatsapp, FaHome, FaBook, FaCalendarAlt, FaInfoCircle, FaTag, FaEnvelope, FaUser } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-xl font-bold">
              Viktorija
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <FaHome className="mr-2" /> {t('navbar.home')}
              </Link>
              <Link to="/courses" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <FaBook className="mr-2" /> {t('navbar.courses')}
              </Link>
              <Link to="/schedule" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <FaCalendarAlt className="mr-2" /> {t('navbar.schedule')}
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <FaInfoCircle className="mr-2" /> {t('navbar.about')}
              </Link>
              <Link to="/price" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <FaTag className="mr-2" /> {t('navbar.price')}
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <FaEnvelope className="mr-2" /> {t('navbar.contact')}
              </Link>
              <Link to="/profile" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <FaUser className="mr-2" /> {t('navbar.profile')}
              </Link>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language selector */}
            <div className="relative">
              <button
                className="bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                onClick={() => handleLanguageChange('en')}
              >
                EN
              </button>
              <button
                className="bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white ml-2"
                onClick={() => handleLanguageChange('et')}
              >
                ET
              </button>
              <button
                className="bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white ml-2"
                onClick={() => handleLanguageChange('ru')}
              >
                RU
              </button>
            </div>

            {/* Social links */}
            <div className="flex space-x-4">
              <a
                href="https://t.me/viktorijaschool"
                className="text-gray-300 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegramPlane className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/37255555555"
                className="text-gray-300 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
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

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center">
            <FaHome className="mr-2" /> {t('navbar.home')}
          </Link>
          <Link to="/courses" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center">
            <FaBook className="mr-2" /> {t('navbar.courses')}
          </Link>
          <Link to="/schedule" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center">
            <FaCalendarAlt className="mr-2" /> {t('navbar.schedule')}
          </Link>
          <Link to="/about" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center">
            <FaInfoCircle className="mr-2" /> {t('navbar.about')}
          </Link>
          <Link to="/price" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center">
            <FaTag className="mr-2" /> {t('navbar.price')}
          </Link>
          <Link to="/contact" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center">
            <FaEnvelope className="mr-2" /> {t('navbar.contact')}
          </Link>
          <Link to="/profile" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center">
            <FaUser className="mr-2" /> {t('navbar.profile')}
          </Link>
          
          {/* Mobile language selector */}
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5 space-x-3">
              <button
                className="bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-600"
                onClick={() => handleLanguageChange('en')}
              >
                EN
              </button>
              <button
                className="bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-600"
                onClick={() => handleLanguageChange('et')}
              >
                ET
              </button>
              <button
                className="bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-600"
                onClick={() => handleLanguageChange('ru')}
              >
                RU
              </button>
            </div>
          </div>

          {/* Mobile social links */}
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5 space-x-4">
              <a
                href="https://t.me/viktorijaschool"
                className="text-gray-300 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegramPlane className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/37255555555"
                className="text-gray-300 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 




// import { Link } from "react-router-dom";
// import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
// import { useTranslation } from 'react-i18next';
// import { useState } from 'react';
// // import './Navbar.css';

// const Navbar = () => {
//   const { t, i18n } = useTranslation();
//   const [isNavCollapsed, setIsNavCollapsed] = useState(true);

//   const handleLanguageChange = (lang) => {
//     i18n.changeLanguage(lang);
//     localStorage.setItem("i18nextLng", lang);
//   };

//   const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//       <div className="container">
//         <Link className="navbar-brand" to="/">Viktorija</Link>
        
//         <button 
//           className="navbar-toggler" 
//           type="button" 
//           onClick={handleNavCollapse}
//           aria-controls="navbarContent" 
//           aria-expanded={!isNavCollapsed} 
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
        
//         <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarContent">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             <li className="nav-item"><Link className="nav-link" to="/">{t('navbar.home')}</Link></li>
//             <li className="nav-item"><Link className="nav-link" to="/courses">{t('navbar.courses')}</Link></li>
//             <li className="nav-item"><Link className="nav-link" to="/about">{t('navbar.about')}</Link></li>
//             <li className="nav-item"><Link className="nav-link" to="/price">{t('navbar.price')}</Link></li>
//             <li className="nav-item"><Link className="nav-link" to="/contact">{t('navbar.contact')}</Link></li>
//           </ul>

//           <div className="d-flex align-items-center">
//             <div className="language-selector me-3">
//               <button 
//                 onClick={() => handleLanguageChange('en')} 
//                 className="btn btn-outline-light btn-sm me-2"
//                 aria-label="Switch to English"
//               >
//                 EN
//               </button>
//               <button 
//                 onClick={() => handleLanguageChange('et')} 
//                 className="btn btn-outline-light btn-sm me-2"
//                 aria-label="Switch to Estonian"
//               >
//                 ET
//               </button>
//               <button 
//                 onClick={() => handleLanguageChange('ru')} 
//                 className="btn btn-outline-light btn-sm"
//                 aria-label="Switch to Russian"
//               >
//                 RU
//               </button>
//             </div>
            
//             <div className="social-links">
//               <a href="https://t.me/viktorijaschool" className="text-primary me-2" aria-label="Telegram">
//                 <FaTelegramPlane size={20} />
//               </a>
//               <a href="https://wa.me/37255555555" className="text-success" aria-label="WhatsApp">
//                 <FaWhatsapp size={20} />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
