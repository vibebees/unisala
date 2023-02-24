import { gql } from "@apollo/client"

const AddPost = gql`
    mutation addPost($postText: String!,$postImage: String!) {
        addPost(postText: $postText,postImage: $postImage) {
            success
            message
        }
    }
`
export default AddPost
