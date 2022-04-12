import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import theme from './theme'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import store from './redux/store'

const client = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			keepPreviousData: true,
		},
	},
})

ReactDOM.render(
	<StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<QueryClientProvider client={client}>
					<ColorModeScript initialColorMode='light' />
					<ChakraProvider resetCSS theme={theme}>
						<App />
					</ChakraProvider>
				</QueryClientProvider>
			</Provider>
		</BrowserRouter>
	</StrictMode>,
	document.getElementById('root')
)
