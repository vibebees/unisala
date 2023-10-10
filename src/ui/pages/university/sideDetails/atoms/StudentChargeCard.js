import React from "react"
import { IonText } from "@ionic/react"
import useIsData from "../../../../../hooks/useIsData"
const StudentChargeCard = ({ label, inStateData, outOfStateData }) => {
  return (
    <tr>
      <td className="border text-start pl-5  py-2 text-sm px-2">{label}</td>
      <td className="border text-center py-2 text-sm px-2">
        {inStateData === -1 ? "" : "$"} {""}
        {useIsData(inStateData)}
      </td>
      <td className="border text-center py-2 text-sm px-2">
        {outOfStateData === -1 ? "" : "$"} {""}
        {useIsData(outOfStateData)}
      </td>
    </tr>
  )
}

export default StudentChargeCard
