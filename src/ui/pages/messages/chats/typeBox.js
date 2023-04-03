import React, { useState, useRef, useEffect } from "react"
import {
    IonButton,
    IonInput,
    IonIcon
} from "@ionic/react"
import { send } from "ionicons/icons"
import { useApolloClient } from "@apollo/client"
import { useSelector } from "react-redux"
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
