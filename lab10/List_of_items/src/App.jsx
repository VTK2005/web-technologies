import React, { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([
    { id: 1, name: "Task 1" },
    { id: 2, name: "Task 2" }
  ]);

  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    if (newItem.trim() === "") return;

    const item = {
      id: Date.now(),
      name: newItem
    };

    setItems([...items, item]);
    setNewItem("");
  };

  const handleRemoveItem = (id) => {
    const updatedList = items.filter((item) => item.id !== id);
    setItems(updatedList);
  };

  return (
    <div className="container">
      <div className="list-box">
        <h2>Dynamic List Rendering</h2>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button onClick={handleAddItem}>Add</button>
        </div>

        {items.length === 0 ? (
          <p className="empty">No items available</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.name}
                <button onClick={() => handleRemoveItem(item.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;