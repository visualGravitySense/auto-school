// src/components/Testimonials.jsx
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const testimonials = [
  {
    text: "Шикарная автошкола, отличные преподаватели. Все доступно объясняют. Хорошее отношение к ученикам)) советую всем 100%.",
    name: "Ульяна Зыкова",
  },
  {
    text: "Хорошо и понятно все объясняют. Хорошо преподают вождение. Многие мои знакомые рады этой школе.",
    name: "Сергей",
  },
  {
    text: "Очень счастлива что именно в этой автошколе я училась, так как все экзамены что у них что и в эрка сдала с первого раза! И сдавала в Таллинне, где говорили что тяжело сдать с первого раза, но благодаря чудесным учителям, я это сделала! Спасибо большое!",
    name: "Аисель Агаева",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-5">
      <h2 className="text-center mb-4">Реальные истории учеников</h2>
      <Row className="d-flex justify-content-center">
        {testimonials.map((testimonial, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Text>"{testimonial.text}"</Card.Text>
                <Card.Footer className="text-end">
                  <small>- {testimonial.name}</small>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default Testimonials;
