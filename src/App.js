import React, { Component } from 'react';
// import logo from './logo.svg';

import './styles/base/Reset.css';
import './styles/layout/Container.css';
import './styles/layout/Board.css';
import './styles/layout/Sidebar.css';
import './styles/components/Header.css';
import './styles/helper/Helper.css';

import Game from './components/Game';

class App extends Component {
  render() {
    return (
      <div className="app">
        <a href="#main" className="visible-on-focus">Skip to main content</a>
        <header className="app-header">
          <h1>Welcome to Set</h1>
        </header>
        <Game />
      </div>
    );
  }
}

export default App;
