import { gql } from "@apollo/client"

const DeleteEducation = gql`
  mutation deleteEducation($id: String!) {
    deleteEducation(id: $id) {
      status {
        success
        message
      }
      education {
        private
        schools {
          _id
          school
          degree
          major
          startDate
          graduationDate
        }
      }
    }
  }
`
export default DeleteEducation
