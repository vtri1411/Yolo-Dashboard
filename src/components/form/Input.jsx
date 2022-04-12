import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { Field } from 'formik'
import React from 'react'
import { Input as ChakraInput } from '@chakra-ui/react'

const Input = ({ label, name, isRequired, ...rest }) => {
	return (
		<Field name={name}>
			{({ form, field }) => (
				<FormControl
					isRequired={isRequired}
					isInvalid={form.errors[name] && form.touched[name]}
				>
					{/* {console.log({ form, field })} */}
					<FormLabel htmlFor={name}>{label}</FormLabel>
					<ChakraInput id={name} {...rest} {...field} />
					<FormErrorMessage>{form.errors[name]}</FormErrorMessage>
				</FormControl>
			)}
		</Field>
	)
}

export default Input
