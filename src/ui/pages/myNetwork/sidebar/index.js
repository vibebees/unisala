// eslint-disable-next-line no-use-before-define
import React, { useState } from "react"
import {
  IonCard,
  IonCardContent,
  IonText,
  IonIcon,
  IonModal,
  IonHeader,
  IonButtons,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonAvatar,
  IonLabel,
  IonButton
} from "@ionic/react"
import { people } from "ionicons/icons"

function index() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <IonCard>
      <IonCardContent>
        <IonText color="dark">Manageme network</IonText>
        <div
          className="flex mt-05"
          onClick={() => {
            setIsOpen(true)
          }}
        >
          <div className="inline-2">
            <IonIcon icon={people} className="grey-icon-32" />
            <h2>Connections</h2>
          </div>
          <h2>4</h2>
        </div>
      </IonCardContent>

      <IonModal isOpen={isOpen} mode="ios">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Manage Connection</IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={() => {
                  setIsOpen(false)
                }}
              >
                Close
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding modal-content">
          <IonItem mode="ios" className="mb-1" key={index} lines="full">
            <IonAvatar slot="start">
              <img
                src="https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=411&q=80"
                alt=""
              />
            </IonAvatar>
            <IonLabel>
              <div className="flex">
                <div>
                  <h2>John Doe</h2>
                  <p>@johndoe</p>
                </div>
                <IonButton
                  mode="ios"
                  onClick={() => setIsOpen(false)}
                  color="dark"
                  fill="outline"
                >
                  Disconnect
                </IonButton>
              </div>
            </IonLabel>
          </IonItem>
        </IonContent>
      </IonModal>
    </IonCard>
  )
}

export default index
