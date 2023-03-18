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
        { user } = useSelector((state) => state?.userProfile)
    const

        { loading, error, data, refetch } = messagingTo?._id && useQuery(getMessagesByIdGql, {
            variables: {
                // currentUser
                senderId: user?._id,
                receiverId: messagingTo?._id
            },
            context: { server: MESSAGE_SERVICE_GQL }
        }) || {},
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
        { connectionList } = connectedList || [],
         [connectionListWithMessage, setConnectionListWithMessage] = useState([]),
        [messages, setMessages] = useState(data?.getMessagesById?.[0]?.messages || []),
        { messageUpdated } = useSelector((state) => state?.userActivity),
        client = useApolloClient(),
        props = {
            socket,
            chatbox,
            user,
            messagingTo,
            scrollBottom,
            connectionList,
            messages,
            connectionListWithMessage
        },
        chatListView = () => <Communicators {...props} />,
        chatView = () => <MessagingStation {...props} />,
        handleView = () => {
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
        useEffect(() => {}, [connectionListWithMessage])
    useEffect(() => {
        if (connectionList?.length > 0) {
            socket.current = messageSocket()
            socket.current.emit("queryRecentMessageForNetwork", {
                userId: user?._id,
                connectedList: connectionList.map((o) => {
                    return {
                        senderId: user?._id,
                        receiverId: o?.user?._id
                    }
                })
            })

            socket.current.on("fetchRecentMessageForNetwork", (recentMessages) => {
                const mergedData = connectionList.map((conn) => {
                    const userId = conn.user._id
                    const userMessages = recentMessages.filter((msg) => msg.senderId === userId || msg.receiverId === userId)

                    return { ...conn, recentMessage: userMessages?.[0] }
                  })
                    setConnectionListWithMessage(mergedData)
            })

        }

    }, [connectionList])
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
            receiverId: messagingTo?._id,
            userId: user?._id
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
