import { useState, useRef } from "react"
import { useMutation } from "@apollo/client"
import { useSelector } from "react-redux"
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
import { imageOutline } from "ionicons/icons"
import { AddPost, GetUserPost } from "../../../graphql/user"
import TextChecker from "../../../utils/components/TextChecker"
import { USER_SERVICE_GQL } from "../../../servers/types"
import { Avatar } from "../Avatar"
import { awsBucket, bucketName } from "../../../servers/s3.configs"
import "./index.css"

export const CreateAPost = ({ setPopup, popup }) => {
  const { user } = useSelector((state) => state.userProfile)
  const [present, dismiss] = useIonToast()
  const imgfile = useRef()
  const [postText, setPostText] = useState("")
  const [file, setfile] = useState("")
  const [fileData, setFileData] = useState("")
  const profilePic = user?.picture

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
      setfile("")
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
        Bucket: bucketName("user"),
        Key: uploadFilename,
        ContentType: fileData.type,
        ACL: "public-read"
      }

      // Generate a pre-signed URL
      await awsBucket("user").getSignedUrl(
        "putObject",
        params,
        async (err, url) => {
          if (err) {
            console.error(err)
            return
          }

          // Upload the file to S3 using the pre-signed URL
          const result = await fetch(url, {
            method: "PUT",
            body: fileData,
            headers: {
              "Content-Type": fileData.type
            }
          })

          if (result.ok) {
            // If the upload is successful, add the post with the S3 image URL
            addPost({
              variables: {
                postText: TextChecker(postText),
                postImage: uploadFilename
              }
            })
            setfile("")
          } else {
            console.error("Failed to upload image to S3")
          }
        }
      )
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fileData && file && fileUpdate()
    !fileData && addPost({ variables: { postText: TextChecker(postText) } })
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
      <form onSubmit={handleSubmit} className="">
        <div className="post-preview">
          <IonItem className="ion-no-padding" lines="none">
            <IonAvatar>
              <Avatar username={user.username} profilePic={profilePic} />
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
