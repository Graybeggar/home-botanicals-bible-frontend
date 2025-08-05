// Import React hooks for component functionality
import React, { useEffect, useState } from "react";

// Main PlantCatalog component for browsing and adding plants
export default function PlantCatalog() {
  const [plants, setPlants] = useState([]); // State to store all plants from API
  const [loading, setLoading] = useState(true); // Loading state for API fetch
  const [search, setSearch] = useState(""); // Search input filter state
  const [light, setLight] = useState("All"); // Light requirement filter state
  const [size, setSize] = useState("All"); // Plant size filter state

  const getGarden = () => JSON.parse(localStorage.getItem('myGarden') || '[]'); // Helper to get garden from localStorage
  const [garden, setGarden] = useState(getGarden()); // State to track user's garden plants

  // Function to add a plant to the user's garden
  const addToGarden = (plant) => {
    const updatedGarden = [...garden, plant]; // Create new array with added plant
    setGarden(updatedGarden); // Update local state
    localStorage.setItem('myGarden', JSON.stringify(updatedGarden)); // Persist to localStorage
  };

  // Function to remove a plant from the user's garden
  const removeFromGarden = (id) => {
    const updatedGarden = garden.filter(p => p.id !== id); // Filter out the plant by ID
    setGarden(updatedGarden); // Update local state
    localStorage.setItem('myGarden', JSON.stringify(updatedGarden)); // Persist to localStorage
  };
  
  const [petSafeOnly, setPetSafeOnly] = useState(false); // Pet-safe filter checkbox state
  const [page, setPage] = useState(1); // Current page for pagination

  // Effect hook to fetch plants data from API on component mount
  useEffect(() => {
    fetch("http://localhost:8080/api/plants") // Fetch plants from backend API
      .then(res => res.json()) // Parse JSON response
      .then(data => {
        setPlants(data); // Set plants data to state
        setLoading(false); // Turn off loading indicator
      })
      .catch(err => {
        console.error("Error fetching plants:", err); // Log any fetch errors
        setLoading(false); // Turn off loading even on error
      });
  }, []); // Empty dependency array - runs once on mount

  if (loading) return <p className="catalog-loading">🌱 Loading plants...</p>; // Show loading message while fetching

  // Create filter options from unique plant properties
  const lightOptions = ["All", ...Array.from(new Set(plants.map(p => p.light).filter(Boolean)))]; // Get unique light requirements
  const sizeOptions = ["All", ...Array.from(new Set(plants.map(p => p.size).filter(Boolean)))]; // Get unique size options

  // Filter plants based on all active filters
  const filteredPlants = plants.filter(plant => {
    const matchesSearch = // Check if plant matches search query
      plant.name.toLowerCase().includes(search.toLowerCase()) || // Search in plant name
      plant.description.toLowerCase().includes(search.toLowerCase()); // Search in plant description
    const matchesLight = light === "All" || plant.light === light; // Check light requirement filter
    const matchesSize = size === "All" || plant.size === size; // Check size filter
    const matchesPetSafe = !petSafeOnly || plant.petSafe; // Check pet-safe filter (if enabled)
    return matchesSearch && matchesLight && matchesSize && matchesPetSafe; // Return plants that match all filters
  });

  // Pagination calculations
  const plantsPerPage = 10; // Number of plants to show per page
  const totalPages = Math.ceil(filteredPlants.length / plantsPerPage); // Calculate total pages needed
  const startIdx = (page - 1) * plantsPerPage; // Calculate starting index for current page
  const paginatedPlants = filteredPlants.slice(startIdx, startIdx + plantsPerPage); // Get plants for current page

  return (
    <div> {/* Main container for the plant catalog */}
      <div className="catalog-filters"> {/* Filter controls container */}
        <input
          type="text" // Text input for search
          placeholder="🔍 Search plants..." // Placeholder text with search icon
          value={search} // Controlled input value
          onChange={e => { setSearch(e.target.value); setPage(1); }} // Update search and reset to page 1
          className="catalog-search-input" // Styled search input
        />
        <select value={light} onChange={e => { setLight(e.target.value); setPage(1); }} className="catalog-select"> {/* Light filter dropdown */}
          {lightOptions.map(opt => ( // Map through light options
            <option key={opt} value={opt}>{opt === "All" ? "🌞 All Light" : opt}</option> // Option with icon for "All"
          ))}
        </select>
        <select value={size} onChange={e => { setSize(e.target.value); setPage(1); }} className="catalog-select"> {/* Size filter dropdown */}
          {sizeOptions.map(opt => ( // Map through size options
            <option key={opt} value={opt}>{opt === "All" ? "📏 All Sizes" : opt}</option> // Option with icon for "All"
          ))}
        </select>
        <label className="catalog-checkbox-label"> {/* Pet-safe filter checkbox */}
          <input
            type="checkbox" // Checkbox input type
            checked={petSafeOnly} // Controlled checkbox state
            onChange={e => { setPetSafeOnly(e.target.checked); setPage(1); }} // Update pet-safe filter and reset page
            className="catalog-checkbox" // Styled checkbox
          />
          🐾 Pet-Safe Only {/* Checkbox label with paw icon */}
        </label>
      </div>
      <ul className="catalog-plant-list"> {/* List container for plant cards */}
        {paginatedPlants.map(plant => ( // Map through plants for current page
          <li key={plant.id} className="catalog-plant-item"> {/* Individual plant card */}
            {plant.imageUrl && ( // Show image only if URL exists
              <img src={plant.imageUrl} alt={plant.name} className="catalog-plant-image" /> // Plant image
            )}
            <div className="catalog-plant-details"> {/* Plant information container */}
              <h3 className="catalog-plant-name">{plant.name}</h3> {/* Plant name heading */}
              <p className="catalog-plant-description">{plant.description}</p> {/* Plant description */}
              <p className="catalog-plant-info"><strong>💡 Light:</strong> {plant.light}</p> {/* Light requirement with icon */}
              <p className="catalog-plant-info"><strong>📏 Size:</strong> {plant.size}</p> {/* Size info with icon */}
              <p className="catalog-plant-info"><strong>🐾 Pet Safe:</strong> {plant.petSafe ? "✅ Yes" : "❌ No"}</p> {/* Pet safety with icons */}
              <p className="catalog-plant-info"><strong>💧 Watering Interval:</strong> {plant.wateringIntervalDays} days</p> {/* Watering schedule with icon */}
              <p className="catalog-plant-info"><strong>🌿 Care Instructions:</strong> {plant.careInstructions}</p> {/* Care info with icon */}
              {garden.some(p => p.id === plant.id) ? ( // Check if plant is already in garden
                <button onClick={() => removeFromGarden(plant.id)} className="catalog-btn catalog-btn-remove"> {/* Remove button if in garden */}
                  🗑️ Remove from My Garden {/* Button text with trash icon */}
                </button>
              ) : (
                <button onClick={() => addToGarden(plant)} className="catalog-btn catalog-btn-add"> {/* Add button if not in garden */}
                  🌱 Add to My Garden {/* Button text with plant icon */}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="catalog-pagination"> {/* Pagination controls container */}
        <button
          onClick={() => setPage(page - 1)} // Go to previous page
          disabled={page === 1} // Disable if on first page
          className="catalog-pagination-btn" // Styled pagination button
        >
          ⬅️ Previous {/* Previous button with arrow icon */}
        </button>
        <span className="catalog-pagination-info">🌿 Page {page} of {totalPages}</span> {/* Current page info with plant icon */}
        <button
          onClick={() => setPage(page + 1)} // Go to next page
          disabled={page === totalPages} // Disable if on last page
          className="catalog-pagination-btn" // Styled pagination button
        >
          Next ➡️ {/* Next button with arrow icon */}
        </button>
        <div className="catalog-page-numbers"> {/* Individual page number buttons */}
          {Array.from({ length: totalPages }, (_, i) => ( // Create array for each page
            <button
              key={i + 1} // Unique key for each page button
              onClick={() => setPage(i + 1)} // Jump to specific page
              className={`catalog-page-btn ${page === i + 1 ? 'active' : ''}`} // Add active class for current page
            >
              {i + 1} {/* Page number */}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
