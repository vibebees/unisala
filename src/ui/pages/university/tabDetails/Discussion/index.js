// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react"
import { useMutation } from "@apollo/client"
import {
    IonAvatar,
    IonCard,
    IonCardContent, IonCol, IonGrid,
    IonIcon, IonRow,
    IonText,
    IonTextarea
} from "@ionic/react"
import {
    arrowRedoCircle,
    arrowUpCircle,
    sendOutline,
    trash
} from "ionicons/icons"
import { AddComment, UpVote } from "../../../../../graphql/user"
import CommentCard from "./CommentCard"
import "./Threads.css"
const CommentSec = ({ threads }) => {
    const [commentList, setCommentList] = React.useState(threads)
    useEffect(() => {
        setCommentList(threads)
    }, [threads])
    const [addComment] =
        useMutation(AddComment)
    const [comment, setComment] = React.useState(false)
    useEffect(() => {
        setTimeout(() => {
            setComment(true)
        }, 1000)
    }, [])

    const HandleReply = (reply, setIsReply, comment) => {
        addComment({
            variables: {
                commentText: reply,
                postId: comment?._id
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
        <IonCard
            style={{
                marginBottom: "20px"
            }}
        >
            <IonCardContent
                style={{
                    borderBottom: "1px solid #C4C4C4"
                }}
            >
                <h1>Threads</h1>
            </IonCardContent>
            <div
                style={{
                    padding: "1%"
                }}
            >
                {/* <IonGrid
                    style={{
                        margin: "0px",
                        padding: "0px"
                    }}
                >
                    <IonRow>
                        <p
                            style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                alignSelf: "center"
                            }}
                        >
                            Sort by:
                        </p>
                        {[
                            "admission",
                            "fee",
                            "libraries",
                            "clubs",
                            "courses",
                            "faculty",
                            "events",
                            "others"
                        ].map((item, i) => (
                            <div key={i} className="sort-tag">
                                <p
                                    style={{
                                        margin: "0"
                                    }}
                                >
                                    {item}
                                </p>
                            </div>
                        ))}
                    </IonRow>
                </IonGrid> */}
                {comment &&
                    Array.isArray(commentList) &&
                    commentList.map((comment, index) => {
                        return (
                            <Comment
                                comment={comment}
                                setCommentList={setCommentList}
                                commentList={commentList}
                                key={index}
                                i={index}
                                HandleReply={HandleReply}
                                HandleDelete={HandleDelete}
                            />
                        )
                    })}
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        setCommentList([
                            ...commentList,
                            {
                                commentText: reply,
                                commentUser: "user",
                                commentDate: "24 jun 2022",
                                commentLove: false,
                                commentLoveCount: 0,
                                commentReply: []
                            }
                        ])
                        setReply("")
                    }}
                    style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        margin: "10px"
                        // marggin: "10px",
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
                            src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                        />
                    </IonAvatar>
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
                            value={reply}
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
                        <button
                            type="submit"
                            style={{
                                cursor: "pointer",
                                color: "#428cff",
                                fontSize: "25px",
                                fontWeight: "bold",
                                backgroundColor: "transparent"
                            }}
                        >
                            <IonIcon icon={sendOutline} />
                        </button>
                    </div>
                </form>
            </div>
        </IonCard>
    )
}

export const Comment = ({
    comment,
    i,
    HandleReply,
    HandleDelete,
    commentList
}) => {
    const [upVote] = useMutation(UpVote)
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
        postDate: "commentDate",
        postText: "commentText",
        postImage: "commentImage"
    }
    const [newComment] = React.useState(
        renameKeys(comment, newKeys)
    )
    const {
        commentText,
        commentUser,
        commentDate,
        commentLove,
        commentLoveCount,
        commentimage,
        _id
    } = newComment
    const [loves, setLoves] = React.useState(commentLove)
    const [lovecount, setLovecount] = React.useState(commentLoveCount)
    const [more, setMore] = React.useState(false)
    const [setMar] = React.useState(
        commentList?.some((item) => {
            return item === comment
        })
    )
    useEffect(() => {
        for (const comment in commentList) {
            if (commentList[comment] === comment) {
                setMar(true)
            }
        }
    }, [commentList])
    return newComment.userId ? (
        <div
            ref={replyDiv}
            style={{
                paddingLeft: "25px",
                overflow: "hidden"
                // flexShrink: "0",
                // minWidth: "400px",
                // marginTop: "20px"
                // marginBottom: "20px",
                // display: "flex",
                // gap: "10px"
            }}
        >
            <div
                style={{
                    position: "relative"
                }}
            >
                {!commentimage && (
                    <div
                        onClick={() => {
                            setMore(!more)
                        }}
                        className="reply-thread"
                    >
                        <div></div>
                    </div>
                )}
                <div>
                    <CommentCard
                        commentDate={commentDate}
                        commentLove={commentLove}
                        commentLoveCount={commentLoveCount}
                        commentText={commentText}
                        commentUser={commentUser}
                        commentimage={commentimage}
                        more={more}
                        setMore={setMore}
                    />
                </div>

                <IonGrid
                    style={{
                        marginLeft: !commentimage && "35px",

                        padding: 0
                    }}
                >
                    <IonRow
                        style={{
                            gap: 0,
                            margin: 0,
                            padding: 0
                        }}
                    >
                        <IonCol
                            size="auto"
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
                                padding: "10px 5px"
                            }}
                            className="reply-res"
                            lines="none"
                        >
                            <IonIcon
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
                                        margin: "0"
                                    }}
                                >
                                    {loves ? lovecount : "vote"}
                                </p>
                            </IonText>
                        </IonCol>
                        <IonCol
                            size="auto"
                            style={{
                                margin: 0,
                                padding: "10px 5px"
                            }}
                            onClick={() => {
                                setIsReply(!isReply)
                                setMore(true)
                            }}
                            className="reply-res"
                            lines="none"
                        >
                            <IonIcon
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
                        </IonCol>
                        <IonCol
                            size="auto"
                            style={{
                                margin: 0,
                                padding: "10px 5px"
                            }}
                            onClick={() => {
                                HandleDelete(newComment, i)
                            }}
                            className="reply-res"
                            lines="none"
                        >
                            <IonIcon
                                style={{
                                    margin: "0px",
                                    fontSize: "23px"
                                }}
                                icon={trash}
                            />
                            <IonText style={{ marginLeft: "5px" }}>
                                <p
                                    style={{
                                        margin: "0"
                                    }}
                                >
                                    Delete
                                </p>
                            </IonText>
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
                        onSubmit={(e) => {
                            e.preventDefault()
                            HandleReply(reply, setIsReply, newComment, i)
                            setReply("")
                        }}
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
                                    src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
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
                                value={reply}
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
                                    HandleReply(reply, setIsReply, comment, i)
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
                {!more && !commentimage && comment?.commentReply?.length > 0 && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center"
                        }}
                    >
                        <IonText
                            onClick={() => {
                                setMore(!more)
                            }}
                        >
                            <p className="more-reply">load more</p>
                        </IonText>
                    </div>
                )}

                {/* <div
                style={{
                    border: "1px solid #c4c4c4"
                }}
            ></div> */}

                {/* <br /> */}

                {more &&
                    Array.isArray(comment?.commentReply) &&
                    comment.commentReply.map((reply, i) => {
                        return (
                            <Comment
                                commentList={commentList}
                                HandleReply={HandleReply}
                                HandleDelete={HandleDelete}
                                comment={reply}
                                key={i}
                                i={i}
                            />
                        )
                    })}
            </div>
        </div>
    ) : (
        <div></div>
    )
}

export default CommentSec
