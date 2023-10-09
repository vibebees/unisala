import React from "react"
import FinancialAidCard from "../atoms/FinancialAidCard"

const FinancialAid = ({ data }) => {
  return (
    <>
      <FinancialAidCard
        title="Average Amount of Aid Received"
        value={data?.averageAmountAid}
      />
      <FinancialAidCard
        title="Total Number of Students in Fall"
        value={data?.numberOfStudentInThatFall}
      />

      <FinancialAidCard
        title="Percent of All Undergraduates in Fall"
        value={data?.percentOfAllUndergraduatesInThatFall + "%"}
      />
      <FinancialAidCard
        title="Total Number of Undergraduates in Fall"
        value={data?.totalNumberOfUndergraduatesInThatFall}
      />
      <FinancialAidCard
        title="In-State Students"
        value={data?.inState.numberOfStudents}
        percentage={data?.inState.percentOfStudents}
      />
      <FinancialAidCard
        title="Out-of-State Students"
        value={data?.outOfState.numberOfStudents}
        percentage={data?.outOfState.percentOfStudents}
      />

      <FinancialAidCard
        title="Undergraduates Living off Campus"
        value={data?.undergraudate.studentLivingOffCampusNotWithFamily}
      />
      <FinancialAidCard
        title="Undergraduates Living off Campus with Family"
        value={data?.undergraudate.studentLivingOffCampusWithFamily}
      />
      <FinancialAidCard
        title="Undergraduates Living on Campus"
        value={data?.undergraudate.studentLivingOnCampus}
      />
    </>
  )
}

export default FinancialAid
