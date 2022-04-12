import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	editProduct: null,
}

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		setEditProduct(state, action) {
			state.editProduct = action.payload
		},
	},
})

const { reducer, actions } = productSlice
export const { set } = actions
export default reducer
