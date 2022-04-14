import {$authHost, $host} from "./index";


export const balanceCalculationCompany = async (file) => {
	//console.log(file);
	const {data} = await $host.post('api/balance/balanceCalculation',file, {headers:{'Content-Type': 'application/json'}})
	
	return data;
}

export const fetchOnebalanceCalculationCompany = async (companyId,id) => {
	const {data} = await $host.get('api/balance/' + companyId+'/'+id)

	return data
}
export const fetchAllbalanceCalculationCompany = async (companyId,id) => {
	const {data} = await $host.get('api/balance/' + companyId)
	return data
}
export const updateOneBalanceCalculationCompany = async (input) => {
//console.log(input);
	const {data} = await $host.put('api/balance/update',input)
	return data
}
export const getSortBalance = async (companyId,dataStart,dataEnd) => {
	//console.log(input);
		const {data} = await $host.get('api/balance/' + companyId+'/'+dataStart+'/'+dataEnd)
		return data
}
