import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

import "./CoursesList.css"

const CourseList = ({ courses }) => {
    return (
      <div className="container mt-5">
        <h2>Наши курсы</h2>
        <Row>
          {courses.map(course => (
            <Col key={course.id} md={4} className="mb-4">
              <Card className="course-card">
                <Card.Img variant="top" src={course.image} alt={course.name} />
                <Card.Body>
                  <Card.Title>{course.name}</Card.Title>
                  <Card.Text>
                    <strong>{course.price}</strong>
                  </Card.Text>
                  <Button variant="primary">Записаться</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  };
  
  export default CourseList;
