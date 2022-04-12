import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

const getUser = ({ user }) => ({ user: user.user, isLoading: user.isLoading })

const PrivateRoute = ({ children }) => {
	const navigate = useNavigate()

	const { user, isLoading } = useSelector(getUser)

	if (isLoading) return null

	return user ? children : <Navigate to='/login' />
}

export default PrivateRoute
