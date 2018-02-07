import React, { Component } from 'react';
// import logo from './logo.svg';

import './styles/base/Reset.css';
import './styles/base/Base.css';
import './styles/layout/Board.css';
import './styles/layout/Sidebar.css';
import './styles/components/Header.css';
import './styles/helper/Helper.css';
import './styles/font/fontello/css/fontello.css';

import Game from './components/Game';

class App extends Component {
  render() {
    return (
      <div className="app">
        <a href="#main" className="visible-on-focus">Skip to main content</a>
        <Game />
      </div>
    );
  }
}

export default App;
