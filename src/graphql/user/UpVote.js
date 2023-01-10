import { gql } from "@apollo/client"

const UpVote = gql`
    mutation upVote($postId: String!) {
        upVote(postId: $postId) {
            success
            message
        }
    }
`
export default UpVote
