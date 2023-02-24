// eslint-disable-next-line no-use-before-define
import React from "react"
import {
    IonCard,
    IonCardContent,
    IonGrid,
    IonCol,
    IonRow,
    IonText
} from "@ionic/react"
import "./Grant.css"
import CircularBar from "../../../../component/circularBar"
import { useSelector } from "react-redux"
import useIsData from "../../../../../hooks/useIsData"

const Grant = ({ grantAnimate }) => {
    const { uniData, isSideBar } = useSelector((store) => store.University)

    return (
        !isSideBar.grantsEmpty && (
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
                    <h1>Grant</h1>
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
                                    titles: "Pell Grant",
                                    title: "Average Amount",
                                    value: uniData?.grants?.aid?.pellGrant
                                        ?.averageAmount
                                },
                                {
                                    titles: "Federal Grants",
                                    title: "Average Amount",
                                    value: uniData?.grants?.aid?.federalGrants
                                        ?.averageAmount
                                },
                                {
                                    titles: "General",
                                    title: "Average Amount",
                                    value: uniData?.grants?.aid?.general
                                        ?.averageAmount
                                },
                                {
                                    titles: "State Grants",
                                    title: "Average Amount",
                                    value: uniData?.grants?.aid?.stateGrants
                                        ?.averageAmount
                                }
                            ].map((item, index) => {
                                return (
                                    <IonCol
                                        style={{
                                            margin: "5px",
                                            padding: "0px 0px 0px 0px"
                                        }}
                                        key={index}
                                        className="ion-padding"
                                    >
                                        <IonText
                                            style={{
                                                textAlign: "center"
                                            }}
                                            color="dark"
                                        >
                                            <h2>{item.titles}</h2>
                                        </IonText>
                                        <IonText
                                            style={{ textAlign: "center" }}
                                            color="dark"
                                        >
                                            <IonText className="">
                                                <h1>
                                                    {useIsData(item.value) !==
                                                        "N/A" && "$"}
                                                    {useIsData(item.value)}
                                                </h1>
                                            </IonText>
                                        </IonText>
                                        <IonText
                                            style={{ textAlign: "center" }}
                                            color="medium"
                                        >
                                            <p>{item.title}</p>
                                        </IonText>
                                    </IonCol>
                                )
                            })}
                        </IonRow>
                    </IonGrid>
                </IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol
                            style={{
                                margin: "5px",
                                padding: "0px 0px 0px 0px"
                            }}
                        >
                            <IonCardContent>
                                <IonGrid>
                                    <IonRow>
                                        {[
                                            {
                                                title: "Average Total Aid Awarded",
                                                value: "8,843"
                                            },
                                            {
                                                title: "National Average Aid",
                                                value: "15,523"
                                            },
                                            {
                                                title: "Net Price",
                                                value: "11,890"
                                            }
                                        ].map((item, index) => {
                                            return (
                                                <IonCol
                                                    style={{
                                                        margin: "5px",
                                                        padding:
                                                            "0px 0px 0px 0px"
                                                    }}
                                                    key={index}
                                                    className="ion-padding"
                                                >
                                                    <IonText
                                                        style={{
                                                            textAlign: "center"
                                                        }}
                                                        color="dark"
                                                    >
                                                        <h1 className="ion">
                                                            {useIsData(
                                                                item.value
                                                            ) !== "N/A" && "$"}
                                                            {useIsData(
                                                                item.value
                                                            )}
                                                        </h1>
                                                    </IonText>
                                                    <IonText
                                                        style={{
                                                            textAlign: "center"
                                                        }}
                                                        color="medium"
                                                    >
                                                        <p>{item.title}</p>
                                                    </IonText>
                                                </IonCol>
                                            )
                                        })}
                                    </IonRow>
                                </IonGrid>
                            </IonCardContent>
                        </IonCol>
                        <IonCol
                            style={{
                                alignSelf: "center",
                                margin: "5px",
                                padding: "0px 0px 0px 0px"
                            }}
                        >
                            {grantAnimate && (
                                <CircularBar
                                    value={`${useIsData(
                                        uniData?.grants?.aid?.pellGrant
                                            ?.percentageReceivingAid
                                    )}`}
                                />
                            )}
                            <IonText
                                style={{
                                    textAlign: "center"
                                }}
                                color="medium"
                            >
                                <p>Percentage Receiving Aid</p>
                            </IonText>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCard>
        )
    )
}
export default Grant
