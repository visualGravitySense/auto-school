import { Link } from "react-router-dom";
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';

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
            <li className="nav-item"><Link className="nav-link" to="/contact">Контакты</Link></li>
          </ul>
        </div>

        <div>
          <a href="https://t.me/yourtelegram" className="text-light " aria-label="Telegram">
              <FaTelegramPlane size={30} />
          </a>
          <a href="https://wa.me/yourwhatsapp" className="text-light mx-3" aria-label="WhatsApp">
              <FaWhatsapp size={30} />
          </a>
        </div>
          
      </div>
    </nav>
  );
};

export default Navbar;
