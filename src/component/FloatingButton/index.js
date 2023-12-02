import React from "react"
import { IonFab, IonFabButton, IonIcon } from "@ionic/react"
import { helpOutline } from "ionicons/icons"
import Modal from "../Reusable/Modal"
import Feedback from "./organism/Feedback"
import { ButtonTrack } from "features/analytics/ButtonTrack"

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
          <IonFabButton
            onclick={() => {
              ButtonTrack({
                from: window.location.pathname,
                timeStamp: new Date().toISOString(),
                description: "Feedback button clicked",
                to: "feedback modal"
              })
            }}
            size="small"
          >
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
