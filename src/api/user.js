import axiosClient from '../config/axios'

export const getUser = async () => {
	return axiosClient.get('/user/admin')
}

export const logoutUser = async () => {
	return axiosClient.get('/auth/logout')
}

export const getUserList = async () => {
	return axiosClient.get('/user/list')
}

export const createUser = async (data) => {
	return axiosClient.post('/user/admin/create', data)
}

export const getUserById = async ({ queryKey }) => {
	return axiosClient.get(`/user/admin/${queryKey[1]}`)
}

export const updateUser = async ({
	phone,
	password,
	name,
	address,
	verified,
	avatar,
	roles,
	id,
}) => {
	return axiosClient.patch(`/user/admin/${id}`, {
		phone,
		password,
		name,
		address,
		verified,
		avatar,
		roles,
	})
}

export const deleteUsers = (ids) => {
	return axiosClient.delete('/user', {
		data: {
			ids,
		},
	})
}
