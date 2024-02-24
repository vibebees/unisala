import React from "react"
import { IonButtons } from "@ionic/react"
import { Reply, Save, Upvote } from "../actions"
import Share from "component/Share"

const ThreadFooter = ({
  upVoteCount,
  upVoted,
  _id,
  setReply,
  postCommentsCount,
  saved
}) => {
  const BASEURL = window.location.origin
  return (
    <div className="thread_footer mx-9 ">
      <Upvote upVoteCount={upVoteCount} postId={_id} upVoted={upVoted} />
      <Reply repliesCount={postCommentsCount} setReply={setReply} />
      <Save postId={_id} saved={saved} />
      <IonButtons className="post-button w-full h-full max-md:scale-75">
        <Share
          allProps={{
            link: `${BASEURL}/thread/${_id}`,
            btnstyle: {
              width: "55px",
              height: "55px"
            },
            Iconstyle: {
              color: "gray"
            },
            showAddList: false
          }}
        />
      </IonButtons>
    </div>
  )
}

export default ThreadFooter
