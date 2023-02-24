import { gql } from "@apollo/client"

const ToggleView = gql`
    mutation toggleView($card: String!) {
        toggleView(card: $card) {
            status {
                success
                message
            }
            private
        }
    }
`
export default ToggleView
