import { Box, Center, Heading } from '@chakra-ui/react'
import React from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addProduct } from '../../api/product'
import ProductForm from '../../components/form/product/ProductForm'
import Header from '../../components/Header'

const AddProduct = () => {
	const navigate = useNavigate()
	const { mutateAsync } = useMutation(addProduct)

	const handleAddProduct = async (data) => {
		try {
			await mutateAsync({ ...data })
			toast.success('Thêm tài khoản thành công!')
			navigate('/product')
		} catch (error) {
			toast.error('Thêm sản phẩm thất bại! Vui lòng thử lại sau ít phút!')
		}
	}

	return (
		<Box>
			<Header breadcrumb={[{ display: 'Sản phẩm', path: '/product' }]} />
			<Box mt='3' bg='white' py='6' px='4' borderRadius='xl'>
				<Center mb='12'>
					<Heading
						w='fit-content'
						bgGradient='linear(to-l, #05d6d9, #f907fc)'
						bgClip='text'
						fontSize='2xl'
						fontWeight='700'
					>
						Thêm sản phẩm
					</Heading>
				</Center>

				<Box px='4'>
					<ProductForm onSubmit={handleAddProduct} />
				</Box>
			</Box>
		</Box>
	)
}

export default AddProduct
