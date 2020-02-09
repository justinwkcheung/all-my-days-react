import React, { Component } from 'react';
import Background from './components/background';
import Welcome from "./components/welcome";
import Verse from "./components/verse";
import Clock from "./components/clock";
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="background"></div>
        <Background />
        <div className="title">
          <h1 className="title-line">
            <Clock />
            <Welcome />
          </h1>
          <div className="verse-of-day">
            <Verse />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
