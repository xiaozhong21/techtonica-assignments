import React from 'react';
import Weather from './components/Weather'
import './App.scss';

function App() {
  return (
    <div>
      <h1 className='title is-1'>Weather App with React and Express.js</h1>
      <Weather />
    </div>
  );
}

export default App;