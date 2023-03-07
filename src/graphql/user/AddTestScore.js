import { gql } from "@apollo/client"

const AddTestScore = (testScores) => gql`
  mutation addTestScore($testScores: ${testScores}) {
    addTestScore(testScore: $testScores) {
      status {
        message
        success
      }
      testScore {
        scores {
          SAT_SCORE {
            maths
            english
          }
          ACT_SCORE {
            maths
            english
          }
          IELTS_SCORE {
            score
          }
          TOEFL_SCORE {
            score
          }
        }
      }
    }
  }
`
export default AddTestScore
