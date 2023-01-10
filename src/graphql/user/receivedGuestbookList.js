import { gql } from "@apollo/client"
const receivedGuestbookList = gql`
    query receivedGuestbookList(
        $userId: String!
        $page: Float
        $pageSize: Float
    ) {
        receivedGuestbookList(
            userId: $userId
            page: $page
            pageSize: $pageSize
        ) {
            status {
                success
                message
            }
            guestbook {
                _id
                date
                message
                user {
                    firstName
                    lastName
                    username
                    verified
                    picture
                }
            }
        }
    }
`
export default receivedGuestbookList
