import React, { useContext, useEffect, useRef, useState } from 'react';
import style from './companypage.module.scss';

import Modal from '../../components/Modal/Modal';
import BasicTable from '../../components/Table/BasicTable';
import { observer } from 'mobx-react-lite';
import { CompanyInfoUpdate, CompanyNewsUpdate, fetchOneCompany } from '../../http/companyAPI';
import { Context } from '../../components/app/App';
import AddUser from '../../components/Modal/AddUser/AddUser';


const CompanyPage = observer(() => {
  const { company } = useContext(Context);
	const [info, setInfo] = useState([]);
	const [news,setNews] = useState([]);
  const [switcher, setSwitcher] = useState(false);
   useEffect(() => {
    fetchOneCompany(localStorage.companyId).then(data => (
			console.log(data),
			company.setCompany(data),setInfo(data.info),setNews(data.news.reverse())));
  }, []);

  useEffect(() => {
    setNews( news.sort(function(a,b){
      return new Date(b.createdAt) - new Date(a.createdAt);
    }))
  }, [news]);

	const [modalUser, setModalUser] = useState(false);

  

	const dateParse=(item)=>{

		let date = new Date(item);
		let mass =["января","февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
		return `${date.getDate()} ${mass[date.getMonth()]} ${date.getFullYear()}, в ${date.getHours()}:${date.getMinutes()}`;

	}


  const NewsEndRef = useRef(null);
  const scrollNews = () => {
    NewsEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  const changeCompanyNews = (key, value, id) => {
    setNews(news.map((i) => (i.id === id ? { ...i, [key]: value } : i)));
  };
  const removeCompanyNewsId = (id) => {
    setNews(news.filter((i) => i.id !== id));
  };

	const addCompanyNews= () => {
    scrollNews();
    setNews([
      {
        id: -news.length,
        title: '',
        description: '',
        createdAt:Date.now(),
      },
      ...news
    ]);
  };
  const changeCheckedNews = (checked,id) => {
    setNews(news.map((i) => (i.id === id ? { ...i, "checked": checked } : i)));   
  };
  const removeCompanyNewsChecked = () => {
    setNews(news.filter((i) => i.checked !== true));   
  };




  const InfoEndRef = useRef(null);
  const scrollInfo = () => {
    InfoEndRef.current.scrollIntoView({ behavior: "smooth" })
  }




  const changeCompanyInfo = (key, value, id) => {
    setInfo(info.map((i) => (i.id === id ? { ...i, [key]: value } : i)));
  };
  const removeCompanyInfoId = (id) => {
    setInfo(info.filter((i) => i.id !== id));
  };


	const addCompanyInfo= () => {
    scrollInfo();
    setInfo([
      ...info,
      {
        id: -info.length,
        title: '',
        description: '',
      },
    ]);
  };

//console.log(info);
const setCompanyInfo=()=>{
 CompanyInfoUpdate(info,localStorage.companyId)
}
const setCompanyNews=()=>{
  CompanyNewsUpdate(news,localStorage.companyId)
}

console.log(info);

  return (
    <div className={style.container}>
      <div className={style.container__child}>
			<div
          className={style.infoboxWrapper}>
<div
          className={style.infobox}
          style={{ height: window.innerHeight - 120 }}
        >
          <div className={style.company}>
            <div className={style.company__name}>{company.company.name}</div>
            <div className={style.picture}>
              <div className={style.logo}>
                <picture>
                  <source
                    type="image/jpeg"
                    srcset={process.env.REACT_APP_API_URL + company.company.logo}
                  ></source>
                  <img
                    width={250}
                    height={80}
                    src={process.env.REACT_APP_API_URL + company.company.logo}
                    alt="логотип"
                  ></img>
                </picture>
              </div>

              <div className={style.image}>
                <picture>
                  <source
                    type="image/jpeg"
                    srcset={process.env.REACT_APP_API_URL + company.company.img}
                  ></source>
                  <img
                    width={250}
                    height={160}
                    src={process.env.REACT_APP_API_URL + company.company.img}
                    alt="фото компании"
                  ></img>
                </picture>
              </div>
            </div>
          </div>

          <div className={style.text}>
					<h3 className={style.typography}>Информация о компании:</h3>
            <ul  className={style.info_list}>
            {switcher?
              info.map((item) => (
                <div  className={style.info_entry}>
                  <div className={style.info_item_center}>
                  <textarea  className={style.info_input_label} id="" placeholder='Заголовок' value={item.title} onChange={(e) => {
                          changeCompanyInfo('title', e.target.value, item.id);
                        }}>
                        </textarea>
                <textarea className={style.info_textarea} id="" placeholder='Текст' value={item.description} onChange={(e) => {
                          changeCompanyInfo('description', e.target.value, item.id);
                        }}></textarea>
                  </div>
                  <div className={style.item_divbutton}>
                    <button className={style.item_divbutton_button} onClick={() => removeCompanyInfoId(item.id)}><svg className={style.svgDel} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g ><line  x1="7" x2="25" y1="7" y2="25"/><line  x1="7" x2="25" y1="25" y2="7"/></g></svg></button>
                  </div>
               </div>
                 ))   
                 :
                 info.map((item) => (
                  <div className={style.info_entry}>
                    <div className={style.info_item_center}>
                  <div className={style.info_input_label}>
                    {item.title}:
                  </div>
                  {!item.title.indexOf("Сайт")|| !item.title.indexOf("Website") || !item.description.indexOf("https")? (
                    <a className={style.info_text_a}  href={!item.description.indexOf("https")?item.description:`https://${item.description}`} target="_blank" rel="noreferrer">
                      {item.description}
                    </a>
                  ) : (
                    <div className={style.info_text}>{item.description}</div>
                  )}
                  </div>
                </div>
            ))
       }
  <div ref={InfoEndRef} ></div>
            </ul>
            {switcher?
            <div className={style.PanelWrapper}>
            <div className={style.Panel}> 
            <button className={style.Panel_item} onClick={() => addCompanyInfo()}>Добавить</button>
            <button className={style.Panel_item} onClick={() => setCompanyInfo()}>Сохранить</button>
            </div>
            </div>
             :
             <></>
             }
          </div>
        </div>
					</div>
        
        <div className={style.main}>
       {/*  <BasicTable /> */}
			 <div className={style.news_content} >
         <label className={style.label}><h2>Последние новости:</h2></label>
			 <ul  className={style.news_list}>
       <div ref={NewsEndRef}></div>
			 {switcher?
              news.map((item) => (
                <div  className={style.news_entry}>
                  <input type="checkbox" className={style.news_checkbox} checked={item.checked?item.checked:false} onChange={(e) => {
                          changeCheckedNews(e.target.checked, item.id);
                        }}></input>
                  <div className={style.news_item_center}>
                  <input  className={style.news_input_label} id="" placeholder='Заголовок' value={item.title} onChange={(e) => {
                          changeCompanyNews('title', e.target.value, item.id);
                        }}>                         
                        </input>
                <textarea className={style.news_textarea} id="" placeholder='Текст' value={item.description} onChange={(e) => {
                          changeCompanyNews('description', e.target.value, item.id);
                        }}></textarea>
                        <div className={style.news_time} >{dateParse(item.createdAt)}</div>
                  </div>
                  <div className={style.item_divbutton}>
                    <button className={style.item_divbutton_button} onClick={() => removeCompanyNewsId(item.id)}><svg className={style.svgDel} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs></defs><title/><g id="cross"><line class="cls-1" x1="7" x2="25" y1="7" y2="25"/><line class="cls-1" x1="7" x2="25" y1="25" y2="7"/></g></svg></button>
                  </div>
               </div>
                 ))   
                 :
                 news.map((item) => (
                  <div className={style.news_entry}>
                     <div className={style.news_item_center}>
                     <div className={style.news_label}>{item.title}</div>
                     <div className={style.news_text} >{item.description}</div>
                     <div className={style.news_time} >{dateParse(item.createdAt)}</div>
                     </div>
                 </div>
                   ))
       }
								</ul>
                {switcher?
                <div className={style.PanelWrapper}>
                  <div className={style.Panel}> 
                  <button className={style.Panel_item} onClick={addCompanyNews}>Добавить</button>
                  <button className={style.Panel_item}  onClick={() => removeCompanyNewsChecked()}>Удалить выбранные</button>
                  <button className={style.Panel_item} onClick={() => setCompanyNews()}>Сохранить</button>
                  </div>
                   </div>
                :
                <></>
                }
            </div>	
					{/* 	<div className={style.main_rightborder}></div>		 */}			
        </div>
      </div>
      {localStorage.role==="ADMIN"?
      <div className={style.swither}>
        <label className={style.swither_label}><p>Редактировать информацию о :</p></label>
                  <div className={style.switherButtons}>
                  <button className={style.switcher_item} onClick={() => setModalUser(true)}>
              Пользователи
            </button>
            <button className={style.switcher_item} onClick={() => setSwitcher(!switcher)}>Компания</button>
                  </div>
      </div>
      :<></>}

			<Modal active={modalUser} setActive={() => setModalUser(false)} >
			<AddUser setActive={setModalUser}/>
      </Modal>

			
    </div>
  );
});

export default CompanyPage;
