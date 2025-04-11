import React from 'react';
import { useTranslation } from 'react-i18next';

const Schedule = () => {
  const { t } = useTranslation();

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Schedule</h1>
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Upcoming Classes</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Course</th>
                      <th>Instructor</th>
                      <th>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Monday, May 15</td>
                      <td>10:00 - 12:00</td>
                      <td>Theory Class</td>
                      <td>Viktorija</td>
                      <td>Classroom A</td>
                    </tr>
                    <tr>
                      <td>Wednesday, May 17</td>
                      <td>14:00 - 16:00</td>
                      <td>Practical Driving</td>
                      <td>Viktorija</td>
                      <td>Driving Range</td>
                    </tr>
                    <tr>
                      <td>Friday, May 19</td>
                      <td>09:00 - 11:00</td>
                      <td>Road Safety</td>
                      <td>Viktorija</td>
                      <td>Classroom B</td>
                    </tr>
                    <tr>
                      <td>Monday, May 22</td>
                      <td>13:00 - 15:00</td>
                      <td>Practical Driving</td>
                      <td>Viktorija</td>
                      <td>Driving Range</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">Quick Links</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <a href="#" className="text-decoration-none">Book a Driving Lesson</a>
                </li>
                <li className="list-group-item">
                  <a href="#" className="text-decoration-none">View Full Calendar</a>
                </li>
                <li className="list-group-item">
                  <a href="#" className="text-decoration-none">Download Schedule</a>
                </li>
                <li className="list-group-item">
                  <a href="#" className="text-decoration-none">Contact for Changes</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule; 