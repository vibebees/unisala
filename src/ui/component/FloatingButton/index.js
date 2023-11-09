import React from "react"
import { IonFab, IonFabButton, IonIcon } from "@ionic/react"
import { helpOutline } from "ionicons/icons"
import Modal from "ui/component/Reusable/Modal"
import Feedback from "./organism/Feedback"

function index() {
  return (
    <IonFab
      slot="fixed"
      horizontal="end"
      vertical="bottom"
      className="mr-8 mb-3 max-md:mr-3 max-md:mb-1"
    >
      <Modal
        ModalButton={
          <IonFabButton size="small">
            <IonIcon icon={helpOutline}></IonIcon>
          </IonFabButton>
        }
        ModalData={<Feedback />}
        header="Feeback"
      />
    </IonFab>
  )
}
export default index
