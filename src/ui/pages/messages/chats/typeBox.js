import React, { useState, useRef, useEffect } from "react"
import {
    IonButton,
    IonInput,
    IonIcon
} from "@ionic/react"
import { send } from "ionicons/icons"
import { useSelector } from "react-redux"
import { messageSocket } from "../../../../servers/endpoints"
import { useMutation } from "@apollo/client"
import { addMessageGql, getMessagesByIdGql } from "../../../../graphql/user"

const updateMessage = (data, messagingTo) => {
    const
    [addMessage] = useMutation(addMessageGql)

    addMessage({
        variables: data,
        update: (cache, { data: { addMessage } }) => {
            // Update the cache with the new message
            const { getMessagesById } = cache.readQuery({
                query: getMessagesByIdGql,
                variables: { _id: messagingTo._id }
            })
            cache.writeQuery({
                query: getMessagesByIdGql,
                variables: { _id: messagingTo._id },
                data: {
                    getMessagesById: [
                        {
                            ...getMessagesById[0],
                            messages: [...getMessagesById[0].messages, addMessage]
                        }
                    ]
                }
            })
        }
    })
}
export const TypeBox = () => {
    const
        [messageInput, setMessageInput] = useState(""),
        [messages, setMessages] = useState({}),
        { messagingTo } = useSelector((state) => state?.userActivity),
        socket = useRef(),
        myInfo = useSelector((state) => state.auth),
        sendMessage = (e) => {
            e.preventDefault()
            const data = {
                senderId: myInfo.id,
                receiverId: messagingTo._id,
                message: messageInput
            }
            updateMessage(data, messagingTo)
            socket.current.emit("createMessage", data)
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
