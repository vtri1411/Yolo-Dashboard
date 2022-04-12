import { Box } from '@chakra-ui/react'
import React from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getUserById, updateUser } from '../../api/user'
import UserForm from '../../components/form/user/UserForm'
import Header from '../../components/Header'
import PageTitle from '../../components/PageTitle'

const convertDataForUserForm = ({
	email,
	phone,
	name,
	address,
	verified,
	avatar,
	userRoles,
}) => ({
	email,
	phone,
	password: '',
	repassword: '',
	name,
	address,
	verified: verified ? 'true' : 'false',
	avatar,
	roles: userRoles.map((userRole) => userRole.role),
})

const EditUser = () => {
	const navigate = useNavigate()
	const { mutateAsync } = useMutation(updateUser)
	const { id } = useParams()
	const { data, isLoading } = useQuery(['user', id], getUserById)

	const handleEditUser = async (values) => {
		console.log({ values })
		try {
			await mutateAsync({ ...values, id })
			toast.success('Cập nhật tài khoản thành công')
			navigate('/user')
		} catch (error) {
			console.log(error)
			toast.error('Cập nhật tài khoản thất bại! Vui lòng thử lại sau ít phút!')
		}
	}

	return (
		<Box>
			<Header breadcrumb={[{ display: 'Tài khoản', path: '/user' }]} />
			<Box mt='3' bg='white' py='6' px='4' borderRadius='xl'>
				<PageTitle title='Cập nhật tài khoản' />

				<Box px='4'>
					{!isLoading && data.payload ? (
						<UserForm
							initialValues={convertDataForUserForm(data.payload)}
							onSubmit={handleEditUser}
							type='edit'
						/>
					) : null}
				</Box>
			</Box>
		</Box>
	)
}

export default EditUser
