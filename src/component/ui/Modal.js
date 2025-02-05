import {
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar
} from "@ionic/react"
import { useState } from "react"
import Button from "./Button"

const Modal = ({ ModalButton, ModalData = "No Data", header = "" }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="ion-padding p-0">
        <div onClick={() => setIsOpen(true)} className="cursor-pointer p-0">
          {ModalButton}
        </div>
        <IonModal
          mode="ios"
          onDidDismiss={() => {
            setIsOpen(false)
          }}
          isOpen={isOpen}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle id="modal-header">{header}</IonTitle>
              <IonButtons slot="end">
                <Button
                  className="modal-close-btn"
                  onClick={() => setIsOpen(false)}
                >
                  close
                </Button>
              </IonButtons>
              <IonButtons slot="start" id="modal-start"></IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">{ModalData}</IonContent>
        </IonModal>
      </div>
    </>
  )
}

export default Modal
