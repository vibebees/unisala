import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import Upvote from "./actions/Upvote"
import Reply from "./actions/Reply"
import ReplyInput from "../ReplyInput"
import ShowMore from "./ShowMore"
import { Avatar } from "../Avatar"
import { imageAccess } from "../../../servers/endpoints"
import "./index.css"
import { IonButton, IonIcon, useIonToast } from "@ionic/react"
import { create, trash, ellipsisHorizontalOutline } from "ionicons/icons"
import { useMutation, useQuery } from "@apollo/client"
import { DeleteComment, GetUserPost } from "../../../graphql/user"
import { USER_SERVICE_GQL } from "../../../servers/types"
import { useSelector } from "react-redux"
import ReactQuill from "react-quill"
import moment from "moment"

function Comment({ comment, postId, parentId, singlePost }) {
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
    picture
  } = comment

  const [present, dismiss] = useIonToast()
  const [showOptions, setShowOptions] = useState(false)
  const [reply, setReply] = useState(false)
  const profilePic = picture
  const [editable, setEditable] = useState(false)
  // username of current visited profile
  const profileUsername = useParams().username

  const { user: loggedinUser } = useSelector((state) => state.userProfile)

  const [deleteComment] = useMutation(DeleteComment, {
    context: { server: USER_SERVICE_GQL },
    variables: { id: _id },
    update: (cache) => {
      cache.modify({
        id: cache.identify({
          __typename: parentId ? "Comment" : "Post",
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
        // setRefetchComments(true)
        // setRefetchPosts(true)
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

  console.log(singlePost, "singlePost")

  return (
    <div className=" relative   mt-2 ">
      <div className=" mx-14 pt-3 pl-4 rounded-xl pb-2 relative bg-neutral-200 bg-opacity-60 commentShadow ">
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
                <p className="threads_date !text-xs">
                  {moment(date).fromNow()}
                </p>
              </div>
            </div>
          </div>
        </Link>

        <div className="thread_content">
          <div className="thread_comment">
            {editable ? (
              <div className="px-5">
                <ReactQuill
                  theme="snow"
                  defaultValue={commentText}
                  className="h-48 mb-8 text-black"
                />

                <br />

                <IonButton
                  fill="clear"
                  className="ion-no-padding  capitalize  px-4 font-semibold text-black hover:bg-[#eae8e8] rounded-2xl transition ease delay-200"
                  size="small"
                  style={{
                    "--ripple-color": "transparent"
                  }}
                  onClick={() => setEditable(false)}
                >
                  Cancel
                </IonButton>
                <IonButton
                  className=" ion-no-padding capitalize font-bold px-4 text-white bg-blue-500 rounded-2xl transition ease delay-200 hover:bg-blue-600"
                  fill="clear"
                  size="small"
                  // onClick={editPost}
                  style={{
                    "--ripple-color": "transparent"
                  }}
                >
                  Save
                </IonButton>
              </div>
            ) : (
              <p className="text-sm">{commentText}</p>
            )}
          </div>

          <div className="thread_footer pl-0 -translate-x-4 scale-75">
            <Upvote
              upVoteCount={upVoteCount}
              postId={_id}
              upVoted={upVoted}
              isReply={true}
            />
            <Reply repliesCount={repliesCount} setReply={setReply} />
            {/* <Save postId={postId} saved={saved} /> */}
          </div>
        </div>

        {reply && (
          <ReplyInput
            setReply={setReply}
            parentId={_id}
            postId={postId}
            isReply={true}
          />
        )}

        {comment.username === loggedinUser?.username && (
          <div className="absolute top-2 right-5">
            <div className="relative">
              <button onClick={() => setShowOptions((prev) => !prev)}>
                <IonIcon
                  icon={ellipsisHorizontalOutline}
                  className="text-2xl"
                />
              </button>

              {showOptions && (
                <div className="absolute w-[160px] -right-6 top-5 bg-[#fafafa] rounded-xl px-6 py-4 shadow-xl">
                  <button
                    onClick={() => {
                      setEditable(true)
                      setShowOptions(false)
                    }}
                    className=" w-full py-1.5 rounded-lg  flex justify-center items-center gap-1 text-gray font-bold hover:bg-[#f1eeee]"
                  >
                    <IonIcon icon={create} className="text-xl" />
                    Update
                  </button>
                  <button
                    onClick={() => deleteComment()}
                    className=" w-full py-1.5 rounded-lg  flex justify-center items-center gap-1.5 text-gray font-bold hover:bg-[#f1eeee]"
                  >
                    <IonIcon icon={trash} className="text-xl" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {!singlePost && (
        <Link
          to={`thread/${postId}`}
          className="px-16 block  mt-4 text-base hover:text-neutral-800"
        >
          View all comments
        </Link>
      )}
      <div className="ml-20 border-l-2 border-opacity-30 border-neutral-400">
        {repliesCount > 0 && singlePost && (
          <ShowMore postId={postId} parentId={_id} singlePost={singlePost} />
        )}
      </div>
    </div>
  )
}

export default Comment
