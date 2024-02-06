import React from "react"
import { IonContent, IonCard } from "@ionic/react"
import ApplyHeader from "../atoms/ApplyHeader"
import ApplySubHeader from "../atoms/ApplySubHeader"
import ApplyButton from "../atoms/ApplyButton"

const ApplyForm = () => {
  return (
    <IonCard className=" w-full h-full ion-no-margin shadow-none p-3">
      <ApplyHeader />
      <ApplySubHeader />
      <ApplyButton />
    </IonCard>
  )
}

export default ApplyForm
