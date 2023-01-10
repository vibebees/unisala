import { gql } from "@apollo/client"
const GetProfileCard = gql`
    query getUser($username: String!) {
        getUser(username: $username) {
            user {
                firstName
                lastName
                username
                badges {
                    private
                    earnedBadges {
                        title
                        description
                        date
                    }
                }
            }
        }
    }
`
export default GetProfileCard
