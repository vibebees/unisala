import { gql } from "@apollo/client"

const SavePost = gql`
    mutation save($postId: String!) {
        save(postId: $postId) {
            success
            message
        }
    }
`
export default SavePost
