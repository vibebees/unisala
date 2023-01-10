import { gql } from "@apollo/client"
const GetSevedList = gql`
    query savedList($userId: String!, $page: Float) {
        savedList(userId: $userId, page: $page) {
            success
            message
            Posts {
                userId
                postImage
                postText
                date
                upVoteCount
                postCommentsCount
                firstName
                lastName
                username
                picture
                upVoted
                saved
            }
        }
    }
`
export default GetSevedList
