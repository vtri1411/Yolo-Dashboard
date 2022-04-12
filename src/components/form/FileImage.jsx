import {
	Box,
	Center,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Link,
} from '@chakra-ui/react'
import { Field } from 'formik'
import React, { useRef, useState } from 'react'
import { FaImages } from 'react-icons/fa'

const FileImage = ({ label, name, accept, isRequired, multiple, ...rest }) => {
	const inputRef = useRef()

	return (
		<Field name={name}>
			{({ form, field }) => (
				<FormControl
					isRequired={isRequired}
					isInvalid={form.errors[name] && form.touched[name]}
				>
					<FormLabel>{label}</FormLabel>
					<Center>
						<input
							type='file'
							ref={inputRef}
							accept={accept}
							style={{ display: 'none' }}
							multiple={multiple}
							onClick={() => {
								// For always triggering onchange function
								inputRef.current.value = ''
							}}
							onChange={async (e) => {
								console.log({ file: e.target.files })
								const promises = []

								Array.from(e.target.files).forEach((file) => {
									promises.push(
										new Promise((res, rej) => {
											const reader = new FileReader()
											reader.onload = () => {
												console.log({ result: reader.result })
												res(reader.result)
											}
											reader.readAsDataURL(file)
										})
									)
								})

								const promisesResult = await Promise.all(promises)

								if (multiple) {
									form.setFieldValue(name, [
										...form.values[name],
										...promisesResult,
									])
								} else {
									form.setFieldValue(name, promisesResult[0])
								}
							}}
						/>

						<Center
							w='100%'
							maxW='300px'
							borderStyle='dashed'
							borderWidth='medium'
							borderColor='#8B98BC'
							bg='#F7FAFF'
							borderRadius='lg'
							color='#8B98BC'
							py='6'
							flexDir='column'
							{...rest}
						>
							<Box fontSize='2xl' mb='5'>
								<FaImages />
							</Box>
							<Link fontSize='xl' onClick={() => inputRef?.current?.click()}>
								Tải ảnh lên
							</Link>
						</Center>
					</Center>
					<FormErrorMessage>{form.errors[name]}</FormErrorMessage>
				</FormControl>
			)}
		</Field>
	)
}

export default FileImage
