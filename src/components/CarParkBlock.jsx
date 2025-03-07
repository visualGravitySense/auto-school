import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const CarParkBlock = ({ cars }) => {
  return (
    <section className="car-park-block py-5">
      <Container>
        <h2 className="text-center mb-4">Наш автопарк</h2>
        <Row>
          {cars.map((car, index) => (
            <Col md={4} sm={6} xs={12} key={index} className="mb-4">
              <Card className="h-100 shadow">
                <Card.Img variant="top" src={car.imageUrl} alt={car.model} />
                <Card.Body>
                  <Card.Title>{car.model}</Card.Title>
                  <Card.Text>
                    <strong>Год выпуска:</strong> {car.year} <br />
                    <strong>Двигатель:</strong> {car.engine} <br />
                    <strong>Трансмиссия:</strong> {car.transmission} <br />
                    <strong>Топливо:</strong> {car.fuel} <br />
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

export default CarParkBlock;
