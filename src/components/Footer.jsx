// src/components/Footer.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Nav } from 'react-bootstrap';
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import logo from '../assets/viktorija-logo.png'; // Путь к вашему логотипу
import "./Footer.css"

import MessengerRow from './MessengerRow';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно добавить логику отправки формы
    console.log(formData);
  };

  return (
    <footer className="py-5 bg-dark text-light">

        <h2>Контакты</h2>
            <h5>Мы всегда на связи!</h5>
        <img src={logo} alt="Логотип Виктория" style={{ width: '200px' }} />

        <MessengerRow />

      <Container>
        <Row className="mb-4">
          <Col md={6}>

          <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Ваше имя</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Введите ваше имя"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Ваш Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Введите ваш Email"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formMessage">
                <Form.Label>Ваше сообщение</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Введите ваше сообщение"
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">Отправить</Button>
            </Form>
                
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
                <h3>О школе</h3>
                <p>
                Наша автошкола предоставляет качественные курсы вождения с опытными инструкторами. Мы гарантируем высокий уровень подготовки и индивидуальный подход.
                </p>
            </Col>

            {/* 2. Меню с ссылками на другие страницы */}
            <Col md={4}>
                <h3>Меню</h3>
                <Nav className="flex-column">
                <Nav.Link href="/">Главная</Nav.Link>
                <Nav.Link href="/courses">Курсы</Nav.Link>
                <Nav.Link href="/about">О нас</Nav.Link>
                <Nav.Link href="/contact">Контакты</Nav.Link>
                <Nav.Link href="/blog">Блог</Nav.Link>
                </Nav>
            </Col>

            {/* 3. Контакты */}
            <Col md={4}>
                <h3>Контакты</h3>
                <p>Телефон: +372 123 4567</p>
                <p>Email: info@autokool.ee</p>
                <p>Адрес: ул. Примерная, 10, Таллинн</p>
            </Col>
            </Row>

            

            <Row className="mt-5">
                <Col className="text-center">
                    <h5>Присоединяйтесь к нам</h5>
                    <div>
                    <a href="https://t.me/yourtelegram" className="text-light mx-3" aria-label="Telegram">
                        <FaTelegramPlane size={30} />
                    </a>
                    <a href="https://wa.me/yourwhatsapp" className="text-light mx-3" aria-label="WhatsApp">
                        <FaWhatsapp size={30} />
                    </a>
                    </div>
                </Col>
            </Row>
        </Container>
    {/* </section> */}

    </footer>
  );
};

export default Footer;
