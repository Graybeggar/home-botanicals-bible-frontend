// Import React library for component creation
import React, { useState } from "react"; // Import useState hook for state management
import "../../styles/ContactPage.css"; // Import CSS styles for contact page

// Define functional component for Contact page
function Contact() {
  // Initialize state for form data with default empty values
  const [formData, setFormData] = useState({
    name: "", // User's name input
    email: "", // User's email input
    message: "", // User's message text
    reason: "", // Reason for contacting (dropdown selection)
    subscribe: false, // Newsletter subscription checkbox state
  });

  // Initialize state for form validation error messages
  const [errors, setErrors] = useState({});

  // Define validation function to check form inputs
  const validate = () => {
    const newErrors = {}; // Create empty object to store errors
    if (!formData.name.trim()) newErrors.name = "Name is required."; // Check if name is empty
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required."; // Basic email validation
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty."; // Check if message is empty
    if (!formData.reason) newErrors.reason = "Please select a reason for contact."; // Check if reason is selected
    return newErrors; // Return object containing all validation errors
  };

  // Handle input changes for all form fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target; // Destructure event target properties
    setFormData((prev) => ({ // Update form data state
      ...prev, // Spread previous state to keep other fields unchanged
      [name]: type === "checkbox" ? checked : value, // Use checked for checkboxes, value for other inputs
    }));
  };

  // Handle form submission when user clicks submit button
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const validationErrors = validate(); // Run validation on current form data
    if (Object.keys(validationErrors).length === 0) { // Check if no validation errors exist
      alert("Thank you! Your message has been sent."); // Show success message to user
      // Form submitted successfully - in a real app, this would send to a server
      // Reset form data to initial empty state
      setFormData({
        name: "", // Clear name field
        email: "", // Clear email field
        message: "", // Clear message field
        reason: "", // Clear reason selection
        subscribe: false, // Reset subscription checkbox
      });
      setErrors({}); // Clear any existing error messages
    } else {
      setErrors(validationErrors); // Set validation errors to display to user
    }
  };

  // Return JSX structure for contact page
  return (
    <div className="contact-page"> {/* Main container for entire contact page */}
      <div className="contact-container"> {/* Inner container for centering content */}
        <div className="contact-header"> {/* Header section with title and description */}
          <h1>Contact Us</h1> {/* Main page title */}
          <p>If you have questions, feedback, or need support, feel free to reach out!</p> {/* Descriptive subtitle */}
        </div>

        <form onSubmit={handleSubmit} className="contact-form"> {/* Form element with submit handler */}
          {/* Name Input Section */}
          <div className="form-group"> {/* Container for name input field */}
            <label htmlFor="name">Name:</label> {/* Label for accessibility and user guidance */}
            <input
              type="text" // Set input type to text
              id="name" // Set ID for label association
              name="name" // Set name attribute for form data
              value={formData.name} // Bind input value to state
              onChange={handleChange} // Handle input changes
            />
            {errors.name && <p className="error-message">{errors.name}</p>} {/* Conditionally display name validation error */}
          </div>

          {/* Email Input Section */}
          <div className="form-group"> {/* Container for email input field */}
            <label htmlFor="email">Email:</label> {/* Label for email input */}
            <input
              type="email" // Set input type to email for browser validation
              id="email" // Set ID for label association
              name="email" // Set name attribute for form data
              value={formData.email} // Bind input value to state
              onChange={handleChange} // Handle input changes
              required // HTML5 required attribute
            />
            {errors.email && <p className="error-message">{errors.email}</p>} {/* Conditionally display email validation error */}
          </div>

          {/* Reason for Contact Dropdown */}
          <div className="form-group"> {/* Container for reason dropdown */}
            <label htmlFor="reason">Reason for Contact:</label> {/* Label for dropdown */}
            <select 
              id="reason" // Set ID for label association
              name="reason" // Set name attribute for form data
              value={formData.reason} // Bind select value to state
              onChange={handleChange} // Handle selection changes
            >
              <option value="">-- Please choose --</option> {/* Default empty option */}
              <option value="feedback">Feedback</option> {/* Feedback option */}
              <option value="bug">Report a Bug</option> {/* Bug report option */}
              <option value="support">Support</option> {/* Support request option */}
            </select>
            {errors.reason && <p className="error-message">{errors.reason}</p>} {/* Conditionally display reason validation error */}
          </div>

          {/* Message Textarea Section */}
          <div className="form-group"> {/* Container for message textarea */}
            <label htmlFor="message">Message:</label> {/* Label for message textarea */}
            <textarea
              id="message" // Set ID for label association
              name="message" // Set name attribute for form data
              value={formData.message} // Bind textarea value to state
              onChange={handleChange} // Handle text changes
              rows="5" // Set number of visible text rows
              required // HTML5 required attribute
            />
            {errors.message && <p className="error-message">{errors.message}</p>} {/* Conditionally display message validation error */}
          </div>

          {/* Newsletter Subscription Checkbox */}
          <div className="form-group"> {/* Container for subscription checkbox */}
            <label 
              htmlFor="subscribe" // Associate label with checkbox
              className="checkbox-label" // Apply specific styling for checkbox label
            >
              <input
                type="checkbox" // Set input type to checkbox
                name="subscribe" // Set name attribute for form data
                id="subscribe" // Set ID for label association
                checked={formData.subscribe} // Bind checkbox state to form data
                onChange={handleChange} // Handle checkbox changes
                className="checkbox-input" // Apply specific styling for checkbox
              />
              Subscribe to Home Botanicals Bible newsletter {/* Checkbox label text */}
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn"> {/* Submit button with styling class */}
            Send Message {/* Button text */}
          </button>
        </form>

        <div className="contact-info"> {/* Additional contact information section */}
          <h3>Get in Touch</h3> {/* Section title */}
          <p> {/* Paragraph containing email contact */}
            Email:{" "} {/* Email label with space */}
            <a 
              href="mailto:support@homebotanicalsbible.app" // Create mailto link
              className="email-link" // Apply styling for email link
            >
              support@homebotanicalsbible.app {/* Display email address */}
            </a>
          </p>
          <p>We typically respond within 24 hours!</p> {/* Response time information */}
        </div>
      </div>
    </div>
  );
}

// Export component
export default Contact;