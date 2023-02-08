import { gql } from "@apollo/client"

const GetSavedList = gql`
    query savedList($userId: String!, $page: Float) {
        savedList(userId: $userId, page: $page) {
            status {
                success
                message
            }
            Posts {
                _id
                postText
                postImage
                date
                postCommentsCount
                upVoted
                upVoteCount
                saved
                user {
                    _id
                    firstName
                    lastName
                    username
                    picture
                }
            }
            totalPosts
        }
    }
`
export default GetSavedList
