import React from "react"
import StudentChargeCard from "../atoms/StudentChargeCard"
import StudentChargesUnderGraduate from "../molecules/StudentChargesUnderGraduate"
import StudentChargesGraduate from "../molecules/StudentChargesGraduate"

const StudentCharges = ({ studentCharges }) => {
  return (
    <div className="">
      <div>
        <StudentChargesUnderGraduate data={studentCharges.undergraduate} />
      </div>
      <div>
        <StudentChargesGraduate data={studentCharges.graduate} />
      </div>
    </div>
  )
}

export default StudentCharges
