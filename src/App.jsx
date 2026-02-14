import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import ComplaintForm from './components/ComplaintForm';
import ComplaintsList from './components/ComplaintsList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Public Complaint Portal</h1>
          <p className="header-subtitle">Report issues and view community complaints</p>
        </header>
        
        <nav className="app-nav">
          <ul className="nav-list">
            <li><NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Submit Complaint</NavLink></li>
            <li><NavLink to="/complaints" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>View All Complaints</NavLink></li>
          </ul>
        </nav>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<ComplaintForm />} />
            <Route path="/complaints" element={<ComplaintsList />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>&copy; 2026 Public Complaint Portal. All complaints are stored locally.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
