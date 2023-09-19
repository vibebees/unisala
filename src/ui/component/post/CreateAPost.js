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
import { closeOutline, imageOutline } from "ionicons/icons"
import {
  AddPost,
  GetAllPostBySpaceCategoryID,
  GetUserPost
} from "../../../graphql/user"
import TextChecker from "../../../utils/components/TextChecker"
import { USER_SERVICE_GQL } from "../../../servers/types"
import { Avatar } from "../Avatar"

import { awsBucket, bucketName } from "../../../servers/s3.configs"
import "./index.css"
import ReactQuill from "react-quill"
import JoditEditor from "jodit-react"
import "react-quill/dist/quill.snow.css"
import TextEditor from "../../../utils/components/TextEditor"
import axios from "axios"
import { userServer } from "../../../servers/endpoints"
export const CreateAPost = ({ setPopup, popup, tags }) => {
  const { user } = useSelector((state) => state.userProfile)
  const [present, dismiss] = useIonToast()
  const imgfile = useRef()
  const [postText, setPostText] = useState("")
  const [file, setFile] = useState(null)
  const [fileData, setFileData] = useState("")
  const profilePic = user?.picture
  const formData = new FormData()
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
      if (!tags) {
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
      } else {
        const data = cache.readQuery({
          query: GetAllPostBySpaceCategoryID,
          variables: { id: tags[0] }, // tags array is made such that the 0th index is space id and 1st index is parent id
          context: { server: USER_SERVICE_GQL }
        })

        data &&
          cache.writeQuery({
            query: GetAllPostBySpaceCategoryID,
            variables: { id: tags[0] },
            context: { server: USER_SERVICE_GQL },
            data: {
              getAllPostBySpaceCategoryID: {
                ...data.getAllPostBySpaceCategoryID,
                posts: [post, ...data.getAllPostBySpaceCategoryID.posts]
              }
            }
          })
      }
    },

    onCompleted: async (data) => {
      if (file) {
        formData.append("image", file)
        const res = await axios.post(
          userServer + `/post/addPostImage/${data.addPost.post._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )

        console.log(res)
      }
      present({
        duration: 3000,
        message: "Post added",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios"
      })
      // setfile("")
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

  // const handleChangeImage = (e) => {
  //   e.preventDefault()
  //   const file = imgfile?.current?.files[0]
  //   setFileData(file)
  //   const reader = new FileReader()

  //   reader.onloadend = () => {
  //     setfile(reader.result)
  //   }
  //   if (file) {
  //     reader.readAsDataURL(file)
  //     setfile(reader.result)
  //   } else {
  //     setfile("")
  //   }
  // }

  // const handleImageDrop = (e) => {
  //   e.preventDefault()
  //   const file = e?.dataTransfer?.files[0]
  //   setFileData(file)
  //   const reader = new FileReader()

  //   reader.onloadend = () => {
  //     setfile(reader.result)
  //   }
  //   if (file) {
  //     reader.readAsDataURL(file)
  //     setfile(reader.result)
  //   } else {
  //     setfile("")
  //   }
  // }

  // const fileUpdate = async () => {
  //   const fName = fileData?.name?.split(".") || ""
  //   const uploadFilename = fName[0] + Date.now() + "." + fName[1] || ""

  //   if (fileData && file) {
  //     const params = {
  //       Bucket: bucketName("user"),
  //       Key: uploadFilename,
  //       ContentType: fileData.type,
  //       ACL: "public-read"
  //     }

  //     // Generate a pre-signed URL
  //     await awsBucket("user").getSignedUrl(
  //       "putObject",
  //       params,
  //       async (err, url) => {
  //         if (err) {
  //           console.error(err)
  //           return
  //         }

  //         // Upload the file to S3 using the pre-signed URL
  //         const result = await fetch(url, {
  //           method: "PUT",
  //           body: fileData,
  //           headers: {
  //             "Content-Type": fileData.type
  //           }
  //         })

  //         if (result.ok) {
  //           // If the upload is successful, add the post with the S3 image URL
  //           addPost({
  //             variables: {
  //               postText: TextChecker(postText),
  //               postImage: uploadFilename,
  //               tags
  //             }
  //           })
  //           setfile("")
  //         } else {
  //           console.error("Failed to upload image to S3")
  //         }
  //       }
  //     )
  //   }
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
    addPost({
      variables: {
        postText: TextChecker(postText),
        tags
      }
    })
    setPopup(false)
  }

  // text editor
  return (
    <IonModal onDidDismiss={() => setPopup(false)} isOpen={popup}>
      <IonHeader className="">
        <IonToolbar>
          <IonTitle>Start a thread</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setPopup(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <form onSubmit={handleSubmit} className="overflow-y-scroll threadScroll">
        <div className="post-preview">
          <IonItem className="ion-no-padding" lines="none">
            <IonAvatar>
              <Avatar username={user.username} profilePic={profilePic} />
            </IonAvatar>
            <IonLabel className="ion-padding-start">
              <h2>{user.username}</h2>
            </IonLabel>
          </IonItem>

          <TextEditor postText={postText} setPostText={setPostText} />

          {file ? (
            <div className="relative">
              <img
                src={URL.createObjectURL(file)}
                className="post-image-preview mt-16"
              />

              <button onClick={() => setFile(null)}>
                <IonIcon
                  icon={closeOutline}
                  color="dark"
                  className="absolute right-1  text-2xl -top-3 "
                />
              </button>
            </div>
          ) : (
            <div className="mt-20 flex justify-center items-center">
              <label
                onDragOver={(e) => e.preventDefault()}
                // onDrop={handleImageDrop}
                htmlFor="post-image"
                className="flex flex-col items-center"
              >
                <IonIcon
                  icon={imageOutline}
                  className="text-3xl text-[#818080]"
                />
                <h5 className="text-[#818080] font-medium text-xl">
                  Upload your image
                </h5>
              </label>
              <input
                type="file"
                ref={imgfile}
                hidden
                onChange={(e) => setFile(e.target.files[0])}
                id="post-image"
              />
            </div>
          )}
        </div>

        <IonButton
          className="post-pop-button mt-5"
          type="submit"
          expand="full"
          slot=""
          shape="round"
        >
          Post
        </IonButton>
      </form>
    </IonModal>
  )
}
