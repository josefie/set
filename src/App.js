import React, { Component } from 'react';
// import logo from './logo.svg';

import './styles/generic/Reset.css';
import './styles/objects/Header.css';
import './styles/objects/Container.css';
import './styles/objects/Board.css';
import './styles/objects/Sidebar.css';

import Game from './components/Game';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Welcome to Set</h1>
        </header>
        <Game />
      </div>
    );
  }
}

export default App;
