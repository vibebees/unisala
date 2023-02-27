// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonList,
    IonListHeader,
    IonItem,
    IonAvatar,
    IonLabel,
    IonSearchbar,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonText
} from "@ionic/react"
import "./index.css"
import MessageItem from "../../../component/messagePop/MessageItem"
import { useQuery } from "@apollo/client"
import { getFriends, getMessages } from "../../../../graphql/user"
import { MESSAGING_SERVICE } from "../../../../servers/types"

const
    chatList = [],
    dummyData = [],
    index = () => {
        const
            [isOpen, setIsOpen] = useState(false),
            { friendsLoading, friendsError, friends } = useQuery(getFriends, { context: { server: MESSAGING_SERVICE } }),
            { messagesLoading, messagesError, messages } = useQuery(getMessages, { context: { server: MESSAGING_SERVICE } })

            console.log({ friendsLoading, friendsError, friends })
            console.log({ messagesLoading, messagesError, messages })
            const
            handleMessagesList = () => {
                if (chatList.length !== 0) {
                    console.log({ friends, friendsLoading, friendsError })
                    return dummyData.map((item, index) => {
                        // const { id, avatar, name, username, message, time } = c
                        return (
                            <Link to={`#${item.id}`} key={index}>
                                <MessageItem {...item} />
                            </Link>
                        )
                    })
                }
                return <div>No messages</div>
            }
        useEffect(() => {
            console.log({ type: 2, friends, friendsLoading, friendsError })
            if (friends) {
                console.log({ friends })
            }
            if (friendsError) {
                console.log({ friendsError })
            }
            if (friendsLoading) {
                console.log(friendsLoading)
            }
        }, [friendsLoading, friendsError, friends])
        useEffect(() => {
            if (messages) {
                console.log({ messages })
            }
            if (friendsError) {
                console.log({ messagesError })
            }
            if (friendsLoading) {
                console.log(messagesLoading)
            }
        }, [messagesLoading, messagesError, messages])
        return (
            <>
                <IonCard className="chat-list">
                    <IonCardContent className="chat-list__container">
                        <div className="flex-column ">
                            <IonButton mode="ios" onClick={() => setIsOpen(true)}>
                                New Messages
                            </IonButton>
                            <IonButton mode="ios" color="light">
                                Screener
                            </IonButton>
                        </div>

                        <IonList className="chat-list__users">
                            <IonListHeader>
                                <h2>Direct Messages</h2>
                            </IonListHeader>
                            <IonSearchbar mode="ios"></IonSearchbar>
                            <div className="chat-list__user-list">
                                {handleMessagesList()}
                            </div>
                        </IonList>
                    </IonCardContent>
                </IonCard>

                <IonModal isOpen={isOpen} mode="ios">
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Edit Profile</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setIsOpen(false)}>
                                    Close
                                </IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding modal-content">
                        <IonSearchbar mode="ios"></IonSearchbar>

                        {chatList.map((item, index) => {
                            // const { id, avatar, name, username } = chat
                            return (
                                <IonItem mode="ios" className="mb-1" key={index}>
                                    <IonAvatar slot="start">
                                        <img src={item.image} />
                                    </IonAvatar>
                                    <IonLabel>
                                        <div className="flex">
                                            <div>
                                                <h2>{item.name}</h2>
                                                <p>{item.university}</p>
                                            </div>
                                            <IonButton
                                                mode="ios"
                                                href={`http://localhost:3000/messages#item`}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Message
                                            </IonButton>
                                        </div>
                                    </IonLabel>
                                </IonItem>
                            )
                        })}
                    </IonContent>
                </IonModal>
            </>
        )
    }

export default index
