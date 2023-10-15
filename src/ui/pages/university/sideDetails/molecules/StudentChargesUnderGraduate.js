import React from "react"
import StudentChargeCard from "../atoms/StudentChargeCard"

const StudentChargesUnderGraduate = ({ data }) => {
  return (
    <div className="py-3 px-5 border my-3 rounded-md bg-neutral-100 mx-2">
      <h1 className="my-3 font-medium text-lg">Undergraduate</h1>
      <div className="flex justify-start gap-3">
        <StudentChargeCard
          header="Book and Supplies"
          value={data.booksAndSupplies}
          subHeader="Average"
        />
        <StudentChargeCard
          header="Applicatoin Fee"
          value={20}
          subHeader="Average"
        />
        <StudentChargeCard
          header="Room and Board Charges"
          value={20}
          subHeader="Average"
        />
      </div>
    </div>
  )
}

export default StudentChargesUnderGraduate
