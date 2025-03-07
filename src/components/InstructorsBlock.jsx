import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const InstructorsBlock = ({ instructors }) => {
  return (
    <section className="instructors-block py-5">
      <Container>
        <h2 className="text-center mb-4">Наша команда инструкторов</h2>
        <Row>
          {instructors.map((instructor, index) => (
            <Col md={4} sm={6} xs={12} key={index} className="mb-4">
              <Card className="h-100 shadow">
                <Card.Img variant="top" src={instructor.imageUrl} alt={instructor.name} />
                <Card.Body>
                  <Card.Title>{instructor.name}</Card.Title>
                  <Card.Text>
                    <strong>Стаж:</strong> {instructor.experience} лет <br />
                    <strong>Отзывы:</strong> {instructor.reviews} ★
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default InstructorsBlock;
