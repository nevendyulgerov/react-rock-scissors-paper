import React from 'react';
import * as ammo from '../../../common/libs/ammo/js/ammo';
import texture from '../../../common/img/texture.png';
import avatar from '../../../common/img/avatar.jpg';
import '../css/PlayersPanel.css';

class PlayersPanel extends React.Component {

  toggleScoreBoard = (event) => {
    const target = event.target;
    const scoreboard = ammo.select('.scoreboard').get();

    if ( ! scoreboard.classList.contains('active') && ! target.classList.contains('disabled') ) {
      scoreboard.classList.add('active');
    } else if ( ! target.classList.contains('disabled') ) {
      scoreboard.classList.remove('active');
    }
  };

  render = () => (
    <div className="component players-panel" style={{backgroundImage: `url(${texture})`}}>
      <div className="left-player">
        <img className="avatar" src={avatar} alt="left-player-avatar"/>
        <span className="label">Left Player</span>
      </div>

      <div className="button-group">
        <button className="trigger toggle-scoreboard" onClick={(e) => this.toggleScoreBoard(e)} title="Toggle scoreboard">Scoreboard</button>
      </div>

      <div className="right-player">
        <img className="avatar" src={avatar} alt="right-player-avatar"/>
        <span className="label">{this.props.playAgainstComputer ? 'Computer' : 'Right Player'}</span>
      </div>
    </div>
  );
}

export default PlayersPanel;
