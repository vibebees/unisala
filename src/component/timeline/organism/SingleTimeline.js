import React from "react"
import { IonRow, IonCol } from "@ionic/react"
import DateList from "../atoms/DateList"

const SingleTimeline = () => {
  return (
    <IonRow className=" !px-0 border  ion-no-margin ion-no-padding h-full rounded-md border-neutral-300 border-opacity-75 pt-2">
      <IonCol className="w-full ion-no-margin ion-no-padding h-full ion-no-margin  px-0">
        <h2 className="text-center relative  font-medium text-lg mb-3">
          History of NSAS
        </h2>
        <DateList />
        <DateList />
        <DateList />
        <DateList />
        <DateList />
        <DateList />
        <DateList />
        <DateList />
        <DateList />
        <DateList />
        <DateList />
        <DateList />
      </IonCol>
    </IonRow>
  )
}

export default SingleTimeline
