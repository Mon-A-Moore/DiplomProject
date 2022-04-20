import React, {useEffect, useState } from 'react';
import style from './graph.module.scss';
import classNames from 'classnames'
import { getAllFactory } from '../../http/factoryAPI';
import { getSortBalance } from '../../http/balanceAPI';
import Drawgraph from './Drawgraph/Drawgraph';




const Graph = () => {

const [menuActive,setMenuActive]=useState(true)





const [factory, setFactory] = useState(null);
const [factories, setFactories] = useState([]);
useEffect(() => {
	getAllFactory(localStorage.companyId).then(data => (
		console.log(data),
		setFactories(data)));
}, []);

const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
const [balances, setBalances] = useState([]);
const [balanceSelect, setBalanceSelect] = useState(null);

useEffect(() => {
	if(factory!==null && startDate!==null && endDate!==null)
	getSortBalance(factory,startDate,endDate).then(data => (
		 console.log(data), 
		 setBalances(data)));
}, [factory,startDate,endDate]);


const [graphsel, setGraphsel] = useState(null);
useEffect(() => {
	if(balanceSelect!==null){
		console.log(balances)
		balances.forEach(item=>{
		
			if(item.id==balanceSelect)
			{
				/* console.log(item) */
			setGraphsel(item)
			}
		})
		/* setGraphsel(balances.forEach.find(item => item.id === balanceSelect )); */
	
	console.log(graphsel)
	}
}, [balanceSelect]);
  return (
    <div className={style.container}>
			{/* <h1 className={style.title}>Графическое представление балансов компании "название, пробел, логотип"</h1> */}

			<Drawgraph aaa={graphsel}/>
				<div className={style.svgDiv}>
				<svg  className={classNames(style.svg,menuActive? style.svgActive:style.svgUnActive)} viewBox="0 0 17 30" xmlns="http://www.w3.org/2000/svg" onClick={()=>setMenuActive(!menuActive)}>
			<g fill="#000" fill-rule="evenodd">
				<path d="M.3619 2.7864c.404-.469 1.883-.469 2.288 0 .476.552.309 7.271.309 12.526 0 5.81.095 11.595-.274 11.98-.442.46-1.941.483-2.358 0-.38-.44-.324-6.124-.324-11.91 0-5.467-.032-12.143.359-12.596"></path>
				<path d="M7.2867.3518c.404-.469 1.883-.469 2.288 0 .476.552.347 7.782.419 12.673.083 5.751.365 11.047-.092 11.799-.367.605-2.489.664-2.852.041-.365-.625-.339-6.15-.196-11.934.144-5.862.042-12.126.433-12.579"></path>
				<path d="M16.4747 27.4113c-.404.469-1.883.469-2.288 0-.476-.552-.309-7.271-.309-12.526 0-5.81.038-11.706.274-11.98.417-.483 1.941-.483 2.358 0 .38.44.324 6.124.324 11.91 0 5.467.032 12.143-.359 12.596"></path>
			</g>
		</svg>
				</div>

				<div className={classNames(style.menu,menuActive? style.menu_unactive:style.menu_active)}>

				<label for="model-select">Модель</label>
<div className={style.select}>
  <select id="model-select" onChange={e=>setFactory(e.target.value)}>
	{factories.map((item)=>(
						<option value={item.id}>{item.name}</option>
					))}
  </select>
  <span className={style.focus}></span>
</div>

<div className={style.graphData}>
	<div className={style.inputDiv}>
	<label for="data-start">Начальная дата</label>
				<input
				id="data-start"
                        className={style.input}                                    
                        type="date"
												
												onChange={(e) => setStartDate(e.target.value)}
                      />
	</div>
	<div className={style.inputDiv}>
	<label for="data-end">Конечная дата</label>
				<input
				id="data-end"
                        className={style.input}                                    
                        type="date"
												onChange={(e) => setEndDate(e.target.value)}
                      />
</div>						
				</div>

<label for="balance-select">Список балансов</label>
<div className={classNames(style.select,style.selectMultiple)} onChange={e=>setBalanceSelect(e.target.value)}>
  <select id="balance-select" multiple>
	{balances.map((item)=>(
						<option value={item.id}>{item.createdAt}</option>
					))}
  </select>
  <span className={style.focus}></span>
</div>






{/* 
				<select className={style.graphModelSelecter} onChange={e=>setFactory(e.target.value)}>
					{factories.map((item)=>(
						<option value={item.id}>{item.name}</option>
					))}

      </select> */}

{/* 				<div className={style.graphData}>
				<input
                        className={style.input}                                    
                        type="date"
												
												onChange={(e) => setStartDate(e.target.value)}
                      />
				<input
                        className={style.input}                                    
                        type="date"
												onChange={(e) => setEndDate(e.target.value)}
                      />
				</div> */}

{/* 				<select className={style.balanceList} onChange={e=>setBalanceSelect(e.target.value)}>
					{balances.map((item)=>(
						<option value={item.id}>{item.id}</option>
					))}

      </select> */}


				</div>
      </div>
  );
};

export default Graph;
