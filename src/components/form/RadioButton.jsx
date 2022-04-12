import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	RadioGroup,
} from '@chakra-ui/react'
import { Field } from 'formik'
import React from 'react'
import { Radio } from '@chakra-ui/react'

const RadioButton = ({ name, label, options, isDisabled, ...rest }) => {
	return (
		<Field name={name}>
			{({ form, field }) => (
				<FormControl
					isDisabled={isDisabled || false}
					isInvalid={form.errors[name] && form.touched[name]}
				>
					<FormLabel>{label}</FormLabel>
					<RadioGroup
						{...rest}
						name={name}
						value={field.value}
						onChange={(value) => form.setFieldValue(name, value)}
					>
						<HStack direction='row'>
							{options.map((option) => (
								<Radio
									key={option.value}
									value={option.value}
									children={option.display}
								/>
							))}
						</HStack>
					</RadioGroup>
					<FormErrorMessage>{form.errors[name]}</FormErrorMessage>
				</FormControl>
			)}
		</Field>
	)
}

export default RadioButton
