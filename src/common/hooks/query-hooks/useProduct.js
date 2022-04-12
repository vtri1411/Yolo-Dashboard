import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { deleteProducts, getProducts } from '../../../api/product'
import { PRODUCT_QUERY_KEY } from '../../config/query-keys'

export const useGetProducts = (onSuccess, onError) => {
	return useQuery(PRODUCT_QUERY_KEY, getProducts, {
		onSuccess,
		onError,
	})
}

export const useDeleteProduct = () => {
	const queryClient = useQueryClient()
	return useMutation(deleteProducts, {
		onMutate: async (ids) => {
			await queryClient.cancelQueries(PRODUCT_QUERY_KEY)
			const previousProducts = queryClient.getQueryData(PRODUCT_QUERY_KEY)
			const newProducts = previousProducts.products.filter(
				(product) => !ids.includes(product.id)
			)
			queryClient.setQueryData(PRODUCT_QUERY_KEY, { products: newProducts })
			return {
				previousProducts,
			}
		},
		onError: (_error, _ids, context) => {
			toast.error('Xoá sản phẩm thất bại! Vui lòng thử lại sau ít phút!')
			queryClient.setQueryData(PRODUCT_QUERY_KEY, context.previousProducts)
		},
		onSuccess: () => {
			toast.success('Xoá sản phẩm thành công')
		},
		onSettled: () => {
			queryClient.invalidateQueries(PRODUCT_QUERY_KEY)
		},
	})
}
