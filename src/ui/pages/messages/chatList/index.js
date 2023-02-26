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
import { getFriends } from "../../../../graphql/user"
import { useDispatch } from "react-redux"
import urls from "../../../../servers"
import { getUserFriends } from "../../../../store/action/userProfile"
import { MESSAGING_SERVICE } from "../../../../servers/types"

const
    chatList = [
        {
            id: "1",
            message:
                "Why drag something out when you could get it done in one fell swoop?",
            name: "Sara Hall",
            university: "Tribhuvan University",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
        },
        {
            id: "2",
            message: "These are just the first of many shortcuts",
            name: "Ali Khan",
            university: "Harvard University",
            image: "https://filmfare.wwmindia.com/thumb/content/2019/aug/hrithikroshanweb1565958352.jpg?width=1200&height=900"
        },
        {
            id: "3",
            message:
                "Lorem ipsum dolor sit amet consec tetur adipisicing elit tetur adipisicing elit.",
            name: "Ram Kumar",
            university: "New York",
            image: "https://i.pinimg.com/originals/1d/df/a9/1ddfa98a7e262b691614bc30923a40d5.jpg"
        },
        {
            id: "4",
            message: "Supercharge your Messenger experience",
            name: "Hari Paudel",
            university: "Pokhara University",
            image: "https://qph.cf2.quoracdn.net/main-qimg-8e8ea0637a05240ab9c8409ff1860ac9-lq"
        }
    ],
    { messagingService, universityService } = urls

const index = () => {
    const
     [isOpen, setIsOpen] = useState(false),
     { loading, error, data } = useQuery(getFriends(), {
        context: { clientName: MESSAGING_SERVICE }
    }),
    dispatch = useDispatch(),
    handleMessagesList = () => {
        if (chatList.length !== 0) {
            return chatList.map((item, index) => {
                // const { id, avatar, name, username, message, time } = chat
                return (
                    <Link to={`#${item.id}`} key={index}>
                        <MessageItem {...item} />
                    </Link>
                )
            })
        }
        return <div>No messages</div>
    }

    dispatch(getUserFriends())

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
                                            href={`http://localhost:3000/messages#${item.id}`}
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
