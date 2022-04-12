import { Box, Center, Heading } from '@chakra-ui/react'
import React from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createUser } from '../../api/user'
import ProductForm from '../../components/form/product/ProductForm'
import UserForm from '../../components/form/user/UserForm'
import Header from '../../components/Header'

const AddUser = () => {
	const navigate = useNavigate()
	const { mutateAsync } = useMutation(createUser)

	const handleAddUser = async (data) => {
		try {
			const result = await mutateAsync(data)
			if (result.status === 'FAIL') {
				switch (result.code) {
					case 606:
						return toast.error('Thêm tài khoản thất bại! Email đã tồn tại!')
				}
			}
		
		} catch (error) {
			toast.error('Thêm tài khoản thất bại! Vui lòng thử lại sau ít phút!')
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
						Thêm tài khoản
					</Heading>
				</Center>

				<Box px='4'>
					<UserForm onSubmit={handleAddUser} />
				</Box>
			</Box>
		</Box>
	)
}

export default AddUser
