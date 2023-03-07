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
import { ConnectedList, getFriends, getMessages } from "../../../../graphql/user"
import { MESSAGE_SERVICE_GQL, USER_SERVICE_GQL } from "../../../../servers/types"
import { SkeletonMessage } from "../../../../utils/components/SkeletonMessage"
import { getCurrentCommunicator } from "../../../../store/action/userActivity"
import { useSelector } from "react-redux"

export const Communicators = () => {
        const
            [isOpen, setIsOpen] = useState(false),
            { user } = useSelector((store) => store?.userProfile),
            //  { loading, error, data } = useQuery(getFriends, { context: { server: MESSAGE_SERVICE_GQL } }),
             { data } = useQuery(ConnectedList, {
                context: { server: USER_SERVICE_GQL },
                variables: { userId: user._id }
              }) || {},
              { connectedList } = data,
              { connectionList } = connectedList,
            // { loading, error, data } = useQuery(getFriends, { context: { server: MESSAGE_SERVICE_GQL } }),
            handleMessagesList = (communicators) => {

                if (!communicators) {
                    return <div>No messages</div>
                }

                return communicators.map((item, index) => {

                    // const { id, avatar, name, username, message, time } = c
                    return <Link to={`/messages/${item?.user?.username}`} key={index}>
                        <MessageItem {...item.user} />
                    </Link>
                })
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
                                {/* {
                                    loading
                                        ? <SkeletonMessage />
                                        : handleMessagesList(getUsers)
                                } */}
                                {handleMessagesList(connectionList)}
                            </div>
                        </IonList>
                    </IonCardContent>
                </IonCard>
            </>
        )
    }
