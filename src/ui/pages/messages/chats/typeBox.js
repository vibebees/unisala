import React, { useState, useRef, useEffect } from "react"
import {
    IonButton,
    IonInput,
    IonIcon
} from "@ionic/react"
import { send } from "ionicons/icons"
import { useSelector } from "react-redux"
import { messageSocket } from "../../../../servers/endpoints"

export const TypeBox = () => {
    const
        [messageInput, setMessageInput] = useState(""),
        [messages, setMessages] = useState({}),
        messagingToUser = useSelector((state) => state?.userActivity?.messagingTo),
        socket = useRef(),
        myInfo = useSelector((state) => state.auth),
        sendMessage = (e) => {
            e.preventDefault()
            const data = {
                senderId: myInfo.id,
                receiverId: messagingToUser._id,
                message: messageInput
            }
            console.log({ data })
            socket.current.emit("messageReceived", data)
            //    dispatch(messageSend(data))
            setMessageInput("")
        }

    useEffect(() => {
        socket.current = messageSocket()
        // return () => {
        //     socket.current.disconnect()
        // }
    }, [])

    return (<form onSubmit={sendMessage} className="flex">
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
    </form>)
}
