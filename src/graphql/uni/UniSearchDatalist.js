import { gql } from "@apollo/client"
const UniSearchDataList = (name) => gql`
    query {
        searchSchool(name: "${name}") {
            elevatorInfo {
                name
                city
            }
            reviews {
                rating
                type
                votes
            }
        }
    }
`
export default UniSearchDataList
