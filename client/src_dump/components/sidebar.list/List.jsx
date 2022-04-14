import React from 'react';
import classNames from 'classnames';
import './list.scss';

const List = (item, selected) => {
  return (
    <ul className={classNames( selected[1] === false && 'list')}>
      <li>
        <div className="list__item ">{item.list.text}</div>
      </li>
    </ul>
  );
};

export {List};
