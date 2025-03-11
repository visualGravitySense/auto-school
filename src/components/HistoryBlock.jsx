import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from "react-i18next";

const HistoryBlock = ({ imageUrl }) => {
  const { t } = useTranslation();
  return (
    <section className="history-block py-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h2 className="history-title">{t("about.title")}</h2>
            <p className="history-description">{t("about.description")}</p>
          </Col>
          <Col md={6} className="text-center">
            <img src={imageUrl} alt={t("about.title")} className="img-fluid rounded shadow" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HistoryBlock;
