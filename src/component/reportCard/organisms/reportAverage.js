import {IonCardContent, IonCol, IonGrid, IonRow, IonText, IonTitle} from "@ionic/react"

export const ReportAverage = ({allProps}) => {

    const {useGradeColor, report, useGrade} = allProps
    return (<IonCardContent className="average-report">
    <IonGrid>
        <IonRow>
            <IonCol>
                <div
                     style={{
                        background: useGradeColor(
                            report?.average
                        )
                    }}
                    className="report"
                >
                    <h1 style={{ fontSize: "35px" }}>
                        {useGrade(report?.average)}
                    </h1>
                </div>
                <IonTitle className="ion-padding-top">
                    <IonText color="dark">
                        <h1
                            style={{
                                fontSize: "30px"
                            }}
                        >
                            {" "}
                            Average{" "}
                        </h1>
                    </IonText>
                </IonTitle>
            </IonCol>
        </IonRow>
    </IonGrid>
</IonCardContent>)
}
