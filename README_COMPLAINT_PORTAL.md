# Public Complaint Portal

A modern, responsive web application for submitting and viewing public complaints. Built with React, Vite, Formik, and Yup for form validation. All data is stored locally using the browser's localStorage.

## Features

### 📋 Complaint Submission Form
- **Input Fields:**
  - First Name (text, letters only)
  - Last Name (text, letters only)
  - Username (text, must be unique - checked against localStorage)
  - Location (text, letters only)
  - Phone Number (numeric, 10-15 digits)
  - Detailed Complaint (textarea, minimum 20 characters)

- **Validation Features:**
  - All fields are required
  - Real-time form validation using Formik and Yup
  - Username uniqueness check against existing complaints
  - Phone number format validation (digits only, length 10-15)
  - Complaint text minimum length validation
  - Clear error messages for each field
  - Submit button is disabled until form is valid

### 📱 Complaints Display Page
- View all submitted complaints in an attractive card-based grid
- Each complaint card displays:
  - Complaint number
  - Submitter's name
  - Username
  - Location
  - Phone number
  - Detailed complaint text
  - Submission timestamp
- Delete individual complaints
- Clear all complaints option with confirmation
- Responsive grid layout that adapts to screen size
- Empty state message with link to submit if no complaints exist

### 💾 Data Storage
- All complaints are stored in browser's localStorage
- Data persists across browser sessions
- Each complaint is assigned a unique ID and timestamp
- New complaints are appended to existing ones (no data loss)

### 🎨 UI/UX Features
- Clean, modern design with smooth animations
- Responsive layout for mobile, tablet, and desktop
- Navigation between form and complaints list
- Header with portal title and description
- Footer with copyright information
- Sticky navigation bar
- Hover effects and transitions on interactive elements
- Color-coded status indicators

## Technology Stack

- **Frontend Framework:** React 19.2.0
- **Build Tool:** Vite 7.3.1
- **Form Validation:** Formik 2.4.5 + Yup 1.3.3
- **Routing:** React Router DOM 6.20.0
- **Styling:** CSS3 with CSS Variables and Grid/Flexbox

## Project Structure

```
commplaint-management/
├── src/
│   ├── components/
│   │   ├── ComplaintForm.jsx      # Form submission component
│   │   └── ComplaintsList.jsx     # Display complaints component
│   ├── styles/
│   │   ├── ComplaintForm.css      # Form styling
│   │   └── ComplaintsList.css     # List styling
│   ├── App.jsx                    # Main app with routing
│   ├── App.css                    # App layout styles
│   ├── index.css                  # Global styles
│   └── main.jsx                   # Entry point
├── public/
├── package.json
├── vite.config.js
├── eslint.config.js
└── index.html
```

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173/` (or next available port)

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Usage

### Submit a Complaint
1. Navigate to the "Submit Complaint" page
2. Fill in all required fields:
   - First and Last Name (letters only)
   - Choose a unique username
   - Enter your location
   - Provide your phone number (10-15 digits)
   - Write a detailed complaint (minimum 20 characters)
3. The form validates in real-time, showing error messages
4. Once all fields are valid, click "Submit Complaint"
5. You'll be redirected to the complaints list upon successful submission

### View Complaints
1. Click "View All Complaints" or navigate from the form
2. See all submitted complaints displayed in cards
3. Each complaint shows complete information with submission timestamp
4. Delete individual complaints by clicking the "Delete" button
5. Click "Clear All Complaints" to remove all entries (with confirmation)
6. Use "Submit New Complaint" button to go back to the form

## Validation Rules

| Field | Rules |
|-------|-------|
| First Name | Required, letters only |
| Last Name | Required, letters only |
| Username | Required, minimum 3 characters, must be unique |
| Location | Required, letters only |
| Phone Number | Required, 10-15 digits only |
| Complaint | Required, minimum 20 characters |

## localStorage Format

Complaints are stored in localStorage as a JSON array:

```json
[
  {
    "id": 1707865234567,
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "location": "New York",
    "phoneNumber": "5551234567",
    "complaint": "This is a detailed complaint about the service...",
    "submittedAt": "2/13/2026, 10:30:45 AM"
  }
]
```

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Color Scheme

- **Primary Color:** #2563eb (Blue)
- **Success Color:** #16a34a (Green)
- **Danger Color:** #dc2626 (Red)
- **Background:** #f8fafc (Light Gray)
- **Text:** #1e293b (Dark Gray)

## Key Components

### ComplaintForm.jsx
Handles form submission with Formik and Yup validation:
- Form state management with Formik
- Schema-based validation using Yup
- Custom validator for username uniqueness
- localStorage integration for storing complaints
- Success notification and redirection

### ComplaintsList.jsx
Displays stored complaints with management features:
- Load complaints from localStorage
- Display in responsive grid layout
- Individual complaint deletion
- Clear all complaints with confirmation
- Empty state handling

### App.jsx
Main application component with routing:
- React Router setup with two main routes
- Navigation between pages
- Header and footer
- Responsive layout

## Validation Implementation

### Form Validation Schema
```javascript
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
      // Custom validation checking localStorage
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
```

## Data Flow

1. **Submission Flow:**
   - User fills form → Formik validates → Yup schema checks
   - Username uniqueness checked against localStorage
   - If valid → Data saved to localStorage → Success message → Redirect to complaints list

2. **Display Flow:**
   - Load complaints from localStorage on component mount
   - Parse JSON data
   - Render in responsive grid
   - Allow deletion and clear operations

## CSS Architecture

- **CSS Variables** for color consistency
- **Flexbox** for navigation and form layout
- **CSS Grid** for responsive complaints display
- **Media Queries** for mobile responsiveness
- **Animations** for smooth transitions
- **Gradients** for visual appeal

## Future Enhancement Possibilities

- Add search and filter functionality
- Sort complaints by date, location, or name
- Add complaint categories/types
- Implement data export (CSV, PDF)
- Add analytics dashboard
- User authentication
- Edit existing complaints
- Add images/attachments to complaints
- Email notifications
- Backend integration with database

## License

This project is built as an educational demonstration of React form handling and local storage management.

## Notes

- All data is stored locally in the browser and will be cleared if browser cache is cleared
- For production use, consider implementing a backend database
- The application uses localStorage API, which has a typical limit of 5-10MB per domain
- Phone number format accepts 10-15 digits; adjust validation in ComplaintForm.jsx as needed

## Support

For issues or questions, please refer to the component files or the validation schema in ComplaintForm.jsx.
