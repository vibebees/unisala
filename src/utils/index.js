
import { getMessagesByIdGql } from "../graphql/user"

export const

    getSenderAndReceiver = (message, user) => {

        let { senderId, receiverId } = message
        // on the sending end, sender is me and receiver is the person I'm messaging
        // on the receiving end, sender is the person I'm messaging and receiver is me
        if (user?._id === receiverId) {
            senderId = user?._id
            receiverId = message?.senderId
        }
        return { senderId, receiverId }
    },
    updateChatMessages = ({ newMessage, client, user }) => {

        const { senderId, receiverId } = getSenderAndReceiver(newMessage, user)
        // Read the current messages from the cache
        const currentMessages = client.readQuery({
            query: getMessagesByIdGql,
            variables: {
                senderId: senderId,
                receiverId: receiverId
            }
        })

        // Add the new message to the messages array
        const updatedMessages = [
            ...currentMessages?.getMessagesByIdGql?.[0].messages,
            newMessage
        ]

        // Write the updated messages back to the cache
         client.writeQuery({
            query: getMessagesByIdGql,
            variables: {
                senderId: senderId,
                receiverId: receiverId
            },
            data: {
                getMessagesByIdGql: [
                    {
                        ...currentMessages.getMessagesByIdGql[0],
                        messages: updatedMessages
                    }
                ]
            }
        })
        // client.cache.modify({
        //     fields: {
        //         getMessagesByIdGql(allMessages, { readField }) {
        //             const currentFriendConvo = allMessages.find(
        //                 (item) =>
        //                     item.pairs.includes(senderId) &&
        //                     item.pairs.includes(receiverId)
        //             )

        //             if (!currentFriendConvo) {
        //                 return allMessages
        //             }
        //             const existingMessages = currentFriendConvo.messages ?? []
        //             const newMessageRef = client.cache.writeFragment({
        //                 data: {
        //                     id: uuidv4(),
        //                     senderId,
        //                     receiverId,
        //                     seen: false,
        //                     message: newMessage.message,
        //                     __typename: "Message"
        //                 },
        //                 fragment: gql`
        //                   fragment NewMessage on Message {
        //                     seen
        //                     senderId
        //                     receiverId
        //                     message {
        //                       text
        //                     }
        //                   }
        //                 `
        //             })
        //             const updatedData = allMessages.map((item) => {
        //                 if (
        //                     item.pairs.includes(senderId) &&
        //                     item.pairs.includes(receiverId)
        //                 ) {
        //                     return {
        //                         ...item,
        //                         messages: [...existingMessages, newMessageRef]
        //                     }
        //                 }
        //                 return item
        //             })
        //             return updatedData
        //         }
        //     },
        //     variables: { senderId, receiverId }
        // })

    },
    messageSeen = ({ messagingTo = {}, username = "", recentMessages = [], socket = {} }) => {
        const seeingMessageFor = messagingTo?.username === username ? messagingTo?._id : ""
        if (seeingMessageFor) {
            const
                seenMessage = recentMessages?.filter((item) => item?.user?._id === messagingTo?._id)?.[0],
                notSeen = !(seenMessage?.recentMessage?.seen)
            notSeen && socket?.current?.emit("messageSeen", { seenMessageId: seenMessage?.recentMessage?._id })
        }
    },
    updatedRecentMessages = ({ newMessage, user, recentMessages, setMyNetworkRecentMessages, dispatch }) => {
        const { senderId, receiverId } = getSenderAndReceiver(newMessage, user)

        const updatedRecentMessages = recentMessages?.map((item) => {
            if (item.user._id === receiverId) {
              return {
                ...item,
                recentMessage: newMessage
              }
            }
            return item
          })
          dispatch(setMyNetworkRecentMessages(updatedRecentMessages))

    }
