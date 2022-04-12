import { useQueries } from 'react-query'
import { getAllBrands } from '../../../api/brand'
import { getAllCategories } from '../../../api/category'
import { getAllColors } from '../../../api/color'
import { getAllSizes } from '../../../api/size'
import { BRAND_QUERY_KEY, CATEGORY_QUERY_KEY, COLOR_QUERY_KEY, SIZE_QUERY_KEY } from '../../config/query-keys'

export const useGetProductUtils = () => {
	return useQueries([
		{ 
			queryKey: CATEGORY_QUERY_KEY,
			queryFn: getAllCategories,
		},
		{
			queryKey: BRAND_QUERY_KEY,
			queryFn: getAllBrands,
		},
		{
			queryKey: COLOR_QUERY_KEY,
			queryFn: getAllColors,
		},
		{
			queryKey: SIZE_QUERY_KEY,
			queryFn: getAllSizes,
		},
	])
}
