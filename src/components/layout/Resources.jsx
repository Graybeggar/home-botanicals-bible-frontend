// Import React library for component creation
import React from "react";
// Import CSS styles for resources page
import "../../styles/Resources.css";

// Define functional component for Resources page
function Resources() {
  // Return JSX structure for resources page
  return (
    <div className="resources-page"> {/* Main container for entire resources page */}
      <div className="resources-container"> {/* Inner container for centering content */}
        <div className="resources-header"> {/* Header section with page title */}
          <h2>Resources</h2> {/* Main page title */}
        </div>

        <div className="resources-content"> {/* Main content section containing all resource lists */}
          <div className="resources-section"> {/* Section container for frontend resources */}
            <h3>Frontend Development References</h3> {/* Section title for frontend links */}
            <ul className="resources-list"> {/* Unordered list for frontend development links */}
              <li><a href="https://www.w3schools.com/jsref/jsref_toisostring.asp" target="_blank" rel="noopener noreferrer">1. W3Schools - toISOString()</a></li> {/* Link to W3Schools JavaScript toISOString method */}
              <li><a href="https://stackoverflow.com/questions/33716998/why-does-seed-9301-49297-233280-233280-0-generate-a-random-number" target="_blank" rel="noopener noreferrer">2. Stack Overflow - Random number seed</a></li> {/* Link to Stack Overflow discussion about random seeding */}
              <li><a href="https://medium.com/@priyanshuahir01/const-shuffledarray-gamearray-sort-math-random-0-5-3f0f30bb38ba" target="_blank" rel="noopener noreferrer">3. Medium - Shuffle array with sort & Math.random()</a></li> {/* Link to Medium article about array shuffling */}
              <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString" target="_blank" rel="noopener noreferrer">4. MDN - Date.toISOString()</a></li> {/* Link to MDN documentation for Date.toISOString */}
              <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString" target="_blank" rel="noopener noreferrer">5. MDN - Date.toLocaleDateString()</a></li> {/* Link to MDN documentation for Date.toLocaleDateString */}
              <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date" target="_blank" rel="noopener noreferrer">6. MDN - JavaScript Date object</a></li> {/* Link to MDN documentation for JavaScript Date object */}
              <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate" target="_blank" rel="noopener noreferrer">7. MDN - Date.setDate()</a></li> {/* Link to MDN documentation for Date.setDate method */}
              <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate" target="_blank" rel="noopener noreferrer">8. MDN - Date.getDate()</a></li> {/* Link to MDN documentation for Date.getDate method */}
              <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/flex" target="_blank" rel="noopener noreferrer">9. MDN - CSS Flexbox</a></li> {/* Link to MDN documentation for CSS Flexbox */}
              <li><a href="https://uxdesign.cc/create-an-accessible-hamburger-menu-869b0301cfd7" target="_blank" rel="noopener noreferrer">10. UX Design - Accessible hamburger menu</a></li> {/* Link to UX Design article about accessible hamburger menus */}
              <li><a href="https://stackoverflow.com/questions/67529409/react-router-on-how-to-collapse-the-navbar-on-mobile-when-selecting-the-menu-lin" target="_blank" rel="noopener noreferrer">11. Stack Overflow - Collapse navbar on mobile (React Router)</a></li> {/* Link to Stack Overflow about collapsing mobile navbar */}
              <li><a href="https://github.com/Matae300/forget-me-not-plant-planner/blob/main/develop/client/src/components/PlantList/index.jsx" target="_blank" rel="noopener noreferrer">12. GitHub - Forget-Me-Not Plant Planner</a></li> {/* Link to GitHub repository for plant planner inspiration */}
              <li><a href="https://www.slingacademy.com/article/converting-iso-formatted-strings-into-javascript-date-objects/" target="_blank" rel="noopener noreferrer">13. Sling Academy - Convert ISO to JavaScript Date</a></li> {/* Link to Sling Academy article about ISO date conversion */}
              <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil" target="_blank" rel="noopener noreferrer">14. MDN - Math.ceil()</a></li> {/* Link to MDN documentation for Math.ceil method */}
              <li><a href="https://github.com/flowerchecker/plant-id-examples" target="_blank" rel="noopener noreferrer">15. GitHub - FlowerChecker Plant ID</a></li> {/* Link to GitHub repository for plant identification examples */}
              <li><a href="https://medium.com/@carlie.anglemire/planning-a-garden-with-a-rails-api-and-react-b2813d5aee77" target="_blank" rel="noopener noreferrer">16. Medium - Planning a garden with Rails API and React</a></li> {/* Link to Medium article about garden planning with Rails and React */}
              <li><a href="https://stackoverflow.com/questions/44309306/exporting-functions-with-reactjs-and-babel" target="_blank" rel="noopener noreferrer">17. Stack Overflow - Exporting functions with React</a></li> {/* Link to Stack Overflow about React function exports */}
              <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank" rel="noopener noreferrer">18. MDN - Window.localStorage</a></li> {/* Link to MDN documentation for localStorage API */}
              <li><a href="https://www.freecodecamp.org/news/use-local-storage-in-modern-applications/" target="_blank" rel="noopener noreferrer">19. FreeCodeCamp - Use localStorage in modern apps</a></li> {/* Link to FreeCodeCamp article about localStorage usage */}
              <li><a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/" target="_blank" rel="noopener noreferrer">20. CSS-TRICKS - CSS Flexbox Layout Guide</a></li> {/* Link to CSS-Tricks comprehensive flexbox guide */}
              <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/overflow" target="_blank" rel="noopener noreferrer">21. MDN - CSS overflow</a></li> {/* Link to MDN documentation for CSS overflow property */}
              <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing" target="_blank" rel="noopener noreferrer">22. MDN - CSS box-sizing</a></li> {/* Link to MDN documentation for CSS box-sizing property */}
              <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit" target="_blank" rel="noopener noreferrer">23. MDN - CSS object-fit</a></li> {/* Link to MDN documentation for CSS object-fit property */}
              <li><a href="https://www.w3docs.com/snippets/html/how-to-create-mailto-links.html" target="_blank" rel="noopener noreferrer">24. W3Docs - How to create mailto links</a></li> {/* Link to W3Docs guide for creating mailto links */}
              <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries" target="_blank" rel="noopener noreferrer">25. MDN - CSS Media Queries</a></li> {/* Link to MDN documentation for CSS media queries */}
            </ul>
          </div>

          <div className="resources-section"> {/* Section container for backend resources */}
            <h3>Backend Development References</h3> {/* Section title for backend links */}
            <ul className="resources-list"> {/* Unordered list for backend development links */}
              <li><a href="https://spring.io/guides/gs/rest-service/" target="_blank" rel="noopener noreferrer">1. Spring - Building a RESTful Web Service</a></li> {/* Link to Spring official guide for REST services */}
              <li><a href="https://www.baeldung.com/spring-requestmapping" target="_blank" rel="noopener noreferrer">2. Baeldung - Spring @RequestMapping</a></li> {/* Link to Baeldung tutorial on Spring RequestMapping annotation */}
              <li><a href="https://www.callicoder.com/spring-boot-rest-api-tutorial-with-mysql-jpa-hibernate/" target="_blank" rel="noopener noreferrer">3. Callicoder - Spring Boot REST API Tutorial with MySQL, JPA, Hibernate</a></li> {/* Link to Callicoder comprehensive Spring Boot tutorial */}
              <li><a href="https://www.baeldung.com/spring-cors" target="_blank" rel="noopener noreferrer">4. Baeldung - CORS with Spring</a></li> {/* Link to Baeldung article about CORS configuration in Spring */}
              <li><a href="https://www.baeldung.com/constructor-injection-in-spring" target="_blank" rel="noopener noreferrer">5. Baeldung - Constructor Injection in Spring</a></li> {/* Link to Baeldung tutorial on constructor injection pattern */}
              <li><a href="https://www.baeldung.com/spring-requestmapping#post" target="_blank" rel="noopener noreferrer">6. Baeldung - Spring @RequestMapping POST</a></li> {/* Link to Baeldung tutorial specifically about POST mapping */}
              <li><a href="https://www.baeldung.com/spring-boot-crud-thymeleaf" target="_blank" rel="noopener noreferrer">7. Baeldung - Spring Boot CRUD Application with Thymeleaf</a></li> {/* Link to Baeldung CRUD application tutorial */}
              <li><a href="https://www.baeldung.com/java-8-date-time-intro#localdate" target="_blank" rel="noopener noreferrer">8. Baeldung - Java 8 Date Time LocalDate</a></li> {/* Link to Baeldung article about Java 8 LocalDate */}
              <li><a href="https://spring.io/guides/gs/accessing-data-jpa" target="_blank" rel="noopener noreferrer">9. Spring - Accessing Data with JPA</a></li> {/* Link to Spring official guide for JPA data access */}
              <li><a href="https://projectlombok.org/features/GetterSetter" target="_blank" rel="noopener noreferrer">10. Project Lombok - @Getter and @Setter</a></li> {/* Link to Project Lombok documentation for getter/setter annotations */}
              <li><a href="https://www.callicoder.com/spring-boot-jpa-hibernate-postgresql-restful-crud-api-example/" target="_blank" rel="noopener noreferrer">11. Callicoder - Spring Boot JPA Hibernate PostgreSQL RESTful CRUD API</a></li> {/* Link to Callicoder PostgreSQL CRUD API tutorial */}
              <li><a href="https://docs.oracle.com/javaee/7/api/javax/persistence/EntityManager.html" target="_blank" rel="noopener noreferrer">12. Oracle - JPA EntityManager API Documentation</a></li> {/* Link to Oracle official JPA EntityManager documentation */}
              <li><a href="https://www.baeldung.com/spring-data-jpa-query" target="_blank" rel="noopener noreferrer">13. Baeldung - Spring Data JPA Query</a></li> {/* Link to Baeldung tutorial on Spring Data JPA queries */}
              <li><a href="https://www.baeldung.com/spring-boot-start" target="_blank" rel="noopener noreferrer">14. Baeldung - Getting Started with Spring Boot</a></li> {/* Link to Baeldung getting started guide for Spring Boot */}
              <li><a href="https://docs.spring.io/spring-boot/tutorial/first-application/index.html#getting-started.first-application" target="_blank" rel="noopener noreferrer">15. Spring Boot - Official First Application Tutorial</a></li> {/* Link to Spring Boot official first application tutorial */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export Resources component for use in other parts of the application
export default Resources;
