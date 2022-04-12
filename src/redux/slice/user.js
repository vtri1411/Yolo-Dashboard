import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: null,
	isLoading: true,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload
			state.isLoading = false
		},
	},
})

const { actions, reducer } = userSlice
export const { setUser } = actions
export default reducer
