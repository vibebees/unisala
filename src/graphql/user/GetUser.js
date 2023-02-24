import { gql } from "@apollo/client"
const GetUser = (id) => gql`
    query {
        getUser(username:"${id}") {
          user {
            firstName
            lastName
            username
            age
            gender
            birthday
            name
            role
            verified
            location
            oneLinerBio
            blocked
            banned
            active
            picture
            _id
            about {
              text
              private
            }
            badges {
              private
              earnedBadges {
                title
                description
                date
              }
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
            testScore {
              private
              scores {
                SAT_SCORE {
                  english
                  maths
                }
                ACT_SCORE {
                  english
                  maths
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
    }
`
export default GetUser
