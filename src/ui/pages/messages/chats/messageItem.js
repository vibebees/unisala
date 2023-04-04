import { IonIcon } from "@ionic/react"
import { eye } from "ionicons/icons"
export const MessageItem = ({ item, currentUserId, messageSize, index = 0, showEye = false }) => {
    return (
        <>
            <div key={index} className="chat-box__msg">
                <div
                    className={` ${item.senderId === currentUserId
                        ? "msg-text-sent"
                        : "msg-text-received"
                        }`}
                >
                    <p>{item?.message?.text}</p>

                </div>
            </div>
            {
               showEye && messageSize === index && <div className="chat-box__msg">
                    <div className= "msg-seen-eye" >
                        <IonIcon icon={eye} />
                    </div>
                </div>
            }
        </>)
}
