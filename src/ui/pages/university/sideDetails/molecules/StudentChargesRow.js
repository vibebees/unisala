import React from "react"
import StudentChargeCard from "../atoms/StudentChargeCard"

const StudentChargesRow = ({ studentCharges }) => {
  return (
    <>
      <StudentChargeCard
        label="Tuition"
        inStateData={studentCharges.inState.tuition}
        outOfStateData={studentCharges?.outOfState?.tuition}
      />
      <StudentChargeCard
        label={"Required Fees"}
        inStateData={studentCharges.inState.requiredFees}
        outOfStateData={studentCharges?.outOfState?.requiredFees}
      />
      <StudentChargeCard
        label={"Per Credit Hour Fees"}
        inStateData={studentCharges.inState.perCreditHourCharge}
        outOfStateData={studentCharges?.outOfState?.perCreditHourCharge}
      />
    </>
  )
}

export default StudentChargesRow
