import React from "react"
import ReactQuill from "react-quill"
import { IonButton } from "@ionic/react"
import "react-quill/dist/quill.snow.css"
import { useMutation } from "@apollo/client"
import { EditPost } from "graphql/user"
import { USER_SERVICE_GQL } from "servers/types"

const ThreadEditable = () => {
  const [editPost] = useMutation(EditPost, {
    context: { server: USER_SERVICE_GQL },
    variables: { ...updatedData },

    update: (cache, { data }) => {
      cache.modify({
        id: cache.identify({
          __typename: isHome ? "PostNewsFeed" : "Post",
          id: _id
        }),
        fields: {
          postText() {
            return updatedData.postText
          }
        }
      })
    },
    onCompleted: (data) => {
      const { editPost } = data

      if (editPost?.status?.success) {
        // refetch posts
        // refetch()
        // change editable back to false
        setEditable(false)
        present({
          duration: 3000,
          message: "Post Updated",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
      } else {
        present({
          duration: 3000,
          message: editPost.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
      }
    }
  })

  return (
    <div>
      <div className="h-auto min-h-200 mb-12 text-black relative">
        <ReactQuill
          theme="snow"
          onChange={handleChange}
          defaultValue={postText}
        />
      </div>

      <br />
      <IonButton
        fill="clear"
        className="ion-no-padding capitalize px-4 font-semibold text-black hover:bg-[#eae8e8] rounded-2xl transition ease delay-200"
        size="small"
        style={{ "--ripple-color": "transparent" }}
        onClick={() => setEditable(false)}
      >
        Cancel
      </IonButton>
      <IonButton
        className="ion-no-padding capitalize font-bold px-4 text-white bg-blue-500 rounded-2xl transition ease delay-200 hover:bg-blue-600"
        fill="clear"
        size="small"
        onClick={editPost}
        style={{ "--ripple-color": "transparent" }}
      >
        Save
      </IonButton>
    </div>
  )
}

export default ThreadEditable
