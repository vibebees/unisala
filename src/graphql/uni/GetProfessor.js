import { gql } from "@apollo/client"

const GetProfessor = (unitId) => gql`
    query {
        getProfessors(unitId: ${unitId}) {
            unitId
            overallRating
            ratings
            professorName
            subject
            levelOfDifficulty
            wouldTakeAgain
        }
    }
`
export default GetProfessor
