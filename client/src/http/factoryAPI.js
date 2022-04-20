import {$authHost, $host} from "./index";

export const createFactory = async (name,companyId) => {
	await $host.post('api/factory', name,companyId)
	/* localStorage.setItem('companyId', data); */
	return;
}

export const getAllFactory = async (companyId) => {
	const {data} = await $host.get('api/factory/'+companyId)
	/* localStorage.setItem('companyId', data); */
	return data
}
export const deleteFactory = async (id) => {
	await $host.delete('api/factory/'+id)
	return ;
}