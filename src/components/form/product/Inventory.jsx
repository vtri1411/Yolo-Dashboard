import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Grid,
	GridItem,
	Select,
	Button,
	NumberInput,
	NumberIncrementStepper,
	NumberInputField,
	NumberDecrementStepper,
	NumberInputStepper,
	Text,
	Center,
} from '@chakra-ui/react'
import { Field, FieldArray } from 'formik'
import React, { Fragment } from 'react'

const Inventory = ({ colors, sizes, form }) => {
	return (
		<FormControl isInvalid={form.errors.inventory && form.touched.inventory}>
			<FormLabel>Inventory: </FormLabel>
			<FieldArray name='inventory'>
				{({ push, form, remove }) => {
					return (
						<>
							<Grid templateColumns='1fr 1fr 1fr max-content' gap='3'>
								{form.values.inventory.length ? (
									<>
										<Center>Màu sắc</Center>
										<Center>Kích cỡ</Center>
										<Center>Số lượng</Center>
										<Center></Center>
									</>
								) : null}

								{form.values.inventory.map((item, index) => {
									return (
										<Fragment key={index}>
											<Field name={`inventory.${index}.color`}>
												{({ field }) => {
													return (
														<FormControl
															name={`inventory.${index}.color`}
															isInvalid={
																form.errors.inventory?.[index]?.color &&
																form.touched.inventory?.[index]?.color
															}
														>
															<Select {...field}>
																<option value=''>--</option>
																{colors.map((item) => (
																	<option key={item.value} value={item.value}>
																		{item.display}
																	</option>
																))}
															</Select>
															<FormErrorMessage>
																{form.errors.inventory?.[index]?.color}
															</FormErrorMessage>
														</FormControl>
													)
												}}
											</Field>

											<Field name={`inventory.${index}.size`}>
												{({ field }) => {
													return (
														<FormControl
															name={`inventory.${index}.size`}
															isInvalid={
																form.errors.inventory?.[index]?.size &&
																form.touched.inventory?.[index]?.size
															}
														>
															<Select {...field}>
																<option value=''>--</option>
																{sizes.map((item) => (
																	<option key={item.value} value={item.value}>
																		{item.display}
																	</option>
																))}
															</Select>
															<FormErrorMessage>
																{form.errors.inventory?.[index]?.size}
															</FormErrorMessage>
														</FormControl>
													)
												}}
											</Field>

											<Field name={`inventory.${index}.amount`}>
												{({ field }) => {
													return (
														<FormControl
															isInvalid={
																form.errors.inventory?.[index]?.amount &&
																form.touched.inventory?.[index]?.amount
															}
														>
															<NumberInput
																min={0}
																value={field.value}
																onChange={(value) =>
																	form.setFieldValue(
																		`inventory.${index}.amount`,
																		value
																	)
																}
															>
																<NumberInputField
																	onBlur={() =>
																		form.setTouched({
																			...form.touched,
																			// We need handle touch here
																		})
																	}
																/>
																<NumberInputStepper>
																	<NumberIncrementStepper />
																	<NumberDecrementStepper />
																</NumberInputStepper>
															</NumberInput>
															<FormErrorMessage>
																{form.errors.inventory?.[index]?.amount}
															</FormErrorMessage>
														</FormControl>
													)
												}}
											</Field>

											<Button colorScheme='red' onClick={() => remove(index)}>
												Xoá
											</Button>
										</Fragment>
									)
								})}
							</Grid>

							<Button
								mt='3'
								colorScheme='green'
								onClick={() =>
									push({
										size: '',
										color: '',
										amount: 0,
									})
								}
							>
								Thêm hàng vào kho
							</Button>
						</>
					)
				}}
			</FieldArray>
			{/* Because react formik use inventory to store error of inventory or it's child */}
			{typeof form.errors.inventory === 'string' ? (
				<FormErrorMessage>{form.errors.inventory}</FormErrorMessage>
			) : null}
		</FormControl>
	)
}

export default Inventory
