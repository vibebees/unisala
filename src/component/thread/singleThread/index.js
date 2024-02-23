import React, {useState} from "react"
import {IonButton, IonCard, useIonToast} from "@ionic/react"
import Upvote from "../actions/Upvote"
import Reply from "../actions/Reply"
import Save from "../actions/Save"
import ReplyInput from "../../ReplyInput"
import ShowPeopleComments from "../ShowPeopleComments"
import {Avatar} from "../../Avatar"
import ThreadExpand from "../ThreadExpand"
import {UserHeader} from "./molecules"
import {ThreadContent} from "./organisms"
import ImageCollage from "../ImageCollages"

const SingleThread = ({thread, refetch}) => {
    const {
        _id = "",
        date = new Date(),
        postText = "",
        admissionAndApplicationRating = 0,
        upVoteCount = 0,
        comments = [],
        postCommentsCount = 0,
        upVoted,
        postImage = "",
        images = [],
        saved,
        user = {}
    } = thread || {},
        {
            firstName = "",
            lastName = "",
            username = "",
            picture = ""
        } = user || {},
        props = {...user, ...thread},
        [reply, setReply] = useState(false),
        // reply = false,
        // setReply = () => {},
        [profilePic, setProfilePic] = useState(picture),
        [image, setImage] = useState(postImage),
        [showOptions, setShowOptions] = useState(false),
        [editable, setEditable] = useState(false),
        [singlePost, setSinglePost] = useState(true),
        [present, dismiss] = useIonToast(),
        handleEditChange = (e) => {
            // setEditText(e.target.value)
        }

    const submitEdit = () => {
        // Assuming you have a function to submit the edited text
        // Update the thread post text here and then...
        setEditable(false) // Turn off edit mode
        present({
            message: "Post updated successfully.",
            duration: 2000,
            color: "success"
        })
        refetch() // Optionally refetch thread data if needed
    }

    if (!thread) return null
    const threadContent = () => {
        return (<div className="thread_comment">
            {editable ? (
                <div>
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
                        Cancelss
                    </IonButton>
                    <IonButton
                        className=" ion-no-padding capitalize font-bold px-4 text-white bg-blue-500 rounded-2xl transition ease delay-200 hover:bg-blue-600"
                        fill="clear"
                        size="small"
                        //   onClick={editPost}
                        style={{
                            "--ripple-color": "transparent"
                        }}
                    >
                        Save
                    </IonButton>
                </div>
            ) : (
                <>
                    <ThreadExpand
                        htmlText={postText}
                        maxLines={8}
                        _id={_id}
                        thread={thread}
                    />
                    {images.length > 0 && <ImageCollage images={images} />}
                </>
            )}
        </div>)
    }
    const actions = () => {
        return (
            <div className="thread_footer">
                <Upvote
                    upVoteCount={upVoteCount}
                    postId={_id}
                    upVoted={upVoted}
                    isReply={false}
                />
                <Reply repliesCount={postCommentsCount} setReply={setReply} reply />
                <Save postId={_id} saved={saved} thread={thread} />
            </div>
        )
    }
    const post = () => {
        return (
            <div className="thread_content !pl-16 pr-8">
                {threadContent()}
                {actions()}
            </div>
        )
    }
    return (

        <div className="max-w-2xl w-full mx-auto mb-10">
            <IonCard className="relative mb-0 pt-4 pb-6">
                <UserHeader props={props} />
                {post()}
                <ReplyInput
                    setReply={setReply}
                    postId={_id}
                    isReply={false}
                    singlePost={singlePost}
                    reply={reply}
                />

                 {/* other people's replies */}
                <ShowPeopleComments postId={thread._id} />
            </IonCard>
        </div>
    )
}

export default SingleThread
