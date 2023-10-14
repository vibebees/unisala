import React from "react"
import SingleStatCard from "../molecules/SingleStatCard"
import { IonCardContent } from "@ionic/react"

const StatCard = ({ data, label }) => {
  return (
    <IonCardContent class="w-full">
      <h2 className="!text-xl pl-6">{label} </h2>
      <SingleStatCard data={data} />
    </IonCardContent>
  )
}

export default StatCard
