import React from "react"
import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonIcon,
  IonTextarea,
  useIonToast
} from "@ionic/react"
import { useSelector } from "react-redux"
import { sendOutline } from "ionicons/icons"
import { Avatar } from "../../../component/Avatar"
import { useMutation } from "@apollo/client"
import { AddPost, GetUserPost } from "../../../../graphql/user"
import "react-quill/dist/quill.snow.css"
import "./style.css"
import ReactQuill from "react-quill"

export default function Discussion({ uniId }) {
  const { user } = useSelector((state) => state.userProfile)
  const [present, dismiss] = useIonToast()
  const input = React.useRef()
  const [reply, setReply] = React.useState("")

  const [submitUniReview] = useMutation(AddPost, {
    context: { server: "USER_SERVICE_GQL" },
    variables: { unitId: uniId, postText: reply },
    onCompleted: (data) => {
      if (data?.addPost.status.success) {
        present({
          duration: 3000,
          message: data?.addPost.status.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
      }
    },
    update: (cache, { data: { addPost } }) => {
      const post = {
        ...addPost?.post,
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
        saved: false,
        __typename: "Post"
      }

      const data = cache.readQuery({
        query: GetUserPost,
        variables: { unitId: uniId, page: 0, pageSize: 10, userId: user._id },
        context: { server: "USER_SERVICE_GQL" }
      })

      cache.writeQuery({
        query: GetUserPost,
        variables: { unitId: uniId, page: 0, pageSize: 10, userId: user._id },
        context: { server: "USER_SERVICE_GQL" },
        data: {
          addPost: {
            addPost,
            Posts: [post, addPost.Posts]
          }
        }
      })
    },
    onError: (error) => {
      if (error) {
        present({
          duration: 3000,
          message: error.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios"
        })
      }
    }
  })

  return (
    <>
      <IonCard
        style={{
          marginBottom: "20px"
        }}
      >
        <IonCardContent
          style={{
            borderBottom: "1px solid #C4C4C4"
          }}
        >
          <h1>Discussion</h1>
        </IonCardContent>
        <div
          style={{
            padding: "1%"
          }}
        >
          <form
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              margin: "10px",
              gap: "10px"
            }}
          >
            <IonAvatar
              slot="start"
              style={{
                alignSelf: "center",
                width: "50px",
                height: "50px"
              }}
            >
              <Avatar username={user.username} profilePic={user?.picture} />
            </IonAvatar>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}
              id="ReviewText_div"
            >
              {/* <IonTextarea
                ref={input}
                onIonChange={(e) => {
                  setReply(e.target.value)
                }}
                value={reply}
                id="ReviewText"
                style={{
                  border: "1px solid #c4c4c4",
                  borderRadius: "5px",
                  margin: "0px"
                }}
                type="text"
                className="border border-gray-400"
                placeholder="Ask or Start a discussion."
              /> */}

            <ReactQuill
              value={reply}
              onChange={(value) => setReply(value)}
              placeholder="Ask or Start a discussion."
              theme="snow"
              className="editor-school-review"
              modules={{
                toolbar: [
                  [{ "header": "1" }, { "header": "2" }],
                  ["bold", "italic", "underline", "strike"],
                  [{ "list": "ordered"}, { "list": "bullet" }],
                  ["link", "image"],
                  ["clean"]
                ]
              }}
            />
              <button
                type="submit"
                style={{
                  cursor: "pointer",
                  color: "#428cff",
                  fontSize: "25px",
                  fontWeight: "bold",
                  backgroundColor: "transparent"
                }}
              >
                <IonIcon
                  icon={sendOutline}
                  onClick={(e) => {
                    e.preventDefault()
                    submitUniReview()
                    setReply("")
                  }}
                />
              </button>
            </div>
          </form>
        </div>
      </IonCard>
    </>
  )
}
