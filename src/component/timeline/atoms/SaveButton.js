import React from "react"
import { IonButton, IonSpinner } from "@ionic/react"

const SaveButton = ({ loading = false, label = "Save" }) => {
  return (
    <IonButton
      color={"medium"}
      className="h-full ion-no-margin capitalize  shadow-none"
    >
      {loading ? <IonSpinner name="lines" /> : label}
    </IonButton>
  )
}

export default SaveButton
