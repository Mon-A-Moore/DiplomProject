import React, { useContext, useEffect, useState } from 'react';
import style from './companypage.module.scss';

import Modal from '../../components/Modal/Modal';
import CompanyPageItem from './CompanyPageItem';
import BasicTable from '../../components/Table/BasicTable';
import { observer } from 'mobx-react-lite';
import { fetchOneCompany } from '../../http/companyAPI';
import { Context } from '../../components/app/App';
import { fetchUsers } from '../../http/userAPI';
import AddUser from '../../components/Modal/AddUser/AddUser';


const CompanyPage = observer(() => {
  const { company } = useContext(Context);
	const [info, setInfo] = useState({info: []});

   useEffect(() => {
    fetchOneCompany(localStorage.companyId).then(data => (
			console.log(data),
			company.setCompany(data),setInfo(data)));
  }, []);


const test=async()=>{

	const a = await fetchUsers(localStorage.companyId);
	a.map((item)=>{
		delete item.password;
		delete item.createdAt;
		delete item.updatedAt;
		delete item.id;
		delete item.companyId;
	})
	console.log(a);
}
  const [modalActive, setModalActive] = useState(false);
	const [modalUser, setModalUser] = useState(false);
  return (
    <div className={style.container}>
      <div className={style.container__child}>
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
            <ul className={style.list}>

							 {info.info.map((item) => (
                <CompanyPageItem  item={item} />
              ))}  
							
            </ul>
            <button className={style.edit} onClick={() => setModalActive(true)}>
              Редактировать информацию о компании
            </button>
          </div>
        </div>
        <div className={style.main}>
          <BasicTable />
        </div>
      </div>
      <Modal active={modalActive} setActive={() => setModalActive(false)}>
        <p>Заглушка</p>
				<button className={style.test} onClick={() => test()}></button>
				<button className={style.testUser} onClick={() => setModalUser(true)}>Польз</button>
      </Modal>
			<Modal active={modalUser} setActive={() => setModalUser(false)} >
			<AddUser setActive={setModalUser}/>
      </Modal>
			
    </div>
  );
});

export default CompanyPage;
