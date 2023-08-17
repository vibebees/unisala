import { IonButton, IonIcon } from "@ionic/react"
import { addOutline } from "ionicons/icons"
import React from "react"

const CreateSpaceBtn = ({ setIsOpen }) => {
  return (
    <IonButton expand="block" onClick={() => setIsOpen((prev) => !prev)}>
      <IonIcon icon={addOutline} slot="start" />
      Create a Space
    </IonButton>
  )
}

export default CreateSpaceBtn
