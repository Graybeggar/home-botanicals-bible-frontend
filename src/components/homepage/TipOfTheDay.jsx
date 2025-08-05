import React, { useEffect, useState } from "react"; // Import React hooks
import "../../styles/TipOfTheDay.css"; // Import component-specific CSS styles

export default function TipOfTheDay() {
  const [tip, setTip] = useState(null); // State to store current tip data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [saved, setSaved] = useState(false); // State to track if tip is saved

  useEffect(() => { // Run once when component mounts
    // Try to fetch from API first
    fetch("http://localhost:8080/api/tips") // Attempt to fetch tip from API
      .then(res => { // Handle response
        if (!res.ok) throw new Error('API not available'); // Throw error if response not ok
        return res.json(); // Convert response to JSON
      })
      .then(data => { // Handle successful API response
        setTip(data); // Set tip data from API
        setLoading(false); // Set loading to false

        const favs = localStorage.getItem('favoriteTips'); // Get saved tips from localStorage
        if (favs) { // If saved tips exist
          const arr = JSON.parse(favs); // Parse JSON string to array
          if (arr.some(t => t.text === data.text)) { // Check if current tip is already saved
            setSaved(true); // Mark as saved if found
          }
        }
      })
      .catch(err => { // Handle API errors or unavailability
        console.error("Error fetching tip of the day, using fallback:", err); // Log error
        // Fallback tips when API is not available
        const fallbackTips = [ // Array of backup tips
          { text: "🌿 Water your plants when the top inch of soil feels dry to the touch. This prevents both overwatering and underwatering!" },
          { text: "☀️ Most houseplants prefer bright, indirect sunlight. Direct sunlight can scorch their leaves!" },
          { text: "🌱 Rotate your plants weekly to ensure even growth and prevent them from leaning toward the light." },
          { text: "🍃 Remove dead or yellowing leaves regularly to keep your plant healthy and encourage new growth." },
          { text: "💨 Good air circulation is important for plant health. Avoid placing plants in stuffy corners." },
          { text: "🌡️ Most houseplants thrive in temperatures between 65-75°F (18-24°C)." }
        ];
        const randomTip = fallbackTips[Math.floor(Math.random() * fallbackTips.length)]; // Select random fallback tip
        setTip(randomTip); // Set fallback tip as current tip
        setLoading(false); // Set loading to false
      });
  }, []); // Empty dependency array means run only once

  const saveTip = () => { // Function to save tip to favorites
    if (tip) { // Only proceed if tip exists
      let favs = []; // Initialize empty favorites array
      try { // Try to get existing favorites
        const stored = localStorage.getItem('favoriteTips'); // Get stored favorites from localStorage
        if (stored) favs = JSON.parse(stored); // Parse stored data if it exists
      } catch {} // Ignore any parsing errors

      if (!favs.some(t => t.text === tip.text)) { // Check if tip is not already saved
        favs.push(tip); // Add current tip to favorites
        localStorage.setItem('favoriteTips', JSON.stringify(favs)); // Save updated favorites to localStorage
        setSaved(true); // Mark tip as saved
      }
    }
  };
  if (loading) return <p>Loading tip of the day...</p>; // Show loading message while fetching
  if (!tip) return <p>No tip available.</p>; // Show message if no tip available

  return (
    <div className="tip-of-the-day-container"> {/* Main container for tip component */}
      <h2 className="tip-of-the-day-title">Tip of the Day</h2> {/* Component title */}
      <p>{tip.text}</p> {/* Display the tip text */}
      <button
        className={`tip-save-btn${saved ? ' saved' : ''}`} // Dynamic CSS class based on saved state
        onClick={saveTip} // Click handler to save tip
        disabled={saved} // Disable button if already saved
      >{saved ? 'Saved!' : 'Save to MyGarden'}</button> {/* Dynamic button text */}
      {saved && ( // Only show message if tip is saved
        <p className="tip-saved-msg">This tip is saved to your MyGarden.</p> // Confirmation message
      )}
    </div>
  );
}
