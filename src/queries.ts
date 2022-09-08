import { gql } from '@apollo/client'

const AllLinksQuery = gql`
	query {
		links {
			id
			title
			url
			description
			imageUrl
			category
		}
	}
`
export default AllLinksQuery