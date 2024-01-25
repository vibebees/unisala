import React from "react"
import { IonRow, IonCol } from "@ionic/react"
import DateList from "../atoms/DateList"

const SingleTimeline = () => {
  return (
    <IonRow className=" !px-0   ion-no-margin ion-no-padding h-full rounded-md  pt-2">
      <IonCol className="w-full ion-no-margin ion-no-padding h-full ion-no-margin  px-0">
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
