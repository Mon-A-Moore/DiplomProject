import {$authHost, $host} from "./index";


export const createCompany = async (company) => {
	const {data} = await $authHost.post('api/company', company)
	localStorage.setItem('companyId', data);
	return data
}

export const updateCompany = async (company) => {
	const {data} = await $host.put('api/company',company)
	return data
}
export const fetchCompany = async () => {
	const {data} = await $host.get('api/company')
	return data
}

export const fetchOneCompany = async (id) => {
	const {data} = await $host.get('api/company/' + id)
	return data
}

export const addUsersCompany = async (companyusers) => {
	await $authHost.post('api/company/addusers', companyusers)
	return;
}
export const getUsersCompany = async (companyId) => {
	const {data} =await $authHost.post('api/company/getusers', companyId)
	return data;
}
export const deleteUsersCompany = async (delcompanyusers) => {
	await $authHost.post('api/company/deleteusers', delcompanyusers)
	return ;
}

export const CompanyInfoUpdate = async (info,companyId) => {
	await $authHost.post('api/company/info', {info,companyId})
	return ;
}

export const CompanyNewsUpdate = async (news,companyId) => {
	await $authHost.post('api/company/news', {news,companyId})
	return ;
}



/* 
export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}

export const fetchDevices = async (typeId, brandId, page, limit= 5) => {
    const {data} = await $host.get('api/device', {params: {
            typeId, brandId, page, limit
        }})
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}
 */