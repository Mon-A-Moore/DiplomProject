import React, { useEffect, useRef, useState } from 'react';
import style from './usercreate.module.scss';
import { useForm } from 'react-hook-form';
import parsePhoneNumberFromString from 'libphonenumber-js';

const UserCreate = () => {
  const [logo, setLogo] = useState(false);
  const [formlogo, setformLogo] = useState(null);
  const [dropError, setdropError] = useState(false);
  function logoStart(e) {
    e.preventDefault();
    setLogo(true);
  }
  function logoLeave(e) {
    e.preventDefault();
    setLogo(false);
  }

  function onLogo(e, number) {
    e.preventDefault();
    let files = e.dataTransfer.files;
    changeInfo('avatar', files[0], number);
    setformLogo(files[0]);
    previewLogo(files[0]);
    setLogo(false);
  }
  const selectLogo = (e, number) => {
    changeInfo('avatar', e.target.files[0], number);
    setformLogo(e.target.files[0]);
    previewLogo(e.target.files[0]);
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
      d.appendChild(img);
    };
  }

  const [info, setInfo] = useState([]);

  const addInfo = () => {
    setInfo([
      ...info,
      {
        avatar: '',
        full_name: '',
        email: '',
        password: '',
        tel: '',
        role: 'EMPLOYEE',
        number: Date.now(),
      },
    ]);
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

  const onSubmit = async (data) => {
    if (!formlogo) {
      setdropError(true);
      throw '';
    } else setdropError(false);
    try {
      const formData = new FormData();
      formData.append('info', JSON.stringify(info));
      formData.append('id', localStorage.id);
      //localStorage.companyId = await createCompany(formData);
      reset();
    } catch (e) {
      alert(e.response.data.message);
    }
  };


  const normalizePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value);
    if (!phoneNumber) return value;
    return phoneNumber.formatInternational();
  };
  return (
    <div
      className={style.container}
      style={{ height: window.innerHeight - 120 }}
    >
      <div className={style.container__child}>

        <form className={style.forma} onSubmit={handleSubmit(onSubmit)}>
          <section>
            <h1 className={style.typography}>Добавить пользователей</h1>
						<div className={style.forma_header}>
          <label className={style.label}>Логотип компании:</label>
          <label className={style.label}>Имя и Фамилия</label>
          <label className={style.label}>Почта:</label>
          <label className={style.label}>Пароль:</label>
          <label className={style.label}>Номер телефона:</label>
        </div>
            <div ref={scrolls} className={style.propertyList}>
              {info.map((i) => (
                <div className={style.list__itemContainer} key={i.number}>
                  <div className={style.item}>
                    <div className={style.avatar}>
                      <label  htmlFor="avatar">
                      </label>
                      <div className={style.wrapper}>
                        <div className={style.logo}>
                          {logo ? (
                            <label for="inputAvatar">
                              {' '}
                              <div
                                className={style.dropArea_active}
                                onDragStart={(e) => logoStart(e)}
                                onDragLeave={(e) => logoLeave(e)}
                                onDragOver={(e) => logoStart(e)}
                                onDrop={(e) => onLogo(e, i.number)}
                              >
                              </div>
                            </label>
                          ) : (
                            <label for="inputAvatar">
                              {' '}
                              <div
                                className={style.dropArea}
                                onDragStart={(e) => logoStart(e)}
                                onDragLeave={(e) => logoLeave(e)}
                                onDragOver={(e) => logoStart(e)}
                              >
                                <div
                                  id="previewAvatar"
                                  className={style.previewFile}
                                />
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
                        id="inputAvatar"
                        className={style.dropInput}
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={(e) => selectLogo(e, i.number)}
                      />
                    </div>
                    <div className={style.full_name}>
                      <label htmlFor="full_name">
                      </label>
                      <input
                        className={style.input}
                        id="full_name"
                        aria-invalid={errors.name ? 'true' : 'false'}
                        {...register('full_name', {
                          required: 'Поле обязательно к заполнению',
                        })}
                        type="full_name"
                        placeholder="Intel Corporation"
                      />
                      {errors?.full_name && (
                        <p className={style.p}>
                          <span role="alert">
                            {errors?.full_name?.message || 'Ошибка!'}
                          </span>
                        </p>
                      )}
                    </div>
                    <div className={style.email}>
                      <label  htmlFor="email">
                      </label>
                      <input
                        className={style.input}
                        id="email"
                        aria-invalid={errors.email ? 'true' : 'false'}
                        {...register('email', {
                          required: 'Поле обязательно к заполнению',
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message:
                              'Введенное значение не соответствует формату электронной почты',
                          },
                        })}
                        type="email"
                        placeholder="Example@mail.com"
                        onChange={(e) => {
                          changeInfo('email', e.target.value, i.number);
                        }}
                      />
                      {errors?.email && (
                        <p className={style.p}>
                          <span role="alert">
                            {errors?.email?.message || 'Ошибка!'}
                          </span>
                        </p>
                      )}
                    </div>
                    <div className={style.password}>
                      <label htmlFor="password">
                      </label>
                      <input
                        className={style.input}
                        id="password"
                        aria-invalid={errors.password ? 'true' : 'false'}
                        {...register('password', {
                          required: 'Поле обязательно к заполнению',
                          minLength: {
                            value: 8,
                            message: 'Минимальная длина пароля - 8',
                          },
                        })}
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {
                          changeInfo('password', e.target.value, i.number);
                        }}
                      />
                      {errors?.password && (
                        <p className={style.p}>
                          <span role="alert">
                            {errors?.password?.message || 'Ошибка!'}
                          </span>
                        </p>
                      )}
                    </div>
                    <div className={style.tel}>
                      <label htmlFor="tel">
                      </label>
                      <input
                        className={style.input}
                        id="tel"
                        type="tel"
                        placeholder="Mobile number"
                        aria-invalid={errors.tel ? 'true' : 'false'}
                        {...register('tel', {
                          required: 'Поле обязательно к заполнению',
                          minLength: {
                            value: 3,
                            message: 'Минимальная длина номера - 3',
                          },
                          maxLength: {
                            value: 30,
                            message: 'Максимальная длина номера - 30',
                          },
                        })}
                        onChange={(e) => {
                          e.target.value = normalizePhoneNumber(e.target.value);
                          changeInfo('tel', e.target.value, i.number);
                        }}
                      />
                      {errors?.tel && (
                        <p className={style.p}>
                          <span role="alert">
                            {errors?.tel?.message || 'Ошибка!'}
                          </span>
                        </p>
                      )}
                    </div>
                    <div className={style.item__button}>
                      <button
                        className={style.buttonDel}
                        type="button"
                        onClick={() => removeInfo(i.number)}
                      >
                        Удалить
                      </button>
                    </div>
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
                Добавить
              </button>
            </div>
          </section>
          <button className={style.button} type="submit">
            Создать
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserCreate;
