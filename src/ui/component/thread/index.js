import { useState } from "react"
import { Link } from "react-router-dom"
import { IonButton, IonCard, IonIcon, useIonToast } from "@ionic/react"
import Upvote from "./actions/Upvote"
import Reply from "./actions/Reply"
import Save from "./actions/Save"
import ReplyInput from "../ReplyInput"
import "./index.css"
import ShowMore from "./ShowMore"
import { Avatar } from "../Avatar"
import { getImage } from "../../../servers/s3.configs"
import ThreadExpand from "./ThreadExpand"
import { create, ellipsisHorizontalOutline, trash } from "ionicons/icons"
import moment from "moment"

import { useMutation } from "@apollo/client"
import { DeletePost, EditPost } from "../../../graphql/user"
import { USER_SERVICE_GQL } from "../../../servers/types"
import { useSelector } from "react-redux"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import clsx from "clsx"

const Thread = ({ thread, refetch }) => {
  const [present, dismiss] = useIonToast()
  const {
    _id,
    date,
    postText,
    upVoteCount,
    postCommentsCount,
    upVoted,
    images,
    saved,
    user,
    tags,
    postImage
  } = thread

  const { firstName, lastName, username, picture } = thread.user || {}
  const [reply, setReply] = useState(false)
  const [profilePic, setProfilePic] = useState(picture)
  const [showOptions, setShowOptions] = useState(false)
  const [editable, setEditable] = useState(false)
  const [numberOfComments, setNumberOfComments] = useState(1)

  const [updatedData, setUpdatedData] = useState({
    postText,
    // images,
    postId: _id
  })

  // useEffect(() => {
  //   getImage("user", image, setImage)
  //   getImage("user", profilePic, setProfilePic)
  // }, [profilePic])
  const { user: loggedinUser } = useSelector((state) => state.userProfile)

  // delete thread
  const [deletePost] = useMutation(DeletePost, {
    context: { server: USER_SERVICE_GQL },

    variables: {
      postId: _id
    },

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

    update: (cache, { data }) => {
      cache.modify({
        id: cache.identify({
          __typename: "Post",
          id: _id
        }),
        fields: {
          postText() {
            return updatedData.postText
          }
        },
        broadcast: false
      })
    },
    onCompleted: (data) => {
      const { editPost } = data

      if (editPost?.status?.success) {
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
          message: editPost.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
      }
    }
  })

  return (
    <IonCard className=" relative pt-4 pb-6">
      <Link to={`/@/${username}`} className="px-4">
        <div className="thread-header">
          <div className="thread_profile-pic">
            <Avatar profilePic={profilePic} username={firstName + lastName} />
          </div>
          <div className="thread_userdetails">
            <h3 className="" style={{ color: "#222428" }}>
              {firstName + " " + lastName}
            </h3>
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
        <Link to={`/thread/${_id}`} className={clsx("  flex")}>
          {images?.length > 0 && (
            <>
              <img
                src={images[0]}
                alt="images"
                className={clsx(
                  " object-cover",
                  images?.length > 1
                    ? "w-1/2"
                    : "w-full max-w-[500px] shadow-md"
                )}
              />

              {images?.length > 1 && (
                <div className="w-1/2  relative">
                  <img
                    src={images[1]}
                    alt="images"
                    className="shrink-0   object-cover w-max"
                  />
                  <div className="absolute grid place-content-center  bg-neutral-950 z-10 bg-opacity-40 top-0 left-0 right-0 bottom-0 w-full h-full ">
                    <h3 className="text-neutral-50 font-semibold text-2xl">
                      {" "}
                      +{images?.length - 1}
                    </h3>
                  </div>
                </div>
              )}
            </>
          )}
        </Link>
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
        <ReplyInput
          setReply={setReply}
          postId={_id}
          isReply={false}
          setNumberOfComments={setNumberOfComments}
        />
      )}

      {/* check if the post is that of the logged in user, then only show options to
      delete and update */}
      {loggedinUser?.username === thread?.user?.username && (
        <div className="absolute top-4 right-8">
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
      {postCommentsCount > 0 && (
        <ShowMore
          postId={_id}
          user={user}
          isReply={false}
          postCommentsCount={postCommentsCount}
          numberOfComments={numberOfComments}
        />
      )}
    </IonCard>
  )
}

export default Thread
