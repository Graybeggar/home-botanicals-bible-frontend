import React from 'react'; // Import React library for JSX and component functionality
import ReactDOM from 'react-dom/client'; // Import ReactDOM client for rendering React components to the DOM
import App from './App'; // Import the main App component from the current directory
import './index.css'; // Import global CSS styles for the entire application

ReactDOM.createRoot(document.getElementById('root')).render( // Create React root and attach to HTML element with id 'root'
  <React.StrictMode> {/* Enable React's Strict Mode for development warnings and checks */}
    <App /> {/* Render the main App component inside Strict Mode */}
  </React.StrictMode> // Close Strict Mode wrapper
); // End of render method call
