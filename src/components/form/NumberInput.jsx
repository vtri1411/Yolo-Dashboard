import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInputField,
	NumberInputStepper,
} from '@chakra-ui/react'
import { Field } from 'formik'
import React, { useRef } from 'react'
import { NumberInput as ChakraNumberInput } from '@chakra-ui/react'

const NumberInput = ({ name, label, isRequired, ...rest }) => {
	const inputRef = useRef()

	return (
		<Field name={name}>
			{({ form, field }) => (
				<FormControl
					isRequired={isRequired}
					isInvalid={form.errors[name] && form.touched[name]}
				>
					<FormLabel>{label}</FormLabel>
					<ChakraNumberInput
						ref={inputRef}
						size='md'
						min={0}
						defaultValue={0}
						value={field.value}
						onChange={(value) => form.setFieldValue(name, value)}
						{...rest}
					>
						<NumberInputField
							onBlur={() => form.setTouched({ ...form.touched, [name]: true })}
						/>
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</ChakraNumberInput>
					<FormErrorMessage>{form.errors[name]}</FormErrorMessage>
				</FormControl>
			)}
		</Field>
	)
}

export default NumberInput
