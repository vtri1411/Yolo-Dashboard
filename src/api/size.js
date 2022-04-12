import axiosClient from '../config/axios'

export const getAllSizes = () => {
	return axiosClient.get('/size')
}
