import React, { useState, useRef, useEffect } from "react"
import {
    IonButton,
    IonInput,
    IonIcon
} from "@ionic/react"
import { send } from "ionicons/icons"
import { useSelector } from "react-redux"
import { messageSocket } from "../../../../servers/endpoints"

export const TypeBox = (receipent) => {
    const
        [messageInput, setMessageInput] = useState(""),
        [messages, setMessages] = useState({}),
        socket = useRef(),
        myInfo = useSelector((state) => state.auth),
        sendMessage = (e) => {
            e.preventDefault()
            const data = {
                senderId: myInfo.id,
                receiverId: myInfo.username,
                message: messageInput
            }
            socket.current.emit("messageReceived", data)
            //    dispatch(messageSend(data))
            setMessageInput("")
        }

    useEffect(() => {
        socket.current = messageSocket()
        socket.current.on("connect", () => {
            console.log("socket connected")
        })
        socket.current.on("disconnect", () => {
            console.log("socket disconnected")
        })
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
