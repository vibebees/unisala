// eslint-disable-next-line no-use-before-define
import React from "react"
import "./Review.css"
import {
    IonAvatar,
    IonButton,
    IonCard,
    IonCardContent,
    IonCol,
    IonGrid,
    IonIcon,
    IonItem,
    IonLabel,
    IonRow,
    IonText
} from "@ionic/react"
import { heart } from "ionicons/icons"
import ReviewPop from "./ReviewPop"

const Reviews = () => {
    const [popup, setPopup] = React.useState(false)
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
    return (
        <IonCard
            style={{
                marginBottom: "20px"
            }}
        >
            <IonCardContent
                style={{
                    borderBottom: "1px solid #C4C4C4"
                }}
            >
                <h1>Reviews</h1>
            </IonCardContent>
            {popup && <ReviewPop setPopup={setPopup} />}
            <div
                style={{
                    padding: "1%"
                }}
            >
                <IonText color="dark">
                    <h3>Submit your Reviews</h3>
                </IonText>
                <IonText color="medium">
                    <p>Tell others what you think</p>
                </IonText>
                <IonButton
                    onClick={() => {
                        setPopup(true)
                    }}
                >
                    Submit your Reviews
                </IonButton>
                <IonItem lines="none">
                    <IonIcon color="danger" icon={heart} />
                    <IonLabel className="ion-padding-start">
                        <h2
                            style={{
                                fontWeight: "bold"
                            }}
                        >
                            4.87 : 30 Reviews
                        </h2>
                    </IonLabel>
                </IonItem>

                <IonGrid>
                    <IonRow
                    // style={{
                    //     display: width > 72 ? "grid" : "none",
                    //     gridTemplateColumns:
                    //         width > 72 && "repeat(2, minmax(200px, 1fr))",
                    //     gridGap: "0px 10%",
                    //     flexWrap: "no-wrap"
                    // }}
                    >
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
                                title: "Education",
                                value: 4.7
                            }
                        ].map((item, index) => (
                            <IonCol
                                size={width > 720 ? "6" : "12"}
                                key={index}
                                style={{
                                    bagroundColor: "red"
                                }}
                                className="ion-padding-start ion-padding-end"
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >
                                    <IonText>
                                        <h2
                                            style={{
                                                color: "#000",
                                                alignSelf: "center",
                                                fontSize: "1rem",
                                                lineHeight: "1.5rem",
                                                margin: 0
                                            }}
                                        >
                                            {item.title}
                                        </h2>
                                    </IonText>

                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "10px",
                                            alignItems: "center"
                                        }}
                                    >
                                        <div className="averageReview">
                                            <div
                                                id="averageReviewPercentage"
                                                style={{
                                                    width: item.value * 20 + "%"
                                                }}
                                            ></div>
                                        </div>
                                        <p
                                            style={{
                                                margin: 0
                                            }}
                                        >
                                            {item.value}
                                        </p>
                                    </div>
                                </div>
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>

                <IonGrid
                    style={{
                        margin: 0,
                        padding: 0
                    }}
                >
                    <IonRow
                        style={{
                            margin: 0,
                            padding: 0
                        }}
                    >
                        {[0, 1, 2, 3].map((item, index) => (
                            <IonCol
                                className={width > 720 && "ion-padding"}
                                size={width > 720 && "6"}
                                style={{
                                    margin: 0
                                }}
                                key={index}
                            >
                                <IonCard
                                    style={{
                                        boxShadow: "none"
                                    }}
                                >
                                    <IonItem
                                        lines="none"
                                        className="ion-no-padding"
                                    >
                                        <IonAvatar slot="start">
                                            <img
                                                src="https://i.pinimg.com/736x/e7/6b/aa/e76baa6c3ed5e089c57ce90e5e3fc087.jpg"
                                                width={500}
                                            />
                                        </IonAvatar>
                                        <IonLabel>
                                            <h2>FulKumari</h2>
                                            <p>February 2022</p>
                                        </IonLabel>
                                    </IonItem>
                                    <IonText
                                        className="ion-no-padding"
                                        color="dark"
                                    >
                                        <p>
                                            Southeastern Louisiana is a public
                                            university located in Hammond,
                                            Louisiana. It is a mid-size
                                            institution with an enrollment of
                                            9,248 undergraduate students
                                        </p>
                                    </IonText>
                                </IonCard>
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
            </div>
        </IonCard>
    )
}
export default Reviews
