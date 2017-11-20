import React from 'react';
import ammo from '../../../common/libs/ammo';
import Title from '../../../components/title';
import '../css/WelcomeScreen.css';

class WelcomeScreen extends React.Component {

  /**
   * @description Create background panels
   * @param callback
   */
  createBackground = (callback) => {
    const rows = 6;
    const cols = 6;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const panelWidth = parseInt(width / cols, 10);
    const panelHeight = parseInt(height / rows, 10);
    let x = 0;
    let y = 0;
    let remainingHeight = height;
    const background = ammo.select('.component.welcome-screen .background').get();
    let existingPanels = ammo.selectAll('.background-panel', background);

    if ( existingPanels.get().length > 0 ) {
      existingPanels.each(panel => ammo.removeEl(panel));
    }

    for ( let r = 0; r < rows; r++ ) {
      let remainingWidth = width;

      for ( let c = 0; c < cols; c++ ) {
        const backgroundPanel = document.createElement('div');

        backgroundPanel.className = 'background-panel';
        backgroundPanel.style.setProperty('top', `${y}px`, '');
        backgroundPanel.style.setProperty('left', `${x}px`, '');
        backgroundPanel.style.setProperty('width', `${c < cols - 1 ? panelWidth : panelWidth + remainingWidth}px`, '');
        backgroundPanel.style.setProperty('height', `${r < rows - 1 ? panelHeight : panelHeight + remainingHeight}px`, '');
        background.appendChild(backgroundPanel);

        x += panelWidth;
        remainingWidth -= panelWidth;
      }

      x = 0;
      y += panelHeight;
      remainingHeight -= panelHeight;
    }

    if ( ammo.isFunc(callback) ) {
      callback();
    }
  };

  /**
   * @description Animate background panels
   * @param callback
   */
  animateBackground = (callback) => {
    const initialOffset = 10;
    const panels = ammo.selectAll('.background-panel');
    const offset = 600;
    const colMax = 6;
    const rowMax = 6;
    let colIndex = -1;
    let rowIndex = 0;
    let panelGroupTopLeft;
    let panelGroupTopRight;
    let panelGroupBottomRight;
    let panelGroupBottomLeft;
    let topLeftGroup;
    let topRightGroup;
    let bottomRightGroup;
    let bottomLeftGroup;

    ammo.sequence()
      .chain(seq => setTimeout(seq.resolve, 1000))
      .chain(seq => {
        panels.each(panel => panel.classList.add('active'));
        setTimeout(seq.resolve, 1000);
      })
      .chain(seq => {
        panelGroupTopLeft = ammo.selectAll('.background-panel').filter((panel, index) => {
          if ( index % colMax === 0 ) {
            colIndex = -1;
            rowIndex++;
          }
          colIndex++;
          return rowIndex <= 3 && colIndex <= 2;
        });

        colIndex = -1;
        rowIndex = 0;
        panelGroupTopRight = ammo.selectAll('.background-panel').filter((panel, index) => {
          if ( index % colMax === 0 ) {
            colIndex = -1;
            rowIndex++;
          }
          colIndex++;
          return rowIndex <= 3 && colIndex > 2;
        });

        colIndex = -1;
        rowIndex = 0;
        panelGroupBottomRight = ammo.selectAll('.background-panel').filter((panel, index) => {
          if ( index % colMax === 0 ) {
            colIndex = -1;
            rowIndex++;
          }
          colIndex++;
          return rowIndex > 3 && colIndex > 2;
        });

        colIndex = -1;
        rowIndex = 0;
        panelGroupBottomLeft = ammo.selectAll('.background-panel').filter((panel, index) => {
          if ( index % colMax === 0 ) {
            colIndex = -1;
            rowIndex++;
          }
          colIndex++;
          return rowIndex > 3 && colIndex <= 2;
        });
        seq.resolve();
      })
      .chain(seq => {
        const initialColIndex = -2;
        colIndex = initialColIndex;
        rowIndex = 0;
        const groupColMax = Math.ceil(colMax / 2);
        const groupRowMax = Math.ceil(rowMax / 2);
        let allowedCols = groupColMax;

        topLeftGroup = ammo.selectAll(panelGroupTopLeft.get()).filter((panel, index) => {
          if ( index % groupColMax === 0 ) {
            colIndex = initialColIndex + 1;
            rowIndex++;
            allowedCols--;
          }
          colIndex++;
          return rowIndex <= groupRowMax && colIndex <= allowedCols;
        });

        colIndex = initialColIndex;
        rowIndex = 0;
        allowedCols = groupColMax;
        let skippedCols = -2;
        topRightGroup = ammo.selectAll(panelGroupTopRight.get()).filter((panel, index) => {
          if ( index % groupColMax === 0 ) {
            colIndex = initialColIndex + 1;
            rowIndex++;
            skippedCols++;
          }
          colIndex++;
          return colIndex > skippedCols && rowIndex <= groupRowMax && colIndex <= allowedCols;
        });

        colIndex = initialColIndex;
        rowIndex = 0;
        allowedCols = groupColMax;
        skippedCols = 2;
        bottomRightGroup = ammo.selectAll(panelGroupBottomRight.get()).filter((panel, index) => {
          if ( index % groupColMax === 0 ) {
            colIndex = initialColIndex + 1;
            rowIndex++;
            skippedCols--;
          }
          colIndex++;
          return colIndex > skippedCols && rowIndex <= groupRowMax && colIndex <= allowedCols;
        });

        colIndex = initialColIndex;
        rowIndex = 0;
        allowedCols = -1;
        bottomLeftGroup = ammo.selectAll(panelGroupBottomLeft.get()).filter((panel, index) => {
          if ( index % groupColMax === 0 ) {
            colIndex = initialColIndex + 1;
            rowIndex++;
            allowedCols++;
          }
          colIndex++;
          return colIndex <= allowedCols && rowIndex <= groupRowMax && colIndex <= allowedCols;
        });

        seq.resolve();
      })
      .chain(seq => {
        panelGroupTopLeft.each(panel => {
          panel.style.setProperty('top', `${panel.offsetTop - initialOffset}px`);
          panel.style.setProperty('left', `${panel.offsetLeft - initialOffset}px`);
        });

        panelGroupTopRight.each(panel => {
          panel.style.setProperty('top', `${panel.offsetTop - initialOffset}px`);
          panel.style.setProperty('left', `${panel.offsetLeft + initialOffset}px`);
        });

        panelGroupBottomRight.each(panel => {
          panel.style.setProperty('top', `${panel.offsetTop + initialOffset}px`);
          panel.style.setProperty('left', `${panel.offsetLeft + initialOffset}px`);
        });

        panelGroupBottomLeft.each(panel => {
          panel.style.setProperty('top', `${panel.offsetTop + initialOffset}px`);
          panel.style.setProperty('left', `${panel.offsetLeft - initialOffset}px`);
        });

        seq.resolve();
      })
      .chain(seq => setTimeout(seq.resolve, 600))
      .chain(seq => {
        topLeftGroup.each(panel => {
          panel.style.setProperty('top', `${panel.offsetTop - initialOffset * 2}px`);
          panel.style.setProperty('left', `${panel.offsetLeft - initialOffset * 2}px`);
        });
        topRightGroup.each(panel => {
          panel.style.setProperty('top', `${panel.offsetTop - initialOffset * 2}px`);
          panel.style.setProperty('left', `${panel.offsetLeft + initialOffset * 2}px`);
        });
        bottomRightGroup.each(panel => {
          panel.style.setProperty('top', `${panel.offsetTop + initialOffset * 2}px`);
          panel.style.setProperty('left', `${panel.offsetLeft + initialOffset * 2}px`);
        });
        bottomLeftGroup.each(panel => {
          panel.style.setProperty('top', `${panel.offsetTop + initialOffset * 2}px`);
          panel.style.setProperty('left', `${panel.offsetLeft - initialOffset * 2}px`);
        });
        seq.resolve();
      })
      .chain(seq => setTimeout(seq.resolve, 600))
      .chain(seq => {
        topLeftGroup.each(panel => {
          panel.style.setProperty('top', `${panel.offsetTop - offset}px`);
          panel.style.setProperty('left', `${panel.offsetLeft - offset}px`);
        });
        topRightGroup.each(panel => {
          panel.style.setProperty('top', `${panel.offsetTop - offset}px`);
          panel.style.setProperty('left', `${panel.offsetLeft + offset}px`);
        });
        bottomRightGroup.each(panel => {
          panel.style.setProperty('top', `${panel.offsetTop + offset}px`);
          panel.style.setProperty('left', `${panel.offsetLeft + offset}px`);
        });
        bottomLeftGroup.each(panel => {
          panel.style.setProperty('top', `${panel.offsetTop + offset}px`);
          panel.style.setProperty('left', `${panel.offsetLeft - offset}px`);
        });
        seq.resolve();
      })
      .chain(seq => setTimeout(seq.resolve), 300)
      .chain(seq => {
        ammo.selectAll('.background-panel').each(panel => panel.classList.add('fade-out'));
        seq.resolve();
      })
      .chain(() => {
        ammo.select('.component.game').get().classList.add('active');
        if ( ammo.isFunc(callback) ) {
          callback();
        }
      })
      .execute();
  };

  componentDidMount = () => this.createBackground();

  render() {
    return (
      <div className="component welcome-screen">
        <div className="background">
          {/* dynamically populated */}
          </div>
        <Title activateBackground={this.animateBackground}/>
      </div>
    )
  };
}

export default WelcomeScreen;
