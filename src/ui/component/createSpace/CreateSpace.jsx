import {
  IonButton,
  IonButtons,
  IonCol,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar
} from "@ionic/react"
import React, { useEffect, useState } from "react"
import CreateSpaceBtn from "./Button/CreateSpaceBtn"
import SpaceForm from "./form/SpaceForm"

const CreateSpace = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <IonCol>
      <CreateSpaceBtn setIsOpen={setIsOpen} />
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Create Your Space</IonTitle>
            <IonButton onClick={() => setIsOpen(false)} slot="end" fill="clear">
              Close
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <SpaceForm setIsOpen={setIsOpen} />
      </IonModal>
    </IonCol>
  )
}

export default CreateSpace
