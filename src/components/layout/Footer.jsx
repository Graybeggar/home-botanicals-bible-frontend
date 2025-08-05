// Import Link component from React Router for navigation
import { Link } from 'react-router-dom';
// Import CSS styles for footer component
import '../../styles/Footer.css';

// Define functional component for site footer
function Footer() {
  // Return JSX structure for footer
  return (
    <footer className="footer"> {/* Main footer element with styling class */}
      <div className="footer-links"> {/* Container for navigation links */}
        <Link to="/resources">Resources</Link> {/* Navigation link to Resources page */}
        <Link to="/contact">Contact</Link> {/* Navigation link to Contact page */}
        <Link to="/privacy">Privacy</Link> {/* Navigation link to Privacy page */}
      </div>
      <div className="footer-copyright">© 2025 Home Botanicals Bible</div> {/* Copyright notice with current year */}
    </footer>
  );
}

// Export Footer component for use in other parts of the application
export default Footer;
