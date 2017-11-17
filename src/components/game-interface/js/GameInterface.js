import React from 'react';
import uuid from 'uuid';
import Slider from '../../../components/slider/js/Slider';
import texture from '../../../common/img/texture.png';
import * as ammo from '../../../common/libs/ammo/js/ammo';
import '../css/GameInterface.css';

class GameInterface extends React.Component {

  addSyncPanels = () => {
    const inGameInterface = ammo.select('.in-game-interface').get();
    const leftPlayerPanel = inGameInterface.querySelector('.left-player-sync');
    const rightPlayerPanel = inGameInterface.querySelector('.right-player-sync');

    const leftPlayerImage = document.createElement('img');
    leftPlayerImage.setAttribute('src', '');
    leftPlayerImage.setAttribute('alt', 'left-player-selection');

    const rightPlayerImage = document.createElement('img');
    rightPlayerImage.setAttribute('src', '');
    rightPlayerImage.setAttribute('alt', 'right-player-selection');

    const leftPlayerLabel = document.createElement('div');
    leftPlayerLabel.className = 'label';

    const rightPlayerLabel = document.createElement('div');
    rightPlayerLabel.className = 'label';

    leftPlayerPanel.appendChild(leftPlayerImage);
    leftPlayerPanel.appendChild(leftPlayerLabel);
    rightPlayerPanel.appendChild(rightPlayerImage);
    rightPlayerPanel.appendChild(rightPlayerLabel);
  };

  syncUserSelection = () => {
    const inGameInterface = ammo.select('.in-game-interface').get();
    const leftPlayerPanel = inGameInterface.querySelector('.left-player-sync');
    const rightPlayerPanel = inGameInterface.querySelector('.right-player-sync');

    const leftPlayerSelectedItem = ammo.select('.controls.left-player').find('.item.active').get();
    const rightPlayerSelectedItem = ammo.select('.controls.right-player').find('.item.active').get();

    if ( leftPlayerSelectedItem ) {
      leftPlayerPanel.querySelector('img').setAttribute('src', leftPlayerSelectedItem.querySelector('img').getAttribute('src'));
      leftPlayerPanel.querySelector('.label').innerHTML = leftPlayerSelectedItem.querySelector('.label').innerHTML;
    }

    if ( rightPlayerSelectedItem ) {
      rightPlayerPanel.querySelector('img').setAttribute('src', rightPlayerSelectedItem.querySelector('img').getAttribute('src'));
      rightPlayerPanel.querySelector('.label').innerHTML = rightPlayerSelectedItem.querySelector('.label').innerHTML;
    }
  };

  pollUsersSelection = (interval) => {
    ammo.poll((resolve) => {
      this.syncUserSelection();
      resolve(this.props.inGame);
    }, () => {}, interval);
  };

  handleNewMatch = (event) => {
    const target = event.target;
    if ( target.classList.contains('disabled') ) {
      return false;
    }

    target.classList.add('disabled');
    ammo.select('.trigger.toggle-scoreboard').get().classList.add('disabled');
    ammo.select('.trigger.clear-scoreboard').get().classList.add('disabled');

    const winnerBox = ammo.select('.winner-box').get();
    if ( winnerBox.classList.contains('active') ) {
      winnerBox.classList.remove('active');
    }

    ammo.select('.default-screen').get().classList.remove('active');
    ammo.select('.in-game-interface').get().classList.add('active');

    this.pollUsersSelection(100);
    this.props.runGameSequence();
  };

  componentDidMount = () => {
    this.addSyncPanels();
    this.syncUserSelection();
  };

  render = () => (
    <div className="component game-interface" style={{backgroundImage: `url(${texture})`}}>

      <div className="controls left-player">
        <Slider name="controls" hasControls={true} id={uuid()}/>
      </div>

      <div className="center-screen">
        <div className="default-screen active">
          <div className="game-title">
            <span className="paper">Paper</span>
            <span className="scissors">Scissors</span>
            <span className="rock">Rock</span>
          </div>
        </div>

        <div className="in-game-interface">
          <div className="label">Game starts in: <span className="timer">{this.props.timeout ? parseInt(this.props.timeout / 1000, 10) : 5}</span></div>

          <div className="left-player-sync">
            {/* dynamically populated */}
          </div>

          <span className="versus-tag">VS</span>

          <div className="right-player-sync">
            {/* dynamically populated */}
          </div>
        </div>

        <div className="winner-box">
          <span className="label">Winner is: </span><span className="winner">{this.props.currentWinner || 'None'}</span>
        </div>

        <div className="game-controls">
          <span className="label">Play against computer</span>
          <input
            type="checkbox"
            name="play-against-computer"
            defaultChecked={this.props.playAgainstComputer}
            disabled={this.props.inGame ? 'disabled="disabled"' : ''}
            onChange={(e) => this.props.toggleComputer(e)}
            title="Toggle play-against-computer mode"
          />
        </div>
        <button className="trigger new-match" onClick={(e) => this.handleNewMatch(e)} title="Play a new match">{this.props.inGame ? 'Playing...' : 'New Match'}</button>
      </div>

      <div className="controls right-player computer">
        <Slider name="controls" hasControls={true} id={uuid()}/>
      </div>

    </div>
  );
}

export default GameInterface;
