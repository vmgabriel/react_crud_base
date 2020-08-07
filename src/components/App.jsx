// Develop: vmgabriel

// Libraries
import React from 'react';

// Components
import HelloWorld from './HelloWorld.jsx';
import NavBar from './partial/Header.jsx';

export default function App() {
  return (
    <React.Fragment>
      <NavBar />
      <HelloWorld />
    </React.Fragment>
  );
};
