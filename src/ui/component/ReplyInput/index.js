import { useState } from "react"
import { useSelector } from "react-redux"
import { IonTextarea, IonIcon, useIonToast } from "@ionic/react"
import { sendOutline } from "ionicons/icons"
import { useMutation } from "@apollo/client"
import { AddComment, GetCommentList } from "../../../graphql/user"
import { USER_SERVICE_GQL } from "../../../servers/types"
import { Avatar } from "../Avatar"
import "./index.css"

function ReplyInput({ setReply, postId, isReply, parentId }) {
  const { user } = useSelector((state) => state.userProfile)
  const [commentText, setCommentText] = useState("")
  const [present, dismiss] = useIonToast()
  const [addComment] = useMutation(AddComment, {
    context: { server: USER_SERVICE_GQL },
    update: (cache, { data: { addComment } }) => {
      cache.modify({
        id: cache.identify({
          __typename: isReply ? "Comment" : "Post",
          id: postId
        }),
        fields: {
          postCommentsCount: (prev) => prev + 1
        }
      })
      cache.modify({
        id: cache.identify({
          __typename: isReply ? "Comment" : "Post",
          id: parentId
        }),
        fields: {
          repliesCount: (prev) => prev + 1
        }
      })
      const post = cache.readQuery({
        query: GetCommentList,
        variables: parentId ? { postId, parentId } : { postId }
      })
      post &&
        cache.writeQuery({
          query: GetCommentList,
          variables: parentId ? { postId, parentId } : { postId },
          data: {
            commentList: {
              ...post.commentList,
              comments: [
                { ...addComment },
                post.commentList.length > 0 && { ...post.commentList.comments }
              ]
            }
          }
        })
    },
    onCompleted: () => {
      present({
        duration: 3000,
        message: "Comment added",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios"
      })
      setCommentText("")
      setReply((state) => !state)
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

  const submitReply = (e) => {
    e.preventDefault()
    addComment({
      variables: {
        postId: postId,
        commentText: commentText,
        parentId: isReply ? parentId : null
      }
    })
  }

  return (
    <form className="reply-input_form" onSubmit={submitReply}>
      <div className="thread_profile-pic">
        <Avatar username={user.username} profilePic={user.profilePic} />
      </div>
      <div className="review-text_div">
        <IonTextarea
          onIonChange={(e) => {
            setCommentText(e.target.value)
          }}
          value={commentText}
          type="text"
          className="review-text"
          placeholder="Give your opinion"
        />
        <button type="submit" className="reply-text_button">
          <IonIcon icon={sendOutline} />
        </button>
      </div>
    </form>
  )
}

export default ReplyInput
