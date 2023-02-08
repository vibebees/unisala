// eslint-disable-next-line no-use-before-define
import React, { useState } from "react"
import { chatbubbles, personAdd, personRemove } from "ionicons/icons"
import {
  IonButton,
  IonIcon,
  useIonToast,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent
} from "@ionic/react"
import useWindowWidth from "../../../../../hooks/useWindowWidth"
import EditProfile from "../editProfile"
import "./UserCtaBtns.css"

function UserCtaBtns({ data, myProfile }) {
  const [isOpen, setIsOpen] = useState(false)
  const [connect, setConnect] = useState(false)
  const [present, dismiss] = useIonToast()
  let windowWidth = useWindowWidth()

  const connectToUser = (msg) => {
    present({
      duration: 3000,
      message: msg,
      buttons: [{ text: "X", handler: () => dismiss() }],
      color: "primary",
      mode: "ios"
    })
    setConnect(!connect)
  }

  const buttonToShow = () => {
    if (myProfile) {
      return <EditProfile data={data} />
    }
    return (
      <>
        <IonButton color="light" mode="ios" className="icon-text">
          <IonIcon className="grey-icon-32 mr-1" icon={chatbubbles} />
          {windowWidth >= 768 && "Message"}
        </IonButton>
        {connect ? (
          <IonButton
            color="light"
            mode="ios"
            className="icon-text"
            onClick={() => {
              connectToUser("Connection Removed")
            }}
          >
            <IonIcon className="grey-icon-32 mr-1" icon={personRemove} />
            {windowWidth >= 768 && "Disconnect"}
          </IonButton>
        ) : (
          <IonButton
            color="secondary"
            mode="ios"
            className="icon-text"
            onClick={() => {
              connectToUser("Connection Request Sent")
            }}
          >
            <IonIcon className="white-icon-32 mr-1" icon={personAdd} />
            {windowWidth >= 768 && "Connect"}
          </IonButton>
        )}
      </>
    )
  }
  return (
    <>
      <div className="user-cta-btns">{buttonToShow()}</div>
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Modal</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum
            quidem recusandae ducimus quos reprehenderit. Veniam, molestias
            quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui.
            Eaque, dicta.
          </p>
        </IonContent>
      </IonModal>
    </>
  )
}

export default UserCtaBtns
