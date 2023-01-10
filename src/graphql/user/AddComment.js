import { gql } from "@apollo/client"

const AddComment = gql`
    mutation addComment(
        $postId: String!
        $commentText: String!
        $parentId: String!
    ) {
        addComment(
            postId: $postId
            commentText: $commentText
            parentId: $parentId
        ) {
            success
            message
        }
    }
`
export default AddComment
