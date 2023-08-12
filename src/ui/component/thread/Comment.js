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

function Comment({ comment, postId, parentId }) {
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
  console.log(profileUsername, "name")
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

  return (
    <div className="comment_thread relative">
      <Link to={`/@/${username}`}>
        <div className="thread-header">
          <div className="thread_profile-pic">
            <Avatar profilePic={profilePic} username={username} />
          </div>
          <div className="thread_userdetails">
            <h3 style={{ color: "#222428" }}>{firstName + " " + lastName}</h3>
            <div className="threads_username">
              <p>@{username}</p>
              <p className="threads_date">{date.toString().slice(0, 10)}</p>
            </div>
          </div>
        </div>
      </Link>

      <div className="thread_content">
        <div className="thread_comment">
          {editable ? (
            <div>
              <textarea
                name=""
                className="w-2/3  outline-none resize-none border-b-2 border-black"
                defaultValue={commentText}
                // onChange={handleChange}
              >
                {/* {commentText} */}
              </textarea>
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
            <p>{commentText}</p>
          )}
        </div>

        <div className="thread_footer">
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
        <div className="absolute top-0 right-6">
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

      {repliesCount > 0 && <ShowMore postId={postId} parentId={_id} />}
    </div>
  )
}

export default Comment
