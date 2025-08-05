

import React, { useEffect } from "react"; // Import React and useEffect hook
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import React Router components
import PlantCatalogPage from "./pages/PlantCatalog"; // Import Plant Catalog page
import MyGarden from "./components/mygardenpage/MyGarden"; // Import MyGarden component
import Home from "./pages/Home"; // Import Home page
import AboutPage from "./pages/AboutPage"; // Import About page
import Footer from "./components/layout/Footer"; // Import Footer component
import Contact from "./components/layout/Contact"; // Import Contact component
import NavBar from "./components/layout/NavBar"; // Import NavBar component
import Privacy from "./components/layout/Privacy"; // Import Privacy page
import Resources from "./components/layout/Resources"; // Import Resources page
import "./styles/App.css"; // Import global app styles
import "./styles/Animation.css"; // Import shared animation styles


// Centralized static leaves array for falling emoji animation
const LEAVES = [
  "🍃", "🍂", "🌿", "🍁", "🌱", "🌵", "🌴", "🌻", "🌷", // Plant and leaf emojis
  "🌺", "🌼", "🌹", "🪴", "🪻", "🪷", "🌾", "🌲", "🌳", // Flower and tree emojis
  "🌽", "🥕", "🥦", "🥬", "🥒", "🍠", "🍆", "🥔", "🍅", // Vegetable emojis
  "🍄", "🍎", "🍊", "🍋", "🍇", "🍒", "🍑", "🍐", "🍏", // Fruit and mushroom emojis
  "🍀", "🪸", "🪹", "🪵", "🪶", "🪺", "🌸" // Miscellaneous nature emojis
];



function App() {
  // Ref to keep track of the last used emoji index
  const lastIndexRef = React.useRef(Math.floor(Math.random() * LEAVES.length));

  // Effect to add falling emoji animation on every click
  useEffect(() => {
    // Handler for click events
    const handleClick = (e) => {
      let index;
      // Pick a random emoji index, avoid repeating the last one
      do {
        index = Math.floor(Math.random() * LEAVES.length);
      } while (index === lastIndexRef.current && LEAVES.length > 1);
      lastIndexRef.current = index; // Update last used index
      const emoji = LEAVES[index]; // Get emoji
      const leaf = document.createElement("span"); // Create span for emoji
      leaf.className = "falling-leaf"; // Add animation class
      leaf.textContent = emoji; // Set emoji as content
      leaf.style.left = `${e.clientX - 12}px`; // Position at click X
      leaf.style.top = `${e.clientY - 12}px`; // Position at click Y
      document.body.appendChild(leaf); // Add to DOM
      setTimeout(() => leaf.remove(), 2000); // Remove after 2 seconds
    };
    document.addEventListener("click", handleClick); // Listen for clicks
    // Cleanup event listener on unmount
    return () => document.removeEventListener("click", handleClick);
  }, []); // Empty dependency array since LEAVES is static

  // Main app render with router and layout
  return (
    <Router>
      <div className="app-container"> {/* App layout container */}
        <NavBar /> {/* Navigation bar at the top */}
        <main className="app-main"> {/* Main content area */}
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home page route */}
            <Route path="/catalog" element={<PlantCatalogPage />} /> {/* Plant catalog route */}
            <Route path="/contact" element={<Contact />} /> {/* Contact page route */}
            <Route path="/privacy" element={<Privacy />} /> {/* Privacy policy route */}
            <Route path="/resources" element={<Resources />} /> {/* Resources page route */}
            <Route path="/my-garden" element={<MyGarden />} /> {/* My Garden route */}
            <Route path="/about" element={<AboutPage />} /> {/* About page route */}
          </Routes>
        </main>
        <Footer /> {/* Footer at the bottom */}
      </div>
    </Router>
  );
}

export default App;
