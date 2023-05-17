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
  getSchoolInfo = (name) => gql`
        query {
            getSchoolInfo(name: "${name}") {
                unitId
                elevatorInfo {
                    name
                    address {
                        city
                    }
                    urls {
                        home
                        admissions
                        financialAid
                        onlineApplication
                    }
                }
                applicants {
                    acceptanceRate
                    applicationFee
                    actRange {
                        min
                        max
                    }
                    satRange {
                        min
                        max
                    }
                    fallEnrollment {
                        total {
                            totalApplicants
                            totalAccepted
                            totalEnrolled {
                                fullTime
                                partTime
                            }
                        }
                        men {
                            totalApplicants
                            totalAccepted
                            totalEnrolled {
                                fullTime
                                partTime
                            }
                        }
                        women {
                            totalApplicants
                            totalAccepted
                            totalEnrolled {
                                fullTime
                                partTime
                            }
                        }
                    }
                    highSchoolGpaRequirement
                }
                grants {
                    aid {
                        pellGrant {
                            averageAmount
                            averageAmountAidReceived
                            percentageReceivingAid
                        }
                        federalGrants {
                            averageAmount
                            averageAmountAidReceived
                            percentageReceivingAid
                        }
                        general {
                            averageAmount
                            averageAmountAidReceived
                            percentageReceivingAid
                        }
                        undergrad {
                            averageAmount
                            averageAmountAidReceived
                            percentageReceivingAid
                        }
                        stateGrants {
                            averageAmount
                            averageAmountAidReceived
                            percentageReceivingAid
                        }
                    }
                }
                studentCharges {
                    booksAndSupplies
                    fees {
                        undergrad {
                            inState
                        }
                    }
                }
                students {
                    campusLife {
                        poll {
                        wordBestDescribe {
                            type
                            pollPercentage
                        }
                        }
                    }
                    diversity {
                        asian {
                            associate
                            bachelors
                            masters
                        }
                        white {
                            associate
                            bachelors
                            masters
                        }
                    }
                }
                library {
                    physicalBook
                    physicalMedia
                    digitalElectronicBook
                }
                similarSchools {
                    grade
                    name
                    rating
                    reviews
                    school {
                    report {
                        average
                    }
                    applicants {
                        actRange {
                        min
                        max
                        }
                        acceptanceRate
                    }
                    elevatorInfo {
                        address {
                        city
                        }
                    }
                    }
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
                professors {
                  unitId
                  overallRating
                  ratings
                  professorName
                  subject
                  levelOfDifficulty
                  wouldTakeAgain
                }
                reviews {
                    rating
                    type
                    votes
                }
                testScore {
                    act {
                        composite {
                            percentile25th
                            percentile75th
                        }
                        english {
                            percentile25th
                            percentile75th
                        }
                        math {
                            percentile25th
                            percentile75th
                        }
                        range {
                            min
                            max
                        }
                    }
                    sat {
                        composite {
                            percentile25th
                            percentile75th
                        }
                        english {
                            percentile25th
                            percentile75th
                        }
                        math {
                            percentile25th
                            percentile75th
                        }
                        range {
                            min
                            max
                        }
                    }
                }
            }
        }`,
  UniSearch = (name) => gql`
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
        }`,
  UniSearchDataList = (name) => gql`
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
        }`
