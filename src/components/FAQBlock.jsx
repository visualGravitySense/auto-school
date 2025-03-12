import React from 'react';
import { Accordion, Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

import './FAQBlock.css'; // Import custom styling

const FAQBlock = () => {
  const { t } = useTranslation(); // Hook to access translations

  // Dynamically retrieve the FAQ questions and answers from the translations
  const faqData = t('faq.questions', { returnObjects: true });

  return (
    <section className="faq-section py-5">
      <Container>
        <h2 className="text-center mb-4">{t('faq.title')}</h2> {/* Translated title */}

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
