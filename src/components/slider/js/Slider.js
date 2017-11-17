import React from 'react';
import * as ammo from '../../../common/libs/ammo/js/ammo';
import rock from '../../../common/img/rock.png';
import scissors from '../../../common/img/scissors.png';
import paper from '../../../common/img/paper.png';
import chevronUp from '../../../common/img/chevron-up.png';
import chevronDown from '../../../common/img/chevron-down.png';
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

  handleSlide = (event, direction) => {
    event.preventDefault();
    const slider = ammo.select(`.slider[data-id="${this.props.id}"]`);
    let sliderItems = ammo.selectAll('.item', slider.get());
    let activeItemIndex = sliderItems.index('active');
    let activeItem = sliderItems.eq(activeItemIndex);

    if ( direction === 'up' ) {
      const beforeItems = sliderItems.filter('before-item');
      const targetItem = beforeItems.eq(0);

      targetItem.querySelector('img').setAttribute('src', activeItem.querySelector('img').getAttribute('src'));
      targetItem.querySelector('img').setAttribute('alt', activeItem.querySelector('img').getAttribute('alt'));
      targetItem.querySelector('.label').innerHTML = activeItem.querySelector('.label').innerHTML;

      const topOffset = targetItem.clientHeight;
      const targetItemClone = targetItem.cloneNode(true);

      slider.style('top', (el, val) => {
        const prevVal = parseInt(val.replace('px', ''), 10);
        return `${prevVal - topOffset - 1}px`;
      });

      activeItem.classList.remove('active');
      const items = ammo.selectAll('.item', slider.get());
      items.filter('after-item').eq(0).classList.remove('after-item');

      const newItems = ammo.selectAll('.item', slider.get());
      newItems.eq(activeItemIndex + 1).classList.add('active');
      newItems.eq(activeItemIndex - 1).classList.add('before-item');
      targetItemClone.classList.remove('before-item');
      targetItemClone.classList.add('after-item');
      slider.get().append(targetItemClone);

    } else if ( direction === 'down' ) {
      const beforeItems = sliderItems.filter('before-item');
      const targetItem = beforeItems.eq(0);
      const topOffset = targetItem.clientHeight;

      activeItem.classList.remove('active');
      const targetItemClone = targetItem.cloneNode(true);
      targetItemClone.querySelector('img').setAttribute('src', activeItem.querySelector('img').getAttribute('src'));
      targetItemClone.querySelector('img').setAttribute('alt', activeItem.querySelector('img').getAttribute('alt'));
      targetItemClone.querySelector('.label').innerHTML = activeItem.querySelector('.label').innerHTML;

      setTimeout(() => {
        const newItems = ammo.selectAll('.item', slider.get());
        newItems.eq(activeItemIndex - 1).classList.add('active');
        slider.get().prepend(targetItemClone)
      }, 100);
    }
  };

  componentDidMount() {
    if ( this.props.hasControls ) {
      this.initSlider();

      const slider = ammo.select(`.slider[data-id="${this.props.id}"]`);
      const component = slider.get().closest('.component.slider');
      const triggerUp = component.querySelector('.trigger.slide-up');

      ammo.poll((resolve) => {
        // triggerUp.click();
        resolve(true);
      }, () => {}, 150);
    }
  };

  render() {
    return (
      <div className="component slider">

        {this.props.hasControls && (
          <button className="trigger slide-up" onClick={(e) => this.handleSlide(e, 'up')}>
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
          <button className="trigger slide-down" onClick={(e) => this.handleSlide(e, 'down')}>
            <img src={chevronDown} alt="down"/>
          </button>
        )}

      </div>
    )
  };
}

export default Slider;
