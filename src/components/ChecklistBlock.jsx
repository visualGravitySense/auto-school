import React from 'react';
import { Button, Container, Row, Col, ListGroup } from 'react-bootstrap';
import './ChecklistBlock.css'; // Import the CSS for custom styling
import { MdCheckCircle } from 'react-icons/md'; // Importing the React icon


const ChecklistBlock = () => {
  return (
    <section className="checklist-block mt-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h2>Чек-лист: «Как выбрать курс?»</h2>
            
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <MdCheckCircle style={{ fontSize: '20px', color: 'green', marginRight: '10px' }} />
                    Определитесь с целью обучения
                </ListGroup.Item>
                <ListGroup.Item>
                    <MdCheckCircle style={{ fontSize: '20px', color: 'green', marginRight: '10px' }} />
                    Оцените программу курса
                </ListGroup.Item>
                <ListGroup.Item>
                    <MdCheckCircle style={{ fontSize: '20px', color: 'green', marginRight: '10px' }} />
                    Проверьте опыт преподавателей
                </ListGroup.Item>
                <ListGroup.Item>
                    <MdCheckCircle style={{ fontSize: '20px', color: 'green', marginRight: '10px' }} />
                    Узнайте отзывы студентов
                </ListGroup.Item>
                <ListGroup.Item>
                    <MdCheckCircle style={{ fontSize: '20px', color: 'green', marginRight: '10px' }} />
                    Проверьте стоимость и сроки курса
                </ListGroup.Item>
            </ListGroup>

            <Button variant="primary" className="mt-4">Забронировать курс</Button>
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
    </section>
  );
};

export default ChecklistBlock;
