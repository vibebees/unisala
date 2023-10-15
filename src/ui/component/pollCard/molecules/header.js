import {IonCardContent, IonIcon, IonItem, IonLabel} from "@ionic/react"
import {barChart} from "ionicons/icons"

export const PollHeader = ({allProps}) => {

    const {pollHeader = "Campus Life", index} = allProps
    return (
        <IonCardContent style={{ borderBottom: "1px solid #C4C4C4" }} className="flex" >
            <h1>{pollHeader}</h1>
                    <IonItem lines="none">
                        <IonIcon icon={barChart} />
                        <IonLabel className="ion-padding-start">
                            <h2>Poll</h2>
                        </IonLabel>
                    </IonItem>
                </IonCardContent>
    )
}
