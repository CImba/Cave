import './App.css';
import {useEffect, useState} from "react";
import PropTypes from "prop-types";

function Card({color, scope, stateColor}) {
    const [isOpen, setOpenState] = useState(false);
    const [openColor, setOpenColor] = useState('');
    const [showColor, setShowColor] = useState('');

  function onCardClick() {
    setOpenState(currIsOpen => !currIsOpen);
    setShowColor(currShowColor => (showColor === '') ? color : openColor);
    setOpenColor(currOpenColor => color);
  }

  useEffect( () => {
      let tmp = isOpen;
      console.log('test - ' + stateColor);
      if (tmp === true) {
          console.log('open');
          if (color === showColor) {
              console.log('match');
              console.log(scope);
              scope = scope + 1;
          }
      } else {
          console.log('close');
      }
  }, [isOpen, color])


    let statusClass = 'card ';
    statusClass += isOpen ? 'card--open' : 'card--close';
    const colorStyle = { backgroundColor: color };

    return (
        <div className={statusClass} onClick={onCardClick} style={colorStyle}>
        </div>
    )
}

Card.propType = {color: PropTypes.string}

export default Card;
