import { gql } from "@apollo/client"

const EditProfile = gql`
    mutation editProfile(
        $profilePicture: String
        $coverPicture: String
        $username: String!
        $firstName: String!
        $lastName: String!
        $location: String
        $oneLinerBio: String
        $birthday: String
    ) {
        editProfile(
            profilePicture: $profilePicture
            coverPicture: $coverPicture
            username: $username
            firstName: $firstName
            lastName: $lastName
            location: $location
            oneLinerBio: $oneLinerBio
            birthday: $birthday
        ) {
            status {
                success
                message
            }
            user {
                firstName
                lastName
                username
                oneLinerBio
                age
                gender
                birthday
                name
                role
                verified
                blocked
                banned
                active
                picture
                doj
            }
        }
    }
`
export default EditProfile
