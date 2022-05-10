import React from 'react';
import style from './admin.module.scss';
import { balanceCalculationCompany, fetchAllbalanceCalculationCompany, fetchOnebalanceCalculationCompany, getSortBalance, updateOneBalanceCalculationCompany } from '../../http/balanceAPI';

import { deleteFactory } from '../../http/factoryAPI';
 


const Admin = () => {

	const arbys={
		"balanceSettings": {
			"balanceSettingsConstraints": 0
		},
		"BalanceInputVariables": [
			{
				"id": "00000000-0000-0000-0000-000000000001", 
				"sourceId": "NULL", 
				"destinationId": "00000000-0000-0000-0000-000000000001", 
				"name": "X1", 
				"measured": 10.005, 
				"correction": 0, 
				"metrologicUpperBound": 1000.0,
				"metrologicLowerBound": 0.0,
				"technologicUpperBound": 1000.0,
				"technologicLowerBound": 0.0,
				"tolerance": 0.2, 
				"isMeasured": true, 
				"isExcluded": false 
			},
			{
				"id": "00000000-0000-0000-0000-000000000002",
				"sourceId": "00000000-0000-0000-0000-000000000001",
				"destinationId": "NULL",
				"name": "X2",
				"measured": 3.033,
				"correction": 0,
				"metrologicUpperBound": 1000.0,
				"metrologicLowerBound": 0.0,
				"technologicUpperBound": 1000.0,
				"technologicLowerBound": 0.0,
				"tolerance": 0.121,
				"isMeasured": true,
				"isExcluded": false
			},
			{
				"id": "00000000-0000-0000-0000-000000000003",
				"sourceId": "00000000-0000-0000-0000-000000000001",
				"destinationId": "00000000-0000-0000-0000-000000000002",
				"name": "X3",
				"measured": 6.831,
				"correction": 0,
				"metrologicUpperBound": 1000.0,
				"metrologicLowerBound": 0.0,
				"technologicUpperBound": 1000.0,
				"technologicLowerBound": 0.0,
				"tolerance": 0.683,
				"isMeasured": true,
				"isExcluded": false
			},
			{
				"id": "00000000-0000-0000-0000-000000000004",
				"sourceId": "00000000-0000-0000-0000-000000000002",
				"destinationId": "NULL",
				"name": "X4",
				"measured": 1.985,
				"correction": 0,
				"metrologicUpperBound": 1000.0,
				"metrologicLowerBound": 0.0,
				"technologicUpperBound": 1000.0,
				"technologicLowerBound": 0.0,
				"tolerance": 0.04,
				"isMeasured": true,
				"isExcluded": false
			},
			{
				"id": "00000000-0000-0000-0000-000000000005",
				"sourceId": "00000000-0000-0000-0000-000000000002",
				"destinationId": "00000000-0000-0000-0000-000000000003",
				"name": "X5",
				"measured": 5.093,
				"correction": 0,
				"metrologicUpperBound": 1000.0,
				"metrologicLowerBound": 0.0,
				"technologicUpperBound": 1000.0,
				"technologicLowerBound": 0.0,
				"tolerance": 0.102,
				"isMeasured": true,
				"isExcluded": false
			},
			{
				"id": "00000000-0000-0000-0000-000000000006",
				"sourceId": "00000000-0000-0000-0000-000000000003",
				"destinationId": "NULL",
				"name": "X6",
				"measured": 4.057,
				"correction": 0,
				"metrologicUpperBound": 1000.0,
				"metrologicLowerBound": 0.0,
				"technologicUpperBound": 1000.0,
				"technologicLowerBound": 0.0,
				"tolerance": 0.081,
				"isMeasured": true,
				"isExcluded": false
			},
			{
				"id": "00000000-0000-0000-0000-000000000007",
				"sourceId": "00000000-0000-0000-0000-000000000003",
				"destinationId": "NULL",
				"name": "X7",
				"measured": 0.991,
				"correction": 0,
				"metrologicUpperBound": 1000.0,
				"metrologicLowerBound": 0.0,
				"technologicUpperBound": 1000.0,
				"technologicLowerBound": 0.0,
				"tolerance": 0.02,
				"isMeasured": true,
				"isExcluded": false
			}
	
			,
			{
				"id": "00000000-0000-0000-0000-000000000008",
				"sourceId": "00000000-0000-0000-0000-000000000003",
				"destinationId": "00000000-0000-0000-0000-000000000004",
				"name": "X8",
				"measured": 0.991,
				"correction": 0,
				"metrologicUpperBound": 1000.0,
				"metrologicLowerBound": 0.0,
				"technologicUpperBound": 1000.0,
				"technologicLowerBound": 0.0,
				"tolerance": 0.02,
				"isMeasured": true,
				"isExcluded": false
			},
			{
				"id": "00000000-0000-0000-0000-000000000009",
				"sourceId": "00000000-0000-0000-0000-000000000003",
				"destinationId": "00000000-0000-0000-0000-000000000005",
				"name": "X9",
				"measured": 0.991,
				"correction": 0,
				"metrologicUpperBound": 1000.0,
				"metrologicLowerBound": 0.0,
				"technologicUpperBound": 1000.0,
				"technologicLowerBound": 0.0,
				"tolerance": 0.02,
				"isMeasured": true,
				"isExcluded": false
			},
			{
				"id": "00000000-0000-0000-0000-000000000010",
				"sourceId": "00000000-0000-0000-0000-000000000005",
				"destinationId": "00000000-0000-0000-0000-000000000006",
				"name": "X10",
				"measured": 0.991,
				"correction": 0,
				"metrologicUpperBound": 1000.0,
				"metrologicLowerBound": 0.0,
				"technologicUpperBound": 1000.0,
				"technologicLowerBound": 0.0,
				"tolerance": 0.02,
				"isMeasured": true,
				"isExcluded": false
			}
			,
			{
				"id": "00000000-0000-0000-0000-000000000011",
				"sourceId": "00000000-0000-0000-0000-000000000005",
				"destinationId": "00000000-0000-0000-0000-000000000004",
				"name": "X11",
				"measured": 0.991,
				"correction": 0,
				"metrologicUpperBound": 1000.0,
				"metrologicLowerBound": 0.0,
				"technologicUpperBound": 1000.0,
				"technologicLowerBound": 0.0,
				"tolerance": 0.02,
				"isMeasured": true,
				"isExcluded": false
			}
			,
			{
				"id": "00000000-0000-0000-0000-000000000012",
				"sourceId": "00000000-0000-0000-0000-000000000006",
				"destinationId": "00000000-0000-0000-0000-000000000005",
				"name": "X12",
				"measured": 0.991,
				"correction": 0,
				"metrologicUpperBound": 1000.0,
				"metrologicLowerBound": 0.0,
				"technologicUpperBound": 1000.0,
				"technologicLowerBound": 0.0,
				"tolerance": 0.02,
				"isMeasured": true,
				"isExcluded": false
			}
			,
			{
				"id": "00000000-0000-0000-0000-000000000013",
				"sourceId": "00000000-0000-0000-0000-000000000004",
				"destinationId": "00000000-0000-0000-0000-000000000001",
				"name": "X13",
				"measured": 0.991,
				"correction": 0,
				"metrologicUpperBound": 1000.0,
				"metrologicLowerBound": 0.0,
				"technologicUpperBound": 1000.0,
				"technologicLowerBound": 0.0,
				"tolerance": 0.02,
				"isMeasured": true,
				"isExcluded": false
			},
			{
				"id": "00000000-0000-0000-0000-000000000014", 
				"sourceId": "NULL", 
				"destinationId": "00000000-0000-0000-0000-000000000005", 
				"name": "X14", 
				"measured": 10.005, 
				"correction": 0, 
				"metrologicUpperBound": 1000.0,
				"metrologicLowerBound": 0.0,
				"technologicUpperBound": 1000.0,
				"technologicLowerBound": 0.0,
				"tolerance": 0.2, 
				"isMeasured": true, 
				"isExcluded": false 
			},
		]
	}

//рассчёт баланса
const Calculation=async()=>{
	const factoryId=2;
	//console.log(arbys); 
	const temp = await balanceCalculationCompany(JSON.stringify(arbys),factoryId);
console.log(temp);
}
//получение баланса по id
const GetOneBalance=async()=>{
	const id =6;
	const factoryId=1;
const tempo = await fetchOnebalanceCalculationCompany(factoryId,id)
console.log(tempo);

}
//получение всех балансов
const GetAllBalance=async()=>{
	const factoryId=2;
	const all =await fetchAllbalanceCalculationCompany(factoryId)
	console.log(all);
}
//обновление баланса(когда изменяешь входные данные и нажимаешь на кнопку пересчитать)
const UpdateBalance=async()=>{
	const factoryId=1;
	const id =13;
	const b = await updateOneBalanceCalculationCompany(await fetchOnebalanceCalculationCompany(factoryId,id)); 
	console.log(b);
}
//список балансов за промежуток времени
const DateSortBalance=async()=>{
	const factoryId=1;
	let a = new Date("2017-01-26");//старт
	let b = new Date("2022-05-28");//конец
	const c = await getSortBalance(factoryId,a,b); 
	console.log(c);
}

const DeleteFactory=async()=>{
	const factoryId=1;
await deleteFactory(factoryId); 
}



  return (
    <div className={style.container}>
      <div className={style.block}>

				<button className={style.edit} onClick={() => Calculation()}>
          Рассчитать Тестовый баланс
        </button>
				<button className={style.edit} onClick={() => GetOneBalance()}>
          Получить баланс id=6
        </button>
				<button className={style.edit} onClick={() => GetAllBalance()}>
          Получить баланс фабрики id =1 вашей компании с ID = {localStorage.companyId}
        </button>
				<button className={style.edit} onClick={() => UpdateBalance()}>
          Обновить расчёт баланса, например id = 1
        </button>
				<button className={style.edit} onClick={() => DateSortBalance()}>
          получить отсортированный баланс
        </button>
				<button className={style.edit} onClick={() => DeleteFactory()}>
          Удалить факторию id = 6
        </button>
				</div>
				</div>
  );
};

export default Admin;
