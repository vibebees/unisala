import { useEffect, useState } from "react"
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
  useIonToast,
  IonSpinner
} from "@ionic/react"
import { create } from "ionicons/icons"
import useWindowWidth from "../../../../../hooks/useWindowWidth"
import { useMutation } from "@apollo/client"
import { EditProfile, getUserGql } from "../../../../../graphql/user"
import { USER_SERVICE_GQL } from "../../../../../servers/types"
import { Avatar } from "../../../../component/Avatar"
import { S3_BUCKET } from "../../../../../servers/endpoints"
import "./index.css"
import { awsBucket, bucketName } from "../../../../../servers/s3.configs"
import jwtDecode from "jwt-decode"
import { getUserProfile } from "../../../../../store/action/userProfile"
import { useDispatch } from "react-redux"

function index({ profileHeader }) {
  const { firstName, lastName, oneLinerBio, location, profilePic, username } =
    profileHeader
  const [input, setInput] = useState({
    firstName,
    lastName,
    username,
    oneLinerBio,
    location,
    profilePic
  })
  const [isOpen, setIsOpen] = useState(false)
  const [present, dismiss] = useIonToast()
  const [profileImage, setProfileImage] = useState(null)
  const [imageName, setImageName] = useState(""),
    dispatch = useDispatch()

  const [editProfile, { loading }] = useMutation(EditProfile, {
    context: { server: USER_SERVICE_GQL },
    variables: {
      ...input,
      profilePicture: profileImage ? imageName : profilePic
    },
    update: (cache, { data: { editProfile } }) => {
      const { getUser } = cache.readQuery({
        query: getUserGql,
        variables: { username }
      })
      cache.writeQuery({
        query: getUserGql,
        variables: { username },
        data: {
          getUser: {
            ...getUser,
            user: {
              ...getUser.user,
              ...editProfile.user
            }
          }
        }
      })
    },
    onCompleted: (data) => {
      if (data?.editProfile?.status?.success) {
        present({
          duration: 3000,
          message: "Profile Updated",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
      } else {
        present({
          duration: 3000,
          message: data?.editProfile?.status.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios"
        })
      }
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
    profileImage && fileUpdate()
    setIsOpen(false)
    setProfileImage(null)
  }

  let handleProfileImage = (e) => {
    setProfileImage(e.target.files[0])
    let filename = e.target.files[0].name.split(".") || ""
    setImageName(filename[0] + Date.now() + "." + filename[1] || "")
  }

  console.log({ profilePic })
  const fileUpdate = async () => {
    if (profileImage) {
      const params = {
        Bucket: bucketName("user"),
        Key: imageName,
        ContentType: profileImage.type,
        ACL: "public-read"
      }

      // Generate a pre-signed URL
      await awsBucket("user").getSignedUrl("putObject", params, async (err, url) => {
        if (err) {
          console.error(err)
          return
        }

        // Upload the file to S3 using the pre-signed URL
        const result = await fetch(url, {
          method: "PUT",
          body: profileImage,
          headers: {
            "Content-Type": profileImage.type
          }
        })

        if (result.ok) {
          // If the upload is successful, add the post with the S3 image URL
          console.log("Uploaded to S3")
        } else {
          console.error("Failed to upload image to S3")
        }
      })
    }
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
          setProfileImage(null)
        }}
        isOpen={isOpen}
        mode="ios"
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Edit Profile</IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={() => {
                  setIsOpen(false)
                  setProfileImage(null)
                }}
              >
                Close
              </IonButton>
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
                {profileImage ? (
                  <Avatar
                    profilePic={URL.createObjectURL(profileImage)}
                    username={username}
                  />
                ) : (
                  <Avatar profilePic={profilePic} username={username} />
                )}
              </div>
              <div className="upload-profile-pic-text">
                <h5>Set Profile Picture</h5>
                <p>You can change your profile picture or upload a photo</p>
                <label className="upload-file">
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => handleProfileImage(e)}
                  />
                </label>
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
              {loading ? <IonSpinner /> : "Save Changes"}
            </IonButton>
          </form>
        </IonContent>
      </IonModal>
    </>
  )
}

export default index
