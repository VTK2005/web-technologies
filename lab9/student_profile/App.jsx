// App.jsx  –– Root component: composes the full page layout
import React from 'react';
import ProfileCard from './ProfileCard';   // importing the child component

function App() {
  return (
    /*
     * The App component acts as the root of the React component hierarchy.
     * It renders the ProfileCard component inside a semantic <main> wrapper.
     */
    <main>
      <ProfileCard />
    </main>
  );
}

export default App;
