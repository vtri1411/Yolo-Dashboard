import { Box, Center, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link as ReachLink } from 'react-router-dom'
import { getProducts } from '../../api/product'
import {
	useDeleteProduct,
	useGetProducts,
} from '../../common/hooks/query-hooks/useProduct'
import Breadcrumb from '../../components/Breadcrumb'
import Header from '../../components/Header'
import LoadingScreen from '../../components/loading-screen/LoadingScreen'
import PageTitle from '../../components/PageTitle'
import ProductTable from '../../components/table/ProductTable'

const ProductList = () => {
	const { data, isLoading, isError, error } = useGetProducts()
	const { mutate } = useDeleteProduct()

	return (
		<Box p='3'>
			<Header breadcrumb={[{ display: 'Sản phẩm', path: '/product' }]} />
			<Box mt='3' bg='white' py='6' px='4' borderRadius='xl'>
				<PageTitle title='Danh sách sản phẩm' />
				{isLoading && <LoadingScreen />}
				{!isLoading && isError && <h2>Có lỗi xảy ra</h2>}
				{!isLoading && !isError && data.products && (
					<ProductTable data={data.products} deleteProduct={mutate} />
				)}
			</Box>
		</Box>
	)
}

export default ProductList
