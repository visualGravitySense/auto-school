import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Testimonials = () => {
  const { t } = useTranslation();

  // Получаем массив отзывов из JSON-переводов
  const testimonials = t("testimonials.list", { returnObjects: true });

  return (
    <section id="testimonials" className="py-5">
      <h2 className="text-center mb-4">{t("testimonials.title")}</h2>
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
