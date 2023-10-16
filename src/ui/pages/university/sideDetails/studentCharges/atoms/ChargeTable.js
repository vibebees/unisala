import React from "react"
import Table from "../../../../../component/TableCard/template/Table"

const ChargeTable = ({ allProps }) => {
  const { level } = allProps

  return (
    <div className="w-full">
      <h2 className="!text-neutral-800 font-semibold">{level}</h2>
      <Table allProps={allProps} />
    </div>
  )
}

export default ChargeTable
