import { useEffect, useState } from "react"
import { IonCard } from "@ionic/react"
import Upvote from "./actions/Upvote"
import Reply from "./actions/Reply"
import Save from "./actions/Save"
import ReplyInput from "../ReplyInput"
import "./index.css"
import ShowMore from "./ShowMore"
import Avatar from "../Avatar"
import { Link } from "react-router-dom"
import { imageAccess, S3_BUCKET } from "../../../servers/endpoints"
import { myS3Bucket } from "../../../utils/aws"

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
  const [imageData, setImageData] = useState(null)
  const profilePic = picture && imageAccess + picture

  // useEffect(() => {
  //   // Specify the file key of the image you want to retrieve
  //   const params = { Bucket: S3_BUCKET, Key: postImage }

  //   myS3Bucket.getObject(params, (err, data) => {
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       // Set the retrieved image data in state
  //       setImageData(data.Body)
  //     }
  //   })
  // }, [])

  return (
    <IonCard className="thread">
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
          <p>{postText}</p>
        </div>
        <div className="thread_comment">
          {postImage && (
            <img src={imageAccess + postImage} className="post-image-preview" />
          )}
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
