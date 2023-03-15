import { gql } from "@apollo/client"
export const
updateChatMessages = ({ newMessage, senderId, receiverId, client }) => {
    console.log("newMessage", newMessage._id)
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
                        id: newMessage._id,
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

}
