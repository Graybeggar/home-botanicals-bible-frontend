import React, { useState, useEffect } from "react"; // Import React hooks
import { useNavigate } from "react-router-dom"; // Import navigation hook for routing
import "../../styles/MyGardenPreview.css"; // Import component-specific CSS styles

function MyGardenPreview() {
  const [garden, setGarden] = useState([]); // State to store user's garden plants
  const navigate = useNavigate(); // Hook for programmatic navigation

  useEffect(() => { // Run once when component mounts
    const savedGarden = JSON.parse(localStorage.getItem('myGarden') || '[]'); // Get garden data from localStorage
    setGarden(savedGarden); // Set garden state with saved data
  }, []); // Empty dependency array means run only once

  const formatDate = (isoString) => { // Helper function to format dates
    if (!isoString) return "Never"; // Return "Never" if no date provided
    const d = new Date(isoString); // Create Date object from ISO string
    return d.toLocaleDateString(); // Return formatted date string
  };

  return (
    <section className="my-garden-preview-section"> {/* Main container section */}
      <div className="my-garden-preview-header"> {/* Header container */}
        <h2>My Garden Preview</h2> {/* Section title */}
        <button onClick={() => navigate("/catalog")} className="my-garden-preview-add-btn"> {/* Button to navigate to catalog */}
          ➕ Add More Plants
        </button>
      </div>
      {garden.length > 0 ? ( // Check if garden has plants
        <ul className="my-garden-preview-list"> {/* List container for plants */}
          {garden.map((plant) => ( // Loop through each plant in garden
            <li key={plant.id} className="my-garden-preview-plant"> {/* Individual plant item */}
              {plant.imageUrl && ( // Only show image if URL exists
                <img src={plant.imageUrl} alt={plant.name} className="my-garden-preview-img" /> // Plant image
              )}
              <div> {/* Plant details container */}
                <strong>{plant.name}</strong> {/* Plant name in bold */}
                <div className="my-garden-preview-status">{(() => { // Watering status calculation using IIFE
                  if (!plant.lastWatered || !plant.wateringIntervalDays) return "Unknown"; // Return unknown if missing data
                  const lastWateredDate = new Date(plant.lastWatered); // Create date from last watered string
                  const nextWaterDate = new Date(lastWateredDate); // Copy date for next watering calculation
                  nextWaterDate.setDate(nextWaterDate.getDate() + plant.wateringIntervalDays); // Add interval to get next watering date
                  const now = new Date(); // Current date/time
                  const diffTime = nextWaterDate - now; // Time difference in milliseconds
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert to days (rounded up)
                  if (diffDays < 0) return `💧 Water now! (Next due: ${formatDate(nextWaterDate.toISOString())})`; // Overdue watering
                  if (diffDays <= 3) return `💧 Due soon (${formatDate(nextWaterDate.toISOString())})`; // Due soon warning
                  return `Next due: ${formatDate(nextWaterDate.toISOString())}`; // Normal status
                })()}</div>
                <button
                  className="my-garden-preview-water-btn" // CSS class for button styling
                  onClick={() => { // Click handler for marking plant as watered
                    const updatedGarden = garden.map((p) => // Create new array with updated plant
                      p.id === plant.id // Check if this is the plant being watered
                        ? { ...p, lastWatered: new Date().toISOString() } // Update lastWatered to current time
                        : p // Keep other plants unchanged
                    );
                    setGarden(updatedGarden); // Update state with new garden data
                    localStorage.setItem('myGarden', JSON.stringify(updatedGarden)); // Save to localStorage
                  }}
                >
                  Mark as Watered {/* Button text */}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : ( // If garden is empty
        <p>Your garden is empty. Add some plants from the catalog!</p> // Empty state message
      )}
    </section>
  );
}

export default MyGardenPreview; // Export component for use in other files
