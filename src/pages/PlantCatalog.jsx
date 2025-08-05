// Import PlantCatalog component that contains the main catalog functionality
import PlantCatalog from "../components/plantcatalogpage/PlantCatalog";
// Import CSS styles for the PlantCatalog page layout
import "../styles/PlantCatalog.css";

// PlantCatalogPage functional component that serves as the page wrapper
function PlantCatalogPage() {
  return (
    <div className="plant-catalog-page"> {/* Main page container with styling */}
      <div className="plant-catalog-container"> {/* Content wrapper container */}
        <h1 className="plant-catalog-title">Plant Catalog</h1> {/* Page title heading */}
        <PlantCatalog /> {/* Main PlantCatalog component with all catalog functionality */}
      </div> {/* End content wrapper */}
    </div>
  );
}

// Export PlantCatalogPage component for use in routing system
export default PlantCatalogPage;
