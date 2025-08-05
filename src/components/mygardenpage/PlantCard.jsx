// Import React for component creation
import React from 'react';

// PlantCard component to render individual plant cards
const PlantCard = ({ 
  plant, 
  updatePlant, 
  removePlant, 
  updateLastWatered, 
  setEditingPlant, 
  editingPlant, 
  rooms,
  getNextWateringDate,
  uniqueId // Add unique identifier for file inputs
}) => {
  
  // Handle file upload for custom plant images
  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Get selected file
    if (file) {
      const reader = new FileReader(); // Create file reader
      reader.onload = (event) => {
        updatePlant(plant.id, { customImageUrl: event.target.result }); // Save base64 image
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };

  return (
    <li className="plant-card"> {/* Individual plant card container */}
      <div className="plant-card-buttons"> {/* Button container for image actions */}
        <button 
          className="custom-edit-btn" // Styled edit button
          onClick={() => document.getElementById(`file-input-${uniqueId}-${plant.id}`).click()} // Trigger file input
        >
          📷 Edit {/* Camera emoji with edit text */}
        </button>
        {plant.customImageUrl && ( // Show delete button only if custom image exists
          <button 
            onClick={() => updatePlant(plant.id, { customImageUrl: '' })} // Clear custom image
            className="custom-delete-btn" // Styled delete button
          >
            🗑️ {/* Trash emoji */}
          </button>
        )}
      </div>
      
      <input
        id={`file-input-${uniqueId}-${plant.id}`} // Unique ID for each file input
        type="file" // File input type
        accept="image/*" // Accept only image files
        className="hidden-input" // Hide the input visually
        onChange={handleFileUpload} // Handle file selection
      />
      
      <div className="plant-image-col"> {/* Image container */}
        <img 
          src={plant.customImageUrl || plant.imageUrl || plant.image || 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=120&h=120&fit=crop&crop=center'} // Priority: custom > catalog > fallback
          alt={plant.name} // Accessibility alt text
          className="plant-img" // Styled image class
          onError={(e) => { // Handle image load errors
            e.target.src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=120&h=120&fit=crop&crop=center'; // Fallback image
          }}
        />
      </div>
      
      <div className="plant-details"> {/* Plant information container */}
        <h3 className="plant-name">{plant.name}</h3> {/* Plant name heading */}
        <p className="plant-desc">{plant.description || plant.care || 'Beautiful plant for your garden'}</p> {/* Plant description with fallback */}
        
        <div className="care-instructions"> {/* Care instructions container */}
          <div className="care-instruction-item"> {/* Watering instruction */}
            <strong>💧 Watering:</strong> {plant.wateringInstructions || 'Water when top inch of soil is dry'}
          </div>
          
          <div className="care-instruction-item"> {/* Light requirement */}
            <strong>☀️ Light:</strong> {plant.light || 'Bright indirect sunlight'}
          </div>
          
          <div className="care-instruction-item"> {/* Temperature requirement */}
            <strong>🌡️ Temperature:</strong> {plant.temperature || '65-75°F (18-24°C)'}
          </div>

          <div className="care-instruction-item"> {/* Humidity requirement */}
            <strong>💨 Humidity:</strong> {plant.humidity || 'Moderate (40-60%)'}
          </div>
        </div>

        <div className="last-watered-row"> {/* Last watered information */}
          <div>
            <strong>Last Watered:</strong> {plant.lastWatered || 'Never'} {/* Display last watering date */}
          </div>
          <button 
            className="edit-date-btn" // Styled edit date button
            onClick={() => setEditingPlant(plant.id)} // Enable date editing mode
          >
            Edit Date {/* Button text */}
          </button>
        </div>

        {editingPlant === plant.id && ( // Show date input only when editing this plant
          <div className="last-watered-edit-row"> {/* Date editing container */}
            <input
              type="date" // Date input type
              className="date-input" // Styled date input
              defaultValue={plant.lastWatered} // Pre-fill with current date
              onChange={(e) => { // Handle date changes
                const newDate = e.target.value; // Get new date value
                updatePlant(plant.id, { lastWatered: newDate }); // Update plant with new date
              }}
            />
          </div>
        )}

        <div className="next-water-row"> {/* Next watering information */}
          <strong>Next Watering:</strong> {getNextWateringDate(plant.lastWatered, plant.wateringIntervalDays)} {/* Calculate and display next watering date */}
        </div>

        <label className="room-select-label label-spacing"> {/* Room selection */}
          Room: {/* Label text */}
          <select 
            className="room-select" // Styled select dropdown
            value={plant.room || ''} // Current room value
            onChange={(e) => updatePlant(plant.id, { room: e.target.value })} // Update plant room
          >
            <option value="Unassigned">Unassigned</option> {/* Default unassigned option */}
            {rooms.slice(1).map(room => ( // Map through available rooms (skip 'all')
              <option key={room} value={room}>{room}</option> // Room option
            ))}
          </select>
        </label>

        <label className="notes-label label-spacing"> {/* Notes section */}
          Notes: {/* Label text */}
          <textarea
            className="notes-textarea textarea-sizing" // Styled textarea
            placeholder="Add care notes..." // Placeholder text
            value={plant.notes || ''} // Current notes value
            onChange={(e) => updatePlant(plant.id, { notes: e.target.value })} // Update plant notes
            rows="2" // Number of visible rows
          />
        </label>

        <div className="action-row action-row-spacing"> {/* Action buttons container */}
          <button 
            className="watered-btn" // Styled watering button
            onClick={() => updateLastWatered(plant.id)} // Mark plant as watered
          >
            Mark as Watered {/* Button text */}
          </button>
          <button 
            className="remove-btn" // Styled remove button
            onClick={() => removePlant(plant.id)} // Remove plant from garden
          >
            Remove from Garden {/* Button text */}
          </button>
        </div>
      </div>
    </li>
  );
};

// Export PlantCard component for use in other files
export default PlantCard;
