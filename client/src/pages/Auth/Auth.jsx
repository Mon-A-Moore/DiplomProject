import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import style from './auth.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	COMPANY_REGISTRATION_ROUTE,
  COMPANY_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
} from '../../utils/consts';
import { CustomLink } from '../../components/CustomLink';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { observer } from 'mobx-react-lite';
import {  checkUsersCompany, login, registration } from '../../http/userAPI';
import { Context } from '../../components/app/App';


const Auth = observer(() => {
  const { setState } = useContext(Context);
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
				setState(prev=>({...prev,user:true}));
				if(data.companyId!==null)
				navigate(COMPANY_ROUTE+'/'+ data.companyId,{ replace: true });
				else
				navigate(COMPANY_REGISTRATION_ROUTE,{ replace: true });
      } else {
        await registration(data.email, data.password, data.tel);
				data =await checkUsersCompany({id:localStorage.id});


		if(data.err===1)
				{
					setState(prev=>({...prev,user:true}))
					if(data.companyId!==null)
					navigate(COMPANY_ROUTE+'/'+ data.companyId,{ replace: true });
					else
					navigate(COMPANY_REGISTRATION_ROUTE,{ replace: true });
				}
				else{
				navigate(COMPANY_REGISTRATION_ROUTE,{ replace: true });
				}
      }
		

      reset();
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
              onChange={(event) => {
                event.target.value = normalizePhoneNumber(event.target.value);
              }}
            />
						{errors?.tel && (
            <p className={style.p}>
              <span role="alert">{errors?.tel?.message || 'Ошибка!'}</span>
            </p>
          )}
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
          {isLogin ? <p>Войти</p> : <p>Зарегистрироваться</p>}
        </button>
      </form>
    </div>
  );
});

export default Auth;

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
