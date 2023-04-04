import { useState, useRef } from "react"
import { useMutation } from "@apollo/client"
import {
  IonAvatar,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonText,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  useIonToast
} from "@ionic/react"
import AWS from "aws-sdk"
import { imageOutline } from "ionicons/icons"
import { AddPost, GetUserPost } from "../../../graphql/user"
import TextChecker from "../../../utils/components/TextChecker"
import { USER_SERVICE_GQL } from "../../../servers/types"
import { useSelector } from "react-redux"
import "./index.css"

const S3_BUCKET = "unisala-prod"

// const S3_BUCKET = "unisala-test"

AWS.config.update({
  accessKeyId: "AKIAUVJSKU37X3A6PCBA",
  secretAccessKey: "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",
  region: "us-east-1"

  // accessKeyId: "AKIAVB2USJPTRQRSNCXR",
  // secretAccessKey: "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",
  // region: "ap-south-1"
})

const myBucket = new AWS.S3()

export const CreateAPost = ({ setPopup, popup }) => {
  const { user } = useSelector((state) => state.userProfile)
  const [present, dismiss] = useIonToast()
  const imgfile = useRef()
  const [postText, setPostText] = useState("")
  const [file, setfile] = useState("")
  const [fileData, setFileData] = useState("")
  const [fileName, setFileName] = useState("")

  const [addPost] = useMutation(AddPost, {
    context: { server: USER_SERVICE_GQL },
    update: (cache, { data: { addPost } }) => {
      const post = {
        ...addPost.post,
        user: {
          _id: user._id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          picture: user.picture || null
        },
        upVoteCount: 0,
        postCommentsCount: 0,
        upVoted: false,
        saved: false
      }
      const data = cache.readQuery({
        query: GetUserPost,
        variables: { userId: user._id, page: 0 },
        context: { server: USER_SERVICE_GQL }
      })
      data &&
        cache.writeQuery({
          query: GetUserPost,
          variables: { userId: user._id, page: 0 },
          context: { server: USER_SERVICE_GQL },
          data: {
            getUserPost: {
              ...data.getUserPost,
              Posts: [post, ...data.getUserPost.Posts]
            }
          }
        })
    },
    onCompleted: () => {
      present({
        duration: 3000,
        message: "Post added",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios"
      })
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

  const handleChangeImage = (e) => {
    e.preventDefault()
    const file = imgfile?.current?.files[0]
    setFileData(file)
    const reader = new FileReader()

    reader.onloadend = () => {
      setfile(reader.result)
    }
    if (file) {
      reader.readAsDataURL(file)
      setfile(reader.result)
    } else {
      setfile("")
    }
  }

  const handleImageDrop = (e) => {
    e.preventDefault()
    const file = e?.dataTransfer?.files[0]
    setFileData(file)
    const reader = new FileReader()

    reader.onloadend = () => {
      setfile(reader.result)
    }
    if (file) {
      reader.readAsDataURL(file)
      setfile(reader.result)
    } else {
      setfile("")
    }
  }

  const fileUpdate = async () => {
    const fName = fileData?.name?.split(".") || ""
    const uploadFilename = fName[0] + Date.now() + "." + fName[1] || ""
    if (fileData && file) {
      const params = {
        Body: fileData,
        Bucket: S3_BUCKET,
        Key: uploadFilename
      }

      await myBucket.putObject(params).send((err) => {
        console.log(err)
        if (err) {
          present({
            duration: 3000,
            message: err.message,
            buttons: [{ text: "X", handler: () => dismiss() }],
            color: "primary",
            mode: "ios"
          })
        }
      })
    }

    addPost({
      variables: {
        postText: TextChecker(postText),
        postImage: uploadFilename
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fileUpdate()
    setPopup(false)
  }

  return (
    <IonModal onDidDismiss={() => setPopup(false)} isOpen={popup}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Start a thread</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setPopup(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <form onSubmit={handleSubmit}>
        <div className="post-preview">
          <IonItem className="ion-no-padding" lines="none">
            <IonAvatar>
              <img
                src={
                  "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1670164432~exp=1670165032~hmac=36b9b40ac0ed5b3a668c8bd6a3773cb706f13b46413881b4a4f1079241cb9eb5"
                }
              />
            </IonAvatar>
            <IonLabel className="ion-padding-start">
              <h2>{user.username}</h2>
            </IonLabel>
          </IonItem>
          <IonText color="dark">
            <textarea
              className="post-textarea"
              placeholder="Write something..."
              onChange={(e) => setPostText(e.target.value)}
            />
          </IonText>

          {file ? (
            <img src={file} className="post-image-preview" />
          ) : (
            <div>
              <label
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleImageDrop}
                htmlFor="post-image"
                className="post-image-drop"
              >
                <IonIcon icon={imageOutline} />
              </label>
              <input
                type="file"
                ref={imgfile}
                hidden
                onChange={handleChangeImage}
                id="post-image"
              />
            </div>
          )}
        </div>

        <IonButton
          className="post-pop-button"
          type="submit"
          expand="full"
          shape="round"
        >
          Post
        </IonButton>
      </form>
    </IonModal>
  )
}
