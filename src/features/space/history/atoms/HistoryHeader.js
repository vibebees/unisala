import React from "react"
import { IonRow, IonCol } from "@ionic/react"
const HistoryHeader = () => {
  return (
    <div>
      <IonRow className=" !px-0 border  h-full rounded-md border-neutral-300 border-opacity-75 pt-2">
        <IonCol className="w-full h-full ion-no-margin  px-0">
          <h2 className="text-center relative  font-medium text-lg mb-3">
            History of NSAS
          </h2>
        </IonCol>
      </IonRow>
    </div>
  )
}

export default HistoryHeader
