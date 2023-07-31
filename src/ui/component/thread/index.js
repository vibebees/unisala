import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  IonButton,
  IonCard,
  IonContent,
  IonIcon,
  IonModal,
  useIonToast
} from "@ionic/react"
import Upvote from "./actions/Upvote"
import Reply from "./actions/Reply"
import Save from "./actions/Save"
import ReplyInput from "../ReplyInput"
import "./index.css"
import ShowMore from "./ShowMore"
import { Avatar } from "../Avatar"
import { getImage } from "../../../servers/s3.configs"
import {
  create,
  createOutline,
  ellipsisHorizontalOutline,
  trash
} from "ionicons/icons"
import { useMutation } from "@apollo/client"
import { DeletePost, GetUserPost } from "../../../graphql/user"
import { USER_SERVICE_GQL } from "../../../servers/types"

const Thread = ({ thread, setRefetchPosts }) => {
  const [present, dismiss] = useIonToast()
  const {
    _id,
    date,
    postText,
    upVoteCount,
    postCommentsCount,
    upVoted,
    postImage,
    saved
  } = thread
  const { firstName, lastName, username, picture } = thread.user || {}
  const [reply, setReply] = useState(false)
  const [profilePic, setProfilePic] = useState(picture)
  const [image, setImage] = useState(postImage)

  const [showOptions, setShowOptions] = useState(false)
  useEffect(() => {
    getImage("user", image, setImage)
    getImage("user", profilePic, setProfilePic)
  }, [profilePic])

  // delete thread
  const [deletePost] = useMutation(DeletePost, {
    context: { server: USER_SERVICE_GQL },
    variables: {
      postId: _id
    },
    onCompleted: (data) => {
      const { deletePost } = data
      if (deletePost.success) {
        // change state to indicate the parent thread that refetching is required
        setRefetchPosts(true)
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
  return (
    <IonCard className="thread relative">
      <Link to={`/@/${username}`}>
        <div className="thread-header">
          <div className="thread_profile-pic">
            <Avatar profilePic={profilePic} username={firstName + lastName} />
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
          <p>{postText}</p>
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

      {reply && <ReplyInput setReply={setReply} postId={_id} isReply={false} />}

      <div className="absolute top-4 right-8">
        <div className="relative">
          <button onClick={() => setShowOptions((prev) => !prev)}>
            <IonIcon icon={ellipsisHorizontalOutline} className="text-2xl" />
          </button>

          {showOptions && (
            <div className="absolute w-[200px] -right-6 top-5 bg-[#fafafa] rounded-xl px-6 py-4 shadow-xl">
              <button className="mx-auto bg-green-500 px-4 py-1 text-white font-semibold rounded-lg flex items-center gap-1 transition-all ease delay-75 hover:bg-green-600">
                <IonIcon icon={create} color="" />
                Update
              </button>
              <button
                onClick={() => deletePost()}
                className="mx-auto mt-2 bg-red-500 px-4 py-1 text-white font-semibold rounded-lg flex items-center gap-1 transition-all ease delay-75 hover:bg-red-600"
              >
                <IonIcon icon={trash} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {postCommentsCount > 0 && <ShowMore postId={_id} />}
    </IonCard>
  )
}

export default Thread
