import { gql } from "@apollo/client"

const sendGuestbookMessage = gql`
    mutation sendGuestbookMessage($receiverId: String!, $message: String!) {
        sendGuestbookMessage(receiverId: $receiverId, message: $message) {
            status {
                success
                message
            }
        }
    }
`
export default sendGuestbookMessage
