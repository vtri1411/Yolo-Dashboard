import axiosClient from '../config/axios'
export const getAllColors = () => {
	return axiosClient.get('/color')
}