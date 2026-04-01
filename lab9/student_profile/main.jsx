// main.jsx  –– Entry point: mounts the React app into the DOM
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';           // root component
import './index.css';              // global styles

/*
 * ReactDOM.createRoot targets the <div id="root"> in index.html.
 * App is rendered inside React.StrictMode for development warnings.
 */
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
