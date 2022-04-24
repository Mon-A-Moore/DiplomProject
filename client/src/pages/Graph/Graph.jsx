import React, {useEffect, useState } from 'react';
import style from './graph.module.scss';
import classNames from 'classnames'
import { getAllFactory } from '../../http/factoryAPI';
import { getSortBalance } from '../../http/balanceAPI';
import Drawgraph from './Drawgraph/Drawgraph';




const Graph = () => {

const [menuActive,setMenuActive]=useState(false)
const [menuResultActive,setMenuResultActive]=useState(false)





const [factory, setFactory] = useState(null);
const [factories, setFactories] = useState([]);
useEffect(() => {
	getAllFactory(localStorage.companyId).then(data => (
/* 		console.log(data), */
		setFactories(data)));
}, []);

const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
const [balances, setBalances] = useState([]);
const [balanceSelect, setBalanceSelect] = useState(null);

useEffect(() => {
	if(factory!==null && startDate!==null && endDate!==null)
	getSortBalance(factory,startDate,endDate).then(data => (
		 setBalances(data)));
}, [factory,startDate,endDate]);


const [graphsel, setGraphsel] = useState(null);
useEffect(() => {
	if(balanceSelect!==null){
/* 		console.log(balances);
		console.log(balances); */
/* 		console.log(balances); 
		console.log(balanceSelect); */
		balances.forEach(item=>{
		
			if(item.id===Number(balanceSelect))
			{
				
			setGraphsel(item)
			/* console.log(item); */
			}
		})
		/* setGraphsel(balances.forEach.find(item => item.id === balanceSelect )); */
	
/* 	console.log(graphsel) */
	}
}, [balanceSelect,balances]);


useEffect(() => {
 
document.getElementById("menuResult_svgDiv").style.marginLeft+=window.getComputedStyle(document.getElementById("sidebar")).width;
document.getElementById("menuResult").style.marginLeft=window.getComputedStyle(document.getElementById("sidebar")).width;

}, [])

const [arrow, setArrow] = useState(0);
useEffect(() => {
	menuResultActive? setArrow('rotate(0)'):setArrow('rotate(180 25.3092098236084,16)')
	}, [menuResultActive])



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



<div  id="menuResult_svgDiv" className={style.menuResult_svgDiv}>
<svg version="1.1" className={classNames(style.menuResult_svg,menuResultActive? style.menuResult_svgActive:style.menuResult_svgUnActive)}  xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="-1px" y="-1px" onClick={()=>setMenuResultActive(!menuResultActive)}
viewBox="0 -5 40 40"  xmlSpace="preserve">
	<g fill="#000" fill-rule="evenodd" transform={arrow}>
<path  d="m24.506476,14.996676l-13.494287,-14.180636c-0.525701,-0.552439 -1.379965,-0.552439 -1.905666,0c-0.52957,0.556495 -0.52957,1.454218 0,2.006658l12.539525,13.177301l-12.539525,13.177312c-0.52957,0.552439 -0.52957,1.450152 0,2.006647c0.262856,0.276225 0.606875,0.414333 0.954763,0.414333c0.344028,0 0.688057,-0.138108 0.950903,-0.414333l13.494287,-14.180635c0.255117,-0.268093 0.398137,-0.62961 0.398137,-1.003324c0,-0.37777 -0.14302,-0.73523 -0.398137,-1.003323zm0,0"/>
<path  d="m33.398552,14.996676l-13.494287,-14.180636c-0.525701,-0.552439 -1.379965,-0.552439 -1.905666,0c-0.52957,0.556495 -0.52957,1.454218 0,2.006658l12.539525,13.177301l-12.539525,13.177312c-0.52957,0.552439 -0.52957,1.450152 0,2.006647c0.262856,0.276225 0.606875,0.414333 0.954763,0.414333c0.344028,0 0.688057,-0.138108 0.950903,-0.414333l13.494287,-14.180635c0.255117,-0.268093 0.398137,-0.62961 0.398137,-1.003324c0,-0.37777 -0.14302,-0.73523 -0.398137,-1.003323zm0,0"/>
<path  d="m41.510936,14.996676l-13.494287,-14.180635c-0.525701,-0.552439 -1.379964,-0.552439 -1.905666,0c-0.52957,0.556495 -0.52957,1.454218 0,2.006658l12.539525,13.177301l-12.539525,13.177312c-0.52957,0.552439 -0.52957,1.450152 0,2.006647c0.262856,0.276225 0.606874,0.414332 0.954762,0.414332c0.344029,0 0.688058,-0.138107 0.950903,-0.414332l13.494287,-14.180635c0.255117,-0.268093 0.398138,-0.629609 0.398138,-1.003324c0,-0.37777 -0.14302,-0.735231 -0.398138,-1.003324zm0,0"/>
</g>
</svg>
				</div>

				<div  id="menuResult" className={classNames(style.menuResult,menuResultActive? style.menuResult_unactive:style.menuResult_active)}>

				<div   className={style.menuResult_item}>
				calculationTime:<br/>{graphsel!=null? graphsel.calculation_output.calculationTime :"null"}
				</div>
				<div   className={style.menuResult_item}>
				disbalanceOriginal:<br/>{graphsel!=null? graphsel.calculation_output.disbalanceOriginal :'null'} 
				</div>
				<div   className={style.menuResult_item}>
				disbalance:<br/>{graphsel!=null? graphsel.calculation_output.disbalance : 'null'} 
				</div>
				</div>
				
      </div>
  );
};

export default Graph;
