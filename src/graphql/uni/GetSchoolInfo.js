import { gql } from "@apollo/client"
const getSchoolInfo = (name) => gql`
    query {
        getSchoolInfo(name: "${name}") {
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
    }
`
export default getSchoolInfo
