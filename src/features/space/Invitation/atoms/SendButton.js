import React from "react"
import { IonButton, IonSpinner } from "@ionic/react"

const SendButton = ({ loading = false, label = "Submit", onclick }) => {
  return (
    <IonButton
      onClick={onclick}
      color="dark"
      className="mt-6 h-10 text-base capitalize w-full"
    >
      {loading ? <IonSpinner></IonSpinner> : label}
    </IonButton>
  )
}

export default SendButton
