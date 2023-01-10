// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonButton, IonContent, IonText } from "@ionic/react"

export const PageNotFound = () => {
    return (
        <IonContent color="light">
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%"
                }}
            >
                <IonText color="dark">
                    <h1
                        style={{
                            fontSize: "2.5rem"
                        }}
                    >
                        Oops!
                    </h1>
                </IonText>
                <br />
                <IonText color="dark">
                    <h6>We can’t seem to find the page you are looking for</h6>
                </IonText>
                <br />
                <IonButton routerLink="/home">Go Home</IonButton>
            </div>
        </IonContent>
    )
}
export default PageNotFound
