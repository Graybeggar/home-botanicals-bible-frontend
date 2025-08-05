import React, { useEffect, useState } from "react"; // Import React hooks and core library
import "../../styles/FeaturedPlants.css"; // Import component-specific CSS styles

function FeaturedPlants() {
  const [plants, setPlants] = useState([]); // State to store all plants from API
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => { // Run once when component mounts
    fetch("http://localhost:8080/api/plants") // Fetch plants data from API
      .then(res => res.json()) // Convert response to JSON
      .then(data => { // Handle successful response
        setPlants(data); // Store plants in state
        setLoading(false); // Set loading to false
      })
      .catch(err => { // Handle any errors
        console.error("Error fetching plants:", err); // Log error to console
        setLoading(false); // Set loading to false even on error
      });
  }, []); // Empty dependency array means run only once

  const today = new Date().toISOString().split("T")[0].replace(/-/g, ""); // Get today's date as string (YYYYMMDD format)

  function seededRandom(seed) { // Create deterministic random function based on seed
    let x = parseInt(seed, 10); // Convert seed to integer
    return () => { // Return function that generates pseudo-random numbers
      x = (x * 9301 + 49297) % 233280; // Linear congruential generator formula
      return x / 233280; // Normalize to 0-1 range
    };
  }

  const random = seededRandom(today); // Create random function seeded with today's date
  const shuffledPlants = [...plants].sort(() => random() - 0.5); // Shuffle plants array using seeded random
  const featured = shuffledPlants.slice(0, 3); // Take first 3 plants as featured

  if (loading) return <p>Loading featured plants...</p>; // Show loading message while fetching
  if (featured.length === 0) return <p>No plants available.</p>; // Show message if no plants found

  return (
    <section className="featured-plants-section"> {/* Main container section */}
      <h2 className="featured-plants-title">Today's Featured Plants</h2> {/* Section title */}
      <div className="featured-plants-container"> {/* Container for plant cards */}
        {featured.map((plant) => ( // Loop through featured plants array
          <div key={plant.id} className="featured-plant-card"> {/* Individual plant card */}
            <img
              src={plant.imageUrl} // Plant image source
              alt={plant.name} // Alt text for accessibility
              className="featured-plant-image" // CSS class for image styling
            />
            <h3>{plant.name}</h3> {/* Plant name heading */}
            <p>{plant.description}</p> {/* Plant description text */}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedPlants; // Export component for use in other files
