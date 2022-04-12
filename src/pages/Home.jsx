import {
	Accordion,
	AccordionButton,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Center,
	Divider,
	Flex,
	Heading,
	AccordionIcon,
	Image,
	ListIcon,
	ListItem,
	UnorderedList,
	Icon,
	List,
	Text,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
} from '@chakra-ui/react'
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import { MdStorage } from 'react-icons/md'
import { FaWarehouse } from 'react-icons/fa'
import { Link as ReachLink } from 'react-router-dom'
import { sideBarLayout } from '../layout/sidebar'
import { MdChevronRight } from 'react-icons/md'
import { FcHome } from 'react-icons/fc'

const Home = () => {
	const { pathname } = useLocation()
	const listPath = pathname.substring(1).split('/')

	return (
		<Flex minH='100vh'>
			<Box w='260px' bg='white' flexShrink='0' px='5' pt='10' pb='10'>
				<Center>
					<Image src={Logo} w='100px' />
				</Center>
				<Divider my='8' />

				<Accordion allowMultiple>
					{sideBarLayout.map((layout) => (
						<AccordionItem
							key={layout.name}
							border='none'
							mb='2'
							_last={{ mb: '0' }}
						>
							<h2>
								<AccordionButton
									p='0'
									border='none'
									padding='none'
									py='4'
									w='full'
									textAlign='center'
									d='flex'
									justifyContent='space-between'
									alignItems='center'
									borderRadius='xl'
									_hover={{ bg: 'purple.200' }}
									_expanded={{ bg: 'purple.200' }}
								>
									<Center alignItems='center'>
										{layout.icon}
										<Heading as='h6' fontSize='md' fontWeight='400' ml='2'>
											{layout.name}
										</Heading>
									</Center>
									<AccordionIcon />
								</AccordionButton>
							</h2>

							<AccordionPanel ml='2'>
								<List>
									{layout.list.map((sub) => (
										<ListItem
											key={sub.name + layout.name}
											py='3'
											_last={{ pb: '0' }}
										>
											<ReachLink to={sub.link}>
												<Flex alignItems='center'>
													<ListIcon>{sub.icon}</ListIcon>
													<Text>{sub.name}</Text>
												</Flex>
											</ReachLink>
										</ListItem>
									))}
								</List>
							</AccordionPanel>
						</AccordionItem>
					))}
				</Accordion>
			</Box>
			<Box flexGrow='1' minH='100vh' bg='bg' p='6' maxW='calc(100vw - 260px)'>
				<Outlet />
			</Box>
		</Flex>
	)
}

export default Home
