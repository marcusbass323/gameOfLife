import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
      <div id="mobileView">
      <Grid />
      </div>
      <div id="gameWarning">
      <i class="fas fa-skull-crossbones fa-10x"></i>
      <div>Please return to full desktop view to play game</div>
      </div>
    </div>
  );
}

export default App;
