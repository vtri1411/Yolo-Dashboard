import {
	Box,
	Button,
	Center,
	Circle,
	Divider,
	Flex,
	Input,
	InputGroup,
	InputLeftElement,
	List,
	ListItem,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useDisclosure,
} from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
import { BiFilterAlt } from 'react-icons/bi'
import {
	MdAdd,
	MdArrowDropDown,
	MdChevronLeft,
	MdChevronRight,
} from 'react-icons/md'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import {
	useGlobalFilter,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable,
} from 'react-table'
import { useAsyncDebounce } from 'react-table'
import { pageSizeList } from '../../common/config'
import { COLUMNS } from '../../common/table-columns/user'
import IndeterminateCheckbox from './IndeterminateCheckbox'
import { Link as ReachLink } from 'react-router-dom'

const ActionTypeEnum = {
	DELETE_MANY: 'DELETE_MANY',
	DELETE_ONE: 'DELETE_ONE',
}

const UserTable = ({ data, deleteUser }) => {
	const navigate = useNavigate()

	const columns = useMemo(() => COLUMNS, [])
	const _data = useMemo(() => data, [data])

	const [filterKeyword, setFilterKeyword] = useState('')
	const [isOpenSetPageSize, setIsOpenSetPageSize] = useState(false)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [currentRowAction, setCurrentRowAction] = useState(null)
	const [actionType, setActionType] = useState('')

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		canNextPage,
		canPreviousPage,
		previousPage,
		nextPage,
		setPageSize,
		pageCount,
		rows,
		prepareRow,
		state: { globalFilter, pageSize, pageIndex },
		setGlobalFilter,
		selectedFlatRows,
	} = useTable(
		{
			columns,
			data: _data,
			initialState: { pageSize: 5 },
		},
		useGlobalFilter,
		useSortBy,
		usePagination,
		useRowSelect,
		(hook) => {
			hook.visibleColumns.push((columns) => [
				{
					id: 'selection',
					Header: ({ getToggleAllPageRowsSelectedProps }) => (
						<IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
					),
					Cell: ({ row }) => (
						<IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
					),
				},
				...columns,
			])
		}
	)

	const handleChangeGlobalFilterAsync = useAsyncDebounce(
		(value) => setGlobalFilter(value),
		500
	)

	const handleChangePageSize = (size) => {
		setIsOpenSetPageSize(false)
		setPageSize(size)
	}

	const handleDeleteProduct = () => {
		switch (actionType) {
			case ActionTypeEnum.DELETE_ONE:
				deleteUser([currentRowAction.original.id])
				break
			case ActionTypeEnum.DELETE_MANY:
				const ids = selectedFlatRows.map((row) => row.original.id)
				deleteUser(ids)
		}
		onClose()
	}

	return (
		<Box>
			<Flex justifyContent='space-between' mb='5'>
				<InputGroup maxW='400px'>
					<InputLeftElement pointerEvents='none' children={<BiFilterAlt />} />
					<Input
						type='text'
						placeholder='Tìm kiếm tài khoản'
						value={filterKeyword}
						onChange={(e) => {
							setFilterKeyword(e.target.value)
							handleChangeGlobalFilterAsync(e.target.value)
						}}
					/>
				</InputGroup>
				<ReachLink to='/user/add' style={{ display: 'flex' }}>
					<Center
						bg='purple.400'
						borderRadius='3xl'
						pl='3'
						pr='5'
						color='white'
					>
						<MdAdd />
						<Text ml='1'>Thêm tài khoản</Text>
					</Center>
				</ReachLink>
			</Flex>

			{selectedFlatRows?.length ? (
				<Center justifyContent='left' my='6' ml='10'>
					<Text>{selectedFlatRows.length} được chọn </Text>
					<Box
						w='1px'
						alignSelf='stretch'
						bg='gray.300'
						mx='3'
						transform='scaleY(0.6)'
					/>
					<Circle
						cursor='pointer'
						p='3'
						bg='white'
						color='red.600'
						_hover={{ bg: 'gray.200' }}
						onClick={() => {
							setActionType(ActionTypeEnum.DELETE_MANY)
							onOpen()
						}}
					>
						<BsTrash />
					</Circle>
				</Center>
			) : null}

			<TableContainer w='100%' maxW='100%'>
				<Table {...getTableProps()}>
					<Thead>
						{headerGroups.map((headerGroup) => (
							<Tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<Th
										{...column.getHeaderProps(column.getSortByToggleProps())}
										px='3'
									>
										<Center justifyContent='left'>
											{column.render('Header')}
											{column.isSorted ? (
												column.isSortedDesc ? (
													<Center ml='1' fontSize='sm'>
														<AiOutlineArrowDown />
													</Center>
												) : (
													<Center ml='1' fontSize='sm'>
														<AiOutlineArrowUp />
													</Center>
												)
											) : (
												''
											)}
										</Center>
									</Th>
								))}
								<Th>Hành động</Th>
							</Tr>
						))}
					</Thead>

					<Tbody {...getTableBodyProps()}>
						{page.map((row) => {
							prepareRow(row)
							return (
								<Tr
									{...row.getRowProps()}
									_hover={{
										bg: 'hover',
									}}
								>
									{row.cells.map((cell) => (
										<Td {...cell.getCellProps()} px='3'>
											{cell.render('Cell')}
										</Td>
									))}
									<Td>
										<Center justifyContent='left'>
											<Box
												color='cyan.600'
												cursor='pointer'
												fontSize='xl'
												mr='7'
												onClick={() =>
													navigate(`/user/edit/${row.original.id}`)
												}
											>
												<AiOutlineEdit />
											</Box>
											<Box
												color='red.600'
												cursor='pointer'
												fontSize='lg'
												onClick={() => {
													setActionType(ActionTypeEnum.DELETE_ONE)
													setCurrentRowAction(row)
													onOpen()
												}}
											>
												<BsTrash />
											</Box>
										</Center>
									</Td>
								</Tr>
							)
						})}
					</Tbody>
				</Table>
			</TableContainer>

			<Center justifyContent='right' mt='8' mb='2'>
				<Center>
					<Text mr='1'>Số lượng hiển thị:</Text>

					<Popover
						placement='top'
						isOpen={isOpenSetPageSize}
						onClose={() => setIsOpenSetPageSize(false)}
					>
						<PopoverTrigger>
							<Center
								cursor='pointer'
								onClick={() => setIsOpenSetPageSize(true)}
							>
								{pageSize}
								<MdArrowDropDown />
							</Center>
						</PopoverTrigger>
						<PopoverContent
							w='fit-content'
							h='fit-content'
							boxShadow='none !important'
						>
							<List>
								{pageSizeList.map((size) => (
									<ListItem
										d='flex'
										justifyContent='center'
										key={size}
										children={size}
										cursor='pointer'
										p='2'
										bg={size === pageSize ? 'bg.100' : 'white'}
										onClick={() => handleChangePageSize(size)}
										_hover={{ bg: 'hover' }}
									/>
								))}
							</List>
						</PopoverContent>
					</Popover>
				</Center>

				<Text mx='6'>
					{pageIndex * pageSize + 1} &minus; {pageSize * (pageIndex + 1)} trên{' '}
					{rows.length}
				</Text>

				<Center>
					<Circle
						p='2'
						fontSize='xl'
						cursor={canPreviousPage ? 'pointer' : 'not-allowed'}
						onClick={canPreviousPage ? previousPage : null}
						_hover={{ bg: 'gray.200' }}
					>
						<MdChevronLeft />
					</Circle>
					<Circle
						p='2'
						fontSize='xl'
						cursor={canNextPage ? 'pointer' : 'not-allowed'}
						onClick={canNextPage ? nextPage : null}
						_hover={{ bg: 'gray.200' }}
					>
						<MdChevronRight />
					</Circle>
				</Center>
			</Center>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Xác nhận xoá</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{actionType === ActionTypeEnum.DELETE_ONE &&
							`Bạn có chắc muốn xoá tài khoản ${currentRowAction.original.email}`}

						{actionType === ActionTypeEnum.DELETE_MANY &&
							`Bạn có chắc muốn xoá ${selectedFlatRows.length} tài khoản`}
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='gray' mr='4' onClick={onClose}>
							Quay lại
						</Button>
						<Button colorScheme='red' onClick={handleDeleteProduct}>
							Xoá
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	)
}

export default UserTable
