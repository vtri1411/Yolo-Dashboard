import { Checkbox } from '@chakra-ui/react'
import { forwardRef, useEffect, useRef } from 'react'
// import './indeterminate-checkbox.css'

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
	const defaultRef = useRef()
	const resolvedRef = ref || defaultRef
	const { onChange, checked } = rest

	useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate
	}, [resolvedRef, indeterminate])

	return (
		<Checkbox
			size='md'
			ref={resolvedRef}
			isChecked={checked}
			onChange={onChange}
		/>
	)
})

export default IndeterminateCheckbox
