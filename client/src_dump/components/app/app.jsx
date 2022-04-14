import React from 'react';
import './app.scss';
import {Sidebar} from '../sidebar/Sidebar';
import {Header} from '../header/Header';
import {Main} from '../main/Main';

const App = () => {

	const [selectbutton, setselectbutton] = React.useState([{}, false]);
	
  return (
    <>
      <div className="container sidebar-active">
			<Sidebar />
			<Header />
			<Main />
			
      </div>
    </>
  );
};

export default App;
