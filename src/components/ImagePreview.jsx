import { Box, Circle, Image } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import ImageViewer from 'react-simple-image-viewer'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FaTimes } from 'react-icons/fa'

const ImagePreview = ({ images, handleDeleteImage }) => {
	const [currentImage, setCurrentImage] = useState(0)
	const [isViewerOpen, setIsViewerOpen] = useState(false)

	const openImageViewer = useCallback((index) => {
		setCurrentImage(index)
		setIsViewerOpen(true)
	}, [])

	const closeImageViewer = () => {
		setCurrentImage(0)
		setIsViewerOpen(false)
	}

	return (
		<div>
			<Swiper
				modules={[Navigation]}
				slidesPerView={4}
				navigation
				grabCursor
				spaceBetween={15}
			>
				{images.map((item, index) => (
					<SwiperSlide
						key={index}
						style={{
							alignSelf: 'stretch',
							display: 'flex',
							height: 'auto',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Box pos='relative'>
							<Image
								src={item}
								cursor='pointer'
								pos='relative'
								onClick={() => openImageViewer(index)}
							/>
							<Circle
								position='absolute'
								top='1'
								right='1'
								color='white'
								bg='red'
								p='1'
								cursor='pointer'
								onClick={() => handleDeleteImage(index)}
							>
								<FaTimes />
							</Circle>
						</Box>
					</SwiperSlide>
				))}
			</Swiper>

			{isViewerOpen && (
				<ImageViewer
					src={images}
					currentIndex={currentImage}
					onClose={closeImageViewer}
					disableScroll={false}
					backgroundStyle={{
						backgroundColor: 'rgba(0,0,0,0.9)',
					}}
					closeOnClickOutside={true}
				/>
			)}
		</div>
	)
}

export default ImagePreview
