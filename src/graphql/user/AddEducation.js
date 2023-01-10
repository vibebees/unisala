import { gql } from "@apollo/client"

const AddEducation = gql`
    mutation addEducation(
        $school: String!
        $degree: String!
        $major: String!
        $startDate: String!
        $graduationDate: String!
    ) {
        addEducation(
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
export default AddEducation
