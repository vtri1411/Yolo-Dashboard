import React, { useState } from 'react'
import { Field } from 'formik'
import { FormControl, FormLabel } from '@chakra-ui/react'
import {
	InputGroup,
	Input,
	InputRightElement,
	FormErrorMessage,
} from '@chakra-ui/react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

const Password = ({ name, label, ...rest }) => {
	const [isShowPw, setIsShowPw] = useState(false)

	return (
		<Field name={name}>
			{({ form, field }) => (
				<FormControl isInvalid={form.errors[name] && form.touched[name]}>
					<FormLabel htmlFor={name}>{label}</FormLabel>
					<InputGroup>
						<Input
							id={name}
							{...rest}
							{...field}
							type={isShowPw ? 'text' : 'password'}
						/>
						<InputRightElement
							cursor='pointer'
							fontSize='md'
							onClick={(e) => setIsShowPw(!isShowPw)}
						>
							{isShowPw ? <MdVisibilityOff size='18px' /> : <MdVisibility />}
						</InputRightElement>
					</InputGroup>
					<FormErrorMessage>{form.errors[name]}</FormErrorMessage>
				</FormControl>
			)}
		</Field>
	)
}

export default Password
