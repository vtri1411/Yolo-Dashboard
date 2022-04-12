import React from 'react'
import { Field } from 'formik'
import {
	Textarea as ChakraTextarea,
	FormControl,
	FormLabel,
	FormErrorMessage,
} from '@chakra-ui/react'

const Textarea = ({ label, name, isRequired, ...rest }) => {
	return (
		<Field name={name}>
			{({ form, field }) => (
				<FormControl
					isRequired={isRequired}
					isInvalid={form.errors[name] && form.touched[name]}
				>
					{/* {console.log({ form, field })} */}
					<FormLabel htmlFor={name}>{label}</FormLabel>
					<ChakraTextarea id={name} {...rest} {...field} />
					<FormErrorMessage>{form.errors[name]}</FormErrorMessage>
				</FormControl>
			)}
		</Field>
	)
}

export default Textarea
