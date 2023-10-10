import React from "react"
import StudentChargesRow from "../molecules/StudentChargesRow"

const StudentChargeGraduateTable = ({ data }) => {
  return (
    <>
      <table className="w-full mt-3">
        <thead className="border">
          <tr>
            <th className="border py-4 px-3 !text-neutral-700 !text-sm font-semibold">
              Category
            </th>
            <th className="border py-4 px-3 !text-neutral-700 !text-sm font-semibold">
              In-State
            </th>
            <th className="border py-4 px-3 !text-neutral-700 !text-sm font-semibold">
              Out-of-State
            </th>
          </tr>
        </thead>
        <tbody>
          <StudentChargesRow studentCharges={data} />
        </tbody>
      </table>
    </>
  )
}

export default StudentChargeGraduateTable
