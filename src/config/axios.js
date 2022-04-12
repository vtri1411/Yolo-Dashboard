import axios from 'axios'

const axiosClient = axios.create({
	// baseURL: 'http://localhost:5000/api',
	baseURL: 'https://yolo-shop.up.railway.app/api',
	withCredentials: true,
})

axiosClient.interceptors.response.use(
	function (res) {
		return res.data
	},
	function (error) {
		throw error
	}
)

export default axiosClient
