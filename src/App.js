import React from 'react'
import './App.css'
import Main from './components/Main'
import chefTransparent from './assets/chef_transparent.png'

function App() {
  return (
    <div className="App">
      <header className="header">
        <img src={chefTransparent} alt="logo"/><h2>The Lockdown Chef</h2>
      </header>
        <Main />
    </div>
  );
}

export default App;
