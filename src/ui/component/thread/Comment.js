import Upvote from "./actions/Upvote"
import Reply from "./actions/Reply"
import Save from "./actions/Save"
import { useState } from "react"
import ReplyInput from "../ReplyInput"
import ShowMore from "./ShowMore"
import "./index.css"

function Comment({ comment, postId }) {
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
    saved
  } = comment
  const [reply, setReply] = useState(false)

  return (
    <div className="comment_thread">
      <div className="thread-header">
        <div className="thread_profile-pic">
          <img src="https://picsum.photos/200/300" alt="user" />
        </div>
        <div className="thread_userdetails">
          <h3>{firstName + " " + lastName}</h3>
          <div className="threads_username">
            <p>@{username}</p>
            <p className="threads_date">{date.toString().slice(0, 10)}</p>
          </div>
        </div>
      </div>

      <div className="thread_content">
        <div className="thread_comment">
          <p>{commentText}</p>
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

      {repliesCount > 0 && <ShowMore postId={postId} parentId={_id} />}
    </div>
  )
}

export default Comment
