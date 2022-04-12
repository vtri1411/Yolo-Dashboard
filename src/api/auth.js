import axiosClient from '../config/axios'

export const login = ({ email, password }) => {
	return axiosClient.post('/auth/login/admin', {
		email,
		password,
	})
}


