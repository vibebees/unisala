// eslint-disable-next-line no-use-before-define
import React from "react"
import {
    IonCard,
    IonCardContent,
    IonCol,
    IonAvatar,
    IonRow,
    IonText,
    IonIcon
} from "@ionic/react"
import "./professors.css"
import { star, starOutline } from "ionicons/icons"

export const Professors = () => {
    return (
        <IonCard
            style={{
                margin: "15px 0px 0px 0px"
            }}
            className="ion-margin-top"
        >
            <IonCardContent
                style={{
                    borderBottom: "1px solid #C4C4C4"
                }}
            >
                <h1>Professors</h1>
            </IonCardContent>
            <IonRow>
                {[1, 2, 3, 4, 5].map((data, index) => {
                    return (
                        <IonCol size={"6"} key={index}>
                            <IonCard>
                                <div className="professor-profile">
                                    <div>
                                        <IonAvatar
                                            style={{
                                                width: "60px",
                                                height: "60px"
                                            }}
                                        >
                                            <img
                                                src="https://www.svgrepo.com/show/206842/professor.svg"
                                                alt=""
                                            />
                                        </IonAvatar>
                                    </div>
                                </div>
                                <div className="professor-profile-details">
                                    <IonText className="flex" color="dark">
                                        <h3>Nabin Kharel</h3>
                                        <div>
                                            {[0, 1, 2, 3, 4].map(
                                                (data, index) => (
                                                    <IonIcon
                                                        key={index}
                                                        style={{
                                                            color: "#F8B64C",
                                                            margin: "0 3px",
                                                            padding: "0",
                                                            fontWeight: "bold",
                                                            fontSize: "25px"
                                                        }}
                                                        icon={
                                                            4 >= index + 1
                                                                ? star
                                                                : starOutline
                                                        }
                                                    />
                                                )
                                            )}
                                        </div>
                                    </IonText>
                                    <IonText color="medium" className="flex">
                                        <p>Geology</p>
                                        <div className="flex justify-content-center">
                                            <p>4.4</p>
                                            <img
                                                width={25}
                                                alt="happy"
                                                src="https://cdn-icons-png.flaticon.com/512/282/282578.png"
                                            />
                                        </div>
                                    </IonText>
                                </div>
                            </IonCard>
                        </IonCol>
                    )
                })}
            </IonRow>
        </IonCard>
    )
}
export default Professors
