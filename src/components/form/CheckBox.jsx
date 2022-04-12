import {
	Checkbox as ChakraCheckbox,
	CheckboxGroup,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
} from '@chakra-ui/react'
import { Field } from 'formik'
import React from 'react'

const CheckBox = ({ name, label, options, isDisabled, ...rest }) => {
	return (
		<Field name={name}>
			{({ form, field }) => (
				<FormControl
					isDisabled={isDisabled || false}
					isInvalid={form.errors[name] && form.touched[name]}
				>
					<FormLabel>{label}</FormLabel>
					<HStack spacing='4'>
						{options.map((option) => (
							<ChakraCheckbox
								id={option.value}
								key={option.value}
								children={option.display}
								{...field}
								value={option.value}
								isChecked={field.value.includes(option.value)}
							/>
						))}
					</HStack>
					<FormErrorMessage>{form.errors[name]}</FormErrorMessage>
				</FormControl>
			)}
		</Field>
	)
}

export default CheckBox
