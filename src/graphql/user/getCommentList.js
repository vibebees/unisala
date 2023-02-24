import { gql } from "@apollo/client"
const GetCommentList = (id, pid) => gql`
query {
     commentList (postId:"${id}", parentId:"${pid}") {
       success
       message
                comments {
                  _id
                  userId
                  postId
                  commentText
                  commentImage
                  firstName
                  lastName
                  username
                  date
                } 
     }
 }
       
`
export default GetCommentList
