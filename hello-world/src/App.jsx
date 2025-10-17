import { useState } from "react";
import axios from "axios";
import "./App.css"; // Import the new CSS file

function App() {
  
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to handle loading

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setIsLoading(true); // Start loading
    setMessage(""); // Clear previous message
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081";

    // const API_URL = "http://localhost:8081";
    // const API_URL = "http://localhost:8081"||process.env.REACT_APP_API_URL;
    
    
    
    try {
      const response = await axios.post(`${API_URL}/sum`, {
        num1: parseInt(num1) || 0, // Default to 0 if input is empty
        num2: parseInt(num2) || 0, // Default to 0 if input is empty
        name: name,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error calling backend", error);
      // Set a user-friendly error message
      setMessage("Failed to calculate. Please check the backend connection.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="app-container">
      <div className="calculator-card">
        <h1>React + Spring Boot</h1>
        <p className="subtitle">Sum Calculator</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="num1">First Number</label>
            <input
              id="num1"
              type="number"
              placeholder="e.g., 10"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="num2">Second Number</label>
            <input
              id="num2"
              type="number"
              placeholder="e.g., 25"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Calculating..." : "Calculate Sum"}
          </button>
        </form>
        {message && (
          <div className="result-message">
            <h3>{message}</h3>
            {/* <h3>{API_URL}</h3> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;