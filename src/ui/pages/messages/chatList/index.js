// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from "react"
import { Link, Redirect } from "react-router-dom"
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonList,
    IonListHeader,
    IonSearchbar

} from "@ionic/react"
import "./index.css"
import MessageItem from "../../../component/messagePop/MessageItem"
import { useQuery } from "@apollo/client"
import { getFriends, getMessages } from "../../../../graphql/user"
import { MESSAGING_SERVICE } from "../../../../servers/types"
import { SkeletonMessage } from "../../../../utils/components/SkeletonMessage"
import { getCurrentCommunicator } from "../../../../store/action/userActivity"

export const Communicators = () => {
        const
            [isOpen, setIsOpen] = useState(false),
            { loading, error, data } = useQuery(getFriends, { context: { server: MESSAGING_SERVICE } }),
            { getUsers } = data || [],
            handleMessagesList = (communicators) => {

                if (!communicators) {
                    return <div>No messages</div>
                }
                return communicators.map((item, index) => {
                    // const { id, avatar, name, username, message, time } = c
                    return <Link to={`/messages/${item.username}`} key={index}>
                        <MessageItem {...item} />
                    </Link>
                })
            }
        if (error) {
            console.log(error)
        }

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
                                {
                                    loading
                                        ? <SkeletonMessage />
                                        : handleMessagesList(getUsers)
                                }
                            </div>
                        </IonList>
                    </IonCardContent>
                </IonCard>
            </>
        )
    }
