import React, { useContext } from 'react';

import style from './footer.module.scss';

import { observer } from 'mobx-react-lite';
import { CustomLink } from '../CustomLink';
import { ADMIN_ROUTE, BALANCE_ROUTE, COMPANY_REGISTRATION_ROUTE, COMPANY_ROUTE, GRAPH_ROUTE, HOMEPAGE_ROUTE } from '../../utils/consts';
import { useLocation } from 'react-router-dom';
import { Context } from '../app/App';



const Footer = observer(() => {
  const { state } = useContext(Context);
  const location = useLocation();
	const isHomepage = (location.pathname === ADMIN_ROUTE)?false:true;


  if(location.pathname === HOMEPAGE_ROUTE || location.pathname === GRAPH_ROUTE) return null;
  if(location.pathname === BALANCE_ROUTE) return (
    <div className={style.footer} >
					<div className={style.mid} >
            <div className={style.test}></div>
          </div>
          </div>
  );
  return (
    <>
      {state.user && !isHomepage ? (
        <div className={style.footer} >
					<div className={style.mid} >
            <div className={style.test}></div>
          </div>

        </div>
      ) : (
       <div className={style.footer}></div>
      )}
    </>
  );
});

export default Footer;
