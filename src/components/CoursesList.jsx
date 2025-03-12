import React from 'react';
import { useState } from "react";
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import "./CoursesList.css";
import PopUp from "./PopUp";
import ContactForm from "./ContactForm";

const CourseList = ({ buttonLink, categories }) => {
  const { t } = useTranslation();
  const translatedCategories = t("categories.list", { returnObjects: true });
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  return (
    <div className="container mt-5">
      <h2>{t("categories.title")}</h2>
      <Row>
        {translatedCategories.map((category) => (
          <Col key={category.id} md={4} className="mb-4">
            <Card className="course-card">
              <Card.Img variant="top" src={category.image} alt={category.name} />
              <Card.Body>
                <Card.Title>{category.name}</Card.Title>
                <Card.Text>
                  <strong>{category.price}</strong>
                </Card.Text>

                <Button 
                  onClick={() => setIsPopUpOpen(true)}
                  variant="primary" 
                  href={buttonLink} 
                  className="hero-btn">
                    {t('hero.buttonText')} 
                </Button>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <PopUp isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)}>
        <ContactForm />
      </PopUp>
        
    </div>
  );
};

export default CourseList;
