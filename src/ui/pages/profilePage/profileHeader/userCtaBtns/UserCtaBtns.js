import { useState } from "react"
import { chatbubbles, personAdd, personRemove } from "ionicons/icons"
import { IonButton, IonIcon, useIonToast } from "@ionic/react"
import useWindowWidth from "../../../../../hooks/useWindowWidth"
import EditProfile from "../editProfile"
import "./UserCtaBtns.css"

function UserCtaBtns({ profileHeader, setProfileHeader, myProfile }) {
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
      return (
        <EditProfile
          profileHeader={profileHeader}
          setProfileHeader={setProfileHeader}
        />
      )
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
    </>
  )
}

export default UserCtaBtns
