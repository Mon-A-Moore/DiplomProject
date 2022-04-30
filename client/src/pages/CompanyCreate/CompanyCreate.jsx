import { useForm } from 'react-hook-form';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import style from './companycreate.module.scss';
import { createCompany } from '../../http/companyAPI';
import Modal from '../../components/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import { COMPANY_ROUTE } from '../../utils/consts';
import { Context } from '../../components/app/App';
import AddUser from '../../components/Modal/AddUser/AddUser';


const CompanyCreate = observer(() => {
	const { setState } = useContext(Context);
  //Drop файлов в окошки
  const [logo, setLogo] = useState(false);
  const [formlogo, setformLogo] = useState(null);
  const [img, setImg] = useState(false);
  const [formimg, setformImg] = useState(null);
  const [dropError, setdropError] = useState(false);
  function logoStart(e) {
    e.preventDefault();
    setLogo(true);
  }
  function logoLeave(e) {
    e.preventDefault();
    setLogo(false);
  }

  function onLogo(e) {
    e.preventDefault();
    let files = e.dataTransfer.files;
    setformLogo(files[0]);
    previewLogo(files[0]);
    setLogo(false);
  }

  function imgStart(e) {
    e.preventDefault();
    setImg(true);
  }
  function imgLeave(e) {
    e.preventDefault();
    setImg(false);
  }

  function onImg(e) {
    e.preventDefault();
    let files = e.dataTransfer.files;
    setformImg(files[0]);
    previewImg(files[0]);
    setImg(false);
  }

  const selectLogo = (e) => {
    setformLogo(e.target.files[0]);
    previewLogo(e.target.files[0]);
  };
  const selectImg = (e) => {
    setformImg(e.target.files[0]);
    previewImg(e.target.files[0]);
  };

  function previewLogo(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      let d = document.getElementById('previewLogo');
      if (d.hasChildNodes()) {
        let d_nested = document.getElementById('previewLogo_filePicture');
        d.removeChild(d_nested);
      }
      let img = document.createElement('img');
      img.id = 'previewLogo_filePicture';
      img.width = 250;
      img.height = 80;
      img.src = reader.result;
			document.getElementById('previewLogo').appendChild(img);
    };
  }
  function previewImg(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      let d = document.getElementById('previewImg');
      if (d.hasChildNodes()) {
        let d_nested = document.getElementById('previewImg_filePicture');
        d.removeChild(d_nested);
      }
      let img = document.createElement('img');
      img.id = 'previewImg_filePicture';
      img.width = 250;
      img.height = 160;
      img.srcset = reader.result;
      document.getElementById('previewImg').appendChild(img);
    };
  }

  const [info, setInfo] = useState([]);

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };
  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const scrolls = useRef(null);
  useEffect(() => {
    scrolls.current.scrollTo(0, 99999);
  }, [info]);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (!formlogo || !formimg) {
      setdropError(true);
      throw '';
    } else setdropError(false);
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('logo', formlogo);
      formData.append('img', formimg);
      formData.append('info', JSON.stringify(info));
			formData.append('id', localStorage.id);
      await createCompany(formData);
			setState(prev=>({...prev,user:true}));
      reset();
      setModalActive(true);

    } catch (e) {
      alert(e.response.data.message);
    }
  };
  const [modalActive, setModalActive] = useState(false);
	const [modalUserAddActive, setModalUserAddActive] = useState(false);
  return (
    <div
      className={style.container}
      style={{ height: window.innerHeight - 80 }}
    >
      <form className={style.forma} onSubmit={handleSubmit(onSubmit)}>
        <section>
          <h1 className={style.typography}>Создать компанию</h1>

          <label className={style.label} htmlFor="name">
            Название компании:
          </label>
          <input
            className={style.input}
            id="name"
            aria-invalid={errors.name ? 'true' : 'false'}
            {...register('name', {
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 5,
                message: 'Имя не может быть меньше 5 символов',
              },
              maxLength: {
                value: 32,
                message: 'Имя не может быть больше 32 символов',
              },
            })}
            type="name"
            placeholder="Intel Corporation"
          />
          {errors?.name && (
            <p className={style.p}>
              <span role="alert">{errors?.name?.message || 'Ошибка!'}</span>
            </p>
          )}
          <div className={style.mainContainer}>
            <div className={style.containerUploads}>
              <div className={style.containerUploads_wrapper}>
                <label className={style.label} htmlFor="logo">
                  Логотип компании:
                </label>
                <div className={style.wrapper}>
                  <div className={style.logo}>
                    {logo ? (
                      <label for="inputLogo">
                        {' '}
                        <div
                          className={style.dropArea_active}
                          onDragStart={(e) => logoStart(e)}
                          onDragLeave={(e) => logoLeave(e)}
                          onDragOver={(e) => logoStart(e)}
                          onDrop={(e) => onLogo(e)}
                        >
                          <p>
                            Отпустите логотип, <br /> чтобы загрузить его
                          </p>
                        </div>
                      </label>
                    ) : (
                      <label for="inputLogo">
                        {' '}
                        <div
                          className={style.dropArea}
                          onDragStart={(e) => logoStart(e)}
                          onDragLeave={(e) => logoLeave(e)}
                          onDragOver={(e) => logoStart(e)}
                        >
                          <div id="previewLogo" className={style.previewFile} />
                          <p>
                            Перетащите логотип, или кликните по окну <br />{' '}
                            чтобы загрузить
                          </p>
                        </div>
                      </label>
                    )}
                  </div>
                </div>
                {dropError && !formlogo && (
                  <p className={style.p}>
                    <span role="alert">{'Загрузите логотип!'}</span>
                  </p>
                )}
                <input
                  id="inputLogo"
                  className={style.dropInput}
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={selectLogo}
                />
              </div>

              <div className={style.containerUploads_wrapper}>
                <label className={style.label} htmlFor="img">
                  Фото компании:
                </label>
                <div className={style.wrapper}>
                  <div className={style.image}>
                    {img ? (
                      <label for="inputImg">
                        <div
                          className={style.dropArea_active}
                          onDragStart={(e) => imgStart(e)}
                          onDragLeave={(e) => imgLeave(e)}
                          onDragOver={(e) => imgStart(e)}
                          onDrop={(e) => onImg(e)}
                        >
                          <p>
                            Отпустите фото компании, <br /> чтобы загрузить его
                          </p>
                        </div>
                      </label>
                    ) : (
                      <label for="inputImg">
                        <div
                          className={style.dropArea}
                          onDragStart={(e) => imgStart(e)}
                          onDragLeave={(e) => imgLeave(e)}
                          onDragOver={(e) => imgStart(e)}
                        >
                          <div id="previewImg" className={style.previewFile} />
                          <p>
                            Перетащите фото компании, или кликните по окну{' '}
                            <br /> чтобы загрузить
                          </p>
                        </div>
                      </label>
                    )}
                  </div>
                </div>
                {dropError && !formimg && (
                  <p className={style.p}>
                    <span role="alert">{'Загрузите фото компании!'}</span>
                  </p>
                )}
                <input
                  id="inputImg"
                  className={style.dropInput}
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={selectImg}
                />
              </div>
            </div>
            <section className={style.propertyContainer}>
              <h4 className={style.typography}>Информация о компании</h4>

              <div ref={scrolls} className={style.propertyList}>
                {info.map((i) => (
                  <div className={style.list__itemContainer} key={i.number}>
                    <div>
                      <div className={style.item_property}>
                        <input
                          className={style.input}
                          value={i.title}
                          onChange={(e) =>
                            changeInfo('title', e.target.value, i.number)
                          }
                          placeholder="Характеристика "
                        />
                      </div>
                      <div className={style.item_value}>
                        <input
                          className={style.input}
                          value={i.description}
                          onChange={(e) => {
                            changeInfo('description', e.target.value, i.number);
                          }}
                          placeholder="Описание/значение "
                        />
                      </div>
                    </div>
                    <div className={style.buttonDel__wrapper}>
                      <button
                        className={style.buttonDel}
                        type="button"
                        onClick={() => removeInfo(i.number)}
                      >
                        <p>Удалить</p>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className={style.list__buttonAddWrapper}>
                <button
                  className={style.list__buttonAdd}
                  type="button"
                  onClick={addInfo}
                >
                 <p>Добавить</p>
                </button>
              </div>
            </section>
          </div>
        </section>
        <button className={style.button} type="submit">
				<p>Создать</p>
        </button>
      </form>
      <Modal active={modalActive} setActive={() => navigate(COMPANY_ROUTE+'/'+ localStorage.companyId,{ replace: true })}>
				<div className={style.modalContainer}>
        <h3 className={style.modal__h3}>Хотите добавить пользователей в компанию?</h3>
        <div className={style.modal}>
          <button className={style.modal__button} onClick={() => setModalUserAddActive(true)}>
              <h4>Хочу</h4>
          </button>
          <button className={style.modal__button} onClick={(e)=>navigate(COMPANY_ROUTE+'/'+ localStorage.companyId,{ replace: true })}>
            <h4>В другой раз</h4>
          </button>
        </div>
				<button className={style.button__close} type="button"onClick={(e)=>navigate(COMPANY_ROUTE+'/'+ localStorage.companyId,{ replace: true })}>
				<div className={style.cl_btn_7}></div>
          </button>
					</div>
      </Modal>
			<Modal active={modalUserAddActive} setActive={() => setModalUserAddActive(false)}>
			<AddUser setActive={setModalUserAddActive}/>
			</Modal>
			

    </div>
  );
});

export default CompanyCreate;
