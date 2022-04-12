import axiosClient from '../config/axios'
export const getAllBrands = () => {
	return axiosClient.get('/brand')
}
