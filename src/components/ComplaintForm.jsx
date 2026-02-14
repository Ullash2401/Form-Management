import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../styles/ComplaintForm.css';

const ComplaintForm = () => {
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First Name is required')
      .matches(/^[a-zA-Z\s]+$/, 'First Name must contain only letters'),
    lastName: Yup.string()
      .required('Last Name is required')
      .matches(/^[a-zA-Z\s]+$/, 'Last Name must contain only letters'),
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters')
      .test('unique-username', 'Username already exists', function (value) {
        if (!value) return false;
        const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
        return !complaints.some(complaint => complaint.username === value);
      }),
    location: Yup.string()
      .required('Location is required')
      .matches(/^[a-zA-Z\s]+$/, 'Location must contain only letters'),
    phoneNumber: Yup.string()
      .required('Phone Number is required')
      .matches(/^\d{10,15}$/, 'Phone Number must contain only digits and be 10-15 characters long'),
    complaint: Yup.string()
      .required('Detailed Complaint is required')
      .min(20, 'Complaint must be at least 20 characters long'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    try {
      // Get existing complaints from localStorage
      const existingComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');

      // Create new complaint object with timestamp
      const newComplaint = {
        id: Date.now(),
        ...values,
        submittedAt: new Date().toLocaleString(),
      };

      // Add new complaint to the list
      existingComplaints.push(newComplaint);

      // Save back to localStorage
      localStorage.setItem('complaints', JSON.stringify(existingComplaints));

      // Reset form
      resetForm();

      // Show success message and navigate to complaints list
      alert('Complaint submitted successfully!');
      navigate('/complaints');
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('Error submitting complaint. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h1>Submit Your Complaint</h1>
        <p className="form-subtitle">Please fill out all fields below to submit your complaint</p>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            username: '',
            location: '',
            phoneNumber: '',
            complaint: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form className="complaint-form">
              {/* First Name Field */}
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <Field
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  className="form-input"
                />
                <ErrorMessage name="firstName" component="span" className="error-message" />
              </div>

              {/* Last Name Field */}
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <Field
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  className="form-input"
                />
                <ErrorMessage name="lastName" component="span" className="error-message" />
              </div>

              {/* Username Field */}
              <div className="form-group">
                <label htmlFor="username">Username *</label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter a unique username"
                  className="form-input"
                />
                <ErrorMessage name="username" component="span" className="error-message" />
              </div>

              {/* Location Field */}
              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <Field
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Enter your location"
                  className="form-input"
                />
                <ErrorMessage name="location" component="span" className="error-message" />
              </div>

              {/* Phone Number Field */}
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number *</label>
                <Field
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter a 10-15 digit phone number"
                  className="form-input"
                />
                <ErrorMessage name="phoneNumber" component="span" className="error-message" />
              </div>

              {/* Detailed Complaint Field */}
              <div className="form-group">
                <label htmlFor="complaint">Detailed Complaint *</label>
                <Field
                  as="textarea"
                  id="complaint"
                  name="complaint"
                  placeholder="Describe your complaint in detail (minimum 20 characters)"
                  className="form-input form-textarea"
                  rows="6"
                />
                <ErrorMessage name="complaint" component="span" className="error-message" />
              </div>

              {/* Submit Button */}
              <div className="form-actions">
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                  className="btn-submit"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ComplaintForm;
