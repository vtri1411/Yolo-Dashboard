import { extendTheme } from '@chakra-ui/react'

const activeLabelStyles = {
	transform: 'scale(0.85) translateY(-24px)',
}

const theme = extendTheme({
	styles: {
		global: {
			'input::-ms-reveal, input::-ms-clear': {
				display: 'none',
			},
		},
	},
	fonts: {
		body: 'Roboto, sans-serif',
	},
	colors: {
		hover: '#F5F5F5',
		bg: '#E3F2FD',
		purple: {
			200: '#EDE7F6',
			400: '#673AB7',
			500: '#5e35b1',
		},
	},
	// For floating input
	components: {
		Form: {
			variants: {
				floating: {
					container: {
						_focusWithin: {
							label: {
								...activeLabelStyles,
							},
						},
						'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label':
							{
								...activeLabelStyles,
							},
						label: {
							top: 0,
							left: 0,
							zIndex: 2,
							position: 'absolute',
							backgroundColor: 'white',
							pointerEvents: 'none',
							mx: 3,
							px: 1,
							my: 2,
							transformOrigin: 'left top',
						},
					},
				},
			},
		},
	},
})

export default theme
