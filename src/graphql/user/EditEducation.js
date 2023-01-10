import { gql } from "@apollo/client"

const EditEducation = gql`
    mutation editEducation(
        $id: String!
        $school: String!
        $degree: String!
        $major: String!
        $startDate: String!
        $graduationDate: String!
    ) {
        editEducation(
            id: $id
            school: $school
            degree: $degree
            major: $major
            startDate: $startDate
            graduationDate: $graduationDate
        ) {
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
export default EditEducation
