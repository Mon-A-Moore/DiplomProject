import React from 'react';

import './toolbar__item.scss';

const Toolbar__item = ({item, setselectbutton}) => {
  return (
    <li key={item.toolbar_id} className="toolbar__item">
      <button
        onClick={() => setselectbutton([item.toolbar_id, true])}
        className="toolbar__item-button"
      >
        <div>
          <img src={item.icon} alt="иконка листа" />
        </div>
      </button>
    </li>
  );
};

export {Toolbar__item};
