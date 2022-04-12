import {
	Box,
	Button,
	Center,
	FormControl,
	FormLabel,
	Heading,
	Input as ChakraInput,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import FormikControl from '../FormikControl'
import ImagePreview from '../../ImagePreview'
import { formControl } from '../../../common/config'
import { createUserValidationSchema } from '../../../common/validation-schema/create-user'
import { updateUserValidationSchema } from '../../../common/validation-schema/update-user'

const _initialValues = {
	email: '',
	phone: '',
	password: '',
	repassword: '',
	name: '',
	address: '',
	verified: '',
	avatar: '',
	roles: [],
}

const UserForm = ({ initialValues = _initialValues, onSubmit, type }) => {
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={
				type === 'edit'
					? updateUserValidationSchema
					: createUserValidationSchema
			}
			onSubmit={async (values, onSubmitProps) => {
				await onSubmit(values)
				// onSubmitProps.resetForm()
				onSubmitProps.setSubmitting(false)
			}}
		>
			{(form) => (
				<Form>
					{type === 'edit' ? (
						<FormControl mb='6'>
							<FormLabel>Email: </FormLabel>
							<ChakraInput
								isReadOnly
								value={form.values.email}
								cursor='not-allowed'
							/>
						</FormControl>
					) : (
						<Box mb='6'>
							<FormikControl
								control={formControl.INPUT}
								type='email'
								label='Email: '
								name='email'
								placeholder='Nhập email'
							/>
						</Box>
					)}

					<Box mb='6'>
						<FormikControl
							control={formControl.INPUT}
							label='Số điện thoại: '
							name='phone'
							placeholder='Nhập số điện thoại'
						/>
					</Box>

					<Box mb='6'>
						<FormikControl
							control={formControl.PASSWORD}
							label='Mật khẩu: '
							name='password'
							type='password'
							placeholder='Nhập mật khẩu'
						/>
					</Box>

					<Box mb='6'>
						<FormikControl
							control={formControl.PASSWORD}
							label=' Nhập lại mật khẩu: '
							type='password'
							name='repassword'
							placeholder='Nhập lại mật khẩu'
						/>
					</Box>

					<Box mb='6'>
						<FormikControl
							control={formControl.INPUT}
							label='Tên: '
							name='name'
							placeholder='Nhập địa chỉ'
						/>
					</Box>

					<Box mb='6'>
						<FormikControl
							control={formControl.INPUT}
							label='Địa chỉ: '
							name='address'
							placeholder='Nhập địa chỉ'
						/>
					</Box>

					<Box mb='6'>
						<FormikControl
							control={formControl.RADIO_BUTTON}
							label='Xác thực '
							name='verified'
							options={[
								{ value: 'true', display: 'Xác thực' },
								{ value: 'false', display: 'Không xác thực' },
							]}
						/>
					</Box>

					<Box mb='6'>
						<FormikControl
							control={formControl.CHECKBOX}
							label='Loại tài khoản: '
							name='roles'
							options={[
								{ value: 'ADMIN', display: 'Người quản trị' },
								{ value: 'CLIENT', display: 'Người dùng' },
							]}
						/>
					</Box>

					<Box mb='6'>
						<FormikControl
							control={formControl.FILE}
							label='Ảnh đại diện: '
							name='avatar'
						/>
					</Box>

					{form.values.avatar ? (
						<Box mb='6'>
							<ImagePreview
								images={[form.values.avatar]}
								handleDeleteImage={(index) => {
									form.setFieldValue('avatar', '')
								}}
							/>
						</Box>
					) : null}

					<Center mt='10'>
						<Button type='reset' colorScheme='gray' mr='8'>
							Đặt lại
						</Button>

						<Button
							type='submit'
							colorScheme='teal'
							isDisabled={form.isSubmitting}
							isLoading={form.isSubmitting}
						>
							{type === 'edit' ? 'Cập nhật tài khoản' : 'Thêm tài khoản'}
						</Button>
					</Center>
				</Form>
			)}
		</Formik>
	)
}

export default UserForm
