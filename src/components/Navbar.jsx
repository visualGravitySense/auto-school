import { Link } from "react-router-dom";
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation(); // Инициализация перевода

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Viktorija</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">{t('navbar.home')}</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/courses">{t('navbar.courses')}</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">{t('navbar.about')}</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/price">{t('navbar.price')}</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">{t('navbar.contact')}</Link></li>
          </ul>

          {/* Переключение языков */}
          <button onClick={() => i18n.changeLanguage('et')} className="btn btn-outline-light mx-2">EE</button>
          <button onClick={() => i18n.changeLanguage('ru')} className="btn btn-outline-light">RU</button>
        </div>

        <div>
          <a href="https://t.me/yourtelegram" className="text-primary" aria-label="Telegram">
            <FaTelegramPlane size={20} />
          </a>
          <a href="https://wa.me/yourwhatsapp" className="text-success mx-3" aria-label="WhatsApp">
            <FaWhatsapp size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
