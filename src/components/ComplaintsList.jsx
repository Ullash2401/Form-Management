import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ComplaintsList.css';

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
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

  const handleDelete = (id, e) => {
    if (e) {
      e.stopPropagation();
    }
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      const updatedComplaints = complaints.filter(complaint => complaint.id !== id);
      localStorage.setItem('complaints', JSON.stringify(updatedComplaints));
      setComplaints(updatedComplaints);
      if (selectedComplaint?.id === id) {
        setSelectedComplaint(null);
      }
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all complaints? This action cannot be undone.')) {
      localStorage.removeItem('complaints');
      setComplaints([]);
      setSelectedComplaint(null);
    }
  };

  const openComplaintDetail = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const closeComplaintDetail = () => {
    setSelectedComplaint(null);
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
            <button
              key={complaint.id}
              onClick={() => openComplaintDetail(complaint)}
              className="complaint-list-item"
            >
              <div className="complaint-list-number">#{index + 1}</div>
              <div className="complaint-list-content">
                <div className="complaint-list-name">
                  {complaint.firstName} {complaint.lastName}
                </div>
                <div className="complaint-list-text">
                  {complaint.complaint.substring(0, 100)}...
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {selectedComplaint && (
        <div className="complaint-modal-overlay" onClick={closeComplaintDetail}>
          <div className="complaint-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Complaint Details</h2>
              <button
                onClick={closeComplaintDetail}
                className="modal-close-btn"
                title="Close"
              >
                ✕
              </button>
            </div>

            <div className="modal-content">
              <div className="detail-row">
                <span className="detail-label">First Name:</span>
                <span className="detail-value">{selectedComplaint.firstName}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Last Name:</span>
                <span className="detail-value">{selectedComplaint.lastName}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Username:</span>
                <span className="detail-value">{selectedComplaint.username}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{selectedComplaint.location}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Phone Number:</span>
                <span className="detail-value">{selectedComplaint.phoneNumber}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Complaint:</span>
                <p className="detail-complaint-text">{selectedComplaint.complaint}</p>
              </div>

              <div className="detail-row">
                <span className="detail-label">Submitted:</span>
                <span className="detail-value">{selectedComplaint.submittedAt}</span>
              </div>
            </div>

            <div className="modal-actions">
              <button
                onClick={() => handleDelete(selectedComplaint.id)}
                className="btn-delete-modal"
              >
                Delete Complaint
              </button>
              <button
                onClick={closeComplaintDetail}
                className="btn-close-modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintsList;
