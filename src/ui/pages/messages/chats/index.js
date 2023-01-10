// eslint-disable-next-line no-use-before-define
import React, { useRef } from "react"
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
import { useLocation } from "react-router"

const index = ({ chatList }) => {
    const chatbox = useRef(null)
    const chatUserId = useLocation().hash

    const ScrollBottom = () => {
        if (chatbox.current) {
            chatbox.current.scrollTop = chatbox.current.scrollHeight
        }
    }

    React.useEffect(() => {
        ScrollBottom()
    }, [chatList, chatbox.current, chatbox])

    const [messages, setMessages] = React.useState([
        {
            id: "1",
            message: "Hello",
            userId: "1"
        },
        {
            id: "2",
            message: "How are you?",
            userId: chatUserId
        },
        {
            id: "3",
            message: "I am fine",
            userId: "1"
        },
        {
            id: "4",
            message: "What about you?",
            userId: chatUserId
        },
        {
            id: "5",
            message:
                "Why drag something out when you could get it done in one fell swoop?",
            userId: "1"
        },
        {
            id: "6",
            message:
                "A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.",
            userId: chatUserId
        },
        {
            id: "7",
            message:
                "Why drag something out when you could get it done in one fell swoop?",
            userId: "1"
        },
        {
            id: "8",
            message: "What about you?",
            userId: chatUserId
        },
        {
            id: "9",
            message: "How are you doing?",
            userId: "1"
        },
        {
            id: "10",
            message: "I am fine",
            userId: chatUserId
        }
    ])

    const [messageInput, setMessageInput] = React.useState("")
    const HandelSubmit = async (e) => {
        e.preventDefault()
        if (messageInput) {
            const newMessage = {
                id: messages.length + 1,
                message: messageInput,
                userId: chatUserId
            }
            await messages.push(newMessage)
            setMessageInput("")
            ScrollBottom()
        }
    }

    if (chatUserId) {
        const userInfo = chatList.find(
            (item) => item.id === chatUserId.split("#")[1]
        )
        const { image, name, university } = userInfo

        return (
            <IonCard className="chats-wrapper">
                <IonCardContent className="chats-wrapper__content">
                    <IonItem mode="ios" lines="full" className="chats-header">
                        <IonAvatar slot="start">
                            <img src={image} />
                        </IonAvatar>

                        <IonLabel>
                            <div className="flex justify-content-start">
                                <h2>{name}</h2>
                                <img
                                    src="https://www.svgrepo.com/show/178831/badges-money.svg"
                                    alt=""
                                    width={20}
                                />
                            </div>
                            <p>{university}</p>
                        </IonLabel>
                        <IonButton mode="ios" size="default">
                            View Profile
                        </IonButton>
                    </IonItem>
                    <div ref={chatbox} className="chat-box">
                        {messages.map((item) => {
                            return (
                                <div key={index} className="chat-box__msg  ">
                                    <div
                                        className={` ${
                                            item.userId === chatUserId
                                                ? "msg-text-sent"
                                                : "msg-text-received"
                                        }`}
                                    >
                                        <p>{item.message}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <form onSubmit={HandelSubmit} className="flex">
                        <IonInput
                            mode="md"
                            className="input-box"
                            onIonChange={(e) => setMessageInput(e.target.value)}
                            placeholder="Message"
                            value={messageInput}
                        ></IonInput>
                        <IonButton type="submit" mode="ios">
                            <IonIcon icon={send} />
                        </IonButton>
                    </form>
                </IonCardContent>
            </IonCard>
        )
    }
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

export default index
