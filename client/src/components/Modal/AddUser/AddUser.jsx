import React, { useEffect, useRef, useState } from 'react';
import { addUsersCompany, getUsersCompany,deleteUsersCompany } from '../../../http/companyAPI';
import style from './adduser.module.scss';

const AddUser = ({setActive}) => {
	const [switcher, setSwitcher] = useState(true);

	const [companyusers, setCompanyusers] = useState([]);

	const [getcompany, setGetcompany] = useState([]);
	const [delcompany, setDelcompany] = useState([]);

  const getremoveCompanyusers = (id) => {
    setGetcompany(getcompany.filter((i) => i.id !== id));
	let a=	getcompany.filter((i) => i.id === id)
		 setDelcompany([...delcompany,a[0]])
		
  };

  useEffect(() => {
		if(!switcher){
		setCompanyusers([]);
		getUsersCompany({companyId:localStorage.companyId}).then(data => (setGetcompany(data)));
		}
		else
		setGetcompany([]);
		setDelcompany([])
  }, [switcher]);



	const scrolls = useRef(null);
  useEffect(() => {
    scrolls.current.scrollTo(0, 99999);
  }, [companyusers]);




	
	const addCompanyusers = () => {
    setCompanyusers([
      ...companyusers,
      {
        email: '',
        number: Date.now(),
      },
    ]);
  };
  const removeCompanyusers = (number) => {
    setCompanyusers(companyusers.filter((i) => i.number !== number));
  };
  const changeCompanyusers = (key, value, number) => {
    setCompanyusers(
      companyusers.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };



	const onSubmit = async (e) => {
		e.preventDefault();
    try {
			const formData = new FormData();
			formData.append('companyId', localStorage.companyId);
			if(switcher)
			{
			formData.append('companyusers', JSON.stringify(companyusers));
			await addUsersCompany(formData);
			setCompanyusers([]);
			
			}
			else{
				formData.append('delcompanyusers', JSON.stringify(delcompany));
				await deleteUsersCompany(formData);
			}

    } catch (e) {
      alert(e.response.data.message);
    }
  };
  return (
    <div className={style.container}>
			
      <div className={style.container__child}>
          <form id="myform" className={style.forma} onSubmit={onSubmit}>
						<button className={style.switcher} type="button" onClick={()=>{switcher?setSwitcher(false):setSwitcher(true)}}> {switcher?"Удалить":"Добавить"} </button>
						<div className={style.header}>
						<div className={style.header__wrapper}>
						<h3 className={style.typography}>{switcher?"Добавить":"Удалить"} пользователей</h3>
						</div>
						</div>
						<label className={style.label}><h3 className={style.colors}>Почта пользователя:</h3></label>
            <section>
							<section className={style.propertyContainer}>
							{switcher? <>
							 <div ref={scrolls} className={style.propertyList}>
							{companyusers.map((i) => (
                <div className={style.list__itemContainer} key={i.number}>
                  <div className={style.item}>
                    <div className={style.email}>
											
									<input    
											className={style.input}
                        type="email"
                        placeholder="Example@mail.com"
                        onChange={(e) => {
                          changeCompanyusers('email', e.target.value, i.number);
                        }}
												
                      />
                    </div>
                    <div className={style.buttonDel__wrapper}>
                      <button
                        className={style.buttonDel}
                        type="button"
                        onClick={() => removeCompanyusers(i.number)}
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              </div>
								<div className={style.list__button}>
								<div className={style.list__buttonAddWrapper}>
									<button
										className={style.list__buttonAdd}
										type="button"
										onClick={addCompanyusers}
									>
										Добавить
									</button>
								</div></div></>
							:
							<div ref={scrolls} className={style.propertyList}>
							{getcompany.map((i) => (
                <div className={style.list__itemContainer} key={i.id}>
                  <div className={style.item}>
                    <div className={style.email}>
											
										<input    
											className={style.input}
                        type="email"
                        placeholder="Example@mail.com"
                        value={i.email}
												readOnly
												
                      />
                    </div>
                    <div className={style.buttonDel__wrapper}>
                      <button
                        className={style.buttonDel}
                        type="button"
                        onClick={() => getremoveCompanyusers(i.id)}
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              </div>
							}
            </section>
            </section>
						<button className={style.button} type="submit">
            Сохранить
          </button>
          </form>
        </div>
				<button className={style.button__close} type="button" onClick={()=>setActive(false)}>
				<div className={style.cl_btn_7}></div>
          </button>
      </div>
  );
};

export default AddUser;
