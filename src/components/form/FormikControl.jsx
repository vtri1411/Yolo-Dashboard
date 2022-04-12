import React from 'react'
import Input from './Input'
import { formControl } from '../../common/config'
import Textarea from './Textarea'
import RadioButton from './RadioButton'
import NumberInput from './NumberInput'
import Select from './Select'
import File from './FileImage'
import Password from './Password'
import CheckBox from './CheckBox'

const FormikControl = ({ control, ...rest }) => {
	switch (control) {
		case formControl.INPUT:
			return <Input {...rest} />
		case formControl.TEXTAREA:
			return <Textarea {...rest} />
		case formControl.RADIO_BUTTON:
			return <RadioButton {...rest} />
		case formControl.NUMBER_INPUT:
			return <NumberInput {...rest} />
		case formControl.SELECT:
			return <Select {...rest} />
		case formControl.FILE:
			return <File {...rest} />
		case formControl.PASSWORD:
			return <Password {...rest} />
		case formControl.CHECKBOX:
			return <CheckBox {...rest} />
		default:
			return null
	}
}

export default FormikControl
