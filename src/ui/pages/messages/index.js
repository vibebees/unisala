// eslint-disable-next-line no-use-before-define
import { IonContent, IonGrid, IonRow, IonCol } from "@ionic/react"
import { Communicators } from "./chatList"
import { MessagingStation } from "./chats"
import useWindowWidth from "../../../hooks/useWindowWidth"
import useDocTitle from "../../../hooks/useDocTitile"
import "./index.css"
import { MESSAGE_SERVICE_GQL, USER_SERVICE_GQL } from "../../../servers/types"
import { ConnectedList, getFriends, getMessagesByIdGql } from "../../../graphql/user"
import { useQuery, useApolloClient } from "@apollo/client"
import { useRef, useEffect, useState } from "react"
import useSound from "use-sound"
import { messageSocket } from "../../../servers/endpoints"
import { messageSocketAddress } from "../../../servers/index"
import { useDispatch, useSelector } from "react-redux"
import { messageSend, seenMessage } from "../../../store/action/messengerAction"
import { io } from "socket.io-client"
import { useParams } from "react-router"
import { updateChatMessages } from "../../../utils"
// import notificationSound from "../../../assets/sounds/notification.mp3"
// import sendingSound from "../../../assets/sounds/sending.mp3"
const index = () => {
    useDocTitle("Messages")
    const
        windowWidth = useWindowWidth(),
        { getUsers } = [],
        socket = useRef(),
        chatbox = useRef(null),
        { username } = useParams(),
        { messagingTo } = useSelector((state) => state?.userActivity),

        { user } = useSelector((state) => state?.userProfile),
        { loading, error, data, refetch } = useQuery(getMessagesByIdGql, {
            variables: {
                // currentUser
                senderId: user?._id,
                receiverId: messagingTo?._id

            },
            context: { server: MESSAGE_SERVICE_GQL }
        }),
        scrollBottom = () => {
            if (chatbox.current) {
                chatbox.current.scrollTop = chatbox.current.scrollHeight
            }
        },
        myNetwork = useQuery(ConnectedList, {
            context: { server: USER_SERVICE_GQL },
            variables: { userId: user._id }
          }) || {},
          { connectedList } = myNetwork?.data || {},
          { connectionList } = connectedList || {},
        [messages, setMessages] = useState(data?.getMessagesById?.[0]?.messages || []),
        { messageUpdated } = useSelector((state) => state?.userActivity),
        client = useApolloClient(),
        chatListView = () => <Communicators socket ={socket} chatList={getUsers} messages = {messages} connectionList ={connectionList} messagingTo ={messagingTo}/>,
        chatView = () => <MessagingStation socket = {socket} chatbox = {chatbox} user ={user} messages = {messages} messagingTo = {messagingTo}/>,
        handleView = () => {
            console.log("handleView", data)
            if (windowWidth >= 768) {
                return (
                    <IonRow>
                        <IonCol>
                            {chatListView()}
                        </IonCol>

                        <IonCol className="messages-wrapper">
                            {chatView()}
                        </IonCol>
                    </IonRow>
                )
            }
            const chatUserId = parseInt(location.hash.split("#")[1])
            if (chatUserId) {
                return chatView()
            }
            return chatListView()
        }

    useEffect(() => {
        setMessages(data?.getMessageById[0]?.messages)
        scrollBottom()
    }, [username, data])

    useEffect(() => {
        messageUpdated && refetch()
    }, [messageUpdated])

    useEffect(() => {
    }, [chatbox.current, chatbox])

    useEffect(() => {
        socket.current = messageSocket()
        socket.current.on("getMessage", (data) => {
            // setTypingMessage(data)
            const { senderId, receiverId } = data
            updateChatMessages({ newMessage: data, senderId: senderId, receiverId: receiverId, client })
        })

        socket.current.on("connect", (msg) => {
           console.log("connected")
        })
        socket.current.emit("joinRoom", {
            senderId: user?._id,
            receiverId: messagingTo?._id
        })
        return () => {
            socket.current.disconnect()
            console.log("Socket disconnected")
          }
    }, [])
    return (
        <IonContent>
            <IonGrid className="max-width-container">{handleView()}</IonGrid>
        </IonContent>
    )
}

export default index
