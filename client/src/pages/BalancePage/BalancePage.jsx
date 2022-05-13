import style from './balancepage.module.scss';
import styleTb from './table.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import styleGr from '../Graph/graph.module.scss';
import classNames from 'classnames'
import BalanceTable from './BalanceTable';
import { observer } from 'mobx-react-lite';
import { fetchOneCompany } from '../../http/companyAPI';
import { Context } from '../../components/app/App';
import { getAllFactory } from '../../http/factoryAPI';
import { getSortBalance } from '../../http/balanceAPI';

const BalancePage = observer(() => {
  const { company } = useContext(Context);
  const [info, setInfo] = useState({ info: [] });
  const [menuActive, setMenuActive] = useState(true)

  useEffect(() => {
    fetchOneCompany(localStorage.companyId).then(data => (
    //   console.log(data),
      company.setCompany(data), setInfo(data)));
  }, []);


  const [factory, setFactory] = useState(null);
  const [factories, setFactories] = useState([]);
  useEffect(() => {
	  getAllFactory(localStorage.companyId).then(data => (
		//   console.log(data),
		  setFactories(data),
		  setFactory(data[0].id)));
  }, []);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [balances, setBalances] = useState([]);


  useEffect(() => {
	  if (factory !== null && startDate !== null && endDate !== null)
		  getSortBalance(factory, startDate, endDate).then(data => (
			//   console.log(data),
			  setBalances(data)));
  }, [factory, startDate, endDate]);

  return (
    <div className={style.container}>
      <div className={style.block}>
			
		<div className={style.tableData}>
		<div className={styleGr.graphData}>
				<div className={styleTb.select}>
					<label for="model-select">Фабрика</label>

					<select className={style.input} onChange={e => setFactory(e.target.value)}>
						{factories.map((item) => (
							<option value={item.id}>{item.name}</option>
						))}
					</select>
					<span className={styleGr.focus}></span>
				</div>
				<div className={styleGr.inputDiv}>
					<label for="data-start">Начальная дата</label>
					<input
						id="data-start"
						className={style.input}
						type="date"

						onChange={(e) => setStartDate(e.target.value)}
					/>
				</div>
				<div className={styleGr.inputDiv}>
					<label for="data-end">Конечная дата</label>
					<input
						id="data-end"
						className={style.input}
						type="date"
						onChange={(e) => setEndDate(e.target.value)}
					/>
				</div>
			</div>
		</div>
			
		{balances.length ? 
          <BalanceTable balances={balances} factory={factory} startDate={startDate} endDate={endDate} />
        : null}
        
      </div>
    </div>
  );
});

export default BalancePage;
