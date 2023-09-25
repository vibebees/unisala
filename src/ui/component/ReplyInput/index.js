import { useState } from "react"
import { useSelector } from "react-redux"
import { IonTextarea, IonIcon, useIonToast } from "@ionic/react"
import { sendOutline } from "ionicons/icons"
import { useMutation } from "@apollo/client"
import { AddComment, GetCommentList } from "../../../graphql/user"
import { USER_SERVICE_GQL } from "../../../servers/types"
import { Avatar } from "../Avatar"
import "./index.css"
import ReactQuill from "react-quill"

function ReplyInput({
  setReply,
  postId,
  isReply,
  parentId,
  singlePost,
  setNumberOfComments,
  replyTo
}) {
  const { user } = useSelector((state) => state.userProfile)
  const [commentText, setCommentText] = useState("")

  const [present, dismiss] = useIonToast()
  const [addComment] = useMutation(AddComment, {
    context: { server: USER_SERVICE_GQL },
    update: (cache, { data: { addComment } }) => {
      cache.modify({
        id: cache.identify({
          __typename: isReply ? "Comment" : singlePost ? "PostComment" : "Post",
          id: postId
        }),
        fields: {
          postCommentsCount: (prev) => prev + 1
        }
      })
      cache.modify({
        id: cache.identify({
          __typename: isReply ? "Comment" : singlePost ? "PostComment" : "Post",
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
      if (!singlePost && setNumberOfComments) {
        setNumberOfComments((prev) => prev + 1)
      }
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
    const variables = {
      postId: postId,
      commentText: commentText,
      parentId: isReply ? parentId : null,
      replyTo: isReply ? replyTo : null
    }

    addComment({ variables })
  }

  return (
    <form
      className="reply-input_form  h-40  block   pl-10 pr-8"
      onSubmit={submitReply}
    >
      <div className="thread_profile-pic  ">
        <Avatar username={user.username} profilePic={user.profilePic} />
      </div>
      <div className="review-text_div h-full ">
        <ReactQuill
          theme="snow"
          className=" text-black h-full border-b-2 overflow-hidden w-full"
          onChange={(e) => {
            setCommentText(e)
          }}
          value={commentText}
        />
        <button type="submit" className="reply-text_button">
          <IonIcon icon={sendOutline} />
        </button>
      </div>
    </form>
  )
}

export default ReplyInput
