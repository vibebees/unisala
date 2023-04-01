// eslint-disable-next-line no-use-before-define
import React, { useEffect, useRef, useState } from "react"
import {
    IonCard,
    IonItem,
    IonAvatar,
    IonLabel,
    IonButton,
    IonCardContent,
    IonContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonList,
    IonIcon
} from "@ionic/react"
import messageImg from "../../../../assets/messages.png"
import "./index.css"
import { TypeBox } from "./typeBox"
import { MessageItem } from "./messageItem"
import { Link, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

export const MessagingStation = ({ socket = {}, messages = [], chatbox = [], user = {}, messagingTo = {} }) => {

    const
        { username } = useParams(),
        MessageHistory = () => {
            return (
                <IonCard className="chats-wrapper">
                    <IonItem mode="ios" lines="full" className="chats-header">
                        <IonAvatar slot="start">
                            <img src="https://www.svgrepo.com/show/178831/badges-money.svg" />
                        </IonAvatar>

                        <IonLabel>
                            <div className="flex justify-content-start">
                                <h2>{messagingTo?.firstName + " " + messagingTo.lastName}</h2>
                                <img
                                    src="https://www.svgrepo.com/show/178831/badges-money.svg"
                                    alt=""
                                    width={20}
                                />
                            </div>
                            <p>{messagingTo?.username}</p>
                        </IonLabel>
                        <Link to={`/@/${user?.username}`} >
                            <IonButton mode="ios" size="default" >
                                View Profile
                            </IonButton>
                        </Link>

                    </IonItem>
                    <div ref={chatbox} className="chat-box">
                        {messages?.map((item, index) => <MessageItem key={index} item={item} currentUserId={user?._id} />)}
                        {/* {lastMessageStatus()} */}
                    </div>
                    <TypeBox socket={socket} />
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

    return username ? <MessageHistory /> : <DefaultMessage />
}
