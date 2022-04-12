import React from 'react'
import { Breadcrumb, BreadcrumbLink, BreadcrumbItem } from '@chakra-ui/react'
import { MdChevronRight } from 'react-icons/md'
import { FcHome } from 'react-icons/fc'
import { Link as ReachLink } from 'react-router-dom'

const BreadcrumbComp = ({ listPath }) => {
	return (
		<Breadcrumb separator={<MdChevronRight />}>
			<BreadcrumbItem>
				<BreadcrumbLink as={ReachLink} to='/'>
					<FcHome />
				</BreadcrumbLink>
			</BreadcrumbItem>
			{listPath.map((path) => (
				<BreadcrumbItem key={path.path}>
					<BreadcrumbLink
						as={ReachLink}
						to={path.path}
						textTransform='capitalize'
					>
						{path.display}
					</BreadcrumbLink>
				</BreadcrumbItem>
			))}
		</Breadcrumb>
	)
}

export default BreadcrumbComp
