import { IonButton, IonCard, IonIcon, useIonToast } from "@ionic/react"
import { useState } from "react"
import ReplyInput from "../ReplyInput"
import {
  ShowPeopleComments,
  ThreadHeader,
  ThreadImages,
  ThreadExpand,
  ThreadFooter,
  ThreadRating,
  ThreadOptions,
  ThreadEditable
} from "./organism"
import { useSelector } from "react-redux"
import "./index.css"

const Thread = ({ thread }) => {
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
  const { user: loggedinUser } = useSelector((state) => state.userProfile)

  // useEffect(() => {
  //   getImage("user", image, setImage)
  //   getImage("user", profilePic, setProfilePic)
  // }, [profilePic])

  const renderContent = () => {
    if (editable) {
      return (
        <ThreadEditable
          _id={_id}
          postText={postText}
          setEditable={setEditable}
        />
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
        <div className="px-4">
          <ThreadHeader
            firstName={user?.firstName}
            lastName={user?.lastName}
            date={date}
            profilePic={user?.profilePic}
            username={user?.username}
          />
        </div>

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
            setReply={setReply}
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
