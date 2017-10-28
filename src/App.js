import React, { Component } from 'react';
// import logo from './logo.svg';

import './styles/generic/Reset.css';
import './styles/objects/App.css';

import Game from './components/Game';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Set</h2>
        </div>
        <Game />
      </div>
    );
  }
}

export default App;
