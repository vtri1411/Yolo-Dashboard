import axiosClient from '../config/axios'
export const getAllCategories = () => {
	return axiosClient.get('/category')
}