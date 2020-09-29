import React from 'react';
import './App.css';

//Components
import Header from './Header';
import Subheader from './Subheader';
import Grid from './Grid';
import Rules from './Rules';

function App() {
  return (
    <div className="App">
      <Header />
      <Subheader />
      <br></br>
      <Grid />
    </div>
  );
}

export default App;
