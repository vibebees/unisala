import { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"
import {
  IonIcon,
  useIonToast,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButton,
  IonButtons,
  IonText
} from "@ionic/react"
import { sendOutline } from "ionicons/icons"
import { useMutation } from "@apollo/client"
import { Avatar } from "../Avatar"
import "./index.css"
import ReactQuill from "react-quill"
import { USER_SERVICE_GQL } from "servers/types"
import { GetCommentList, AddComment } from "graphql/user"
import UniversityList from "component/thread/UniversityList"
import { ThreadHeader } from "component/thread/organism"

function ReplyInput({
  setReply,
  postId = "",
  isReply,
  parentId = "",
  singlePost,
  setNumberOfComments,
  replyTo,
  reply = false
}) {
  const { user } = useSelector((state) => state.userProfile)
  const [commentText, setCommentText] = useState("")
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [present, dismiss] = useIonToast()
  const quillRef = useRef(null)
  const [modalOpen, setModalOpen] = useState(reply || false)
  const [showPopover, setShowPopover] = useState(false)
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    setModalOpen(reply)
  }, [reply])
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
        variables: {
          postId,
          parentId
        }
      })

      post &&
        cache.writeQuery({
          query: GetCommentList,
          variables: {
            postId,
            parentId
          },
          data: {
            commentList: {
              __typename: "commentList",
              success: true,
              message: "comments found",
              comments: [
                addComment.comment,
                ...(post.commentList.comments || [])
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
      commentText: commentText
    }

    if (isReply) {
      variables.replyTo = replyTo
      parentId && (variables.parentId = parentId)
    }
    setModalOpen(false)
    addComment({ variables })
  }

  const getCaretCoordinates = (element, position) => {
    const rect = element.getBoundingClientRect()
    const lineHeight = parseFloat(getComputedStyle(element).lineHeight)

    const coordinates = {
      top: rect.top + Math.floor(position / element.cols) * lineHeight,
      left: rect.left + (position % element.cols) * 8 // Assuming each character width is 8px
    }

    console.log(coordinates)

    return coordinates
  }

  if (!reply) return null
  return (
    <IonModal isOpen={modalOpen}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={() => setModalOpen(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <form
        className="reply-input_form  h-40   block  pr-8"
        onSubmit={submitReply}
      >
        <div
          className="my-3
         "
        >
          <ThreadHeader
            firstName={user.firstName}
            username={user.username}
            lastName={user.lastName}
            profilePic={user.profilePic}
          />
        </div>
        <div className="h-60  mb-12 text-black relative">
          <ReactQuill
            theme="snow"
            ref={quillRef}
            className=" text-black h-full relative border-b-2 overflow-hidden w-full"
            onChange={(e) => {
              setCommentText(e)
            }}
            onKeyDown={(e) => {
              if (e.key === "@") {
                console.log("commentText", commentText)
                // const cursorIndex = e.target.selectionStart
                // const quill = quillRef.current?.getEditor()
                // const cursorIndex = quill?.getSelection()?.index

                // const cursorCoordinates = quill.getBounds(cursorIndex)

                // setPopoverPosition(cursorCoordinates)
                setShowPopover(true)
                setShowPopover(true)
                setPopoverOpen(true)
              }
            }}
            value={commentText}
          />
          <UniversityList
            setPopoverOpen={setPopoverOpen}
            popoverOpen={popoverOpen}
            popoverPosition={popoverPosition}
            searchText={commentText.split("@").pop().split("<")[0]}
            handleUniversitySelect={(e) => {
              const removeTextafter = commentText.split("@")[0]
              setCommentText(
                removeTextafter +
                  `<a href="https://unisala.com/university/${e}" rel="noopener noreferrer" target="_blank">${e}</a></p>`
              )
            }}
          />
          <IonButton expand="full" shape="round" type="submit" className="mt-2">
            <IonText className="mr-3">Reply</IonText>{" "}
            <IonIcon icon={sendOutline} />
          </IonButton>
        </div>
      </form>
    </IonModal>
  )
}

export default ReplyInput
