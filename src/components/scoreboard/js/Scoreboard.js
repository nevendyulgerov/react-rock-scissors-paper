import React from 'react';
import '../css/Scoreboard.css';

const Scoreboard = props => (
  <div className="component scoreboard">
    <div className="scores">

      <div className="scores-table">
        {props.scores.reverse().map((score, index) => (

          <div className="score" key={index}>
            <div className="score-index">{props.scores.length - index}.</div>

            <div className="left-player">Left player (Human): {score.winner === 'left' ? (
              <span className="won">Won, with {score.selection}</span>
            ) : score.winner !== 'draw' ? (
              <span className="lost">Lost, with {score.results.leftPlayerSelection}</span>
            ) : (
              <span className="draw">Draw</span>
            )}
            </div>

            <div className="right-player">Right player ({score.wasComputer ? 'Computer' : 'Human'}): {score.winner === 'right' ? (
              <span className="won">Won, with {score.selection}</span>
            ) : score.winner !== 'draw' ? (
              <span className="lost">Lost, with {score.results.rightPlayerSelection}</span>
            ) : (
              <span className="draw">Draw</span>
            )}
            </div>
          </div>

        ))}
      </div>

      <div className="total">
        <div className="info left-player">
          {props.results.winner === 'left' ? (
            <span className="winner">Left player: {props.results.leftPlayerTotal}</span>
          ) : (
            `Left player: ${props.results.leftPlayerTotal}`
          )}
        </div>

        <div className="info winner">Winner is: {props.results.winner}</div>

        <div className="info right-player">
          {props.results.winner === 'right' ? (
            <span className="winner">Right player: {props.results.rightPlayerTotal}</span>
          ) : (
            `Right player: ${props.results.rightPlayerTotal}`
          )}
        </div>
      </div>

      <button className="trigger clear-scoreboard" onClick={(e) => props.clearData(e)}>Clear</button>

    </div>
  </div>
);

export default Scoreboard;
