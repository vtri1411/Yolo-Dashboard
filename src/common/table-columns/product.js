import { Badge } from '@chakra-ui/react'
import format from 'date-format'
import { Link } from 'react-router-dom'
import { numberWithCommas } from '../../utils/utils'

export const COLUMNS = [
	{
		Header: 'Tên',
		accessor: 'name',
		Cell: ({ row, value }) => {
			// return <Link to={`/product/${row.original.id}`}>{value}</Link>
			return value
		},
	},
	{
		Header: 'Tình trạng',
		accessor: 'available',
		Cell: ({ value }) => {
			return (
				<Badge colorScheme={value === 1 ? 'green' : 'red'}>
					{value === 1 ? 'Sẵn sàng' : 'Không sẵn sàng'}
				</Badge>
			)
		},
	},
	{
		Header: 'Giới tính',
		accessor: 'gender',
		Cell: ({ value }) => (
			<Badge colorScheme={value === 1 ? 'gray' : 'pink'}>
				{value === 1 ? 'Nam' : 'Nữ'}
			</Badge>
		),
	},
	{
		Header: 'Giá tiền',
		accessor: 'price',
		Cell: ({ value }) => numberWithCommas(value),
	},
	{
		Header: 'Ngày cập nhật',
		accessor: 'updatedAt',
		Cell: ({ value }) => {
			return format('dd/MM/yyyy hh:mm', new Date(Date.parse(value)))
		},
	},
	{
		Header: 'Phân loại',
		accessor: 'categoryName',
		Cell: ({ value }) => <Badge colorScheme='cyan'>{value}</Badge>,
	},
	{
		Header: 'Thương hiệu',
		accessor: 'brandName',
		Cell: ({ value }) => <Badge colorScheme='purple'>{value}</Badge>,
	},
	{
		Header: 'Tổng số lượng',
		accessor: 'count',
	},
]
