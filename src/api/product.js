import axiosClient from '../config/axios'

export const getProducts = () => {
	return axiosClient.get('/product/admin')
}

export const getProductById = ({ queryKey }) => {
	return axiosClient.get(`/product/${queryKey[1]}`)
}

export const deleteProducts = (ids) => {
	return axiosClient.delete('/product', {
		data: {
			ids,
		},
	})
}

export const addProduct = ({
	name,
	description,
	available,
	unit,
	price,
	categoryId,
	gender,
	brandId,
	images,
	inventory,
}) => {
	return axiosClient.post('/product', {
		name,
		description,
		available,
		unit,
		price,
		categoryId,
		gender,
		brandId,
		images,
		inventory,
	})
}

export const updateProduct = ({
	name,
	description,
	available,
	unit,
	price,
	categoryId,
	gender,
	brandId,
	images,
	inventory,
	id,
}) => {
	return axiosClient.patch(`/product/${id}`, {
		name,
		description,
		available,
		unit,
		price,
		categoryId,
		gender,
		brandId,
		images,
		inventory,
	})
}
