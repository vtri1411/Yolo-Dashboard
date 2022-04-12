import { combineReducers } from 'redux'
import userReducer from './slice/user'
import productReducer from './slice/product'

const rootReducer = combineReducers({
	user: userReducer,
  product: productReducer
})

export default rootReducer
