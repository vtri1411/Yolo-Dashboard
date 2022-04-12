import { Box, Button, Center, Heading } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import Inventory from './Inventory'
import FormikControl from '../FormikControl'
import ImagePreview from '../../ImagePreview'
import { formControl } from '../../../common/config'
import { useGetProductUtils } from '../../../common/hooks/query-hooks/useProductUtil'
import { productValidationSchema } from '../../../common/validation-schema/product'

const _initialValues = {
	name: '',
	description: '',
	available: '',
	unit: '',
	price: '',
	gender: '',
	brandId: '',
	categoryId: '',
	images: [],
	inventory: [
		// {
		// 	size: '1',
		// 	color: '2',
		// 	amount: '3',
		// },
	],
}

const ProductForm = ({ initialValues = _initialValues, onSubmit, type }) => {
	const result = useGetProductUtils()

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={productValidationSchema}
			onSubmit={async (values, onSubmitProps) => {
				console.log(values)
				await onSubmit(values)
				onSubmitProps.resetForm()
				onSubmitProps.setSubmitting(false)
			}}
		>
			{(form) => (
				<Form>
					<Box mb='6'>
						<FormikControl
							control={formControl.INPUT}
							label='Tên sản phẩm: '
							name='name'
							placeholder='Nhập tên sản phẩm'
						/>
					</Box>

					<Box mb='6'>
						<FormikControl
							control={formControl.TEXTAREA}
							label='Mô tả sản phẩm: '
							name='description'
							placeholder='Nhập mô tả sản phẩm'
						/>
					</Box>

					<Box mb='6'>
						<FormikControl
							control={formControl.RADIO_BUTTON}
							label='Tình trạng: '
							name='available'
							options={[
								{ value: 'true', display: 'Có sẵn' },
								{ value: 'false', display: 'Không có sẵn' },
							]}
						/>
					</Box>

					<Box mb='6'>
						<FormikControl
							control={formControl.INPUT}
							label='Đơn vị: '
							name='unit'
							placeholder='Nhập đơn vị tính'
						/>
					</Box>

					<Box mb='6'>
						<FormikControl
							control={formControl.NUMBER_INPUT}
							label='Giá tiền: '
							name='price'
							placeholder='Nhập giá tiền'
						/>
					</Box>

					<Box mb='6'>
						<FormikControl
							control={formControl.RADIO_BUTTON}
							label='Giới tính: '
							name='gender'
							options={[
								{ value: 'true', display: 'Nam' },
								{ value: 'false', display: 'Nữ' },
							]}
						/>
					</Box>

					<Box mb='6'>
						<FormikControl
							control={formControl.SELECT}
							isDisabled={result[1].isLoading}
							label='Thương hiệu: '
							name='brandId'
							options={
								result[1]?.data?.payload.map((item) => ({
									value: item.id,
									display: item.name,
								})) || []
							}
						/>
					</Box>

					<Box mb='6'>
						<FormikControl
							control={formControl.SELECT}
							isDisabled={result[1].isLoading}
							label='Loại sản phẩm: '
							name='categoryId'
							options={
								result[0]?.data?.payload.map((item) => ({
									value: item.id,
									display: item.name,
								})) || []
							}
						/>
					</Box>

					<Box mb='6'>
						<FormikControl
							control={formControl.FILE}
              multiple
							label='Hình ảnh: '
							name='images'
						/>
					</Box>

					{form.values.images.length ? (
						<Box mb='6'>
							<ImagePreview
								images={form.values.images}
								handleDeleteImage={(index) => {
									form.setFieldValue('images', [
										...form.values.images.filter((_, i) => i !== index),
									])
								}}
							/>
						</Box>
					) : null}

					<Box mb='6'>
						<Inventory
							form={form}
							colors={
								result[2]?.data?.payload.map((item) => ({
									value: item.id,
									display: item.name + ' - ' + item.hex,
								})) || []
							}
							sizes={
								result[3]?.data?.payload.map((item) => ({
									value: item.id,
									display: item.name,
								})) || []
							}
						/>
					</Box>

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
							{type === 'edit' ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
						</Button>
					</Center>
				</Form>
			)}
		</Formik>
	)
}

export default ProductForm
