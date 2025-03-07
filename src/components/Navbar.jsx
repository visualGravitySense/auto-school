import { Link } from "react-router-dom";
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Автошкола</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Главная</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/courses">Курсы</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">О нас</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/price">Цены</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Контакты</Link></li>
          </ul>

          <button onClick={() => i18n.changeLanguage('et')}>ee</button>
          <button onClick={() => i18n.changeLanguage('en')}>ru</button>

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
