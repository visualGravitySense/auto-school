import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const HistoryBlock = ({ title, description, imageUrl }) => {
  return (
    <section className="history-block py-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h2 className="history-title">{title}</h2>
            <p className="history-description">{description}</p>
          </Col>
          <Col md={6} className="text-center">
            <img src={imageUrl} alt="История автошколы" className="img-fluid rounded shadow" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HistoryBlock;
