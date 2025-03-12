import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

import { useTranslation } from "react-i18next";

const PhotoGallery = ({ images }) => {
  const { t } = useTranslation();
  return (
    <section className="photo-gallery py-5">
      <Container>
        <h2 className="text-center mb-4">{t("about.images")}</h2>
        <Row>
          {images.map((img, index) => (
            <Col md={4} sm={6} xs={12} key={index} className="mb-4">
              <Image src={img} alt={`Фото ${index + 1}`} fluid className="rounded shadow" />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default PhotoGallery;
