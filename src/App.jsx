import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { getUser } from './api/user'
import LoadingScreen from './components/loading-screen/LoadingScreen'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductList from './pages/product/ProductList'
import { setUser } from './redux/slice/user'
import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer } from 'react-toastify'
import AddProduct from './pages/product/AddProduct'
import 'swiper/css'
import 'swiper/css/navigation'
import UpdateProduct from './pages/product/EditProduct'
import UserList from './pages/user/UserList'
import AddUser from './pages/user/AddUser'
import EditUser from './pages/user/EditUser'

function App() {
	const dispatch = useDispatch()

	const { mutate } = useMutation(getUser)

	useEffect(() => {
		mutate(undefined, {
			onSuccess: (data) => {
				if (data.status === 'FAIL') {
					return
				}
				dispatch(setUser(data))
			},
			onError: (error) => {
				dispatch(setUser(null))
				console.log(error)
			},
		})
	}, [])

	return (
		<>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/' element={<PrivateRoute children={<Home />} />}>
					<Route index element={<ProductList />} />
					<Route path='product' element={<ProductList />} />
					<Route path='product/add' element={<AddProduct />} />
					<Route path='product/edit/:id' element={<UpdateProduct />} />
					<Route path='user' element={<UserList />} />
					<Route path='user/add' element={<AddUser />} />
					<Route path='user/edit/:id' element={<EditUser />} />
					{/* <Route path='user/edit' element={<AddUser />} /> */}
					<Route path='test' element={<LoadingScreen />} />
				</Route>
				<Route path='*' element={<div> Sorry nothing heere</div>} />
			</Routes>
			<ToastContainer position='top-center' />
		</>
	)
}

export default App
