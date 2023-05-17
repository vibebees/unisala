import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { IonCard } from "@ionic/react"
import Upvote from "./actions/Upvote"
import Reply from "./actions/Reply"
import Save from "./actions/Save"
import ReplyInput from "../ReplyInput"
import "./index.css"
import ShowMore from "./ShowMore"
import { Avatar } from "../Avatar"
import { imageAccess } from "../../../servers/endpoints"
import { getImage } from "../../../servers/s3.configs"

const Thread = ({ thread }) => {
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

  useEffect(() => {
    getImage("user", image, setImage)
    getImage("user", profilePic, setProfilePic)
  }, [profilePic])
  return (
    <IonCard className="thread">
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
        <div className="thread_image">
          {postImage && <img src={image} />}
        </div>
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

      {postCommentsCount > 0 && <ShowMore postId={_id} />}
    </IonCard>
  )
}

export default Thread
