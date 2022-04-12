import { Center, Heading } from '@chakra-ui/react'
import React from 'react'

const PageTitle = ({title}) => {
	return (
		<Center mb='12'>
			<Heading
				w='fit-content'
				bgGradient='linear(to-l, #05d6d9, #f907fc)'
				bgClip='text'
				fontSize='2xl'
				fontWeight='700'
			>
			{title}
			</Heading>
		</Center>
	)
}

export default PageTitle
