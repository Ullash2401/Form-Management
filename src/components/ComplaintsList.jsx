import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ComplaintsList.css';

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Load complaints from localStorage
    try {
      const storedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
      setComplaints(storedComplaints);
    } catch (error) {
      console.error('Error loading complaints:', error);
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      const updatedComplaints = complaints.filter(complaint => complaint.id !== id);
      localStorage.setItem('complaints', JSON.stringify(updatedComplaints));
      setComplaints(updatedComplaints);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all complaints? This action cannot be undone.')) {
      localStorage.removeItem('complaints');
      setComplaints([]);
    }
  };

  if (loading) {
    return (
      <div className="complaints-container">
        <div className="loading">Loading complaints...</div>
      </div>
    );
  }

  return (
    <div className="complaints-container">
      <div className="complaints-header">
        <h1>All Submitted Complaints</h1>
        <p className="complaints-subtitle">Total complaints: {complaints.length}</p>
      </div>

      <div className="complaints-actions">
        <button
          onClick={() => navigate('/')}
          className="btn-submit-new"
        >
          + Submit New Complaint
        </button>
        {complaints.length > 0 && (
          <button
            onClick={handleClearAll}
            className="btn-clear"
          >
            Clear All Complaints
          </button>
        )}
      </div>

      {complaints.length === 0 ? (
        <div className="no-complaints">
          <p>No complaints have been submitted yet.</p>
          <button
            onClick={() => navigate('/')}
            className="btn-submit-new"
          >
            Be the first to submit a complaint
          </button>
        </div>
      ) : (
        <div className="complaints-grid">
          {complaints.map((complaint, index) => (
            <div key={complaint.id} className="complaint-card">
              <div className="complaint-header">
                <div className="complaint-number">#{index + 1}</div>
                <div className="complaint-name">
                  {complaint.firstName} {complaint.lastName}
                </div>
              </div>

              <div className="complaint-body">
                <div className="complaint-row">
                  <span className="complaint-label">Username:</span>
                  <span className="complaint-value">{complaint.username}</span>
                </div>

                <div className="complaint-row">
                  <span className="complaint-label">Location:</span>
                  <span className="complaint-value">{complaint.location}</span>
                </div>

                <div className="complaint-row">
                  <span className="complaint-label">Phone:</span>
                  <span className="complaint-value">{complaint.phoneNumber}</span>
                </div>

                <div className="complaint-row">
                  <span className="complaint-label">Complaint:</span>
                  <p className="complaint-text">{complaint.complaint}</p>
                </div>

                <div className="complaint-footer">
                  <span className="complaint-timestamp">
                    Submitted: {complaint.submittedAt}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleDelete(complaint.id)}
                className="btn-delete"
                title="Delete this complaint"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComplaintsList;
