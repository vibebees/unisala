// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonAvatar, IonItem, IonLabel, IonText } from "@ionic/react"
export const MessageItem = ({ image, university, name, message }) => {
    return (
        <div className="message-pop-item">
            <IonItem
                style={{
                    margin: "0px",
                    padding: "0px"
                }}
                lines="none"
            >
                <IonAvatar slot="start">
                    <img src={image} />
                </IonAvatar>
                <IonLabel>
                    <div className="flex ">
                        {" "}
                        <h2>{name}</h2>
                        <img
                            src="https://www.svgrepo.com/show/178831/badges-money.svg"
                            alt=""
                            width={20}
                        />
                    </div>
                    <p
                        style={{
                            margin: 0
                        }}
                    >
                        {university}
                    </p>
                </IonLabel>
            </IonItem>
            <IonText>
                <p className="message-pop-item-msg">{message}</p>
            </IonText>
        </div>
    )
}
export default MessageItem
