import "./App.css";
import MCPUIResourceRenderer from "./MCPUIResourceRenderer";

function App() {
  const cities = [
    "Wichita Falls",
    "Covington",
    "Atlanta",
    "Sioux City",
    "Santa Fe",
    "Houston",
    "Knoxville",
    "New York",
    "Los Angeles",
    "Chicago",
    "Miami",
  ];

  return (
    <div className="App">
      {/* <MCPUIResourceRenderer city={"Atlanta"} /> */}
      {cities.map((city) => (
        <MCPUIResourceRenderer key={city} city={city} />
      ))}
    </div>
  );
}

export default App;
