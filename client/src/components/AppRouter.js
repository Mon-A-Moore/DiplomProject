import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';

import { COMPANY_ROUTE, HOMEPAGE_ROUTE } from '../utils/consts';
import { Context } from './app/App';
//import {observer} from "mobx-react-lite";

const AppRouter = () => {
  const {state} = useContext(Context);

  return (
    <Routes>
      {state.user ?
        authRoutes.map(({ path, Element }) => (
          <Route path={path} element={<Element />} exact />
        ))
      :
      publicRoutes.map(({ path, Element }) => (
        <Route path={path} element={<Element />} exact />
      ))}
      ;
      {state.user ? <Route path="*" element={<Navigate to={COMPANY_ROUTE+'/'+ localStorage.companyId} />} /> :<Route path="*" element={<Navigate to={HOMEPAGE_ROUTE} />} />}
    </Routes>
  );
};
//<Route path="/" element={<Homepage/>}/>
export default AppRouter;
