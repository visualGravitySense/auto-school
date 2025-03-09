import React from 'react';
import { useState } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import './HeroBlock.css'; // Import the CSS file for custom styling

import PopUp from "./PopUp";
import ContactForm from "./ContactForm";

const HeroBlock = ({ title, description, buttonText, buttonLink, imageUrl }) => {
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    
    return (
      <>
      <section className="hero-block">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="hero-title">{title}</h1>
              <p className="hero-description">{description}</p>

              <Button 
                onClick={() => setIsPopUpOpen(true)}
                variant="primary" 
                href={buttonLink} 
                className="hero-btn">
                  Записаться на курс 
              </Button>

                {/* <button
                  onClick={() => setIsPopUpOpen(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Открыть форму
                </button> */}

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
