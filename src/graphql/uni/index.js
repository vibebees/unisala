import { gql } from "@apollo/client"

export const GetProfessor = gql`
    query GetProfessor(
      $unitId: Float!
      $page: Float!
      $major: String
      $overallRating: Float
    ) {
      getProfessors(
        unitId: $unitId
        page: $page
        major: $major
        overallRating: $overallRating
      ) {
        unitId
        overallRating
        ratings
        professorName
        subject
        levelOfDifficulty
        wouldTakeAgain
      }
    }
  `,
  getUpdatedSchoolInfo = (unitId) =>
    gql`
      query {
        getUpdatedSchoolInfo(unitId: 160612) {
          elevatorInfo {
            unitId
            name
            address {
              streetAddressOrPOBox
              city
              stateAbbreviation
              zipCode
            }
            calendar
            name
            alias
            urls {
              home
              financialAid
              admissions
              onlineApplication
              netPriceCalculator
            }
            highestLevelOfOffering
            undergraduateOffering
            graduateOffering
            grantsMedicalDegree
            hasHospital
            missionStatement
            bio
            briefAddress
            library {
              physicalBook
              physicalMedia
              digitalElectronicBook
              recordedYear
            }
            majors {
              title
              pollTotalGraduates
            }
            ownType
            pictures
            tags
          }
          studentCharges {
            id
            unitId
            undergraduate {
              inState {
                id
                tuition
                requiredFees
                perCreditHourCharge
              }
              outOfState {
                id
                tuition
                requiredFees
                perCreditHourCharge
              }
              inDistrict {
                id
                tuition
                requiredFees
                perCreditHourCharge
              }
              onCampus {
                id
                costOfAttendance {
                  inDistrict
                  inState
                  outOfState
                }
                roomAndBoard
                otherExpenses
              }
              offCampusWithFamily {
                id
                costOfAttendance {
                  inDistrict
                  inState
                  outOfState
                }
                roomAndBoard
                otherExpenses
              }
              offCampusNotWithFamily {
                id
                costOfAttendance {
                  inDistrict
                  inState
                  outOfState
                }
                roomAndBoard
                otherExpenses
              }
              booksAndSupplies
            }
            graduate {
              inState {
                id
                tuition
                requiredFees
                perCreditHourCharge
              }
              outOfState {
                id
                tuition
                requiredFees
                perCreditHourCharge
              }
              inDistrict {
                id
                tuition
                requiredFees
                perCreditHourCharge
              }
            }
            combinedChargeForRoomAndBoard
            undergraduateApplicationFee
            graduateApplicationFee
          }
          testScore {
            sat {
              submitted
              percentSubmitted
              readingWriting {
                percentile25
                percentile75
              }
              math {
                percentile25
                percentile75
              }
            }
            act {
              submitted
              percentSubmitted
              composite {
                percentile25
                percentile75
              }
              english {
                percentile25
                percentile75
              }
              math {
                percentile25
                percentile75
              }
            }
            year
            unitId
          }
          financialAid {
            unitId
            numberOfStudentInThatFall
            percentOfAllUndergraduatesInThatFall
            totalNumberOfUndergraduatesInThatFall
            inDistrict {
              numberOfStudents
              percentOfStudents
            }
            inState {
              numberOfStudents
              percentOfStudents
            }
            outOfState {
              numberOfStudents
              percentOfStudents
            }
            undergraudate {
              totalStudent
              studentLivingOnCampus
              studentLivingOffCampusWithFamily
              studentLivingOffCampusNotWithFamily
            }
            averageAmountAid
            year
          }
          studentsStats {
            unitId
            totalEnrollment
            undergraduateEnrollment
            graduateEnrollment
            firstTimeUndergraduates {
              inState
              outOfState
              foreignCountries
            }
            enrollmentByRace {
              grandTotal
              americanIndianOrAlaskaNative
              asian
              blackOrAfricanAmerican
              hispanic
              nativeHawaiianOrOtherPacificIslander
              white
              nonresidentAlien
            }
          }
          admissionInfo {
            unitId
            openAdmissionPolicy
            secondarySchoolGPA
            secondarySchoolRank
            schoolRecord
            collegePrepProgram
            recommendations
            competencies
            admissionTestScores
            toefl
            applicants {
              total
              men
              women
            }
            admissions {
              total
              men
              women
            }
            enrollees {
              total
              fullTime {
                total
                men
                women
              }
              partTime {
                total
                men
                women
              }
            }
            testScores {
              sat {
                submitted
                percentSubmitted
                readingWriting {
                  percentile25
                  percentile75
                }
                math {
                  percentile25
                  percentile75
                }
              }
              act {
                submitted
                percentSubmitted
                composite {
                  percentile25
                  percentile75
                }
                english {
                  percentile25
                  percentile75
                }
                math {
                  percentile25
                  percentile75
                }
              }
              year
              unitId
            }
            year
          }
          graduationRate {
            unitId
            totalCohort
            men
            women
            americanIndianOrAlaskaNative
            asian
            blackOrAfricanAmerican
            hispanic
            white
            twoOrMoreRaces
            raceEthnicityUnknown
            nonResidentAlien
          }
          scholarshipInfo {
            status {
              success
              message
            }
            scholarships {
              _id
              university_name
              uni_id
              scholarship_name
              international_specific
              level
              scholarship_url
              transfer_specific
              gpa {
                min
                max
              }
              act {
                min
                max
              }
              sat {
                min
                max
              }
              awards {
                award_name
                scholarship_amount {
                  amount
                  disbursement_schedule
                }
              }
              non_score_eligibility_requirements
            }
          }
          similarSchools {
            unitId
            similarSchools {
              grade
              name
            }
            recommendedUniversity
          }
          userEvaluation {
            unitId
            rankings {
              rank
              title
              totalPlayers
            }
            report {
              academics
              average
              value
              diversity
              campus
              atheltics
              partyScene
              professors
              location
              dorms
              campusFood
              studentLife
              safety
            }
            reviews {
              rating
              type
              votes
            }
          }
          professors {
            _id
            unitId
            overallRating
            ratings
            professorName
            subject
            levelOfDifficulty
            wouldTakeAgain
          }
        }
      }
    `,
  UniSearchDataList = (name) =>
    gql`
    query {
      searchSchool(name: "${name}") {
        name
        unitId
        address {
          streetAddressOrPOBox
          city
          stateAbbreviation
        }
        alias
        ownType
        tags
        missionStatement
        graduateOffering
        undergraduateOffering
        pictures

      }
    }`
