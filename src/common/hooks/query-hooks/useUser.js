import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { deleteUsers, getUserList } from '../../../api/user'
import { USER_QUERY_KEY } from '../../config/query-keys'

export const useGetUsers = (onSuccess, onError) => {
	return useQuery(USER_QUERY_KEY, getUserList, {
		onSuccess,
		onError,
	})
}

export const useDeleteUser = () => {
	const queryClient = useQueryClient()
	return useMutation(deleteUsers, {
		onMutate: async (ids) => {
			await queryClient.cancelQueries(USER_QUERY_KEY)
			const previousUsers = queryClient.getQueryData(USER_QUERY_KEY)
			const newUsers = previousUsers.payload.filter(
				(user) => !ids.includes(user.id)
			)
			queryClient.setQueryData(USER_QUERY_KEY, { payload: newUsers })
			return {
				previousUsers,
			}
		},
		onError: (_error, _ids, context) => {
			toast.error('Xoá tài khoản thất bại! Vui lòng thử lại sau ít phút!')
			queryClient.setQueryData(USER_QUERY_KEY, context.previousUsers)
		},
		onSuccess: () => {
			toast.success('Xoá tài khoản thành công!')
		},
		onSettled: () => {
			queryClient.invalidateQueries(USER_QUERY_KEY)
		},
	})
}
