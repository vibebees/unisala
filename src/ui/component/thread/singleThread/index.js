import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { IonButton, IonCard, IonIcon, useIonToast } from "@ionic/react"

import Upvote from "../actions/Upvote"
import Reply from "../actions/Reply"
import Save from "../actions/Save"
import ReplyInput from "../../ReplyInput"
import ShowMore from "../ShowMore"
import { Avatar } from "../../Avatar"
import { getImage } from "../../../../servers/s3.configs"
import ThreadExpand from "../ThreadExpand"
import {
  create,
  ellipsisHorizontalOutline,
  trash,
  chatbubbleOutline
} from "ionicons/icons"
import moment from "moment"

import { useMutation } from "@apollo/client"
import {
  DeletePost,
  EditPost,
  GetUserPost,
  getUserGql
} from "../../../../graphql/user"
import { USER_SERVICE_GQL } from "../../../../servers/types"
import { useSelector } from "react-redux"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const Thread = ({ thread, refetch }) => {
  const [present, dismiss] = useIonToast()
  console.log(thread, "thread")
  const {
    _id,
    date = new Date(),
    postText,
    upVoteCount,
    comments,
    postCommentsCount = 0,
    upVoted = false,
    postImage,
    saved = false,
    user = null
  } = thread

  const { firstName, lastName, username, picture } = thread.user || {}
  const [reply, setReply] = useState(false)
  const [profilePic, setProfilePic] = useState(picture)
  const [image, setImage] = useState(postImage)
  const [showOptions, setShowOptions] = useState(false)
  const [editable, setEditable] = useState(false)

  const [updatedData, setUpdatedData] = useState({
    postText,
    postImage,
    postId: _id
  })

  useEffect(() => {
    getImage("user", image, setImage)
    getImage("user", profilePic, setProfilePic)
  }, [profilePic])
  const { user: loggedinUser } = useSelector((state) => state.userProfile)

  // delete thread
  const [deletePost] = useMutation(DeletePost, {
    context: { server: USER_SERVICE_GQL },

    variables: {
      postId: _id
    },
    update: (cache) => {},
    onCompleted: (data) => {
      const { deletePost } = data
      if (deletePost.success) {
        // refetch posts
        setShowOptions(false)
        refetch()

        present({
          duration: 3000,
          message: "Post Deleted",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
      } else {
        present({
          duration: 3000,
          message: deletePost?.message
        })
      }
    }
  })

  const handleChange = (e) => {
    // for now handling change of text only
    setUpdatedData((prev) => ({ ...prev, postText: e }))
  }

  // update thread

  const [editPost] = useMutation(EditPost, {
    context: { server: USER_SERVICE_GQL },
    variables: { ...updatedData },
    onCompleted: (data) => {
      const { editPost } = data

      if (editPost?.status?.success) {
        // refetch posts
        refetch()
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

  console.log(username, "username")
  console.log(firstName)

  return (
    <div className="max-w-2xl w-full mx-auto mb-10">
      <IonCard className=" relative mb-0 pt-4 pb-6 ">
        <Link to={`/@/${username}`} className="px-4">
          <div className="thread-header">
            <div className="thread_profile-pic">
              <Avatar profilePic={profilePic} username={firstName + lastName} />
            </div>
            <div className="thread_userdetails">
              <h3 style={{ color: "#222428" }}>{firstName + " " + lastName}</h3>
              <div className="threads_username">
                <p>@{username}</p>

                <p className="threads_date">{moment(date).fromNow()}</p>
              </div>
            </div>
          </div>
        </Link>
        <div className="thread_content !pl-16 pr-8">
          <div className="thread_comment">
            {editable ? (
              <div>
                {/* <textarea
                name=""
                className="w-2/3  outline-none resize-none border-b-2 border-black"
                onChange={handleChange}
              >
                {postText}
              </textarea> */}
                <ReactQuill
                  theme="snow"
                  onChange={handleChange}
                  // value={postText}
                  defaultValue={postText}
                  className="h-48 mb-8  text-black"
                />
                <br />

                <IonButton
                  fill="clear"
                  className="ion-no-padding  capitalize px-4 font-semibold text-black hover:bg-[#eae8e8] rounded-2xl transition ease delay-200"
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
                  onClick={editPost}
                  style={{
                    "--ripple-color": "transparent"
                  }}
                >
                  Save
                </IonButton>
              </div>
            ) : (
              <>
                <ThreadExpand htmlText={postText} maxLines={8} _id={_id} />
              </>
            )}
          </div>
          <div className="thread_image">{postImage && <img src={image} />}</div>
          <div className="thread_footer">
            <Upvote
              upVoteCount={upVoteCount}
              postId={_id}
              upVoted={upVoted}
              isReply={false}
            />
            <Reply repliesCount={postCommentsCount} setReply={setReply} />
            <Save postId={_id} saved={saved} thread={thread} />
          </div>
        </div>
        {reply && (
          <ReplyInput setReply={setReply} postId={_id} isReply={false} />
        )}
        {loggedinUser && loggedinUser?.username === username && (
          <div className="absolute top-4 right-8">
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
                    onClick={() => deletePost()}
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
      </IonCard>
      {postCommentsCount > 0 && (
        <div className=" bg-neutral-50 mx-2 pt-4  pb-6">
          <ShowMore postId={_id} user={user} singlePost={true} />
        </div>
      )}
    </div>
  )
}

export default Thread
