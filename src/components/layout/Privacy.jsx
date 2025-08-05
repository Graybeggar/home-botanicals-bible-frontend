
// Import React library for component creation
import React from "react";
// Import CSS styles for privacy page
import "../../styles/Privacy.css";

// Define functional component for Privacy Policy page
function Privacy() {
  // Return JSX structure for privacy policy page
  return (
    <div className="privacy-page"> {/* Main container for entire privacy page */}
      <div className="privacy-container"> {/* Inner container for centering content */}
        <div className="privacy-header"> {/* Header section with page title */}
          <h1>Privacy Policy</h1> {/* Main page title */}
        </div>

        <div className="privacy-content"> {/* Main content section */}
          <p> {/* Introductory paragraph explaining privacy approach */}
            Your privacy matters to us. Below is a summary of how your data is handled in the Home Botanicals Bible app:
          </p>

          <ul> {/* Unordered list of privacy key points */}
            <li>🌱 <strong>Your garden is stored only in your browser.</strong></li> {/* First privacy point with plant emoji and bold text */}
            <li>🔒 <strong>No personal data is collected, sold, or tracked.</strong></li> {/* Second privacy point with lock emoji and bold text */}
            <li>🧹 <strong>You can clear your garden anytime via browser settings.</strong></li> {/* Third privacy point with broom emoji and bold text */}
          </ul>
        </div>

        <div className="privacy-footer"> {/* Footer section with contact information */}
          <p> {/* Paragraph directing users to contact page for questions */}
            If you have any questions or concerns, please contact us via the Contact page.
          </p>
        </div>
      </div>
    </div>
  );
}

// Export Privacy component for use in other parts of the application
export default Privacy;
