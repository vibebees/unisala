// eslint-disable-next-line no-use-before-define
import React, { useState } from "react"
import { eyeOff, create, eye } from "ionicons/icons"
import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonButton,
  IonButtons,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonTextarea,
  useIonToast
} from "@ionic/react"
import { useMutation } from "@apollo/client"
import EditAbout from "../../../../../graphql/user/EditAbout"
import ToggleView from "../../../../../graphql/user/ToggleView"

function AboutUser({ about, myProfile }) {
  const [isCardPrivate, setIsCardPrivate] = useState(about?.private)
  const [isOpen, setIsOpen] = useState(false)

  const [input, setInput] = useState({
    text: about?.text
  })
  const [editAbout, { loading }] = useMutation(EditAbout, {
    variables: { about: input.text },
    onCompleted: (data) => {
      if (data.editAbout.status.success) {
        present({
          duration: 3000,
          message: "About Updated",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
        setIsOpen(false)
      }
    }
  })
  const [toggleView] = useMutation(ToggleView, {
    variables: { card: "about" },
    onCompleted: (data) => {
      if (data.toggleView.status.success) {
        present({
          duration: 3000,
          message: data.toggleView.status.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
        setIsCardPrivate(!isCardPrivate)
      }
    }
  })

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const [present, dismiss] = useIonToast()

  if (!myProfile && (!about?.text || about?.Private)) {
    return ""
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    editAbout()
    setIsOpen(false)
  }
  return (
    <>
      <IonCard className="mb-2">
        <IonCardContent className="card-bb flex">
          <h1>About</h1>
          {myProfile && (
            <div className="inline-flex">
              <IonIcon
                className="grey-icon-32 mr-1"
                icon={!isCardPrivate ? eyeOff : eye}
                onClick={() => {
                  toggleView()
                }}
              />
              <IonIcon
                className="grey-icon-32 mr-1"
                icon={create}
                onClick={() => setIsOpen(true)}
              />
            </div>
          )}
        </IonCardContent>

        {myProfile && !about?.text ? (
          <IonCardContent className="center-text">
            <p>Share something about yourself</p>
            <IonButton color="primary" mode="ios" className="icon-text ">
              Add About
            </IonButton>
          </IonCardContent>
        ) : (
          <IonCardContent>
            <p>{input?.text}</p>
          </IonCardContent>
        )}
      </IonCard>
      <IonModal
        onDidDismiss={() => setIsOpen(false)}
        isOpen={isOpen}
        mode="ios"
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Edit About</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding modal-content">
          <form onSubmit={handleSubmit}>
            <div className="mb-1">
              <h5>Share something about yourself</h5>
              <IonTextarea
                rows={6}
                cols={20}
                name="text"
                value={input.text}
                onIonChange={handleChange}
                mode="md"
                className="input-box mt-05"
                placeholder="Share more about who you are with the community on Unisala."
              ></IonTextarea>
            </div>

            <IonButton type="submit" mode="ios" expand="block">
              Save Changes
            </IonButton>
          </form>
        </IonContent>
      </IonModal>
    </>
  )
}

export default AboutUser
