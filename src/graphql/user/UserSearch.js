import { gql } from "@apollo/client"

export const
 userSearch = (searchString) => gql`
    query {
        searchUser(searchString: "${searchString}") {
            status {
                message
                success
            }
            user{
                _id
                firstName
                lastName
                username
                picture
                coverPicture
                location
                connectionType {
                  requestorId
                  receiverId
                  status
                }
            }
        }
    }
`,
usersSearch = () => {
    console.log("usersSearch")
    return gql`
    query {
        getUsers{
            email
            picture
            username
          }
    }
`
}
