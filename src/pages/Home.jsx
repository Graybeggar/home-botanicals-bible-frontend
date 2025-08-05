// Import FeaturedPlants component for displaying highlighted plants
import FeaturedPlants from '../components/homepage/FeaturedPlants';
// Import TipOfTheDay component for daily plant care advice
import TipOfTheDay from '../components/homepage/TipOfTheDay';
// Import MyGardenPreview component for user's garden overview
import MyGardenPreview from '../components/homepage/MyGardenPreview';
// Import CSS styles for the Home page
import '../styles/HomePage.css';

// Home functional component for the main landing page
function Home() {
  return (
    <div className="homepage-background"> {/* Main container with background styling */}
      <main className="homepage-main"> {/* Semantic main element for page content */}
        <div className="homepage-top-section"> {/* Container for top row components */}
          <FeaturedPlants /> {/* Component displaying featured/recommended plants */}
          <TipOfTheDay /> {/* Component showing daily plant care tip */}
        </div>
        <MyGardenPreview /> {/* Component showing user's personal garden overview */}
      </main> {/* End main content */}
    </div>
  );
}

// Export Home component for use in routing system
export default Home;
