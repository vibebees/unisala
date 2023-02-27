// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonAvatar, IonItem, IonLabel, IonText } from "@ionic/react"
export const MessageItem = ({ email, username, age, birthday, verified, image }) => {
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
                    <img src={"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80"} />
                </IonAvatar>
                <IonLabel>
                    <div className="flex ">
                        {" "}
                        <h2>{username}</h2>
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
                        {username}
                    </p>
                </IonLabel>
            </IonItem>
            <IonText>
                <p className="message-pop-item-msg">{birthday}</p>
            </IonText>
        </div>
    )
}
export default MessageItem
