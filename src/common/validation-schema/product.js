import * as Yup from 'yup'

export const productValidationSchema = Yup.object({
	name: Yup.string().required('Vui lòng nhập tên sản phẩm'),
	description: Yup.string().required('Vui lòng nhập mô tả sản phẩm'),
	available: Yup.boolean().required('Vui lòng chọn tình tràng sản phẩm'),
	unit: Yup.string().required('Vui lòng nhập đơn vị'),
	price: Yup.number().required('Vui lòng nhập giá tiền'),
	gender: Yup.string()
		.oneOf(['true', 'false'], 'Giới tính không hợp lệ')
		.required('Vui lòng chọn giới tính'),
	brandId: Yup.string().required('Vui lòng chọn thương hiệu'),
	categoryId: Yup.string().required('Vui lòng chọn loại sản phẩm'),
	images: Yup.array(Yup.string()).min(1, 'Vui lòng tải lên ít nhất 1 hình ảnh'),
	inventory: Yup.array()
		.of(
			Yup.object().shape({
				color: Yup.string().required('Vui lòng chọn màu sắc'),
				size: Yup.string().required('Vui lòng chọn kích cỡ'),
				amount: Yup.number()
					.min(1, 'Vui lòng nhập số lượng ít nhất 1')
					.required('Vui lòng nhập số lượng'),
			})
		)
		.min(1, 'Vui lòng thêm ít nhất một mặt hàng trong kho'),
})
