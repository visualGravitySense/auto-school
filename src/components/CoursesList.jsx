import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

import "./CoursesList.css"

import { useTranslation } from "react-i18next";

const CourseList = ({ categories }) => {
  const { t } = useTranslation();
  const translateCategories = t("categories.list", { returnObjects: true });
    return (
      <div className="container mt-5">
        <h2>{t("categories.title")}</h2>
        <Row>
          {categories.map((category) => (
            <Col key={category.id} md={4} className="mb-4">
              <Card className="course-card">
                <Card.Img variant="top" src={category.image} alt={category.name} />
                <Card.Body>
                <Card.Title>{category.name}</Card.Title>
                  <Card.Text>
                    <strong>{tcategory.price}</strong>
                  </Card.Text>
                  <Button variant="primary">{t("categories.enroll")}</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
};

  
  export default CourseList;
