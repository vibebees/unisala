// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react"
import CommentCard from "../../university/tabDetails/Discussion/CommentCard"
import {
    IonAvatar,
    IonGrid,
    IonIcon,
    IonCol,
    IonRow,
    IonText,
    IonTextarea,
    IonButtons
} from "@ionic/react"
import {
    arrowRedoCircle,
    arrowUpCircle,
    heart,
    sendOutline
} from "ionicons/icons"
import "../Home.css"
import DelatePop from "../DeletePop"
import { useLazyQuery, useMutation } from "@apollo/client"
import { UpVote, AddComment, GetCommentList } from "../../../../graphql/user"
import VoteModal from "../../../component/thread/VoteModal"
const Thread = ({ commentlist, id }) => {
    const [commentList, setCommentList] = React.useState(commentlist)
    const [addComment] =
        useMutation(AddComment)
    const [comment, setComment] = React.useState(false)
    useEffect(() => {
        setTimeout(() => {
            setComment(true)
        }, 1000)
    }, [])
    const HandleReply = (reply, setIsReply, comment, i) => {
        addComment({
            variables: {
                commentText: reply,
                postId: id,
                parentId: comment?._id
            }
        })
        comment?.commentReply?.push({
            commentText: reply,
            commentUser: "user",
            commentDate: "24 jun 2022",
            commentLove: false,
            commentLoveCount: 0,
            commentReply: []
        })
        setCommentList([...commentList])
        setIsReply(false)
    }
    const HandleDelete = (comments) => {
        for (const key in comments) {
            delete comments[key]
        }
        setCommentList([...commentList])
    }

    const input = React.useRef()
    const [reply, setReply] = React.useState("")

    return (
        <div
            style={{
                marginBottom: "20px",
                width: "100%"
            }}
        >
            <div>
                {
                    <Comment
                        comment={commentList}
                        setCommentList={setCommentList}
                        commentList={[commentList]}
                        addComment={addComment}
                        id={id}
                        isComment={true}
                        postId={id}
                        HandleReply={HandleReply}
                        HandleDelete={HandleDelete}
                    />
                }
            </div>
        </div>
    )
}

// eslint-disable-next-line
export const Comment = ({
    comment,
    i,
    id,
    postId,
    isComment,
    addComment,
    HandleReply,
    HandleDelete,
    commentList
}) => {
    const input = React.useRef()
    const replyDiv = React.useRef()
    const [reply, setReply] = React.useState("")
    const [isReply, setIsReply] = React.useState(false)
    function renameKeys(obj, newKeys) {
        const keyValues = Object.keys(obj).map((key) => {
            const newKey = newKeys[key] || key
            return { [newKey]: obj[key] }
        })
        return Object.assign({}, ...keyValues)
    }
    const newKeys = {
        date: "commentDate",
        postText: "commentText",
        postImage: "commentImage"
    }
    const [newComment] = React.useState(renameKeys(comment, newKeys))
    const [isOpen, setIsOpen] = React.useState(false)
    const [more, setMore] = React.useState(false)
    const [getComment, commentLists] = useLazyQuery(
        GetCommentList(postId, !isComment ? comment?._id : "")
    )

    useEffect(() => {
        more && getComment()
    }, [more])

    const {
        commentText,
        commentDate,
        upVoteCount,
        commentLove,
        commentimage,
        postCommentsCount,
        _id
    } = newComment
    const [loves, setLoves] = React.useState(commentLove)
    const [lovecount, setLovecount] = React.useState(upVoteCount)
    useEffect(() => {
        setLovecount(upVoteCount)
    }, [upVoteCount])
    const [mar, setMar] = React.useState(
        commentList?.some((item) => {
            return item?.commentReply?.some((i) => {
                return item === newComment || i === newComment
            })
        })
    )
    useEffect(() => {
        for (var i = 0; i < commentList.length; i++) {
            if (
                commentList[i]?.commentReply?.commentText ===
                newComment?.commentText
            ) {
                setMar(true)
            }
        }
    }, [commentList])
    const [device, setDevice] = React.useState("")
    const [isThread, setIsThread] = React.useState(true)
    const [delPop, setDelPop] = React.useState(false)
    const [upVote, { data, loading, error }] = useMutation(UpVote)

    useEffect(() => {
        var platform = ["Android", "Win32", "iOS"]

        for (var i = 0; i < platform.length; i++) {
            if (navigator.platform.indexOf(platform[i]) > -1) {
                setDevice(platform[i])
                return platform[i]
            }
        }
    }, [])

    useEffect(() => {
        if (replyDiv?.current?.offsetWidth < 300 + 25 && device === "iOS") {
            setIsThread(false)
        }
    }, [replyDiv.current])

    const HandelReplySubmit = (e) => {
        e.preventDefault()
        addComment({
            variables: {
                commentText: reply,
                postId: comment?._id
            }
        })
        HandleReply(reply, setIsReply, newComment, i)
        setReply("")
    }

    return newComment.commentText ? (
        <div
            ref={replyDiv}
            style={{
                paddingLeft:
                    commentLists[0]?.commentText !== commentText
                        ? "25px"
                        : "0px",
                paddingBottom: "10px",
                position: "relative",
                width: "100%"
                // flexShrink: "0",
                // minWidth: "400px",
                // marginTop: "20px"
                // marginBottom: "20px",
                // display: "flex",
                // gap: "10px"
            }}
        >
            <DelatePop
                delPop={delPop}
                HandleDelete={HandleDelete}
                setDelPop={setDelPop}
                comment={newComment}
                index={i}
            />
            <div
                style={{
                    position: "relative"
                }}
            >
                {!commentimage && isThread && (
                    <div
                        onClick={() => {
                            setMore(!more)
                        }}
                        className="reply-thread"
                    >
                        <div></div>
                    </div>
                )}
                <CommentCard
                    commentDate={commentDate || ""}
                    commentLove={commentLove || ""}
                    commentLoveCount={upVoteCount || ""}
                    commentText={commentText || ""}
                    postId={postId || ""}
                    commentUser={
                        comment?.user?.firstName +
                            " " +
                            comment?.user?.lastName || ""
                    }
                    commentimage={commentimage || ""}
                />

                <IonGrid
                    style={{
                        marginLeft: !commentimage && "35px",
                        borderBottom: commentimage && "1px solid #c4c4c4",
                        borderTop: commentimage && "1px solid #c4c4c4",
                        marginBottom: commentimage && more && "10px",
                        marginTop: "5px"
                    }}
                >
                    <p
                        onClick={() => {
                            setIsOpen(true)
                        }}
                        className="voter-number"
                    >
                        {postCommentsCount} votes
                    </p>
                    <br />
                    <VoteModal
                        isOpen={isOpen}
                        _id={_id}
                        setIsOpen={setIsOpen}
                    />
                    <IonRow>
                        <IonCol
                            size={!commentimage ? "auto" : "4"}
                            onClick={() => {
                                upVote({
                                    variables: {
                                        postId: _id
                                    }
                                })
                                loves
                                    ? setLovecount(lovecount - 1)
                                    : setLovecount(lovecount + 1)
                                setLoves(!loves)
                            }}
                            style={{
                                margin: 0,
                                padding: "0px 15px"
                            }}
                            className="reply-res"
                            lines="none"
                        >
                            <IonButtons className="post-button">
                                <IonIcon
                                    color="medium"
                                    style={{
                                        margin: "0px",
                                        transition: "all 0.3s ease-in-out",
                                        fontSize: "23px"
                                    }}
                                    icon={arrowUpCircle}
                                />
                                <IonText style={{ marginLeft: "5px" }}>
                                    <p
                                        style={{
                                            margin: "0",
                                            padding: "0"
                                        }}
                                    >
                                        {loves ? lovecount : "vote"}
                                    </p>
                                </IonText>
                            </IonButtons>
                        </IonCol>
                        <IonCol
                            size={!commentimage ? "auto" : "4"}
                            style={{
                                margin: 0,
                                padding: "5px 15px"
                            }}
                            onClick={() => {
                                setIsReply(!isReply)
                                setMore(true)
                            }}
                            className="reply-res"
                            lines="none"
                        >
                            <IonButtons className="post-button">
                                <IonIcon
                                    color="medium"
                                    style={{
                                        margin: "0px",
                                        fontSize: "23px"
                                    }}
                                    icon={arrowRedoCircle}
                                />
                                <IonText style={{ marginLeft: "5px" }}>
                                    <p
                                        style={{
                                            margin: "0px",
                                            padding: "0px"
                                        }}
                                    >
                                        Reply
                                    </p>
                                </IonText>
                            </IonButtons>
                        </IonCol>
                        <IonCol
                            size={!commentimage ? "auto" : "4"}
                            style={{
                                margin: 0,
                                padding: "5px 15px"
                            }}
                            // onClick={() => {
                            //     setDelPop(true)
                            //     // HandleDelete(comment, i)
                            // }}
                            className="reply-res"
                            lines="none"
                        >
                            <IonButtons className="post-button">
                                <IonIcon
                                    color="medium"
                                    style={{
                                        margin: "0px",
                                        fontSize: "23px"
                                    }}
                                    icon={heart}
                                />
                                <IonText style={{ marginLeft: "5px" }}>
                                    <p
                                        style={{
                                            margin: "0",
                                            padding: "0"
                                        }}
                                    >
                                        save
                                    </p>
                                </IonText>
                            </IonButtons>
                        </IonCol>

                        {/* <p
                        style={{
                            paddingLeft: "20px",
                            color: "#428cff",
                            cursor: "pointer",
                            textDecoration: "underline"
                        }}
                        onClick={() => {
                            setIsReply(!isReply)
                        }}
                    >
                        Reply
                    </p>
                    <p
                        style={{
                            paddingLeft: "20px",
                            color: "#428cff",
                            cursor: "pointer",
                            textDecoration: "underline"
                        }}
                        onClick={() => {
                            HandleDelete(comment, i)
                        }}
                    >
                        Delete
                    </p> */}
                    </IonRow>
                </IonGrid>
                {/* <br /> */}

                {isReply && (
                    <form
                        onSubmit={HandelReplySubmit}
                        style={{
                            display: "flex",
                            width: "100%",
                            alignItems: "center",
                            paddingLeft: "10px",
                            marginBottom: "10px"
                            // marggin: "10px",
                        }}
                    >
                        <div
                            style={{
                                padding: "10px 0px",
                                borderRadius: "50%",
                                backgroundColor: "#fff",
                                position: "relative",
                                zIndex: "2"
                            }}
                        >
                            <IonAvatar
                                style={{
                                    alignSelf: "center",
                                    width: "40px",
                                    height: "40px",
                                    marginRight: "10px"
                                }}
                            >
                                <img
                                    style={{
                                        width: "40px",
                                        height: "40px"
                                    }}
                                    id="ReviewImg"
                                    src="https://vz.cnwimg.com/thumb-1200x/wp-content/uploads/2010/10/Chris-Evans-e1587513440370.jpg"
                                />
                            </IonAvatar>
                        </div>

                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px"
                            }}
                            id="ReviewText_div"
                        >
                            <IonTextarea
                                ref={input}
                                onIonChange={(e) => {
                                    setReply(e.target.value)
                                }}
                                id="ReviewText"
                                style={{
                                    border: "1px solid #c4c4c4",
                                    borderRadius: "5px",
                                    margin: "0px"
                                }}
                                type="text"
                                className="border border-gray-400"
                                placeholder="Write a review"
                            />
                            <div
                                onClick={() => {
                                    HandleReply(
                                        reply,
                                        setIsReply,
                                        newComment,
                                        i
                                    )
                                    input.current.value = ""
                                    setMore(true)
                                }}
                                style={{
                                    cursor: "pointer",
                                    color: "#428cff",
                                    fontSize: "25px",
                                    fontWeight: "bold"
                                }}
                            >
                                <IonIcon icon={sendOutline} />
                            </div>
                        </div>
                    </form>
                )}

                {/* <div
                style={{
                    border: "1px solid #c4c4c4"
                }}
            ></div> */}

                {/* <br /> */}

                {more &&
                    Array.isArray(commentLists?.data?.commentList?.comments) &&
                    commentLists?.data?.commentList?.comments.map(
                        (reply, i) => {
                            return (
                                <Comment
                                    HandleReply={HandleReply}
                                    HandleDelete={HandleDelete}
                                    comment={reply}
                                    key={i}
                                    postId={postId}
                                    isComment={false}
                                    id={reply?._id}
                                    i={i}
                                    commentList={
                                        commentLists?.data?.commentList
                                            ?.comments
                                    }
                                />
                            )
                        }
                    )}
            </div>
        </div>
    ) : (
        <div></div>
    )
}

export default Thread
