// Import MyGarden component that contains the main garden functionality
import MyGarden from "../components/mygardenpage/MyGarden";
// Import CSS styles for the MyGarden page layout
import "../styles/MyGarden.css";

// MyGardenPage functional component that serves as the page wrapper
function MyGardenPage() {
  return (
    <div className="my-garden-page"> {/* Main page container with styling */}
      <div className="my-garden-container"> {/* Content wrapper container */}
        <h1 className="my-garden-title">My Garden</h1> {/* Page title heading */}
        <MyGarden /> {/* Main MyGarden component with all garden functionality */}
      </div> {/* End content wrapper */}
    </div>
  );
}

// Export MyGardenPage component for use in routing system
export default MyGardenPage;
