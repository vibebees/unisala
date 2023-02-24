import { gql } from "@apollo/client"
const SearchUser = gql`
    query searchUser($searchString: String!) {
        searchUser(searchString: $searchString) {
            status {
                success
                message
            }
            user {
                firstName
                lastName
                username
                picture
                location
            }
        }
    }
`
export default SearchUser
