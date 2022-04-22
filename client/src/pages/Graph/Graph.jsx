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
		
			if(item.id===Number(balanceSelect))
			{
				/* console.log(item) */
			setGraphsel(item)
			}
		})
		/* setGraphsel(balances.forEach.find(item => item.id === balanceSelect )); */
	
	console.log(graphsel)
	}
}, [balanceSelect,balances,graphsel]);





  return (
    <div className={style.container}>
			{/* <h1 className={style.title}>Графическое представление балансов компании "название, пробел, логотип"</h1> */}

			<Drawgraph graphsel={graphsel}/>
				<div className={style.menu_svgDiv}>
				<svg   className={classNames(style.menu_svg,menuActive? style.menu_svgActive:style.menu_svgUnActive)} viewBox="0 0 17 30" xmlns="http://www.w3.org/2000/svg" onClick={()=>setMenuActive(!menuActive)}>
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

				</div>



<div className={style.menuResult_svgDiv}>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 50 50" enable-background="new 0 0 50 50" xmlSpace="preserve">
	<path fill="#231F20" d="M23.563,40.836c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293l15-15
c0.391-0.391,0.391-1.023,0-1.414l-15-15c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l14.293,14.293L23.563,39.422
C23.172,39.813,23.172,40.446,23.563,40.836z"/>
<path fill="#231F20" d="M15.563,40.836c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293l15-15
c0.391-0.391,0.391-1.023,0-1.414l-15-15c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l14.293,14.293L15.563,39.422
C15.172,39.813,15.172,40.446,15.563,40.836z"/>
<path fill="#231F20" d="M7.563,40.836c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293l15-15
c0.391-0.391,0.391-1.023,0-1.414l-15-15c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l14.293,14.293L7.563,39.422
C7.172,39.813,7.172,40.446,7.563,40.836z"/>
</svg>

				</div>
				<div className={style.menuResult}></div>
      </div>
  );
};

export default Graph;
