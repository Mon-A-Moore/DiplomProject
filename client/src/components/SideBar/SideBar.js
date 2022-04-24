import React, { useContext } from 'react';

import { observer } from 'mobx-react-lite';
import style from './sidebar.module.scss';

import IMAGES from './imgs.js';

import { CustomLink } from '../CustomLink';
import { useLocation } from 'react-router-dom';
import { COMPANY_REGISTRATION_ROUTE, HOMEPAGE_ROUTE } from '../../utils/consts';
import { Context } from '../app/App';

const SideBar = observer(() => {
  const { state } = useContext(Context);
  const location = useLocation();
	const isHomepage = (location.pathname === HOMEPAGE_ROUTE)? true: (location.pathname === COMPANY_REGISTRATION_ROUTE)? true: false;

  return (
    <>
      {state.user && !isHomepage ? (
        <div
				id="sidebar"
          className={style.container}>
          {IMAGES.map((item) => (
              <button className={style.button}>
								<CustomLink className={style.link} to={item.path} bgcolor="green" >  
								<div className={style.block}></div>            
                <div className={style.block_img}>
                  <picture>
                    <source srcset={item.img} type="image/jpeg"></source>
                    <img src="" alt={item.alt}></img>
                  </picture>
                </div>						
								</CustomLink>
								<div className={style.block}></div> 
              </button>
            
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
});

export default SideBar;
