import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  IonButton,
  IonCard,
  IonIcon,
  IonSlide,
  IonSlides,
  useIonToast
} from "@ionic/react"
import Upvote from "./actions/Upvote"
import Reply from "./actions/Reply"
import Save from "./actions/Save"
import ReplyInput from "../ReplyInput"
import "./index.css"
import ShowMore from "./ShowMore"
import { Avatar } from "../Avatar"
import ThreadExpand from "./ThreadExpand"
import { create, ellipsisHorizontalOutline, trash } from "ionicons/icons"
import moment from "moment"
import Rating from "./actions/Rating"

import { useMutation } from "@apollo/client"
import { useSelector } from "react-redux"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import clsx from "clsx"
import { USER_SERVICE_GQL } from "servers/types"
import { EditPost, DeletePost, GetUserPost, getNewsFeed } from "graphql/user"
import Share from "component/Share"
import ImageWithLoader from "component/Reusable/Image/ImageWithLoader"

const Thread = ({ thread }) => {
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
    postImage,
    admissionAndApplicationRating,
    financialAidAndScholarshipRating,
    academicProgramsAndDepartmentRatingm,
    studentLifeAndServiceRating,
    careerAndAlumniResourceRating
  } = thread

  const { firstName, lastName, username, picture } = thread.user || {}
  const [reply, setReply] = useState(false)
  const [profilePic, setProfilePic] = useState(picture)
  const [showOptions, setShowOptions] = useState(false)
  const [editable, setEditable] = useState(false)
  const [numberOfComments, setNumberOfComments] = useState(1)
  const BASEURL = window.location.origin
  const pathname = useLocation().pathname

  // to determine if the post is in home feed or profile
  const isHome = pathname === "/" || pathname === "/home"

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

    update: (cache, data) => {
      const cachedData = cache.readQuery(
        isHome
          ? {
              query: getNewsFeed,
              variables: {
                userId: loggedinUser._id,
                page: 0
              }
            }
          : {
              query: GetUserPost,
              variables: {
                userId: loggedinUser._id,
                page: 0
              }
            }
      )
      console.log({ cachedData })

      cache.writeQuery(
        isHome
          ? {
              query: getNewsFeed,
              variables: {
                userId: loggedinUser._id,
                page: 0
              },

              data: {
                fetchMyNewsFeed: {
                  ...cachedData.fetchMyNewsFeed,
                  ...cachedData.fetchMyNewsFeed.filter(
                    (post) => post._id !== _id
                  )
                }
              }
            }
          : {
              query: GetUserPost,
              variables: {
                userId: loggedinUser._id,
                page: 0
              },
              data: {
                getDicussionUniWall: {
                  ...cachedData.getDicussionUniWall,
                  Posts: cachedData.getDicussionUniWall.filter(
                    (post) => post._id !== _id
                  )
                }
              }
            }
      )
    },

    onCompleted: (data) => {
      console.log("delete called")
      const { deletePost } = data
      if (deletePost.success) {
        // refetch posts
        setShowOptions(false)
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
          __typename: isHome ? "PostNewsFeed" : "Post",
          id: _id
        }),
        fields: {
          postText() {
            return updatedData.postText
          }
        }
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

  // Refactored functions
  const renderHeader = () => {
    const { firstName, lastName, username, profilePic } = thread.user || {}

    return (
      <Link to={`/@/${username}`} className="px-4 max-md:px-2">
        <div className="thread-header gap-2">
          <div className="thread_profile-pic ">
            <Avatar profilePic={profilePic} username={firstName + lastName} />
          </div>
          <div className="thread_userdetails ">
            <h3 style={{ color: "#222428" }}>{firstName + " " + lastName}</h3>
            <div className="threads_username">
              <p>@{username}</p>
              <p className="threads_date">{moment(thread?.date).fromNow()}</p>
            </div>
          </div>
        </div>
      </Link>
    )
  }
  const renderContent = () => {
    const { postText, _id, videoURL } = thread

    // Handling for the editable state
    if (editable) {
      return (
        <div >
          <div className="h-auto min-h-200 mb-12 text-black relative">
            <ReactQuill
              theme="snow"
              onChange={handleChange}
              defaultValue={postText}
            />
          </div>

          <br />
          <IonButton
            fill="clear"
            className="ion-no-padding capitalize px-4 font-semibold text-black hover:bg-[#eae8e8] rounded-2xl transition ease delay-200"
            size="small"
            style={{"--ripple-color": "transparent"}}
            onClick={() => setEditable(false)}
          >
            Cancel
          </IonButton>
          <IonButton
            className="ion-no-padding capitalize font-bold px-4 text-white bg-blue-500 rounded-2xl transition ease delay-200 hover:bg-blue-600"
            fill="clear"
            size="small"
            onClick={editPost}
            style={{ "--ripple-color": "transparent" }}
          >
            Save
          </IonButton>
        </div>
      )
    }

    return (
      <div className="thread_comment">
        <ThreadExpand
          htmlText={postText}
          maxLines={5}
          _id={_id}
          thread={thread}
        />
      </div>
    )
  }
  const renderImages = () => {
    const { images, _id } = thread
    const slideOpts = {
      initialSlide: 0,
      speed: 400
    }
    if (images?.length > 0) {
      return (
        <Link to={`/thread/${_id}`} className={clsx("")}>
          <IonSlides pager={true} options={slideOpts} className="h-[360px]">
            {images.map((image, index) => (
              <IonSlide key={index}>
                <ImageWithLoader
                  src={image}
                  alt={image}
                  className={"object-contain"}
                />
              </IonSlide>
            ))}
          </IonSlides>
        </Link>
      )
    }

    return null
  }
  const renderFooter = () => {
    const { upVoteCount, postCommentsCount, upVoted, saved, _id } = thread

    return (
      <div className="thread_footer">
        <Upvote upVoteCount={upVoteCount} postId={_id} upVoted={upVoted} />
        <Reply repliesCount={postCommentsCount} setReply={setReply} />
        <Save postId={_id} saved={saved} />
        <Share
          allProps={{
            link: `${BASEURL}/thread/${_id}`,
            btnstyle: {
              width: "35px",
              height: "35px"
            },
            Iconstyle: {
              color: "gray"
            },
            showAddList: false
          }}
        />
      </div>
    )
  }
  const renderOptions = () => {
    const { _id, user } = thread
    const { username } = user || {}

    // Assuming 'loggedinUser' is the user currently logged into the app
    if (loggedinUser?.username === username) {
      return (
        <div className="absolute top-4 right-8">
          <div className="relative">
            <button onClick={() => setShowOptions((prev) => !prev)}>
              <IonIcon icon={ellipsisHorizontalOutline} className="text-2xl" />
            </button>

            {showOptions && (
              <div className="absolute w-[160px] -right-6 top-5 z-[100] bg-[#fafafa] rounded-xl px-6 py-4 shadow-xl">
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
                  onClick={() => deletePost(_id)} // Assuming 'deletePost' is a function defined to handle the deletion
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
    }
    return null
  }

  const rating = () => {
    if (
      admissionAndApplicationRating ||
      financialAidAndScholarshipRating ||
      academicProgramsAndDepartmentRatingm ||
      studentLifeAndServiceRating ||
      careerAndAlumniResourceRating
    ) {
      return (
        <div className="flex flex-col mt-3">
          <h2 className="font-medium text-blue-800 text-base">Rating</h2>{" "}
          <section className="mt-1 w-[60%] flex flex-col gap-3">
            <Rating
              label="Admission & Application"
              rating={admissionAndApplicationRating}
            />

            <Rating
              label="Financial Aid & Scholarships"
              rating={financialAidAndScholarshipRating}
            />

            <Rating
              label="Academic Programs & Department"
              rating={academicProgramsAndDepartmentRatingm}
            />

            <Rating
              label="Student Life & Services"
              rating={studentLifeAndServiceRating}
            />

            <Rating
              label="Career & Alumni Resources"
              rating={careerAndAlumniResourceRating}
            />
          </section>
        </div>
      )
    }
    return null
  }

  return (
    <IonCard className="relative pt-4 pb-6 max-md:my-1 max-md:mx-[5px]">
      {renderHeader()}
      <div className="thread_content !pl-16 pr-8 max-md:pr-3">
        {renderContent()}
        {rating()}
        {renderImages()}
        {renderFooter()}
        {reply && (
          <ReplyInput
            setReply={setReply}
            postId={_id}
            isReply={false}
            setNumberOfComments={setNumberOfComments}
          />
        )}
        {renderOptions()}
        {postCommentsCount > 0 && (
          <ShowMore
            postId={_id}
            user={user}
            isReply={false}
            postCommentsCount={postCommentsCount}
            numberOfComments={numberOfComments}
          />
        )}
      </div>
    </IonCard>
  )
}

export default Thread
