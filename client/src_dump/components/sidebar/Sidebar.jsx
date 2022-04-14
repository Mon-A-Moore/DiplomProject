import React from 'react';
import './sidebar.scss';

import {Toolbar__item} from '../sidebar.toolbar__item/Toolbar__item';
import {List} from '../sidebar.list/List';

const Sidebar = () => {
  const array = {
    toolbar__item: [
      {
        toolbar_id: 1,
        icon: null,
        toolbar_active: false,
      },
      {
        toolbar_id: 2,
        icon: null,
        toolbar_active: false,
      },
      {
        toolbar_id: 3,
        icon: null,
        toolbar_active: false,
      },
    ],
    list__item: [
      {
        toolbar_id: 1,
        id: 1,
        text: 'гага',
      },
      {
        toolbar_id: 1,
        id: 2,
        text: 'пипа',
      },
      {
        toolbar_id: 2,
        id: 1,
        text: 'сок',
      },
      {
        toolbar_id: 2,
        id: 2,
        text: 'дом',
      },
    ],
  };

  const [selectbutton, setselectbutton] = React.useState([{}, false]);
  return (
    <>
      <div className="sidebar ">
        <ul className="toolbar">
          {array.toolbar__item.map((item) => (
            <Toolbar__item item={item} setselectbutton={setselectbutton} />
          ))}
        </ul>
        {array.list__item.map(
          (item) =>
            selectbutton[0] === item.toolbar_id && (
              <List list={item} selected={selectbutton} />
            )
        )}
      </div>
    </>
  );
};

export  {Sidebar};
