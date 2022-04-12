import { AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai'
import { CgProductHunt, CgUserList } from 'react-icons/cg'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { IoStorefrontOutline } from 'react-icons/io5'

export const sideBarLayout = [
	{
		name: 'Sản phẩm',
		icon: <CgProductHunt fontSize='1.5rem' />,
		list: [
			{
				name: 'Danh sách sản phẩm',
				icon: <IoStorefrontOutline fontSize='1.5rem' />,
				link: '/product',
			},
			{
				name: 'Thêm sản phẩm',
				icon: <IoIosAddCircleOutline fontSize='1.6rem' />,
				link: '/product/add',
			},
		],
	},
	{
		name: 'Tài khoản',
		icon: <AiOutlineUser fontSize='1.3rem' />,
		list: [
			{
				name: 'Danh sách tài khoản',
				icon: <CgUserList fontSize='1.8rem' />,
				link: '/user',
			},
			{
				name: 'Thêm tài khoản',
				icon: <AiOutlineUserAdd fontSize='1.5rem' />,
				link: '/user/add',
			},
		],
	},
]
