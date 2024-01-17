import React from "react"
import { IonRow, IonCol, IonButton, IonText } from "@ionic/react"
const HistoryHeader = () => {
  return (
    <IonRow className="ion-no-margin mt-5 mb-3 ion-no-padding items-center  justify-between">
      <IonCol
        size="auto"
        className="w-full  h-full ion-no-margin ion-no-padding  px-0"
      >
        <IonText className="text-neutral-950">
          <h2 className="text-center text-neutral-900 relative font-bold pl-1 text-lg">
            History of NSAS
          </h2>
        </IonText>
      </IonCol>
      <IonCol size="auto" className="ion-no-padding ion-no-margin">
        <IonButton
          color={"primary"}
          fill="clear"
          className="capitalize bg-blue-100  rounded-md"
        >
          Add History
        </IonButton>
      </IonCol>
    </IonRow>
  )
}

export default HistoryHeader
