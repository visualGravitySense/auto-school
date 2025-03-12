import React from 'react';
import { Container, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ScheduleBlock = () => {
  const { t } = useTranslation(); // Access translations

  // Get the schedule list from the translations
  const schedule = t('schedule.list', { returnObjects: true });

  return (
    <section className="schedule-block py-5">
      <Container>
        <h2 className="text-center mb-4">{t('schedule.title')}</h2> {/* Dynamic Title */}

        <Table striped bordered hover responsive className="text-center">
          <thead>
            <tr>
              <th>{t('schedule.date')}</th> {/* Translated Date Column */}
              <th>{t('schedule.time')}</th> {/* Translated Time Column */}
              <th>{t('schedule.course')}</th> {/* Translated Course Column */}
              <th>{t('schedule.instructor')}</th> {/* Translated Instructor Column */}
            </tr>
          </thead>
          <tbody>
            {/* Loop through the schedule list and dynamically render rows */}
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
