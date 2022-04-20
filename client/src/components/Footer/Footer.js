import React, { useContext } from 'react';

import style from './footer.module.scss';

import { observer } from 'mobx-react-lite';
import { CustomLink } from '../CustomLink';
import { COMPANY_REGISTRATION_ROUTE, GRAPH_ROUTE, HOMEPAGE_ROUTE } from '../../utils/consts';
import { useLocation } from 'react-router-dom';
import { Context } from '../app/App';



const Footer = observer(() => {
  const { state } = useContext(Context);
  const location = useLocation();
	const isHomepage = (location.pathname === HOMEPAGE_ROUTE)? true: (location.pathname === COMPANY_REGISTRATION_ROUTE)? true:(location.pathname === GRAPH_ROUTE)? true:false;
  return (
    <>
      {state.user && !isHomepage ? (
        <div className={style.footer} >
					<div className={style.mid} >
            <div className={style.test}></div>
          </div>

        </div>
      ) : (
        <></>
      )}
    </>
  );
});

export default Footer;
