import gql from 'graphql-tag'


const top100Collectors1DayQueryDocument = gql(/* GraphQL */ `
query top100Collectors1DayQuery {
	sales_stat(
		where: { interval_days: { _eq: 1 }, type: { _eq: "buyer" } }
		order_by: { rank: asc }
		limit: 100
	) {
		volume
		subject {
			address
			alias
			logo
			events_recipient(
				where: {
					_and: {
						_or: [
							{ marketplace_event_type: { _eq: "list_buy" } }
							{ marketplace_event_type: { _eq: "offer_accept" } }
							{ marketplace_event_type: { _eq: "english_auction_settle" } }
							{ marketplace_event_type: { _eq: "dutch_auction_buy" } }
							{ marketplace_event_type: { _eq: "offer_floor_accept" } }
						]
					}
				}
				limit: 5
				order_by: { timestamp: desc }
			) {
				token {
					name
					token_id
					display_uri
					artifact_uri
				}
				timestamp
				price
				fa_contract
			}
			twitter
			tzdomain
		}
		rank
	}
}
`)

export default top100Collectors1DayQueryDocument