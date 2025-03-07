import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './HeroBlock.css'; // Import the CSS file for custom styling

const HeroBlock = ({ title, description, buttonText, buttonLink, imageUrl }) => {
    return (
      <section className="hero-block">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="hero-title">{title}</h1>
              <p className="hero-description">{description}</p>
              <Button variant="primary" href={buttonLink} className="hero-btn">
                {buttonText}
              </Button>
            </Col>
            <Col md={6}>
              <img src={imageUrl} alt="Hero" className="img-fluid hero-image" />
            </Col>
          </Row>
        </Container>
      </section>
    );
  };

export default HeroBlock;
