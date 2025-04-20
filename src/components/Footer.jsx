 // src/components/Footer.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Nav } from 'react-bootstrap';
import { FaTelegramPlane, FaWhatsapp, FaFacebookF, FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowRight, FaChevronRight, FaInfoCircle } from 'react-icons/fa';
import logo from '../assets/viktorija-logo.png';
import "./Footer.css"

import MessengerRow from './MessengerRow';
import PaymentsContactForm from './PaymentsContactForm';

import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation(); 
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formFocused, setFormFocused] = useState(false);

  // Track visibility for animation (System 1)
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById('footer-main');
      if (footer) {
        const rect = footer.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
        setIsVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle form input changes (System 2)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission (System 2)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <footer 
      id="footer-main" 
      className={`py-5 bg-gray-900 text-light transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Top section with logo and CTA - System 1: Visual recognition */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <img 
              src={logo} 
              alt="Logo Viktorija" 
              className="w-48 transform hover:scale-105 transition-transform duration-300" 
            />
          </div>
          <div className="text-center md:text-right">
            <h2 className="text-2xl font-bold mb-2">{t('footer.home')}</h2>
            <h5 className="text-gray-300 mb-4">{t('footer.subhead')}</h5>
            <button 
              className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors transform hover:scale-105 shadow-md"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {t('footer.backToTop')} <FaArrowRight className="inline ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Messenger row - System 1: Quick access to familiar platforms */}
      <div className="container mx-auto px-4 mb-8">
        <MessengerRow />
      </div>

      {/* Main content - System 1 & 2 integration */}
      <Container className="mb-8">
          <Row className="mb-4">
            <Col md={6}>
            {/* Contact form - System 2: Deliberate action */}
            <div className={`bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 ${
              formFocused ? 'ring-2 ring-blue-500' : ''
            }`}>
              <h3 className="text-xl font-bold mb-4">{t('footer.contactUs')}</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>{t('footer.name')}</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-gray-700 border-gray-600 text-white"
                    onFocus={() => setFormFocused(true)}
                    onBlur={() => setFormFocused(false)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>{t('footer.email')}</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-gray-700 border-gray-600 text-white"
                    onFocus={() => setFormFocused(true)}
                    onBlur={() => setFormFocused(false)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>{t('footer.message')}</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-gray-700 border-gray-600 text-white"
                    onFocus={() => setFormFocused(true)}
                    onBlur={() => setFormFocused(false)}
                    required
                  />
                </Form.Group>
                <Button 
                  type="submit" 
                  className="bg-blue-600 border-0 hover:bg-blue-700 transition-colors transform hover:scale-105"
                >
                  {t('footer.send')} <FaArrowRight className="ml-2" />
                </Button>
              </Form>
            </div>
            </Col>
            <Col md={6}>
            {/* Image - System 1: Visual appeal */}
            <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/RACT-training-car-Burnie-20150216-003.jpg/330px-RACT-training-car-Burnie-20150216-003.jpg" 
                alt="Education" 
                className="w-full h-full object-cover" 
              />
                  </div>
            </Col>
          </Row>
        </Container>

      {/* Info sections - System 2: Deliberate information processing */}
        <Container>
            <Row>
          {/* 1. Info about school - System 2 */}
          <Col md={4} className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaInfoCircle className="mr-2 text-blue-500" /> {t('footer.about')}
            </h3>
            <p className="text-gray-300">
                {t('footer.story')}
                </p>
            <button 
              className="mt-4 text-blue-400 hover:text-blue-300 flex items-center transition-colors"
              onClick={() => window.location.href = '/about'}
            >
              {t('footer.learnMore')} <FaChevronRight className="ml-1" />
            </button>
            </Col>

          {/* 2. Menu with links - System 1 & 2 integration */}
          <Col md={4} className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-blue-500" /> {t('footer.menu')}
            </h3>
                <Nav className="flex-column">
              <Nav.Link 
                href="/" 
                className="text-gray-300 hover:text-white transition-colors flex items-center"
              >
                <FaChevronRight className="mr-2 text-blue-500" /> {t('navbar.home')}
              </Nav.Link>
              <Nav.Link 
                href="/courses" 
                className="text-gray-300 hover:text-white transition-colors flex items-center"
              >
                <FaChevronRight className="mr-2 text-blue-500" /> {t('navbar.courses')}
              </Nav.Link>
              <Nav.Link 
                href="/about" 
                className="text-gray-300 hover:text-white transition-colors flex items-center"
              >
                <FaChevronRight className="mr-2 text-blue-500" /> {t('navbar.about')}
              </Nav.Link>
              <Nav.Link 
                href="/price" 
                className="text-gray-300 hover:text-white transition-colors flex items-center"
              >
                <FaChevronRight className="mr-2 text-blue-500" /> {t('navbar.price')}
              </Nav.Link>
              <Nav.Link 
                href="/contact" 
                className="text-gray-300 hover:text-white transition-colors flex items-center"
              >
                <FaChevronRight className="mr-2 text-blue-500" /> {t('navbar.contact')}
              </Nav.Link>
                </Nav>
            </Col>

          {/* 3. Contacts - System 1: Quick access to contact information */}
            <Col md={4}>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaPhone className="mr-2 text-blue-500" /> {t('footer.contact')}
            </h3>
            <div className="space-y-3">
              <p className="flex items-center">
                <FaPhone className="mr-2 text-blue-500" /> 
                <a 
                  href="tel:+37253464508" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  +372 5346 4508
                </a>
              </p>
              <p className="flex items-center">
                <FaEnvelope className="mr-2 text-blue-500" /> 
                <a 
                  href="mailto:viktorijaautokool@hot.ee" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  viktorijaautokool@hot.ee
                </a>
              </p>
              <p className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-500" /> 
                <a 
                  href="https://g.co/kgs/reQdX5f" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Jaama 1a - 2 korrus, Nõmme keskus, Tallinn 11615
                </a>
              </p>
            </div>
            </Col>
            </Row>

        {/* Social media - System 1: Quick access to familiar platforms */}
        <Row className="mt-8">
                <Col className="text-center">
            <h5 className="text-xl font-bold mb-4">{t('footer.social')}</h5>
            <div className="flex justify-center space-x-6">
              <a 
                href="https://www.facebook.com/viktorija.autokool" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white transition-colors transform hover:scale-110"
                aria-label="Facebook"
              >
                        <FaFacebookF size={30} />
                    </a>
              <a 
                href="https://t.me/viktorijaschool" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white transition-colors transform hover:scale-110"
                aria-label="Telegram"
              >
                        <FaTelegramPlane size={30} />
              </a>
              <a 
                href="https://wa.me/37255555555" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white transition-colors transform hover:scale-110"
                aria-label="WhatsApp"
              >
                        <FaWhatsapp size={30} />
              </a>
                    </div>
                </Col>
            </Row>

        {/* Copyright - System 1: Visual recognition */}
        <Row className="mt-8 pt-4 border-t border-gray-800">
          <Col className="text-center text-gray-400">
            <p>© {new Date().getFullYear()} Viktorija Driving School. {t('footer.rights')}</p>
          </Col>
        </Row>
        </Container>
    </footer>
  );
};

export default Footer;
