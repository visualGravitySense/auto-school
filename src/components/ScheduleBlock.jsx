import React from 'react';
import { Container, Table } from 'react-bootstrap';

const ScheduleBlock = ({ schedule }) => {
  return (
    <section className="schedule-block py-5">
      <Container>
        <h2 className="text-center mb-4">Расписание занятий</h2>
        <Table striped bordered hover responsive className="text-center">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Время</th>
              <th>Курс</th>
              <th>Преподаватель</th>
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
