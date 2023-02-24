import { gql } from "@apollo/client"

const EditAbout = gql`
    mutation editAbout($about: String!) {
        editAbout(about: $about) {
            status {
                success
                message
            }
            about {
                text
                private
            }
        }
    }
`
export default EditAbout
