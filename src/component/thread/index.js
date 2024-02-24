import { IonButton, IonCard, IonIcon, useIonToast } from "@ionic/react"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import ReplyInput from "../ReplyInput"
import {
  ShowPeopleComments,
  ThreadHeader,
  ThreadImages,
  ThreadExpand,
  ThreadFooter,
  ThreadRating,
  ThreadOptions
} from "./organism"
import { useMutation } from "@apollo/client"
import { EditPost } from "graphql/user"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useSelector } from "react-redux"
import { USER_SERVICE_GQL } from "servers/types"
import "./index.css"

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
  const [reply, setReply] = useState(false)

  const [editable, setEditable] = useState(false)
  const [numberOfComments, setNumberOfComments] = useState(1)
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

  const handleChange = (e) => {
    // for now handling change of text only
    setUpdatedData((prev) => ({ ...prev, postText: e }))
  }

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

  const renderContent = () => {
    const { postText, _id, videoURL } = thread

    // Handling for the editable state
    if (editable) {
      return (
        <div>
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
            style={{ "--ripple-color": "transparent" }}
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
        <ThreadExpand htmlText={postText} _id={_id} thread={thread} />
      </div>
    )
  }

  return (
    <>
      <IonCard className="relative  pt-4 pb-3 max-md:my-1 max-md:mx-[5px]">
        <ThreadHeader
          firstName={user?.firstName}
          lastName={user?.lastName}
          date={date}
          profilePic={user?.profilePic}
          username={user?.username}
        />
        <div className="thread_content ">
          {renderContent()}
          <ThreadRating
            academicProgramsAndDepartmentRatingm={
              academicProgramsAndDepartmentRatingm
            }
            admissionAndApplicationRating={admissionAndApplicationRating}
            careerAndAlumniResourceRating={careerAndAlumniResourceRating}
            financialAidAndScholarshipRating={financialAidAndScholarshipRating}
            studentLifeAndServiceRating={studentLifeAndServiceRating}
          />
          <ThreadImages _id={_id} images={images} />
          <ThreadFooter
            _id={_id}
            upVoteCount={upVoteCount}
            upVoted={upVoted}
            postCommentsCount={postCommentsCount}
            saved={saved}
          />
          <ReplyInput
            setReply={setReply}
            postId={_id}
            isReply={false}
            setNumberOfComments={setNumberOfComments}
            reply={reply}
          />
          <ThreadOptions
            setEditable={setEditable}
            loggedinUser={loggedinUser}
            username={user?.username}
            _id={_id}
          />
          {postCommentsCount > 0 && (
            <ShowPeopleComments
              postId={_id}
              user={user}
              isReply={false}
              postCommentsCount={postCommentsCount}
              numberOfComments={numberOfComments}
            />
          )}
        </div>
      </IonCard>
    </>
  )
}

export default Thread
