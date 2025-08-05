
// Import React library and useState hook for state management
import React, { useState } from 'react';
// Import Link component from React Router for navigation
import { Link } from 'react-router-dom';
// Import CSS styles for navigation bar
import "../../styles/NavBar.css";

// Define functional component for navigation bar
function NavBar() {
  // State to track whether mobile menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle mobile menu open/closed state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Flip the current state (true becomes false, false becomes true)
  };

  // Function to close mobile menu (used when user clicks a nav link)
  const closeMenu = () => {
    setIsMenuOpen(false); // Set menu state to closed
  };

  // Return JSX structure for navigation bar
  return (
    <header className="navbar"> {/* Main header element with navbar styling */}
      <div className="navbar-header"> {/* Container for logo and mobile menu button */}
        <h1> {/* Main site title/logo */}
          <span className="title-line-1">Home Botanicals</span> {/* First line of title */}
          <span className="title-line-2">Bible</span> {/* Second line of title */}
        </h1>
        <button
          className={`hamburger ${isMenuOpen ? 'open' : ''}`} // Dynamic class based on menu state
          onClick={toggleMenu} // Handle click to toggle mobile menu
          aria-label="Toggle navigation menu" // Accessibility label for screen readers
        >
          <span className="hamburger-line"></span> {/* First line of hamburger icon */}
          <span className="hamburger-line"></span> {/* Second line of hamburger icon */}
          <span className="hamburger-line"></span> {/* Third line of hamburger icon */}
        </button>
      </div>
      <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}> {/* Navigation container with dynamic visibility */}
        <Link to="/" onClick={closeMenu}>Home</Link> {/* Navigation link to home page */}
        <Link to="/catalog" onClick={closeMenu}>Plant Catalog</Link> {/* Navigation link to plant catalog */}
        <Link to="/my-garden" onClick={closeMenu}>My Garden</Link> {/* Navigation link to user's garden */}
        <Link to="/about" onClick={closeMenu}>About</Link> {/* Navigation link to about page */}
      </nav>
    </header>
  );
}

// Export NavBar component for use in other parts of the application
export default NavBar;
