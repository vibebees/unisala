import { gql } from "@apollo/client"
const GetVoterList = gql`
    query upVoteList($postId: String!, $page: Float) {
        upVoteList(postId: $postId, page: $page) {
            success
            message
            upVoters {
                _id
                firstName
                lastName
                picture
            }
        }
    }
`
export default GetVoterList
