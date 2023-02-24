import { gql } from "@apollo/client"
const GetUserPost = (id, page) => gql`
    query {
        getUserPost(userId: "${id}", page:${page},pageSize:3) {
            totalPosts
            Posts {
              _id
              postImage
              postText
              date
              upVoteCount
              postCommentsCount
              user {
                _id
                firstName
                lastName
                picture
                username
              }
              saved
              upVoted
            } 
        }
    }
`
export default GetUserPost
