import React from 'react';
import { Container, Table } from 'react-bootstrap';

import { useTranslation } from "react-i18next";

const ScheduleBlock = ({ schedule }) => {
  const { t } = useTranslation();
  
  return (
    <section className="schedule-block py-5">
      <Container>
        <h2 className="text-center mb-4">{t("schedule.title")}</h2>
        <Table striped bordered hover responsive className="text-center">
          <thead>
            <tr>
              <th>{t("schedule.date")}</th>
              <th>{t("schedule.time")}</th>
              <th>{t("schedule.course")}</th>
              <th>{t("schedule.instructor")}</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((lesson, index) => (
              <tr key={index}>
                <td>{lesson.date}</td>
                <td>{lesson.time}</td>
                <td>{lesson.course}</td>
                <td>{lesson.instructor}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </section>
  );
};

export default ScheduleBlock;
