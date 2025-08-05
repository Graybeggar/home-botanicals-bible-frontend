// Import React for component creation
import React from "react";
// Import CSS styles for the About page
import "../styles/About.css";

// AboutPage functional component to display app information
function AboutPage() {
  return (
    <div className="about-page"> {/* Main container for the about page */}
      <div className="about-container"> {/* Content wrapper container */}
        <section className="about-section"> {/* Semantic section for about content */}
          <h1>About Home Botanicals Bible</h1> {/* Main page heading */}

          <div className="about-content"> {/* Container for all about cards */}
            <div className="about-card"> {/* Mission information card */}
              <h2>🌱 Our Mission</h2> {/* Mission heading with plant emoji */}
              <p>This app was created to help beginners care for indoor plants with confidence and success.</p> {/* Mission description */}
            </div>

            <div className="about-card"> {/* Small spaces information card */}
              <h2>🏠 Perfect for Small Spaces</h2> {/* Small spaces heading with house emoji */}
              <p>It's lightweight, pet-safe focused, and tailored specifically for small home spaces and apartment living.</p> {/* Small spaces description */}
            </div>

            <div className="about-card"> {/* Features information card */}
              <h2>🌿 What We Offer</h2> {/* Features heading with leaf emoji */}
              <ul> {/* Unordered list of features */}
                <li>Daily plant care tips</li> {/* Feature: care tips */}
                <li>Curated plant catalog with beginner-friendly options</li> {/* Feature: plant catalog */}
                <li>Personal garden tracking and watering reminders</li> {/* Feature: garden tracking */}
                <li>Pet-safe plant recommendations</li> {/* Feature: pet-safe plants */}
                <li>Care guides for small indoor spaces</li> {/* Feature: space-specific guides */}
              </ul>
            </div>

            <div className="about-card creator-card"> {/* Creator information card with special styling */}
              <h2> Created By</h2> {/* Creator section heading */}
              <p><strong>Bri Hatter</strong></p> {/* Creator name in bold */}
              <p>SWD 2504 Unit 2 Project</p> {/* Project course information */}
              <p>Passionate about making plant care accessible to everyone, especially those new to the wonderful world of indoor gardening.</p> {/* Creator's mission statement */}
            </div>
          </div> {/* End about-content container */}
        </section> {/* End about-section */}
      </div> {/* End about-container */}
    </div>
  );
}

// Export AboutPage component for use in other files
export default AboutPage;
