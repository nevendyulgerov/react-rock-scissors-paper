import React from 'react';
import * as ammo from '../../../common/libs/ammo/js/ammo';
import Scoreboard from '../../../components/scoreboard/js/Scoreboard';
import PlayersPanel from '../../../components/players-panel/js/PlayersPanel';
import GameInterface from '../../../components/game-interface/js/GameInterface';
import '../css/Game.css'

class Game extends React.Component {

  // initialize persistent in-browser storage
  localStore = ammo.store('rock-scissors-paper');

  // state schema
  state = {
    playAgainstComputer: true,
    inGame: false,
    leftPlayerSelection: null,
    rightPlayerSelection: null,
    currentWinner: null,
    scores: [],
    results: {
      leftPlayer: 0,
      rightPlayer: 0,
      draws: 0,
      winner: 'None'
    }
  };

  toggleComputer = (e) => {
    if ( ! this.state.inGame ) {
      this.setState({
        playAgainstComputer: e.target.checked
      });
    }
  };

  evaluateResult = () => {
    const inGameInterface = ammo.select('.in-game-interface').get();
    const leftPlayerPanel = inGameInterface.querySelector('.left-player-sync');
    const rightPlayerPanel = inGameInterface.querySelector('.right-player-sync');
    const leftPlayerSelection = leftPlayerPanel.querySelector('.label').innerHTML.trim().toLowerCase();
    const rightPlayerSelection = rightPlayerPanel.querySelector('.label').innerHTML.trim().toLowerCase();
    const isDraw = leftPlayerSelection === rightPlayerSelection;
    let result = {
      winner: null,
      results: { leftPlayerSelection, rightPlayerSelection },
      selection: null,
      wasComputer: this.state.playAgainstComputer
    };

    // draw evaluation
    if ( isDraw ) {
      result.winner = 'draw';
      result.selection = leftPlayerSelection;

    } else {

      // rock evaluation
      if ( leftPlayerSelection === 'rock' && rightPlayerSelection === 'scissors' ) {
        result.winner = 'left';
        result.selection = 'rock';
      }
      if ( leftPlayerSelection === 'rock' && rightPlayerSelection === 'paper' ) {
        result.winner = 'right';
        result.selection = 'paper';
      }

      // paper evaluation
      if ( leftPlayerSelection === 'paper' && rightPlayerSelection === 'rock' ) {
        result.winner = 'left';
        result.selection = 'paper';
      }
      if ( leftPlayerSelection === 'paper' && rightPlayerSelection === 'scissors' ) {
        result.winner = 'right';
        result.selection = 'scissors';
      }

      // scissors evaluation
      if ( leftPlayerSelection === 'scissors' && rightPlayerSelection === 'rock' ) {
        result.winner = 'right';
        result.selection = 'rock';
      }
      if ( leftPlayerSelection === 'scissors' && rightPlayerSelection === 'paper' ) {
        result.winner = 'left';
        result.selection = 'scissors';
      }
    }

    return result;
  };

  calculateResults = (scores) => {
    const results = {
      leftPlayerTotal: 0,
      rightPlayerTotal: 0,
      drawsTotal: 0
    };

    scores.reduce((accumulator, score) => {
      if ( score.winner === 'left' ) {
        accumulator.leftPlayerTotal++;
      } else if ( score.winner === 'right' ) {
        accumulator.rightPlayerTotal++;
      } else {
        accumulator.drawsTotal++;
      }
      return accumulator;
    }, results);

    const winner = results.leftPlayerTotal > results.rightPlayerTotal ?
      'Left' : (results.rightPlayerTotal > results.leftPlayerTotal ? 'Right' : `None, it's draw`);

    return Object.assign({ winner }, results);
  };

  runGameSequence = () => {
    const component = ammo.select('.component.game').get();
    const timer = ammo.select('.timer').get();
    const countdown = this.props.countdown;
    const interval = 1000;

    this.setState({ inGame: true });

    if ( this.state.playAgainstComputer ) {
      const triggerUp = ammo.select('.controls.right-player .trigger.slide-down').get();
      let interval = this.props.computerPollingInterval;

      ammo.poll((resolve) => {
        this.state.inGame && triggerUp.click();
        resolve(this.state.inGame);
      }, () => {

      }, interval);
    }

    // iterate recursively
    ammo.recurIter((index, resolve) => {
      if ( index > 0 ) {
        return setTimeout(() => {
          timer.innerHTML = countdown - index;
          resolve(index < countdown);
        }, interval);
      }
      timer.innerHTML = countdown - index;
      resolve(index < countdown);
    }, () => {

      // evaluate result
      const result = this.evaluateResult();
      // get player's name
      const playerName = this.state.playAgainstComputer && result.winner === 'right' ? 'Computer' : `${result.winner} Player`;
      // get winner
      const winner = result.winner !== 'draw' ?
        `${ammo.titlize(playerName)}, with ${result.selection}` : 'None, it was a draw';

      // normalize UI
      ammo.select('.trigger.new-match', component).get().classList.remove('disabled');
      ammo.select('.trigger.toggle-scoreboard', component).get().classList.remove('disabled');
      ammo.select('.trigger.clear-scoreboard', component).get().classList.remove('disabled');
      ammo.select('.in-game-interface', component).get().classList.remove('active');
      ammo.select('.winner-box', component).get().classList.add('active');

      // update state
      this.setState((state) => {
        const scores = [...state.scores, ...[result]];
        const results = this.calculateResults(scores);
        this.localStore.setItem('scores', scores);
        this.localStore.setItem('results', results);

        return {
          inGame: false,
          currentWinner: winner,
          scores,
          results
        };
      });
    });
  };

  clearScoresAndResults = () => {
    const nullifiedResults = Object.assign({}, this.state.results);
    nullifiedResults.leftPlayerTotal = 0;
    nullifiedResults.rightPlayerTotal = 0;
    nullifiedResults.draws = 0;
    nullifiedResults.winner = 'None';
    this.setState({
      scores: [],
      results: nullifiedResults
    });
    this.localStore.setItem('scores', []);
    this.localStore.setItem('results', nullifiedResults);
  };

  componentDidMount = () => {
    if ( ! this.localStore.getData() ) {
      this.localStore.setData({
        scores: this.state.scores,
        results: this.state.results
      });
    }
    this.setState({
      scores: this.localStore.getItem('scores'),
      results: this.localStore.getItem('results')
    });
  };

  render() {
    return (
      <div className="component game">

        <PlayersPanel
          playAgainstComputer={this.state.playAgainstComputer}
          toggleScoreBoard={this.toggleScoreBoard}
        />

        <Scoreboard
          scores={this.state.scores}
          results={this.state.results}
          clearData={this.clearScoresAndResults}
        />

        <GameInterface
          inGame={this.state.inGame}
          timeout={this.props.timeout}
          currentWinner={this.state.currentWinner}
          playAgainstComputer={this.state.playAgainstComputer}
          runGameSequence={this.runGameSequence}
          toggleComputer={this.toggleComputer}
          handleNewMatch={this.handleNewMatch}
        />

      </div>
    )
  };
}

export default Game;
