import React from "react"
import StudentChargeCard2 from "../atoms/StudentChargeCard2"

const StudentChargesRow2 = ({ studentCharges }) => {
  return (
    <>
      <StudentChargeCard2
        label="Cost of Attendance (In-State)"
        onCampusData={studentCharges?.onCampus?.costOfAttendance?.inState}
        offCampusWithFamilyData={
          studentCharges?.offCampusWithFamily?.costOfAttendance?.inState
        }
        offCampusNotWithFamilyData={
          studentCharges?.offCampusNotWithFamily?.costOfAttendance?.inState
        }
      />
      <StudentChargeCard2
        label="Cost of Attendance (Out-State)"
        onCampusData={studentCharges?.onCampus?.costOfAttendance?.outOfState}
        offCampusWithFamilyData={
          studentCharges?.offCampusWithFamily?.costOfAttendance?.outOfState
        }
        offCampusNotWithFamilyData={
          studentCharges?.offCampusNotWithFamily?.costOfAttendance?.outOfState
        }
      />
      <StudentChargeCard2
        label="Room and Board"
        onCampusData={studentCharges?.onCampus?.roomAndBoard}
        offCampusWithFamilyData={
          studentCharges?.offCampusWithFamily?.roomAndBoard
        }
        offCampusNotWithFamilyData={
          studentCharges?.offCampusNotWithFamily?.roomAndBoard
        }
      />
      <StudentChargeCard2
        label="Other Expenses"
        onCampusData={studentCharges?.onCampus?.otherExpenses}
        offCampusWithFamilyData={
          studentCharges?.offCampusWithFamily?.otherExpenses
        }
        offCampusNotWithFamilyData={
          studentCharges?.offCampusNotWithFamily?.otherExpenses
        }
      />
    </>
  )
}

export default StudentChargesRow2
