import { gql } from "@apollo/client"
import { v4 as uuidv4 } from "uuid"

export const
updateChatMessages = ({ newMessage, senderId, receiverId, client }) => {
    client.cache.modify({
        fields: {
            getMessageById(allMessages, { readField }) {
                const currentFriendConvo = allMessages.find(
                    (item) =>
                        item.pairs.includes(senderId) &&
                        item.pairs.includes(receiverId)
                )

                if (!currentFriendConvo) {
                    return allMessages
                }
                const existingMessages = currentFriendConvo.messages ?? []
                const newMessageRef = client.cache.writeFragment({
                    data: {
                        id: uuidv4(),
                        senderId,
                        receiverId,
                        seen: false,
                        message: newMessage.message,
                        __typename: "Message"
                    },
                    fragment: gql`
                      fragment NewMessage on Message {
                        seen
                        senderId
                        receiverId
                        message {
                          text
                        }
                      }
                    `
                })
                const updatedData = allMessages.map((item) => {
                    if (
                        item.pairs.includes(senderId) &&
                        item.pairs.includes(receiverId)
                    ) {
                        return {
                            ...item,
                            messages: [...existingMessages, newMessageRef]
                        }
                    }
                    return item
                })
                return updatedData
            }
        },
        variables: { senderId, receiverId }
    })

},
messageSeen = ({ messagingTo = {}, username = "", recentMessages = [], socket = {} }) => {
    const seeingMessageFor = messagingTo?.username === username ? messagingTo?._id : ""
    if (seeingMessageFor) {
        const
         seenMessage = recentMessages?.filter((item) => item?.user?._id === messagingTo?._id)?.[0],
         notSeen = !(seenMessage?.recentMessage?.seen)
         notSeen && socket?.current?.emit("messageSeen", { seenMessageId: seenMessage?.recentMessage?._id })
    }
}
