import {
	Button,
	Center,
	Checkbox,
	Divider,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Image,
	Input,
	InputGroup,
	InputRightElement,
	Text,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { Link as ReachLink, useNavigate } from 'react-router-dom'
import { login } from '../api/auth'
import Google from '../assets/google.svg'
import Logo from '../assets/Logo.png'
import { checkIsValidEmail } from '../utils/validate'
import { useMutation, useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/slice/user'

const getUser = ({ user }) => ({ user: user.user })

const Login = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [email, setEmail] = useState('')
	const [emailError, setEmailError] = useState('')
	const [password, setPassword] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [isShowPw, setIsShowPw] = useState(false)
	const [isAutoLogin, setIsAutoLogin] = useState(true)
	const [loginError, setLoginError] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const { user } = useSelector(getUser)

	const { mutateAsync } = useMutation(login)

	const checkEmail = () => {
		const isValid = checkIsValidEmail(email)
		if (isValid) {
			setEmailError('')
			return true
		} else setEmailError('Vui lòng nhập email hợp lệ')
	}

	const checkPassword = () => {
		const isValid = password.length >= 6
		if (isValid) {
			setPasswordError('')
			return true
		} else {
			setPasswordError('Vui lòng nhập mật khẩu ít nhất 6 ký tự')
		}
	}

	const handleLogin = async (e) => {
		e.preventDefault()
		if (!checkEmail() | !checkPassword()) return
		try {
			setIsLoading(true)
			const data = await mutateAsync({ email, password })
			setIsLoading(false)
			if (data.status === 'FAIL') {
				console.log({ data })
				switch (data.code) {
					case 614:
						setLoginError('Tài khoản không phải admin!')
						break
					default:
						setLoginError('Đăng nhập thất bại! Vui lòng thử lại!')
				}
				return
			}
			dispatch(setUser(data.payload))
			navigate('/')
		} catch (error) {
			setIsLoading(false)
			setLoginError('Đăng nhập thất bại! Vui lòng thử lại!')
			console.log(error)
		}
	}

	useEffect(() => {
		if (user) {
			navigate('/')
		}
	}, [user])

	return (
		<Center bg='bg' w='100%' py='12' minH='100vh'>
			<Center
				as='form'
				bg='white'
				onSubmit={handleLogin}
				px='8'
				py='12'
				w='400px'
				flexDir='column'
			>
				<Image src={Logo} w='100px' mb='12' />
				<Text
					textTransform='capitalize'
					fontSize='lg'
					fontWeight='600'
					color='purple.400'
				>
					Hi, Welcome back
				</Text>
				<Text color='gray.500' fontSize='md' mt='3'>
					Enter your credentials to continue
				</Text>
				<Button variant='outline' w='full' mt='4'>
					<Image src={Google} w='6' />
					<Text fontWeight='bold'> Sign In with Google</Text>
				</Button>
				<Center w='full' mt='4'>
					<Divider flexGrow='1' />
					<Text
						px='8'
						py='1'
						borderWidth='1px'
						borderColor='gray.100'
						borderRadius='lg'
						flexShrink='0'
					>
						OR
					</Text>
					<Divider flexGrow='1' />
				</Center>
				<Text fontWeight='600' fontSize='sm' mb='8' mt='4'>
					Sign in with email address
				</Text>

				<FormControl
					variant='floating'
					id='login-email'
					isInvalid={emailError === '' ? false : true}
				>
					<Input
						placeholder=' '
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						onBlur={checkEmail}
					/>
					<FormLabel>Email</FormLabel>
					<FormErrorMessage>{emailError}</FormErrorMessage>
				</FormControl>

				<FormControl
					variant='floating'
					id='login-password'
					mt='4'
					isInvalid={passwordError === '' ? false : true}
				>
					<InputGroup>
						<Input
							placeholder=' '
							type={isShowPw ? 'text' : 'password'}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							onBlur={checkPassword}
						/>
						<FormLabel>Mật khẩu</FormLabel>
						<InputRightElement
							cursor='pointer'
							fontSize='md'
							onClick={(e) => setIsShowPw(!isShowPw)}
						>
							{isShowPw ? <MdVisibilityOff size='18px' /> : <MdVisibility />}
						</InputRightElement>
					</InputGroup>
					<FormErrorMessage>{passwordError}</FormErrorMessage>
				</FormControl>

				<Flex
					w='full'
					justifyContent='space-between'
					alignItems='center'
					mt='2'
				>
					<Checkbox
						colorScheme='blue'
						size='md'
						spacing='1'
						isChecked={isAutoLogin}
						onChange={(e) => setIsAutoLogin(e.target.checked)}
					>
						Tự động đăng nhập
					</Checkbox>
					<ReachLink to='/forget-password'>
						<Text color='purple.400' fontWeight='600'>
							Quên mật khẩu?
						</Text>
					</ReachLink>
				</Flex>

				<Text color='red.500' fontWeight='600' mt='6'>
					{loginError}
				</Text>

				<Button
					bg='purple.400'
					mt='8'
					color='white'
					_hover={{ bg: 'purple.500' }}
					w='full'
					type='submit'
					isDisabled={emailError || passwordError}
					isLoading={isLoading}
					loadingText='Đăng nhập'
				>
					Đăng nhập
				</Button>
			</Center>
		</Center>
	)
}

export default Login
