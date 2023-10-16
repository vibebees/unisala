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
  getNewsFeed
} from "../../../../graphql/user"
import TextChecker from "../../../../utils/components/TextChecker"
import { USER_SERVICE_GQL } from "../../../../servers/types"
import { Avatar } from "../../Avatar"

import "../index.css"

import "react-quill/dist/quill.snow.css"
import TextEditor from "../../../../utils/components/TextEditor"
import axios from "axios"
import { userServer } from "../../../../servers/endpoints"
import clsx from "clsx"

export const PostModalOnClick = ({allProps}) => {

  const { setCreateAPostPopUp, createAPostPopUp, tags} = allProps
  const { user } = useSelector((state) => state.userProfile)
  const [present, dismiss] = useIonToast()
  const imgfile = useRef()
  const [postText, setPostText] = useState("")
  const [files, setFiles] = useState(null)

  const profilePic = user?.picture
  const formData = new FormData()
  const [addPost] = useMutation(AddPost, {
    context: { server: USER_SERVICE_GQL },
    update: (cache, { data: { addPost } }) => {
      const post = {
        postText: addPost.post.postText,
        date: addPost.post.date,
        _id: addPost.post._id,
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
        type: "post",
        saved: false,
        images: addPost.post.images || [],
        __typename: "Post"
      }
      if (!tags) {
        const data = cache.readQuery({
          query: getNewsFeed,
          variables: { userId: user._id, page: 0 },
          context: { server: USER_SERVICE_GQL }
        })
        data &&
          cache.writeQuery({
            query: getNewsFeed,
            variables: { userId: user._id, page: 0 },
            context: { server: USER_SERVICE_GQL },
            data: {
              fetchMyNewsFeed: [post, ...data.fetchMyNewsFeed]
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
      if (files) {
        for (let i = 0; i < files.length; i++) {
          formData.append("image", files[i])
        }
        const res = await axios.post(
          userServer + `/post/addPostImage/${data.addPost.post._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
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
        duration: 5000,
        message: error.message,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (files?.length > 4) {
      present({
        duration: 3000,
        message: "Maximum allowed files is 4.",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
      return
    }

    if (postText.length > 0 || files?.length > 0) {
      addPost({
        variables: {
          postText: TextChecker(postText),
          tags
        }
      })
      setCreateAPostPopUp(false)
    } else {
      present({
        duration: 3000,
        message: "Please include something to post",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
    }
  }

  const handleRemoveFile = (index) => {
    const newFiles = Array.from(files)

    newFiles.splice(index, 1)
    setFiles(newFiles)
  }
  // text editor
  return (
    <IonModal onDidDismiss={() => setCreateAPostPopUp(false)} isOpen={createAPostPopUp}>
      <IonHeader className="">
        <IonToolbar>
          <IonTitle>Start a Discussion</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setCreateAPostPopUp(false)}>Close</IonButton>
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

          {files?.length > 0 ? (
            <div
              className={clsx(
                "grid gap-x-4 items-center justify-center",
                files.length === 1 ? "grid-cols-1" : "grid-cols-2"
              )}
            >
              {files.length > 0 &&
                Array.from(files).map((file, i) => (
                  <div className="relative mt-16" key={i}>
                    <img
                      src={URL.createObjectURL(file)}
                      className="post-image-preview"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(i)}
                      className="absolute right-0 top-2 w-6 h-6 rounded-full bg-[#585C5F] flex items-center justify-center hover:bg-opacity-80"
                    >
                      <IonIcon icon={closeOutline} color="light" className="" />
                    </button>
                  </div>
                ))}
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
                accept="image/*"
                multiple
                hidden
                onChange={(e) => setFiles(e.target.files)}
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
