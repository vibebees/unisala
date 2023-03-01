import React, { useState, useRef } from "react"
import {
    IonButton,
    IonInput,
    IonIcon
} from "@ionic/react"
import { send } from "ionicons/icons"

export const TypeBox = (receipent) => {
    const
        [messageInput, setMessageInput] = useState(""),
        [messages, setMessages] = useState({}),
        HandelSubmit = (e) => {
            e.preventDefault()
            if (messageInput) {
                const newMessage = {
                    id: messages.length + 1,
                    message: messageInput,
                    userId: receipent
                }
                setMessages(newMessage)
            }
        }
    return (<form onSubmit={HandelSubmit} className="flex">
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
