import React from "react"
import { IonText } from "@ionic/react"
import useIsData from "../../../../../hooks/useIsData"
const StudentChargeCard2 = ({
  label,
  onCampusData,
  offCampusWithFamilyData,
  offCampusNotWithFamilyData
}) => {
  return (
    <tr>
      <td className="border text-start pl-5  py-2 text-sm px-2">{label}</td>
      <td className="border text-center py-2 text-sm px-2">
        {onCampusData === -1 ? "" : "$"} {""}
        {useIsData(onCampusData)}
      </td>
      <td className="border text-center py-2 text-sm px-2">
        {offCampusWithFamilyData === -1 ? "" : "$"} {""}
        {useIsData(offCampusWithFamilyData)}
      </td>
      <td className="border text-center py-2 text-sm px-2">
        {offCampusNotWithFamilyData === -1 ? "" : "$"} {""}
        {useIsData(offCampusNotWithFamilyData)}
      </td>
    </tr>
  )
}

export default StudentChargeCard2
