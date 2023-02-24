import { gql } from "@apollo/client"
const GetUserPost = (id, page) => gql`
    query {
        receivedConnectionList {
            status {
                success
                message
            }
            connectionList {
                _id
                status
                date
                user {
                    firstName
                    lastName
                    username
                    oneLinerBio
                    birthday
                    name
                    role
                    verified
                    active
                    picture
                    location
                }
            }
        }
    }
`
export default GetUserPost
