import React from 'react';

import './header.scss';

const Header = () => {
  return (
    <div className="header">
			<div className="header__icon">лого компании</div>
      <div className="header__name">
        <p>Р.Л. Стивенсон</p>
      </div>
      <div className="header__account">аккаунт</div>
    </div>
  );
};

export {Header};
