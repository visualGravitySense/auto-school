import React from 'react';
import { useState } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import './HeroBlock.css'; // Import the CSS file for custom styling

import PopUp from "./PopUp";
import ContactForm from "./ContactForm";

import { useTranslation } from 'react-i18next';

const HeroBlock = ({ buttonLink, imageUrl }) => {
  const { t, i18n } = useTranslation();  
  
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    
    return (
      <>
      <section className="hero-block">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="hero-title">{t('hero.title')}</h1>
              <p className="hero-description">{t('hero.description')}</p>

              <Button 
                onClick={() => setIsPopUpOpen(true)}
                variant="primary" 
                href={buttonLink} 
                className="hero-btn">
                  {t('hero.buttonText')} 
              </Button>

            </Col>
            <Col md={6}>
              <img src={imageUrl} alt="Hero" className="img-fluid hero-image" />
            </Col>
          </Row>
        </Container>

        <PopUp isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)}>
          <ContactForm />
        </PopUp>

      </section>
    </>
    );
  };

export default HeroBlock;
