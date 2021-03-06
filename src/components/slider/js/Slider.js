import React from 'react';
import ammo from '../../../common/libs/ammo';
import rock from '../../../common/img/rock.png';
import scissors from '../../../common/img/scissors.png';
import paper from '../../../common/img/paper.png';
import chevronUp from '../img/chevron-up.png';
import chevronDown from '../img/chevron-down.png';
import '../css/Slider.css'

class Slider extends React.Component {

  initSlider = () => {
    const slider = ammo.select(`.slider[data-id="${this.props.id}"]`);
    const component = slider.get().closest('.game-interface');
    const sliderItems = ammo.selectAll('.item', slider.get());
    const componentHeight = component.clientHeight;
    let itemHeight = parseInt(componentHeight / sliderItems.get().length, 10);
    let remainingHeight = componentHeight;

    slider.get().style.setProperty('height', `${componentHeight}px`);

    sliderItems.each((item) => {
      item.style.setProperty('height', `${itemHeight}px`);
      remainingHeight -= itemHeight;
    });

    const beforeItem = sliderItems.eq(sliderItems.get().length - 1).cloneNode(true);
    beforeItem.classList.add('before-item');
    const afterItem = sliderItems.eq(0).cloneNode(true);
    afterItem.classList.add('after-item');

    slider.get().prepend(beforeItem);
    slider.get().append(afterItem);

    const topOffset = beforeItem.clientHeight;
    slider.style('top', (el, val) => `${val - topOffset}px`);
  };

  handleSlide = (event, id) => {
    event.preventDefault();
    const slider = ammo.select(`.slider[data-id="${id || this.props.id}"]`);
    let sliderItems = ammo.selectAll('.item', slider.get());
    let activeItemIndex = sliderItems.index('active');
    let activeItem = sliderItems.eq(activeItemIndex);

    if ( ! activeItem || ! activeItem.classList.contains('active') ) {
      return false;
    }

    const beforeItems = sliderItems.filter('before-item');
    const targetItem = beforeItems.eq(0);

    activeItem.classList.remove('active');
    const targetItemClone = targetItem.cloneNode(true);
    targetItemClone.querySelector('img').setAttribute('src', activeItem.querySelector('img').getAttribute('src'));
    targetItemClone.querySelector('img').setAttribute('alt', activeItem.querySelector('img').getAttribute('alt'));
    targetItemClone.querySelector('.label').innerHTML = activeItem.querySelector('.label').innerHTML;

    setTimeout(() => {
      const newItems = ammo.selectAll('.item', slider.get());
      newItems.eq(activeItemIndex - 1).classList.add('active');
      slider.get().prepend(targetItemClone);
    }, 30);
  };

  handleKeyPress = (event, buffer) => {
    const target = event.target;
    const controls = target.parentNode;
    let id;

    if ( event.key !== 'w' &&
      event.key !== 's' &&
      event.key !== 'ArrowUp' &&
      event.key !== 'ArrowDown' ) {
      return false;
    }

    const isLeftPlayerKey = event.key === 'w' || event.key === 's';
    const isRightPlayerKey = event.key === 'ArrowUp' || event.key === 'ArrowDown';

    if ( isLeftPlayerKey ) {
      return buffer('handle-keypress-left-player', 150, () => {
        id = ammo.select('.controls.left-player').get().querySelector('.slider.controls').getAttribute('data-id');
        return this.handleSlide(event, id);
      });
    }

    if ( this.props.playAgainstComputer && this.props.inGame ) {
      return false;
    }

    if ( isRightPlayerKey ) {
      return buffer('handle-keypress-right-player', 150, () => {
        id = ammo.select('.controls.right-player').get().querySelector('.slider.controls').getAttribute('data-id');
        return this.handleSlide(event, id);
      });
    }
  };

  componentDidMount() {
    if ( this.props.hasControls ) {
      this.initSlider();
    }
    const buffer = ammo.buffer();
    window.addEventListener('keydown', (e) => this.handleKeyPress(e, buffer));
  };

  render() {
    return (
      <div className="component slider" data-has-controls={this.props.hasControls}>

        {this.props.hasControls && (
          <button className="trigger slide-up" onClick={(e) => this.handleSlide(e)} title="Slide up">
            <img src={chevronUp} alt="up"/>
          </button>
        )}

        <ul className={`${'slider '+this.props.name}`} data-id={this.props.id}>
          <li className={`item ${this.props.hasCustomColor ? 'paper' : ''}`}>
            <div className="image">
              <img src={paper} alt="paper"/>
            </div>
            <span className="label">Paper</span>
          </li>
          <li className={`item active ${this.props.hasCustomColor ? 'scissors' : ''}`}>
            <div className="image">
              <img src={scissors} alt="scissors"/>
            </div>
            <span className="label">Scissors</span>
          </li>
          <li className={`item ${this.props.hasCustomColor ? 'rock' : ''}`}>
            <div className="image">
              <img src={rock} alt="rock"/>
            </div>
            <span className="label">Rock</span>
          </li>
        </ul>

        {this.props.hasControls && (
          <button className="trigger slide-down" onClick={(e) => this.handleSlide(e)} title="Slide down">
            <img src={chevronDown} alt="down"/>
          </button>
        )}

      </div>
    )
  };
}

export default Slider;
