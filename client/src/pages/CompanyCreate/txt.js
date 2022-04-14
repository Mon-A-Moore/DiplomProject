/* 


  const normalizePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value);
    if (!phoneNumber) return value;
    return phoneNumber.formatInternational();
  };


  const [name, setName] = useState('');
  const [logo, setLogo] = useState(null);
  const [img, setImg] = useState(null);
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

  const selectLogo = (e) => {
    setLogo(e.target.files[0]);
  };
  const selecImg = (e) => {
    setImg(e.target.files[0]);
  };

  const addCompany = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('logo', logo);
    formData.append('img', img);

    formData.append('info', JSON.stringify(info));
    createCompany(formData).then((data) => console("locallocal"));
  };

  return (
      <div className={style.modal__container}>
        <div className={style.header}>
          <h1>Добавить компанию</h1>
        </div>
        <div className={style.body}>
          <div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите название компании"
            />
            <p>Выберите лого</p>
            <input type="file" onChange={selectLogo} />
            <p>Выберите картинку</p>
            <input type="file" onChange={selecImg} />
            <hr />

						<button onClick={addInfo}>Добавить новое свойство</button>

            {info.map((i) => (
              <div key={i.number}>
                <div>
                  <input
                    value={i.title}
                    onChange={(e) =>
                      changeInfo('title', e.target.value, i.number)
                    }
                    placeholder="Введите название "
                  />
                </div>
                <div>
                  <input
                    value={i.description}
                    onChange={(e) =>
                      changeInfo('description', e.target.value, i.number)
                    }
                    placeholder="Введите описание "
                  />
                </div>
                <div>
                  <button onClick={() => removeInfo(i.number)}>Удалить</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={style.footer}>
          <button className={style.footer__button} onClick={setActive}>
            Закрыть
          </button>
          <button className={style.footer__button} onClick={addCompany}>
            Добавить
          </button>
					
        </div>
      </div>

  );
}); */

/* 
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import style from './auth.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  COMPANY_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
} from '../../utils/consts';
import { CustomLink } from '../../components/CustomLink';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { observer } from 'mobx-react-lite';
import {  login, registration } from '../../http/userAPI';
import { Context } from '../../index';

const Auth = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const normalizePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value);
    if (!phoneNumber) return value;

    return phoneNumber.formatInternational();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        data = await login(data.email, data.password);
      } else {
        data = await registration(data.email, data.password, data.tel);
      }
		
      user.setUser(user);
      user.setIsAuth(true);
      reset();

      navigate(COMPANY_ROUTE+'/'+ localStorage.companyId,{ replace: true });
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  return (
    <div
      className={style.container}
      style={{ height: window.innerHeight - 80 }}
    >
      <form className={style.forma} onSubmit={handleSubmit(onSubmit)}>
        <section>
          <h1 className={style.typography}>
            {isLogin ? 'Авторизация' : 'Регистрация'}
          </h1>
          <label className={style.label} htmlFor="email">
            Почта:
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
          />
          {errors?.email && (
            <p className={style.p}>
              <span role="alert">{errors?.email?.message || 'Ошибка!'}</span>
            </p>
          )}

          <label className={style.label} htmlFor="password">
            Пароль:
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
          />
          {errors?.password && (
            <p className={style.p}>
              <span role="alert">{errors?.password?.message || 'Ошибка!'}</span>
            </p>
          )}
        </section>

        {isLogin ? (
          <></>
        ) : (
          <div className={style.div}>
            <label className={style.label} htmlFor="tel">
              Номер телефона:
            </label>
            <input
              className={style.input}
              id="tel"
              type="tel"
              placeholder="Mobile number"
              {...register('Mobile number', {
                required: true,
                minLength: 6,
                maxLength: 12,
              })}
              onChange={(event) => {
                event.target.value = normalizePhoneNumber(event.target.value);
              }}
            />
          </div>
        )}

        {isLogin ? (
          <div>
            <CustomLink className={style.a} to={REGISTRATION_ROUTE}>
              {' '}
              Создать аккаунт{' '}
            </CustomLink>
          </div>
        ) : (
          <div>
            <CustomLink className={style.a} to={LOGIN_ROUTE}>
              {' '}
              Авторизироваться{' '}
            </CustomLink>
          </div>
        )}
        <button className={style.button} type="submit">
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  );
});

export default Auth;
 */
{
  /* <label className={style.label} htmlFor="role">
              Роль:
            </label>
            <div className={style.select_wrapper}>
              <select
                className={style.select}
                id="role"
                {...register('Role', { required: true })}
              >
                <option value="User">Пользователь</option>
                <option value="Owner">Владелец</option>
              </select>
            </div> 
					
					
					 Делаем .select-wrapper родительским элементом для позиционирования "стрелочки" 
.select_wrapper {
	position: relative;
}

 Рисуем стрелочку 
.select_wrapper::before {
	content: "";

	position: absolute;
	top: 50%;
	right: 74%;
	transform: translateY(-50%);

	display: block;

	 Рисуем треугольник 
	width: 0;
	height: 0;
	border-style: solid;
	border-width: 10.4px 6px 0 6px;
	border-color: #d6314d transparent transparent transparent;

 Снимаем клик с треугольника 
	pointer-events: none;
}
					
					*/
}
