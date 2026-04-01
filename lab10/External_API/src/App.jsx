import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((result) => {
        setData(result.slice(0, 10)); // first 10 items
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <div className="api-box">
        <h2>API Data Fetching</h2>

        {loading && <p className="loading">Loading data...</p>}

        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;