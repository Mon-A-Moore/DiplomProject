import React, { useContext, useEffect, useState,createContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../AppRouter';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import style from './app.module.scss';


import {check} from "../../http/userAPI";
import UserApp from '../../application/UserApp';
import CompanyApp from '../../application/CompanyApp';

export const Context = createContext(null);
const App = () => {
//	const {user} = useContext(Context)
	const [loading, setLoading] = useState(true)



const [state,setState]=useState({ 
	user: false,
	company: new CompanyApp(),
	})
	useEffect(() => {
			check().then(data => {
				setState(prev=>({...prev,user:true}))
			}).finally(() => setLoading(false))
	}, [])

	if (loading) {
			return <div className={style.loading}><div className={style.spinner}></div></div>
	}

    return (
			<Context.Provider value={{state,setState,company:state.company}}
			>
			<BrowserRouter>
				<NavBar/>
				<div className={style.app} style={{ height: window.innerHeight - 120 }}>
				<SideBar/>
				<AppRouter/>
				</div>
				<Footer/>
			</BrowserRouter>
			</Context.Provider>

		);
};

export default App;
