import { Button, Center } from '@chakra-ui/react'
import React from 'react'
import { useMutation } from 'react-query'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { logoutUser } from '../api/user'
import { setUser } from '../redux/slice/user'
import Breadcrumb from './Breadcrumb'

const Header = ({ breadcrumb }) => {
	const dispatch = useDispatch()
	const { mutateAsync } = useMutation('logout', logoutUser)

	const handleClickLogout = async () => {
		try {
			await mutateAsync()
			dispatch(setUser(null))
			toast.success('Đăng xuất thành công')
		} catch (error) {
			console.log(error)
			toast.error('Đăng xuất thất bại')
		}
	}

	return (
		<Center
			bg='white'
			py='2'
			px='4'
			my='6'
			borderRadius='xl'
			justifyContent='space-between'
		>
			<Breadcrumb listPath={breadcrumb} />
			<Button colorScheme='blackAlpha' onClick={handleClickLogout}>
				Đăng xuất
			</Button>
		</Center>
	)
}

export default Header
