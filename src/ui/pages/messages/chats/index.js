// eslint-disable-next-line no-use-before-define
import React, { useEffect, useRef } from "react"
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
import { ellipsisHorizontal, ellipsisVertical, send } from "ionicons/icons"
import messageImg from "../../../../assets/messages.png"
import "./index.css"
import { useParams } from "react-router"
import { MESSAGING_SERVICE } from "../../../../servers/types"
import { getMessages } from "../../../../graphql/user"
import { useQuery } from "@apollo/client"
import { SkeletonMessage } from "../../../../utils/components/SkeletonMessage"
import { TypeBox } from "./typeBox"
export const MessagingStation = () => {
    const
        chatbox = useRef(null),
        { id } = useParams(),
        receipent = id,
        { loading, error, data } = useQuery(getMessages, { context: { server: MESSAGING_SERVICE } }),
        ScrollBottom = () => {
            if (chatbox.current) {
                chatbox.current.scrollTop = chatbox.current.scrollHeight
            }
        }
    React.useEffect(() => {
        ScrollBottom()
    }, [chatbox.current, chatbox])

    const [messages, setMessages] = React.useState([
        {
            id: "1",
            message: "Hello",
            userId: "1"
        },
        {
            id: "2",
            message: "How are you?",
            userId: receipent
        }
    ])

    const
     [messageInput, setMessageInput] = React.useState(""),
     HandelSubmit = async (e) => {
        e.preventDefault()
        if (messageInput) {
            const newMessage = {
                id: messages.length + 1,
                message: messageInput,
                userId: receipent
            }
            await messages.push(newMessage)
            setMessageInput("")
            ScrollBottom()
        }
    },
    MessageHistory = () => {
        return (
            <IonCard className="chats-wrapper">
                <IonCardContent className="chats-wrapper__content">
                    <IonItem mode="ios" lines="full" className="chats-header">
                        <IonAvatar slot="start">
                            <img src="https://www.svgrepo.com/show/178831/badges-money.svg" />
                        </IonAvatar>

                        <IonLabel>
                            <div className="flex justify-content-start">
                                <h2>{receipent} </h2>
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
                        {data?.getMessages?.map((item, index) => {
                            return (
                                <div key={index} className="chat-box__msg  ">
                                    <div
                                        className={` ${item.senderId === "63fd5eebff23d1aa31eba285"
                                                ? "msg-text-sent"
                                                : "msg-text-received"
                                            }`}
                                    >
                                        <p>{item.message.text}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <TypeBox receipent/>
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
    if (data) {
        return <MessageHistory />
    }
    return <DefaultMessage />

}
