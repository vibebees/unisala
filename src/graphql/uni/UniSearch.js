import { gql } from "@apollo/client"

const UniSearch = (name) => gql`
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
            applicants {
                actRange {
                    min
                    max
                }
                acceptanceRate
            }
            report {
                academics
                average
                value
                diversity
            }
        }
    }
`
export default UniSearch
