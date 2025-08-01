import "./App.css";
import MCPUIResourceRenderer from "./MCPUIResourceRenderer";

function App() {
    const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Miami"];

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
