import {IonGrid, IonRow} from "@ionic/react"

export const PollBody = ({allProps}) => {

    const {polls, useIsData} = allProps
    return (<IonGrid>
        {Array.isArray(polls?.wordBestDescribe) &&
            polls?.wordBestDescribe.map(
                ({type, pollPercentage}, index) => (
                    <IonRow key={index} className="ion-padding">
                        <div className="poll-bar">
                            <div style={{width: pollPercentage + "%"}} className="bar-value"></div>
                            <h3 style={{color: "black"}}>
                                {type.split("_").join(" ")}
                            </h3>
                            <h2>
                                {useIsData(pollPercentage)}%
                            </h2>
                        </div>
                    </IonRow>
                )
            )}
    </IonGrid>)
}
