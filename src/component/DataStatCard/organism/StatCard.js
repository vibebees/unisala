import React from "react"
import SingleStatCard from "../molecules/SingleStatCard"
import { IonCardContent } from "@ionic/react"

const StatCard = ({ allProps }) => {
  const { data, label, containerStyle, CardStyle } = allProps
  return (
    <IonCardContent class="w-full">
      <h2 className="!text-xl pl-6">{label} </h2>
      <SingleStatCard allProps={allProps} />
    </IonCardContent>
  )
}

export default StatCard
