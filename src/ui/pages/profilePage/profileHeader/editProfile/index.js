// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from "react"
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonInput,
  useIonToast
} from "@ionic/react"
import { create } from "ionicons/icons"
import useWindowWidth from "../../../../../hooks/useWindowWidth"
import "./index.css"
import { useMutation } from "@apollo/client"
import { EditProfile } from "../../../../../graphql/user"

function index({ data }) {
  const { firstName, lastName, oneLinerBio, location, profilePic, username } =
    data
  const [input, setInput] = useState({})
  useEffect(() => {
    setInput({
      firstName: firstName,
      lastName: lastName,
      username: username,
      oneLinerBio: oneLinerBio,
      location: location,
      profilePic: profilePic
    })
  }, [data])
  const [isOpen, setIsOpen] = useState(false)
  const [present, dismiss] = useIonToast()

  const [editProfile, { loading }] = useMutation(EditProfile, {
    variables: {
      ...input
    },
    onCompleted: () => {
      present({
        duration: 3000,
        message: "Profile Updated",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios"
      })
      setIsOpen(false)
    },
    onError: (error) => {
      present({
        duration: 3000,
        message: error.message,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
    }
  })
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  let windowWidth = useWindowWidth()

  const handleSubmit = (e) => {
    e.preventDefault()
    editProfile()
  }

  return (
    <>
      <IonButton
        color="light"
        mode="ios"
        className="icon-text"
        onClick={() => setIsOpen(true)}
      >
        <IonIcon className="grey-icon-32 mr-1" icon={create} />
        {windowWidth >= 768 && "Edit"}
      </IonButton>

      <IonModal
        onDidDismiss={() => {
          setIsOpen(false)
        }}
        isOpen={isOpen}
        mode="ios"
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Edit Profile</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding modal-content">
          <form onSubmit={handleSubmit}>
            <div className="mb-1">
              <h5>Update Profile Cover Image</h5>
              <p>Recommended dimensions 1500px x 400px (max. 4MB)</p>
              <IonButton mode="ios">Add Cover Image</IonButton>
            </div>

            <div className="inline-1 mb-1">
              <div className="user-profile__edit">
                <img
                  src={profilePic}
                  className="user-profile__img"
                  alt="username"
                />
              </div>
              <div className="upload-profile-pic-text">
                <h5>Set Profile Picture</h5>
                <p>You can change your profile picture or upload a photo</p>
                <IonButton mode="ios">Upload</IonButton>
              </div>
            </div>

            <div className="mb-1">
              <h5>User Name</h5>
              <IonInput
                mode="md"
                onIonChange={handleChange}
                name="username"
                required
                className="input-box mt-05"
                placeholder="User Name"
                value={input?.username}
              ></IonInput>
            </div>

            <div className="mb-1">
              <h5>First Name</h5>
              <IonInput
                mode="md"
                onIonChange={handleChange}
                name="firstName"
                required
                className="input-box mt-05"
                placeholder="First Name"
                value={input?.firstName}
              ></IonInput>
            </div>

            <div className="mb-1">
              <h5>Last Name</h5>
              <IonInput
                mode="md"
                onIonChange={handleChange}
                name="lastName"
                required
                className="input-box mt-05"
                placeholder="Last Name"
                value={input?.lastName}
              ></IonInput>
            </div>

            <div className="mb-1">
              <h5>Location</h5>
              <IonInput
                mode="md"
                onIonChange={handleChange}
                name="location"
                className="input-box mt-05"
                placeholder="Location"
                value={input?.location}
              ></IonInput>
            </div>

            <div className="mb-1">
              <h5>One-liner Bio</h5>
              <IonInput
                mode="md"
                onIonChange={handleChange}
                name="oneLinerBio"
                className="input-box mt-05"
                placeholder="One-liner Bio"
                value={input?.oneLinerBio}
              ></IonInput>
            </div>

            <IonButton
              disabled={loading}
              type="submit"
              mode="ios"
              expand="block"
            >
              Save Changes
            </IonButton>
          </form>
        </IonContent>
      </IonModal>
    </>
  )
}

export default index
