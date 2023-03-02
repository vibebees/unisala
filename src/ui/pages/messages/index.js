// eslint-disable-next-line no-use-before-define
import { IonContent, IonGrid, IonRow, IonCol } from "@ionic/react"
import { Communicators } from "./chatList"
import { MessagingStation } from "./chats"
import useWindowWidth from "../../../hooks/useWindowWidth"
import useDocTitle from "../../../hooks/useDocTitile"
import "./index.css"
import { MESSAGING_SERVICE } from "../../../servers/types"
import { getFriends } from "../../../graphql/user"
import { useQuery } from "@apollo/client"
import { useRef, useEffect } from "react"
import { io } from "socket.io-client"
import { messageSocket } from "../../../servers/endpoints"
import { messageSocketAddress } from "../../../servers/index"
const index = () => {
    useDocTitle("Messages")
    const
     windowWidth = useWindowWidth(),
     { loading, error, data } = useQuery(getFriends, { context: { server: MESSAGING_SERVICE } }),
     { getUsers } = data || [],
     socket = useRef(),
     handleView = () => {
        if (windowWidth >= 768) {
            return (
                <IonRow>
                    <IonCol>
                        <Communicators chatList={getUsers} />
                    </IonCol>

                    <IonCol className="messages-wrapper">
                        <MessagingStation/>
                    </IonCol>
                </IonRow>
            )
        }
        const chatUserId = parseInt(location.hash.split("#")[1])
        if (chatUserId) {
            return <MessagingStation />
        }
        return <Communicators chatList={getUsers} />
    }

    useEffect(() => {
        socket.current = messageSocket()
        socket.current.on("connect", () => {
            console.log("socket connected")
        })
        socket.current.on("message", (message) => {
            console.log(message)
        })
        socket.current.on("disconnect", () => {
            console.log("socket disconnected")
        })
        return () => {
            socket.current.disconnect()
        }
    }, [])

    useEffect(() => {
        socket.current.emit("join", { username: "joshua" })
    })

    return (
        <IonContent>
            <IonGrid className="max-width-container">{handleView()}</IonGrid>
        </IonContent>
    )
}

export default index
