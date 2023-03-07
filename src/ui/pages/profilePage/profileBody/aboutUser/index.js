import { useState } from "react"
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
  useIonToast,
  IonSpinner
} from "@ionic/react"
import { useMutation } from "@apollo/client"
import { EditAbout, ToggleView } from "../../../../../graphql/user"
import { USER_SERVICE_GQL } from "../../../../../servers/types"

function AboutUser({ about, myProfile }) {
  const [userAbout, setAbout] = useState(about)
  const [isCardPrivate, setIsCardPrivate] = useState(userAbout?.private)
  const [isOpen, setIsOpen] = useState(false)

  const [input, setInput] = useState({
    text: userAbout?.text
  })
  const [editAbout, { loading }] = useMutation(EditAbout, {
    context: { server: USER_SERVICE_GQL },
    variables: { about: input.text },
    onCompleted: (data) => {
      if (data.editAbout.status.success) {
        setAbout(data.editAbout.about)
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
    context: { server: USER_SERVICE_GQL },
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
                icon={isCardPrivate ? eyeOff : eye}
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

        {myProfile && !userAbout?.text ? (
          <IonCardContent className="center-text">
            <p>Share something about yourself</p>
            <IonButton
              color="primary"
              mode="ios"
              className="icon-text "
              onClick={() => setIsOpen(true)}
            >
              Add About
            </IonButton>
          </IonCardContent>
        ) : (
          <IonCardContent>
            <p>{userAbout?.text}</p>
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
              {loading ? <IonSpinner /> : "Save Changes"}
            </IonButton>
          </form>
        </IonContent>
      </IonModal>
    </>
  )
}

export default AboutUser
