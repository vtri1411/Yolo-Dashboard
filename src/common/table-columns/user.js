import { Badge, Center, Grid, Image } from '@chakra-ui/react'
import format from 'date-format'
import { Link } from 'react-router-dom'
import { numberWithCommas } from '../../utils/utils'

export const COLUMNS = [
	{
		Header: 'Ảnh đại diện',
		accessor: 'avatar',
		Cell: ({ row, value }) => {
			return (
				// <Link to={`/user/${row.original.id}`}>
				<Image src={value} maxBlockSize='12' />
				// </Link>
			)
		},
	},
	{
		Header: 'Email',
		accessor: 'email',
	},
	{
		Header: 'Số điện thoại',
		accessor: 'phone',
	},
	{
		Header: 'Địa chỉ',
		accessor: 'address',
	},
	{
		Header: 'Xác thực',
		accessor: 'verified',
		Cell: ({ value }) => {
			return (
				<Badge colorScheme={value ? 'green' : 'red'}>
					{value ? 'Đã xác thực' : 'Chưa xác thực'}
				</Badge>
			)
		},
	},
	{
		Header: 'Quyền',
		accessor: 'userRoles',
		Cell: ({ value }) => (
			<Grid templateColumns='repeat(2, 1fr)' gap='2' w='fit-content'>
				{value.map((userRole, index) => (
					<Badge
						key={index}
						colorScheme={userRole.role === 'CLIENT' ? 'yellow' : 'blue'}
						w='fit-content'
					>
						{userRole.role}
					</Badge>
				))}
			</Grid>
		),
	},
]
