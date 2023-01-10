import { gql } from "@apollo/client"
const GetREplyList = (id, pid) => gql`
query {
     replyList (postId:"${id}", parentId:"${pid}") {
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
export default GetREplyList
