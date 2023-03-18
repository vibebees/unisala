import React, { useState, useRef, useEffect } from "react"
import {
    IonButton,
    IonInput,
    IonIcon
} from "@ionic/react"
import { send } from "ionicons/icons"
import { useDispatch, useSelector } from "react-redux"
import { messageSocket } from "../../../../servers/endpoints"
import { useMutation, useApolloClient, gql } from "@apollo/client"
import { addMessageGql, getMessagesByIdGql } from "../../../../graphql/user"
import { MESSAGE_SEND_SUCCESS, MESSAGE_SEND_SUCCESS_FINALLY } from "../../../../store/types/messengerType"
import { messageUpdated } from "../../../../store/action/userActivity"
import { v4 as uuidv4 } from "uuid"
import { updateChatMessages } from "../../../../utils"
export const TypeBox = ({ socket }) => {
    const
        [messageInput, setMessageInput] = useState(""),
        { messagingTo } = useSelector((state) => state?.userActivity),
        { user } = useSelector((state) => state?.userProfile),
        client = useApolloClient(),
        sendMessage = (e) => {
            e.preventDefault()
            const data = {
                senderId: user._id,
                receiverId: messagingTo._id,
                message: {
                    text: messageInput
                },
                seen: false
            }
            socket.current.emit("createMessage", data)
            updateChatMessages({ newMessage: data, senderId: user._id, receiverId: messagingTo._id, client })
            setMessageInput("")
        }
    return (<div className="flex">
        <IonInput
            mode="md"
            className="input-box"
            onIonChange={(e) => setMessageInput(e.target.value)}
            placeholder="Message"
            value={messageInput}
        ></IonInput>
        <IonButton type="submit" mode="ios" onClick={sendMessage}>
            <IonIcon icon={send} />
        </IonButton>
    </div>)
}
