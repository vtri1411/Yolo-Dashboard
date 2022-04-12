import { Box } from '@chakra-ui/react'
import React from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getProductById, updateProduct } from '../../api/product'
import ProductForm from '../../components/form/product/ProductForm'
import Header from '../../components/Header'
import PageTitle from '../../components/PageTitle'

const convertDataForProductForm = ({
	name,
	description,
	available,
	unit,
	price,
	gender,
	brandId,
	categoryId,
	images,
	inventories,
}) => ({
	name,
	description,
	available: available ? 'true' : 'false',
	unit,
	price,
	gender: gender ? 'true' : 'false',
	brandId,
	categoryId,
	images: images?.map((image) => image.url),
	inventory: inventories?.map((inventory) => ({
		size: inventory.sizeId,
		color: inventory.colorId,
		amount: inventory.amount,
	})),
})

const EditProduct = () => {
	const navigate = useNavigate()
	const { mutateAsync } = useMutation(updateProduct)
	const { id } = useParams()
	const { data, isLoading } = useQuery(['product', id], getProductById)

	const handleEditProduct = async (values) => {
		try {
			await mutateAsync({ ...values, id: data.payload.id })
			toast.success('Cập nhật sản phẩm thành công')
			navigate('/product')
		} catch (error) {
			console.log(error)
			toast.error('Cập nhật sản phẩm thất bại! Vui lòng thử lại sau ít phút!')
		}
	}

	return (
		<Box>
			<Header breadcrumb={[{ display: 'Sản phẩm', path: '/product' }]} />
			<Box mt='3' bg='white' py='6' px='4' borderRadius='xl'>
				<PageTitle title='Cập nhật sản phẩm' />

				<Box px='4'>
					{!isLoading && data.payload ? (
						<ProductForm
							initialValues={convertDataForProductForm(data.payload)}
							onSubmit={handleEditProduct}
							type='edit'
						/>
					) : null}
				</Box>
			</Box>
		</Box>
	)
}

export default EditProduct
