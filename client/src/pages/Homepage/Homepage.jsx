import React,{ useContext }  from 'react';
import style from './homepage.module.scss';
import { observer } from 'mobx-react-lite';

import { COMPANY_ROUTE, LOGIN_ROUTE } from '../../utils/consts';
import { CustomLink } from '../../components/CustomLink';
import { Context } from '../../components/app/App';


const Homepage = observer(() => {
	const { state } = useContext(Context);
  return (
    <div
      className={style.container}
      style={{height: window.innerHeight }}
    >
      <div className={style.block}>
        <video
          className={style.video}
          src={require('../../video/aaa2.mp4')}
          autoplay="autoplay"
          preload=""
          muted="muted"
          playsinline=""
          loop="loop"
          webkit-playsinline=""
					poster={require('../../img/aaa.jpg')}
        >
          {' '}
        </video>

<div className={style.video__back}></div>
<div className={style.centre}>
{state.user ? <CustomLink to={COMPANY_ROUTE+'/'+localStorage.companyId} colordefault='white'><button className={style.button}><p>Войти</p></button></CustomLink> : <CustomLink to={LOGIN_ROUTE} colordefault='white'><button className={style.button}><p>Войти</p></button></CustomLink>}

<div className={style.button__back}></div></div>

      </div>
    </div>
  );
});

export default Homepage;
