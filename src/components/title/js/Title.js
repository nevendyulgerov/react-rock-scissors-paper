import React from 'react';
import Slider from '../../../components/slider/js/Slider';
import * as ammo from '../../../common/libs/ammo/js/ammo';
import '../css/Title.css';

class Title extends React.Component {

  animateTitle = () => {
    const menu = ammo.select('.title-items');
    const items = ammo.selectAll('.item', menu.get());
    const itemsCount = items.get().length;
    const offset = 66;
    menu.style('top', el => `${el.offsetTop - el.clientHeight / 2 + offset}px`);

    items.async((resolve, item, index) => {
      ammo.sequence()
        .chain(seq => {
          items.eq(itemsCount - index - 1).classList.add('fade-in');
          seq.resolve();
        })
        .chain(seq => {
          setTimeout(() => {
            menu.style('top', el => `${el.offsetTop + item.clientHeight + 100}px`);
            items.eq(itemsCount - index - 1).classList.add('fade-out');
            seq.resolve();
          }, 1000);
        })
        .chain(() => {
          if ( index === 0 ) {
            this.props.activateBackground();
          }
          resolve();
        })
        .execute();
    });
  };

  componentDidMount = () => this.animateTitle();

  render() {
    return (
      <div className="component title">
        <Slider name="title-items" hasCustomColor={true}/>
      </div>
    )
  };
}

export default Title;
