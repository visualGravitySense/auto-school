import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="container mt-5">
      <h1 className="mb-4">My Profile</h1>
      
      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body text-center">
              <img 
                src="https://via.placeholder.com/150" 
                alt="Profile" 
                className="rounded-circle mb-3"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <h4>John Doe</h4>
              <p className="text-muted">Student</p>
              <div className="d-grid gap-2">
                <button className="btn btn-primary">Edit Profile</button>
                <button className="btn btn-outline-secondary">Change Password</button>
              </div>
            </div>
          </div>
          
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Quick Stats</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Theory Classes
                  <span className="badge bg-primary rounded-pill">12/20</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Practical Lessons
                  <span className="badge bg-primary rounded-pill">8/15</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Tests Completed
                  <span className="badge bg-primary rounded-pill">3/5</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Hours Logged
                  <span className="badge bg-primary rounded-pill">24</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'personal' ? 'active' : ''}`}
                    onClick={() => setActiveTab('personal')}
                  >
                    Personal Info
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'progress' ? 'active' : ''}`}
                    onClick={() => setActiveTab('progress')}
                  >
                    Progress
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'documents' ? 'active' : ''}`}
                    onClick={() => setActiveTab('documents')}
                  >
                    Documents
                  </button>
                </li>
              </ul>
            </div>
            <div className="card-body">
              {activeTab === 'personal' && (
                <div>
                  <h5 className="card-title">Personal Information</h5>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <p><strong>Name:</strong> John Doe</p>
                      <p><strong>Email:</strong> john.doe@example.com</p>
                      <p><strong>Phone:</strong> +372 5555 5555</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Address:</strong> Tallinn, Estonia</p>
                      <p><strong>Date of Birth:</strong> January 1, 1990</p>
                      <p><strong>Student ID:</strong> ST12345</p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'progress' && (
                <div>
                  <h5 className="card-title">Learning Progress</h5>
                  <div className="progress mb-3">
                    <div className="progress-bar" role="progressbar" style={{ width: '60%' }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">60%</div>
                  </div>
                  <p>You have completed 60% of your driving course. Keep up the good work!</p>
                  <h6 className="mt-4">Recent Activity</h6>
                  <ul className="list-group">
                    <li className="list-group-item">Completed Theory Test - May 10, 2023</li>
                    <li className="list-group-item">Attended Practical Driving Lesson - May 8, 2023</li>
                    <li className="list-group-item">Completed Road Safety Module - May 5, 2023</li>
                  </ul>
                </div>
              )}
              
              {activeTab === 'documents' && (
                <div>
                  <h5 className="card-title">My Documents</h5>
                  <div className="list-group">
                    <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                      Medical Certificate
                      <span className="badge bg-success rounded-pill">Valid</span>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                      Theory Test Certificate
                      <span className="badge bg-success rounded-pill">Valid</span>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                      Practical Driving Log
                      <span className="badge bg-warning rounded-pill">In Progress</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 