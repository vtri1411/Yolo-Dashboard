import * as Yup from 'yup'

export const createUserValidationSchema = Yup.object({
	email: Yup.string()
		.email('Vui lòng nhập email hợp lệ')
		.required('Vui lòng nhập email'),
	phone: Yup.string()
		.length(10, 'Vui lòng nhập số điện thoại 10 chữ số')
		.matches(/^\d+\.?\d*$/, 'Số điện thoại chứa ký tự không hợp lệ'),
	password: Yup.string()
		.min('6', 'Vui lòng nhập mật khẩu ít nhất 6 ký tự')
		.required('Vui lòng nhập mật khẩu'),
	repassword: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
		.required('Vui lòng xác nhận mật khẩu'),
	verified: Yup.string()
		.oneOf(['true', 'false'], 'Giá trị không hợp lệ')
		.required('Vui lòng chọn xác thực của tài khoản'),
	roles: Yup.array(
		Yup.string().oneOf(['ADMIN', 'CLIENT'], 'Vui lòng chọn quyền không hợp lệ')
	).min(1, 'Vui lòng chọn ít nhất 1 quyền'),
})
