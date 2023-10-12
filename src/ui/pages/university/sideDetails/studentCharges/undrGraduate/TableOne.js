import React from "react"
import Table from "../../../../../component/TableCard/template/Table"

const TableOne = ({ data }) => {
  const tableHeadersLabel = ["Category", "In-State", "Out-of-State"]
  const allProps = {
    tableHeadersLabel,
    TableRowData: [
      {
        label: "Tuition",
        inState: data?.inState?.tuition,
        outOfState: data?.outOfState?.tuition
      },
      {
        label: "Required Fees",
        inState: data?.inState.requiredFees,
        outOfState: data?.outOfState.requiredFees
      },
      {
        label: "Per Credit Hour",
        inState: data?.inState.perCreditHourCharge,
        outOfState: data?.outOfState.perCreditHourCharge
      }
    ]
  }

  return (
    <div>
      {" "}
      <Table allProps={allProps} />
    </div>
  )
}

export default TableOne
