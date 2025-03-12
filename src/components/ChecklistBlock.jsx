import React from 'react';
import { useState } from "react"; 
import { Button, Container, Row, Col, ListGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import './ChecklistBlock.css'; // Import the CSS for custom styling
import { MdCheckCircle } from 'react-icons/md'; // Importing the React icon

import PopUp from "./PopUp";
import ContactForm from "./ContactForm";

const ChecklistBlock = (  ) => {
  const { t } = useTranslation(); // Hook to access translations
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  return (
    <section className="checklist-block mt-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h2>{t("checklist.title")}</h2> {/* Title translation */}

            <ListGroup variant="flush">
              {t("checklist.items", { returnObjects: true }).map((item, index) => (
                <ListGroup.Item key={index}>
                  <MdCheckCircle style={{ fontSize: '20px', color: 'green', marginRight: '10px' }} />
                  {item}
                </ListGroup.Item>
              ))}
            </ListGroup>

            <Button 
              onClick={() => setIsPopUpOpen(true)}
              variant="primary" 
              // href={} 
              className="hero-btn">
                {t('hero.buttonText')} 
            </Button>

          </Col>
          <Col md={6}>
            <img
              src="https://via.placeholder.com/400x300?text=Course+Image"
              alt="Course"
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>

      <PopUp isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)}>
        <ContactForm />
      </PopUp>

    </section>
  );
};

export default ChecklistBlock;
