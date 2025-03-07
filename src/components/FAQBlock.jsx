import React from 'react';
import { Accordion, Container, Row, Col } from 'react-bootstrap';

import "./FAQBlock.css"

const faqData = [
  { question: 'Какие курсы у вас есть?', answer: 'У нас есть курсы по программированию, дизайну, маркетингу и другим направлениям.' },
  { question: 'Как оплатить курс?', answer: 'Вы можете оплатить курс картой, через PayPal или банковским переводом.' },
  { question: 'Есть ли рассрочка?', answer: 'Да, у нас доступна рассрочка на некоторые курсы. Свяжитесь с поддержкой для уточнения.' },
  { question: 'Как долго длится обучение?', answer: 'В зависимости от курса обучение может длиться от 4 недель до нескольких месяцев.' },
  { question: 'Выдается ли сертификат?', answer: 'Да, после успешного завершения курса вы получите официальный сертификат.' },
  { question: 'Как получить доступ к курсу?', answer: 'После оплаты вам придет письмо с доступом в личный кабинет.' },
];

const FAQBlock = () => {
  return (
    <section className="faq-section py-5">
      <Container>
        <h2 className="text-center mb-4">FAQ по курсам</h2>
        <Row>
          {faqData.map((item, index) => (
            <Col md={6} key={index} className="mb-3">
              <Accordion>
                <Accordion.Item eventKey={index.toString()}>
                  <Accordion.Header>{item.question}</Accordion.Header>
                  <Accordion.Body>{item.answer}</Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FAQBlock;
