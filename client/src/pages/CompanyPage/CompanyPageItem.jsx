import React from 'react';
import style from './companypage.module.scss';

const CompanyPageItem = (cont) => {
	const item=cont.item;

  return (
    <div className={style.item}>
      <div className={style.item__title}>
        <p>{item.title}:</p>
      </div>
      {item.title==="website" || !item.description.indexOf("http")? (
        <a className={style.item__a} href={item.description}>
          {item.description}
        </a>
      ) : (
        <div className={style.item__content}>{item.description}</div>
      )}
    </div>
  );
};

export default CompanyPageItem;
