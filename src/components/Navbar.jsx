import { Link } from "react-router-dom";

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
      </div>
    </nav>
  );
};

export default Navbar;
