// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonCol, IonIcon, IonItem, IonAvatar, IonLabel } from "@ionic/react"
import { imageOutline } from "ionicons/icons"

export const Post = () => {
    return (
        <form
            style={{
                padding: "2px",
                cursor: "pointer"
            }}
        >
            <IonItem lines="none">
                <IonAvatar
                    slot="start"
                    style={{
                        alignSelf: "center"
                    }}
                >
                    <img
                        src={
                            "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1670164432~exp=1670165032~hmac=36b9b40ac0ed5b3a668c8bd6a3773cb706f13b46413881b4a4f1079241cb9eb5"
                        }
                    />
                </IonAvatar>
                <input
                    type="text"
                    placeholder="Start a thread"
                    className="searchInput"
                />
                {[
                    {
                        icon: imageOutline,
                        label: "Image"
                    }
                ].map((item, index) => {
                    return (
                        <IonCol size="auto" key={index}>
                            <IonItem className="post-button" lines="none">
                                <IonIcon icon={item.icon} />
                                <IonLabel className="ion-padding-start">
                                    <p>{item.label}</p>
                                </IonLabel>
                            </IonItem>
                        </IonCol>
                    )
                })}
            </IonItem>
            {/* <IonRow className="flex justify-content-center">
                {[
                    {
                        icon: imageOutline,
                        label: "Image"
                    }
                ].map((item, index) => {
                    return (
                        <IonCol size="auto" key={index}>
                            <IonItem className="post-button" lines="none">
                                <IonIcon icon={item.icon} />
                                <IonLabel className="ion-padding-start">
                                    <p>{item.label}</p>
                                </IonLabel>
                            </IonItem>
                        </IonCol>
                    )
                })}
            </IonRow> */}
        </form>
    )
}
export default Post
