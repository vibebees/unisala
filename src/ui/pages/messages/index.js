// eslint-disable-next-line no-use-before-define
import { IonContent, IonGrid, IonRow, IonCol } from "@ionic/react"
import { Communicators } from "./chatList"
import { MessagingStation } from "./chats"
import useWindowWidth from "../../../hooks/useWindowWidth"
import useDocTitle from "../../../hooks/useDocTitile"
import "./index.css"
import { MESSAGE_SERVICE_GQL } from "../../../servers/types"
import { getFriends } from "../../../graphql/user"
import { useQuery } from "@apollo/client"
import { useRef, useEffect, useState } from "react"
import useSound from "use-sound"
import { messageSocket } from "../../../servers/endpoints"
import { messageSocketAddress } from "../../../servers/index"
import { useDispatch, useSelector } from "react-redux"
import { messageSend, seenMessage } from "../../../store/action/messengerAction"
// import notificationSound from "../../../assets/sounds/notification.mp3"
// import sendingSound from "../../../assets/sounds/sending.mp3"
const index = () => {
    useDocTitle("Messages")
    const
     windowWidth = useWindowWidth(),
     { loading, error, data } = useQuery(getFriends, { context: { server: MESSAGE_SERVICE_GQL } }),
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
    },
    dispatch = useDispatch(),
    { friends, message, mesageSendSuccess, messageGetSuccess, themeMood, newUserAdd } = {},
    myInfo = useSelector((state) => state.auth),
    [currentfriend, setCurrentFriend] = useState(""),
    [newMessage, setNewMessage] = useState(""),
    [activeUser, setActiveUser] = useState([]),
    [socketMessage, setSocketMessage] = useState(""),
    [typingMessage, setTypingMessage] = useState("")
    //  [notificationSPlay] = useSound(notificationSound),
    //  [sendingSPlay] = useSound(sendingSound)

    // useEffect(() => {
    //     socket.current = messageSocket()
    //     socket.current.on("connect", () => {
    //         console.log("socket connected")
    //     })
    //     socket.current.on("message", (message) => {
    //         console.log(message)
    //     })
    //     socket.current.on("disconnect", () => {
    //         console.log("socket disconnected")
    //     })
    //     return () => {
    //         socket.current.disconnect()
    //     }
    // }, [])

    useEffect(() => {
        if (socketMessage && currentfriend) {
             if (socketMessage.senderId === currentfriend._id && socketMessage.reseverId === myInfo.id) {
                  dispatch({
                       type: "SOCKET_MESSAGE",
                       payload: {
                            message: socketMessage
                       }
                  })
                  dispatch(seenMessage(socketMessage))
                  socket.current.emit("messageSeen", socketMessage)
                  dispatch({
                   type: "UPDATE_FRIEND_MESSAGE",
                   payload: {
                        msgInfo: socketMessage,
                        status: "seen"
                   }
              })
             }
        }
        setSocketMessage("")
     }, [socketMessage])

    useEffect(() => {
        socket.current = messageSocket()
        socket.current.on("getMessage", (data) => {
            setSocketMessage(data)
        })

        socket.current.on("typingMessageGet", (data) => {
         setTypingMessage(data)
     })

     socket.current.on("msgSeenResponse", (msg) => {
         dispatch({
              type: "SEEN_MESSAGE",
              payload: {
                   msgInfo: msg
              }
         })
     })

     socket.current.on("msgDelivaredResponse", (msg) => {
         dispatch({
              type: "DELIVARED_MESSAGE",
              payload: {
                   msgInfo: msg
              }
         })
     })

     socket.current.on("seenSuccess", (data) => {
          dispatch({
               type: "SEEN_ALL",
               payload: data
          })
     })

    }, [])

    // useEffect(() => {
    //     socket.current.emit("join", { username: "joshua" })
    // })

    return (
        <IonContent>
            <IonGrid className="max-width-container">{handleView()}</IonGrid>
        </IonContent>
    )
}

export default index
