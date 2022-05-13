import {$host} from "./index";


export const balanceCalculationCompany = async (file,factoryId) => {
	//console.log(file);
	const {data} = await $host.post('api/balance/balanceCalculation/'+ factoryId, file, {headers:{'Content-Type': 'application/json'}})
if(data==="Failed to solve balance task.")
throw new Error(data+"Скорее всего у вас есть неизмеряемые потоки");
	return data;
}

export const fetchOnebalanceCalculationCompany = async (factoryId,id) => {
	const {data} = await $host.get('api/balance/' + factoryId+'/'+id)

	return data
}
export const fetchAllbalanceCalculationCompany = async (factoryId) => {
	const {data} = await $host.get('api/balance/' + factoryId)
	return data
}
export const updateOneBalanceCalculationCompany = async (input) => {
//console.log(input);
	const {data} = await $host.put('api/balance/update',input)
	return data
}
export const getSortBalance = async (factoryId,dataStart,dataEnd) => {
	//console.log(input);
		const {data} = await $host.get('api/balance/' + factoryId+'/'+dataStart+'/'+dataEnd)
		return data
}
export const BADgetSortBalance = async (factoryId,dataStart,dataEnd) => {
	//console.log(input);
		const {data} = await $host.get('api/balance/' + factoryId+'/'+dataStart+'/'+dataEnd+"/2")
		return data
}
