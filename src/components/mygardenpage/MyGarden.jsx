// Import React library and hooks for component creation
import React, { useState, useEffect } from 'react';
// Import CSS styles for MyGarden component
import '../../styles/MyGarden.css';
// Import PlantCard component for rendering individual plants
import PlantCard from './PlantCard';

// Define functional component for My Garden page
function MyGarden() {
  // State for storing user's plants from localStorage
  const [plants, setPlants] = useState([]);
  // State for storing saved tips from localStorage
  const [savedTips, setSavedTips] = useState([]);
  // State for search input filtering
  const [searchTerm, setSearchTerm] = useState('');
  // State for room filter selection
  const [selectedRoom, setSelectedRoom] = useState('all');
  // State for tracking which plant is being edited (date editing)
  const [editingPlant, setEditingPlant] = useState(null);

  // Define available rooms for plant organization
  const rooms = ['all', 'Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Balcony', 'Office', 'Garden'];

  // useEffect hook to handle component initialization and event listeners
  useEffect(() => {
    // Load plants from PlantCatalog saves (key: 'myGarden')
    const loadPlants = () => {
      const savedPlants = localStorage.getItem('myGarden'); // Get plants from localStorage
      if (savedPlants) { // Check if any plants exist
        const plantsData = JSON.parse(savedPlants); // Parse JSON string to object
        // Auto-assign default room for plants without rooms
        const plantsWithRooms = plantsData.map(plant => ({
          ...plant, // Spread existing plant properties
          room: plant.room && plant.room !== 'undefined' ? plant.room : 'Unassigned' // Assign 'Unassigned' if no room
        }));
        setPlants(plantsWithRooms); // Update plants state
        // Save back the updated plants with rooms
        if (JSON.stringify(plantsData) !== JSON.stringify(plantsWithRooms)) { // Check if data changed
          localStorage.setItem('myGarden', JSON.stringify(plantsWithRooms)); // Save updated data
        }
      } else {
        setPlants([]); // Set empty array if no plants found
      }
    };

    // Load tips from TipOfTheDay saves (key: 'favoriteTips')
    const loadTips = () => {
      const savedTipsData = localStorage.getItem('favoriteTips'); // Get tips from localStorage
      if (savedTipsData) { // Check if any tips exist
        const tipsData = JSON.parse(savedTipsData); // Parse JSON string to object
        setSavedTips(tipsData); // Update tips state
      } else {
        setSavedTips([]); // Set empty array if no tips found
      }
    };

    // Initial load of data when component mounts
    loadPlants(); // Load plants from localStorage
    loadTips(); // Load tips from localStorage

    // Listen for storage changes from other tabs/components
    const handleStorageChange = (e) => {
      if (e.key === 'myGarden') { // Check if plants data changed
        loadPlants(); // Reload plants data
      } else if (e.key === 'favoriteTips') { // Check if tips data changed
        loadTips(); // Reload tips data
      }
    };

    // Add event listener for storage changes across browser tabs
    window.addEventListener('storage', handleStorageChange);

    // Also add a focus listener to refresh when user returns to the page
    const handleFocus = () => {
      loadPlants(); // Reload plants when window gains focus
      loadTips(); // Reload tips when window gains focus
    };

    window.addEventListener('focus', handleFocus); // Add focus event listener

    // Cleanup event listeners when component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange); // Remove storage listener
      window.removeEventListener('focus', handleFocus); // Remove focus listener
    };
  }, []); // Empty dependency array means this runs once on mount

  // Function to save plants array to localStorage
  const savePlantsToStorage = (updatedPlants) => {
    localStorage.setItem('myGarden', JSON.stringify(updatedPlants)); // Save plants as JSON string
  };

  // Function to save tips array to localStorage
  const saveTipsToStorage = (updatedTips) => {
    localStorage.setItem('favoriteTips', JSON.stringify(updatedTips)); // Save tips as JSON string
  };

  // Create filtered plants based on search term and selected room
  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Check plant name
                         (plant.description && plant.description.toLowerCase().includes(searchTerm.toLowerCase())); // Check plant description
    const matchesRoom = selectedRoom === 'all' || plant.room === selectedRoom; // Check room filter
    return matchesSearch && matchesRoom; // Both conditions must be true
  });

  // Group plants by room for organized display
  const groupedPlants = rooms.reduce((acc, room) => {
    if (room === 'all') return acc; // Skip 'all' option as it's not a real room
    acc[room] = filteredPlants.filter(plant => plant.room === room); // Filter plants for this room
    return acc; // Return accumulator for next iteration
  }, {}); // Start with empty object

  // Add unassigned plants directly to grouped plants (handles plants with no room or 'undefined')
  groupedPlants['Unassigned'] = filteredPlants.filter(plant => 
    !plant.room || plant.room === 'undefined' || plant.room === 'Unassigned' // Check for unassigned conditions
  );

  // Function to remove a plant from the garden
  const removePlant = (plantId) => {
    const updatedPlants = plants.filter(plant => plant.id !== plantId); // Filter out the plant to remove
    setPlants(updatedPlants); // Update state
    savePlantsToStorage(updatedPlants); // Save to localStorage
  };

  // Function to mark a plant as watered today
  const updateLastWatered = (plantId) => {
    const updatedPlants = plants.map(plant => 
      plant.id === plantId // Find the plant to update
        ? { ...plant, lastWatered: new Date().toISOString().split('T')[0] } // Set today's date
        : plant // Keep other plants unchanged
    );
    setPlants(updatedPlants); // Update state
    savePlantsToStorage(updatedPlants); // Save to localStorage
  };

  // Function to update plant properties
  const updatePlant = (plantId, updates) => {
    const updatedPlants = plants.map(plant => 
      plant.id === plantId ? { ...plant, ...updates } : plant
    );
    setPlants(updatedPlants); // Update state
    savePlantsToStorage(updatedPlants); // Save to localStorage
    // Only close editing mode if we're updating the lastWatered date
    if (updates.lastWatered) {
      setEditingPlant(null);
    }
  };

  // Function to calculate next watering date based on last watered date
  const getNextWateringDate = (lastWatered, wateringFrequency = 7) => {
    if (!lastWatered) return 'Not set'; // Return default if no date set
    const lastDate = new Date(lastWatered); // Convert string to Date object
    const nextDate = new Date(lastDate.getTime() + wateringFrequency * 24 * 60 * 60 * 1000); // Add days in milliseconds
    return nextDate.toLocaleDateString(); // Format as readable date string
  };

  // Function to remove a saved tip by ID or index
  const removeTip = (tipId) => {
    const updatedTips = savedTips.filter((tip, index) => (tip.id || index) !== tipId); // Filter out the tip
    setSavedTips(updatedTips); // Update state
    saveTipsToStorage(updatedTips); // Save to localStorage
  };

  // Return JSX structure for My Garden page
  return (
    <div className="my-garden-page"> {/* Main page container */}
      <div className="my-garden-container"> {/* Inner container for content */}
        <h1 className="my-garden-title">My Garden</h1> {/* Page title */}
        
        <div className="garden-header"> {/* Header section with controls */}
          <div className="garden-title">🌿 Plant Collection</div> {/* Section title with plant emoji */}
          <input
            type="text" // Text input type
            className="garden-search" // Styled search input
            placeholder="Search your plants..." // Placeholder text
            value={searchTerm} // Controlled input value
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
          />
          <label className="garden-room-label"> {/* Room filter label */}
            Room: {/* Label text */}
            <select 
              className="garden-room-select" // Styled select dropdown
              value={selectedRoom} // Controlled select value
              onChange={(e) => setSelectedRoom(e.target.value)} // Update selected room on change
            >
              {rooms.map(room => ( // Map through available rooms
                <option key={room} value={room}> {/* Room option */}
                  {room === 'all' ? 'All Rooms' : room} {/* Display 'All Rooms' for 'all' option */}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Two-column layout: Plants on left, Tips on right */}
        <div className="garden-layout-grid"> {/* Grid container for two-column layout */}
          
          {/* Left Column: Saved Plants */}
          <div className="room-section"> {/* Left column container */}
            <h2 className="room-title">🌱 My Plants ({plants.length})</h2> {/* Plants section title with count */}
            
            {plants.length === 0 ? ( // Check if user has any plants
              <p className="empty-state-text"> {/* Show message when no plants */}
                🌱 No plants saved yet! Visit the Plant Catalog to add plants to your garden.
              </p>
            ) : selectedRoom === 'all' ? ( // Show all rooms with their plants
              Object.entries(groupedPlants).map(([room, roomPlants]) => (
                roomPlants.length > 0 && ( // Only show rooms that have plants
                  <div key={room} className="room-section"> {/* Room container */}
                    <h2 className="room-title">{room}</h2> {/* Room name header */}
                    <div className="plant-grid"> {/* Grid container for plants */}
                      <ul className="plant-list"> {/* List of plants */}
                        {roomPlants.map(plant => ( // Map through plants in this room
                          <PlantCard 
                            key={plant.id} // Unique key for React
                            plant={plant} // Pass plant data
                            updatePlant={updatePlant} // Pass update function
                            removePlant={removePlant} // Pass remove function
                            updateLastWatered={updateLastWatered} // Pass watering function
                            setEditingPlant={setEditingPlant} // Pass editing state setter
                            editingPlant={editingPlant} // Pass current editing state
                            rooms={rooms} // Pass available rooms
                            getNextWateringDate={getNextWateringDate} // Pass date calculation function
                            uniqueId="all" // Unique identifier for file inputs
                          />
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              ))
            ) : ( // Show filtered plants for specific room
              <div className="plant-grid"> {/* Grid container for filtered plants */}
                <ul className="plant-list"> {/* List of filtered plants */}
                  {filteredPlants.map(plant => ( // Map through filtered plants
                    <PlantCard 
                      key={plant.id} // Unique key for React
                      plant={plant} // Pass plant data
                      updatePlant={updatePlant} // Pass update function
                      removePlant={removePlant} // Pass remove function
                      updateLastWatered={updateLastWatered} // Pass watering function
                      setEditingPlant={setEditingPlant} // Pass editing state setter
                      editingPlant={editingPlant} // Pass current editing state
                      rooms={rooms} // Pass available rooms
                      getNextWateringDate={getNextWateringDate} // Pass date calculation function
                      uniqueId="filtered" // Unique identifier for file inputs
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Saved Tips */}
          <div className="room-section"> {/* Right column container */}
            <h2 className="room-title">💡 Saved Tips ({savedTips.length})</h2> {/* Tips section title with count */}
            {savedTips.length === 0 ? ( // Check if user has any saved tips
              <p className="empty-state-text small"> {/* Show message when no tips */}
                💡 No tips saved yet! Save tips from the "Tip of the Day" on the homepage.
              </p>
            ) : (
              <div className="saved-tips-layout"> {/* Container for tips layout */}
                {savedTips.map((tip, index) => ( // Map through saved tips
                  <div key={tip.id || index} className="saved-tip-card"> {/* Individual tip card */}
                    <div className="tip-content-layout"> {/* Tip content container */}
                      <div className="tip-icon">💡</div> {/* Lightbulb icon */}
                      <div className="tip-text-content"> {/* Text content container */}
                        <h4 className="tip-title"> {/* Tip title */}
                          Garden Tip #{index + 1} {/* Sequential tip numbering */}
                        </h4>
                        <p className="tip-text"> {/* Tip text content */}
                          {tip.text} {/* Display tip text */}
                        </p>
                        <button 
                          onClick={() => removeTip(tip.id || index)} // Remove tip on click
                          className="remove-tip-btn" // Styled remove button
                        >
                          🗑️ Remove {/* Trash icon with remove text */}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Export MyGarden component for use in other parts of the application
export default MyGarden;
