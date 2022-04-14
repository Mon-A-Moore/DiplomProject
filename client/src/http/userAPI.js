import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password,tel) => {
    const {data} = await $host.post('api/user/registration', {email, password, tel, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
		localStorage.setItem('id', jwt_decode(data.token).id)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
		localStorage.setItem('companyId', jwt_decode(data.token).companyId)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const fetchUsers = async (companyId) => {
	const {data} = await $authHost.get('api/user/all/' + companyId)
	return data
}
export const fetchOneUser = async (id) => {
	const {data} = await $host.get('api/user/' + id)
	return data
}
export const checkUsersCompany = async (id) => {
	const {data} = await $host.post('api/user/checkUser',id)
	if(data.err===1)
	{
	localStorage.setItem('companyId', data.companyId);
	return data;
	}
	else
	return data;
}

