import { gql } from "@apollo/client"

const UserSearch = (searchString) => gql`
    query {
        searchUser(searchString: "${searchString}") {
            status {
                message
                success
            }
            user{
                _id
                firstName
                lastName
                username
                picture
                coverPicture
                location
                connectionType {
                  requestorId
                  receiverId
                  status
                }
            }
        }
    }
`

export default UserSearch
