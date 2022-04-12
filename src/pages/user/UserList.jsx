import React from 'react'
import { Box } from '@chakra-ui/react'
import LoadingScreen from '../../components/loading-screen/LoadingScreen'
import PageTitle from '../../components/PageTitle'
import { useQuery } from 'react-query'
import { getUserList } from '../../api/user'
import Header from '../../components/Header'
import UserTable from '../../components/table/UserTable'
import {
	useDeleteUser,
	useGetUsers,
} from '../../common/hooks/query-hooks/useUser'

const UserList = () => {
	const { data, isLoading, error, isError } = useGetUsers()
	const { mutate } = useDeleteUser()

	return (
		<Box p='3'>
			<Header breadcrumb={[{ display: 'Sản phẩm', path: '/product' }]} />
			<Box mt='3' bg='white' py='6' px='4' borderRadius='xl'>
				<PageTitle title='Danh sách tài khoản' />
				{isLoading && <LoadingScreen />}
				{!isLoading && isError && <h2>Có lỗi xảy ra</h2>}
				{!isLoading && !isError && data.payload && (
					<UserTable data={data.payload} deleteUser={mutate} />
				)}
			</Box>
		</Box>
	)
}

export default UserList
