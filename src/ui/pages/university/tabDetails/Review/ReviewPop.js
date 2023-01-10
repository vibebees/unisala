// eslint-disable-next-line no-use-before-define
import React from "react"
import {
    IonButton,
    IonCol,
    IonGrid,
    IonIcon,
    IonItem,
    IonLabel,
    IonTextarea,
    IonRow,
    IonText,
    IonContent
} from "@ionic/react"
import { backspaceOutline } from "ionicons/icons"
import ReviewStar from "./ReviewStar"

const ReviewPop = ({ setPopup }) => {
    const [width, setWidth] = React.useState(window.innerWidth)
    const handleResize = () => {
        const { innerWidth } = window

        if (width !== innerWidth) {
            setWidth(innerWidth)
        }
    }
    React.useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    })
    const [setReview] = React.useState({
        education: 0,
        ecd: 0,
        dorm: 0,
        clinic: 0,
        cafeteria: 0,
        discription: ""
    })
    return (
        <IonContent className="review-pop ion-padding">
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-start"
                }}
            >
                <IonItem
                    onClick={() => {
                        setPopup(false)
                    }}
                    style={{
                        cursor: "pointer",
                        margin: "0px",
                        padding: "0px"
                    }}
                    className="ion-no-padding"
                    size="auto"
                    lines="none"
                >
                    <IonIcon
                        color="dark"
                        size="large"
                        icon={backspaceOutline}
                    />
                    <IonLabel
                        style={{
                            padding: "0px"
                        }}
                    >
                        Back
                    </IonLabel>
                </IonItem>
            </div>

            <IonText color="dark">
                <h3
                    style={{
                        fontWeight: "500"
                    }}
                >
                    Submit your Review
                </h3>
            </IonText>
            <IonGrid>
                <IonRow>
                    {[
                        {
                            title: "Education",
                            value: 4.7
                        },
                        {
                            title: "ECD",
                            value: 4.7
                        },
                        {
                            title: "Dorm",
                            value: 4.7
                        },
                        {
                            title: "Clinic",
                            value: 4.7
                        },
                        {
                            title: "cafeteria",
                            value: 4.7
                        }
                    ].map((item, index) => (
                        <IonCol
                            size={width > 720 ? "6" : "12"}
                            key={index}
                            className="ion-padding-start ion-padding-end ion-no-padding ion-no-margin"
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    margin: "0px",
                                    padding: "0px"
                                }}
                            >
                                <h2
                                    style={{
                                        color: "#000",
                                        fontSize: "1rem",
                                        alignSelf: "center",
                                        margin: 0
                                    }}
                                >
                                    {item.title}
                                </h2>
                                <IonItem lines="none">
                                    {[0, 1, 2, 3, 4].map((index) => (
                                        <ReviewStar
                                            key={index}
                                            {...item}
                                            index={index}
                                            setReview={setReview}
                                        />
                                    ))}
                                </IonItem>
                            </div>
                        </IonCol>
                    ))}
                </IonRow>
            </IonGrid>

            <br />
            <div className="ion-padding">
                <IonTextarea
                    style={{
                        width: "100%",
                        height: "300px",
                        border: "1px solid #c4c4c4",
                        borderRadius: "10px"
                    }}
                />

                <IonButton className="ion-margin-top" fill="outline">
                    Submit
                </IonButton>
            </div>
        </IonContent>
    )
}
export default ReviewPop
