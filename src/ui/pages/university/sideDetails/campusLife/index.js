// eslint-disable-next-line no-use-before-define
import React from "react"
import {
    IonCard,
    IonCardContent,
    IonGrid,
    IonRow,
    IonText,
    IonIcon,
    IonLabel,
    IonItem
} from "@ionic/react"
import { barChart } from "ionicons/icons"
import "./CampusLife.css"
import { useSelector } from "react-redux"
import useIsData from "../../../../../hooks/useIsData"

const CampusLife = () => {
    const { uniData, isSideBar } = useSelector((store) => store?.university)

    return (
        !isSideBar?.campusLifeEmpty && (
            <IonCard style={{ margin: "15px 0px 0px 0px" }} className="ion-margin-top" >
                <IonCardContent style={{ borderBottom: "1px solid #C4C4C4" }} className="flex" >
                    <h1>Campus Life</h1>
                    <IonItem lines="none">
                        <IonIcon icon={barChart} />
                        <IonLabel className="ion-padding-start">
                            <h2>Poll</h2>
                        </IonLabel>
                    </IonItem>
                </IonCardContent>
                <IonCardContent>
                    <IonText color="dark">
                        <h2>What one word or phrase best describes your school?</h2>
                    </IonText>
                    <IonGrid>
                        {Array.isArray(uniData?.students?.campusLife?.poll?.wordBestDescribe) &&
                            uniData?.students?.campusLife?.poll?.wordBestDescribe.map(
                                ({ type, pollPercentage }, index) => (
                                    <IonRow key={index} className="ion-padding">
                                        <div className="poll-bar">
                                            <div style={{ width: pollPercentage + "%" }} className="bar-value"></div>
                                            <h3 style={{ color: "black" }}>
                                                {type.split("_").join(" ")}
                                            </h3>
                                            <h2>
                                                {useIsData(pollPercentage)}%
                                            </h2>
                                        </div>
                                    </IonRow>
                                )
                            )}
                    </IonGrid>
                </IonCardContent>
            </IonCard>
        )
    )
}
export default CampusLife
