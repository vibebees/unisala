// eslint-disable-next-line no-use-before-define
import React, { useEffect, useRef, useState } from "react"
import {
    IonCard,
    IonItem,
    IonAvatar,
    IonLabel,
    IonButton,
    IonCardContent,
    IonInput,
    IonIcon
} from "@ionic/react"
import messageImg from "../../../../assets/messages.png"
import "./index.css"
import { useParams } from "react-router"
import { MESSAGE_SERVICE_GQL } from "../../../../servers/types"
import { getMessages } from "../../../../graphql/user"
import { useQuery } from "@apollo/client"
import { SkeletonMessage } from "../../../../utils/components/SkeletonMessage"
import { TypeBox } from "./typeBox"
import { useSelector } from "react-redux"
import { MessageItem } from "./messageItem"
export const MessagingStation = () => {
    const
        chatbox = useRef(null),
        { username } = useParams(),
        myInfo = useSelector((state) => state?.userProfile?.user),
        { loading, error, data } = useQuery(getMessages, {
            variables: {
                // currentUser
                id: myInfo._id
            },
            context: { server: MESSAGE_SERVICE_GQL }
        }),
        ScrollBottom = () => {
            if (chatbox.current) {
                chatbox.current.scrollTop = chatbox.current.scrollHeight
            }
        },
        { messagingTo } = useSelector((state) => state?.userActivity),
        userFriendId = messagingTo?._id,
        [messages, setMessages] = useState([])
    useEffect(() => {
        setMessages(data?.getMessages.filter((item) => item.pairs.includes(userFriendId))[0]?.messages)
    }, [username])
    useEffect(() => {}, [messages])

    useEffect(() => {
        ScrollBottom()
    }, [chatbox.current, chatbox])

    const MessageHistory = () => {
        console.log("messages", messages)
        return (
            <IonCard className="chats-wrapper">
                <IonCardContent className="chats-wrapper__content">
                    <IonItem mode="ios" lines="full" className="chats-header">
                        <IonAvatar slot="start">
                            <img src="https://www.svgrepo.com/show/178831/badges-money.svg" />
                        </IonAvatar>

                        <IonLabel>
                            <div className="flex justify-content-start">
                                <h2>{username} </h2>
                                <img
                                    src="https://www.svgrepo.com/show/178831/badges-money.svg"
                                    alt=""
                                    width={20}
                                />
                            </div>
                            <p>university</p>
                        </IonLabel>
                        <IonButton mode="ios" size="default">
                            View Profile
                        </IonButton>
                    </IonItem>
                    <div ref={chatbox} className="chat-box">

                        {userFriendId}
                        <div></div>
                        {
                            messages?.map((item, index) => {
                                return (
                                    <div key={index} className="chat-box__msg  ">
                                        <div
                                            className={` ${item.senderId === "63fd5eebff23d1aa31eba285"
                                                ? "msg-text-sent"
                                                : "msg-text-received"
                                                }`}
                                        >
                                            <p>{item?.message?.text}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        {/* {messages?.map((item, index) => <MessageItem key = {index} item = {item} />)} */}
                    </div>
                    <TypeBox username />
                </IonCardContent>
            </IonCard>
        )
    },
        DefaultMessage = () => {
            return (
                <IonCard className="chats-wrapper">
                    <IonCardContent className="chats-wrapper__content chats-title">
                        <img src={messageImg} />
                        <h2>Chat with your connections!</h2>
                        <p>Start chatting</p>
                    </IonCardContent>
                </IonCard>
            )
        }
    if (loading) return <SkeletonMessage />
    return <MessageHistory />
    // return <DefaultMessage />

}
