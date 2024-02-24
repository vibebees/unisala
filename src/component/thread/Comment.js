import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import Upvote from "./actions/Upvote"
import Reply from "./actions/Reply"
import ReplyInput from "../ReplyInput"
import ShowMore from "./ShowPeopleComments"
import { Avatar } from "../Avatar"
import "./index.css"
import { IonButton, IonIcon, useIonToast } from "@ionic/react"
import { create, trash, ellipsisHorizontalOutline } from "ionicons/icons"
import { useMutation, useQuery } from "@apollo/client"

import { useSelector } from "react-redux"
import ReactQuill from "react-quill"
import moment from "moment"
import { USER_SERVICE_GQL } from "servers/types"
import { DeleteComment, EditComment } from "graphql/user"

function Comment({
  comment,
  postId,
  parentId,
  singlePost,
  setRefetchComments
}) {
  const {
    _id,
    firstName,
    lastName,
    username,
    date,
    commentText,
    repliesCount,
    upVoteCount,
    upVoted,
    picture,
    replyTo
  } = comment

  const [present, dismiss] = useIonToast()
  const [showOptions, setShowOptions] = useState(false)
  const [reply, setReply] = useState(false)
  const profilePic = picture
  const [editable, setEditable] = useState(false)
  const [updatedData, setUpdatedData] = useState({
    commentText,
    commentId: _id
  })
  // username of current visited profile
  const profileUsername = useParams().username

  const { user: loggedinUser } = useSelector((state) => state.userProfile)

  const [deleteComment] = useMutation(DeleteComment, {
    context: { server: USER_SERVICE_GQL },
    variables: { id: _id },
    update: (cache) => {
      cache.modify({
        id: cache.identify({
          __typename: parentId
            ? "Comment"
            : singlePost
            ? "PostComment"
            : "Post",
          _id: postId
        }),
        fields: {
          postCommentsCount: (prev) => prev - 1
        }
      })
      cache.modify({
        id: cache.identify({
          __typename: parentId ? "Comment" : "Post",
          _id: parentId
        }),
        fields: {
          repliesCount: (prev) => prev - 1
        }
      })
    },
    onCompleted: (data) => {
      setShowOptions(false)
      const { deleteComment } = data

      if (deleteComment?.success) {
        setRefetchComments((prev) => !prev)
        present({
          duration: 3000,
          message: "Comment Deleted",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
      } else {
        present({
          duration: 3000,
          message: "Can not delete comment",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
      }
    }
  })

  const [editComment] = useMutation(EditComment, {
    context: { server: USER_SERVICE_GQL },
    variables: { ...updatedData },
    onCompleted: (data) => {
      const { editComment } = data
      setEditable(false)
      setRefetchComments((prev) => !prev)
      if (editComment?.status?.success) {
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
          message: editComment.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
      }
    }
  })

  const handleChange = (e) => {
    // for now handling change of text only
    setUpdatedData((prev) => ({ ...prev, commentText: e }))
  }

  const UserProfileLink = ({
    username,
    profilePic,
    firstName,
    lastName,
    date
  }) => (
    <Link to={`/@/${username}`}>
      <div className="thread-header !gap-2">
        <div className="thread_profile-pic scale-75">
          <Avatar profilePic={profilePic} username={username} />
        </div>
        <div className="thread_userdetails ">
          <h3 style={{ color: "#222428" }} className="!text-sm">
            {firstName + " " + lastName}
          </h3>
          <div className="threads_username text-[0.82rem]">
            <p>@{username}</p>
            <p className="threads_date !text-xs">{moment(date).fromNow()}</p>
          </div>
        </div>
      </div>
    </Link>
  )

  const CommentContent = ({
    editable,
    handleChange,
    commentText,
    setEditable,
    editComment,
    replyTo
  }) => {
    if (editable) {
      return (
        <div className="px-5">
          <ReactQuill
            theme="snow"
            onChange={handleChange}
            defaultValue={commentText}
            className="h-48 mb-8 text-black"
          />
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
            onClick={editComment}
            style={{ "--ripple-color": "transparent" }}
          >
            Save
          </IonButton>
        </div>
      )
    } else {
      return (
        <div className="ql-editor">
          <span className="text-sm h-fit pr-2 text-blue-600 font-medium">
            {replyTo && `@${replyTo}`}
          </span>
          <p dangerouslySetInnerHTML={{ __html: commentText }} />
        </div>
      )
    }
  }

  const ThreadFooter = ({
    upVoteCount,
    _id,
    upVoted,
    repliesCount,
    setReply
  }) => (
    <div className="thread_footer pl-0 -translate-x-4 scale-75">
      <Upvote
        upVoteCount={upVoteCount}
        postId={_id}
        upVoted={upVoted}
        isReply={true}
      />
      <Reply repliesCount={repliesCount} setReply={setReply} />
    </div>
  )

  const CommentOptions = ({ setEditable, setShowOptions, deleteComment }) => (
    <div className="absolute top-2 right-5">
      <div className="relative">
        <button onClick={() => setShowOptions((prev) => !prev)}>
          <IonIcon icon={ellipsisHorizontalOutline} className="text-2xl" />
        </button>
        {showOptions && (
          <div className="absolute w-[160px] -right-6 top-5 bg-[#fafafa] rounded-xl px-6 py-4 shadow-xl">
            <button
              onClick={() => {
                setEditable(true)
                setShowOptions(false)
              }}
              className="w-full py-1.5 rounded-lg flex justify-center items-center gap-1 text-gray font-bold hover:bg-[#f1eeee]"
            >
              <IonIcon icon={create} className="text-xl" />
              Update
            </button>
            <button
              onClick={deleteComment}
              className="w-full py-1.5 rounded-lg flex justify-center items-center gap-1.5 text-gray font-bold hover:bg-[#f1eeee]"
            >
              <IonIcon icon={trash} className="text-xl" />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="relative mt-2 mb-4 ml-6 mr-2 bg-white border border-gray-300 rounded-lg shadow-sm commentShadow w-[95%] max-w-[95%]">
      {" "}
      {/* Adjusted margins and width */}
      <div className="pt-3 pl-4 pb-2 rounded-xl relative bg-neutral-200 commentShadow w-full">
        <UserProfileLink
          username={username}
          profilePic={profilePic}
          firstName={firstName}
          lastName={lastName}
          date={date}
        />

        <CommentContent
          editable={editable}
          handleChange={handleChange}
          commentText={commentText}
          setEditable={setEditable}
          editComment={editComment}
          replyTo={replyTo}
        />

        <ThreadFooter
          upVoteCount={upVoteCount}
          _id={_id}
          upVoted={upVoted}
          repliesCount={repliesCount}
          setReply={setReply}
        />

        <ReplyInput
          setReply={setReply}
          parentId={parentId ?? _id}
          postId={postId}
          isReply={true}
          replyTo={username}
          reply={reply}
        />

        {comment.username === loggedinUser?.username && (
          <CommentOptions
            setEditable={setEditable}
            setShowOptions={setShowOptions}
            deleteComment={deleteComment}
          />
        )}
      </div>
      <div className="ml-20 max-md:ml-8 max-sm:ml-4 border-l-2 max-md:pl-12 max-sm:pl-0 border-opacity-30 border-neutral-400">
        {repliesCount > 0 && singlePost && (
          <ShowMore postId={postId} parentId={_id} singlePost={singlePost} />
        )}
      </div>
    </div>
  )
}

export default Comment
