 // src/components/Footer.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Nav } from 'react-bootstrap';
import { FaTelegramPlane, FaWhatsapp, FaFacebookF } from 'react-icons/fa';
import logo from '../assets/viktorija-logo.png'; // Путь к вашему логотипу
import "./Footer.css"

import MessengerRow from './MessengerRow';
import PaymentsContactForm from './PaymentsContactForm';

import { useTranslation } from 'react-i18next';


const Footer = () => {

  const { t, i18n } = useTranslation(); 

  return (
    <footer className="py-5 bg-dark text-light">

        <img src={logo} alt="Logo Viktorija" style={{ width: '200px' }} />
        <h2>{t('footer.home')}</h2>
            <h5>{t('footer.subhead')}</h5>

        <MessengerRow />

        <Container>
          <Row className="mb-4">
            <Col md={6}>

              <PaymentsContactForm />
                  
            </Col>
            <Col md={6}>

              <div className="w-40 h-40 rounded-lg">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/RACT-training-car-Burnie-20150216-003.jpg/330px-RACT-training-car-Burnie-20150216-003.jpg" alt="Education" className="w-full h-full object-cover rounded-lg" />
                  </div>
            </Col>
          </Row>

          
        </Container>

      {/* <section className="py-5 bg-dark text-light"> */}
        <Container>
            <Row>
            {/* 1. Info про школу */}
            <Col md={4}>
                <h3>{t('footer.about')}</h3>
                <p>
                {t('footer.story')}
                </p>
            </Col>

            {/* 2. Меню с ссылками на другие страницы */}
            <Col md={4}>
                <h3>{t('footer.menu')}</h3>
                <Nav className="flex-column">
                <Nav.Link href="/">{t('navbar.home')}</Nav.Link>
                <Nav.Link href="/courses">{t('navbar.courses')}</Nav.Link>
                <Nav.Link href="/about">{t('navbar.about')}</Nav.Link>
                <Nav.Link href="/price">{t('navbar.price')}</Nav.Link>
                <Nav.Link href="/contact">{t('navbar.contact')}</Nav.Link>
                {/* <Nav.Link href="/blog">Блог</Nav.Link> */}
                </Nav>
            </Col>

            {/* 3. Контакты */}
            <Col md={4}>
                <h3>{t('footer.contact')}</h3>
                <p>{t('footer.phone')}Телефон: <a href="tel:+3721234567">+372 123 4567</a></p>
                <p>Email: <a href="mailto:viktorijaautokool@hot.ee">viktorijaautokool@hot.ee</a></p>
                <p>{t('footer.address')}: <a href="https://g.co/kgs/reQdX5f"> Jaama 1a - 2 korrus, Nõmme keskus, Tallinn 11615</a></p>
            </Col>
            </Row>

            

            <Row className="mt-5">
                <Col className="text-center">
                    <h5>{t('footer.social')}</h5>
                    <div>
                    <a href="https://www.facebook.com/viktorija.autokool" target="_blank" className="text-light mx-3" aria-label="Facebook">
                        <FaFacebookF size={30} />
                    </a>
                    {/* <a href="https://t.me/yourtelegram" className="text-light mx-3" aria-label="Telegram">
                        <FaTelegramPlane size={30} />
                    </a> */}
                    {/* <a href="https://wa.me/yourwhatsapp" className="text-light mx-3" aria-label="WhatsApp">
                        <FaWhatsapp size={30} />
                    </a> */}
                    </div>
                </Col>
            </Row>
        </Container>
    {/* </section> */}

    </footer>
  );
};

export default Footer;
