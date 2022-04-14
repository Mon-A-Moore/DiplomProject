import React from 'react';
import style from './modal.module.scss';
import classNames from 'classnames'
const Modal = ({active,setActive,children}) => {


    return (
			<div className={active? classNames(style.modal,style.active): style.modal} onClick={()=>setActive(false)}>	
				<div className={active? classNames(style.modal__content,style.active): style.modal__content} onClick={e=>e.stopPropagation()}>
{children}
				</div>
			</div>
		);
};

export default Modal;
