import React from 'react';
import { Route } from 'react-router-dom';
import WelcomeScreen from './components/welcome-screen/js/WelcomeScreen';
import Game from './components/game/js/Game';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Route exact path="/" render={() => (
        <div className="component app">
          <WelcomeScreen/>
          <Game countdown={5} computerPollingInterval={300}/>
        </div>
      )}/>
    );
  }
}

export default App;
