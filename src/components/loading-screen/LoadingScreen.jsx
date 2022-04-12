import React from 'react'
import './loading-screen.css'

const LoadingScreen = () => {
	return (
		<div
			style={{
				height: '100%',
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div className='spinner'></div>
		</div>
	)
}

export default LoadingScreen
