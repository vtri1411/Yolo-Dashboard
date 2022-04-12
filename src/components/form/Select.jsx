import { Field } from 'formik'
import React from 'react'
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Select as ChakraSelect,
} from '@chakra-ui/react'

const Select = ({ name, label, options, isDisabled, isRequired, ...rest }) => {
	return (
		<Field name={name}>
			{({ field, form }) => (
				<FormControl
					isRequired={isRequired}
					isDisabled={isDisabled || false}
					isInvalid={form.errors[name] && form.touched[name]}
				>
					<FormLabel>{label}</FormLabel>
					<ChakraSelect {...field} {...rest}>
						<option value=''>--</option>
						{options.map((option) => (
							<option key={option.value} value={option.value}>
								{option.display}
							</option>
						))}
					</ChakraSelect>
					<FormErrorMessage>{form.errors[name]}</FormErrorMessage>
				</FormControl>
			)}
		</Field>
	)
}

export default Select
