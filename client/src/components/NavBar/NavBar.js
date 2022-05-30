import React, { useContext } from 'react';

import style from './navbar.module.scss';
import { ADMIN_ROUTE, BALANCE_ROUTE, HOMEPAGE_ROUTE, LOGIN_ROUTE } from '../../utils/consts';
//import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";

import { observer } from 'mobx-react-lite';
import { CustomLink } from '../CustomLink';
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../app/App';

//import {useHistory} from 'react-router-dom'

const NavBar = observer(() => {
  const { state,setState } = useContext(Context);
  const location = useLocation();
	const isHomepage = (location.pathname === ADMIN_ROUTE)?false:true;


	const navigate = useNavigate();
	const logOut = () => {
		localStorage.clear();
		setState(prev=>({...prev,user:false}));
		navigate(HOMEPAGE_ROUTE,{ replace: true });
}
  if(location.pathname === HOMEPAGE_ROUTE) return null;
  if(location.pathname === BALANCE_ROUTE) return (
  <div className={style.navbar} >
    <div className={style.mid} >
      <div className={style.title}></div>
      <div className={style.test}></div>
    </div>
  </div>
  );
  return (
    <>
      {state.user && !isHomepage ?  (
        <div className={style.navbar} >
          <div className={style.logo}>
            <CustomLink className={style.a} to={HOMEPAGE_ROUTE}>
              HOMEPAGE
            </CustomLink>
            <CustomLink
              className={style.a}
              to={ADMIN_ROUTE}
              linkcolor="#FFDB00"
            >
              ADMIN
            </CustomLink>
          </div>
					<div className={style.mid} >
            <div className={style.title}>КАКАЯ ТО ИНФОРМАЦИЯ</div>
            <div className={style.test}></div>
          </div>
          {state.user ? (
            <div className={style.auf}>
              <button className={style.button}
							onClick={() => navigate(ADMIN_ROUTE)}>Админ панель</button>
              <CustomLink to={HOMEPAGE_ROUTE}>
                <button
                  className={style.button}
                  onClick={() => logOut()}
                >
                  Выйти
                </button>
              </CustomLink>
            </div>
          ) : (
            <div className={style.auf}>
              <button
                className={style.button}
                onClick={() => navigate(LOGIN_ROUTE)}
              >
                Авторизация
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className={style.navbar}></div>
      )}
    </>
  );
});

export default NavBar;
