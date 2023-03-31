// eslint-disable-next-line no-use-before-define
import React from "react"
import {
    IonCard,
    IonCardContent,
    IonGrid,
    IonCol,
    IonRow
} from "@ionic/react"
import "./Libraries.css"
import LibrariesCard from "./librariesCard"
import { useSelector } from "react-redux"
// import { Bar } from "react-chartjs-2"

const Libraries = ({ librariesAnimate }) => {
    // const labels = ['January', 'February', 'March'];

    // const data = {
    //     labels,
    //     datasets: [
    //         {
    //             label: "Dataset 1",
    //             data: [65, 59, 80, 81, 56, 55, 40],
    //             backgroundColor: "rgba(255, 99, 132, 0.5)"
    //         }
    //     ]
    // }
    const { uniData, isSideBar } = useSelector((store) => store?.university)

    return (
        !isSideBar.libraryEmpty && (
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
                    <h1>Libraries</h1>
                </IonCardContent>
                <IonCardContent
                    style={{
                        borderBottom: "1px solid #C4C4C4"
                    }}
                >
                    <IonGrid>
                        <IonRow>
                            {[
                                {
                                    title: "Physical Books",
                                    value: `${uniData?.library?.physicalBook}`
                                },
                                {
                                    title: "Physical Media",
                                    value: `${uniData?.library?.physicalMedia}`
                                },
                                {
                                    title: "Online Books",
                                    value: `${uniData?.library?.digitalElectronicBook}`
                                }
                            ].map((item, index) => {
                                return (
                                    <IonCol
                                        key={index}
                                        style={{
                                            backgroundColor: "white"
                                        }}
                                        className="ion-padding"
                                    >
                                        {/* <IonTitle
                                        style={{ textAlign: "center" }}
                                        color="dark"
                                    >
                                        <IonTitle className="">
                                            <h1
                                                style={{
                                                    fontSize: "36px"
                                                }}
                                            >
                                                {item.value}
                                            </h1>
                                        </IonTitle>
                                    </IonTitle>
                                    <IonText
                                        style={{ textAlign: "center" }}
                                        color="medium"
                                    >
                                        <p
                                            style={{
                                                fontSize: "18px"
                                            }}
                                        >
                                            {item.title}
                                        </p>
                                    </IonText> */}
                                        {librariesAnimate && (
                                            <LibrariesCard {...item} />
                                        )}
                                    </IonCol>
                                )
                            })}
                        </IonRow>
                    </IonGrid>
                </IonCardContent>
                {/* <IonGrid style={{ padding: 0 }}>
                <IonRow>
                    <IonCol
                        style={{
                            borderRight: "1px solid #C4C4C4"
                        }}
                    >
                        <IonCardContent>
                            <IonGrid>
                                <IonRow>
                                    {[
                                        {
                                            title: "Physical Media",
                                            value: "56,012"
                                        }
                                    ].map((item, index) => {
                                        return (
                                            <IonCol
                                                key={index}
                                                className="ion-padding"
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <div className="rounded-rectangle">
                                                        <img
                                                            alt=""
                                                            src="https://cdn-icons-png.flaticon.com/512/7398/7398555.png"
                                                            style={{
                                                                width: "60px"
                                                            }}
                                                        />
                                                        <IonTitle
                                                            color="dark"
                                                            className=""
                                                        >
                                                            <h1
                                                                style={{
                                                                    fontSize:
                                                                        "30px"
                                                                }}
                                                            >
                                                                {item.value}
                                                            </h1>
                                                        </IonTitle>
                                                        <IonText
                                                            style={{
                                                                textAlign:
                                                                    "center"
                                                            }}
                                                            color="medium"
                                                        >
                                                            <p
                                                                style={{
                                                                    fontSize:
                                                                        "16px"
                                                                }}
                                                            >
                                                                {item.title}
                                                            </p>
                                                        </IonText>
                                                    </div>
                                                </div>
                                            </IonCol>
                                        )
                                    })}
                                </IonRow>
                            </IonGrid>
                        </IonCardContent>
                    </IonCol>
                    <IonCol>
                        <IonCardContent>
                            <IonGrid>
                                <IonRow>
                                    {[
                                        {
                                            title: "Digital Electronic Books",
                                            value: "513,531"
                                        }
                                    ].map((item, index) => {
                                        return (
                                            <IonCol
                                                key={index}
                                                className="ion-padding"
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <div className="rounded-rectangle">
                                                        <img
                                                            alt=""
                                                            src="https://cdn-icons-png.flaticon.com/512/7398/7398694.png"
                                                            style={{
                                                                width: "60px"
                                                            }}
                                                        />
                                                        <IonTitle
                                                            color="dark"
                                                            className=""
                                                        >
                                                            <h1
                                                                style={{
                                                                    fontSize:
                                                                        "30px"
                                                                }}
                                                            >
                                                                {item.value}
                                                            </h1>
                                                        </IonTitle>
                                                        <IonText
                                                            style={{
                                                                textAlign:
                                                                    "center"
                                                            }}
                                                            color="medium"
                                                        >
                                                            <p
                                                                style={{
                                                                    fontSize:
                                                                        "16px"
                                                                }}
                                                            >
                                                                {item.title}
                                                            </p>
                                                        </IonText>
                                                    </div>
                                                </div>
                                            </IonCol>
                                        )
                                    })}
                                </IonRow>
                            </IonGrid>
                        </IonCardContent>
                    </IonCol>
                </IonRow>
            </IonGrid> */}
                {/* <Bar /> */}
            </IonCard>
        )
    )
}
export default Libraries
