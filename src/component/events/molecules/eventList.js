import {IonBadge, IonItem, IonLabel, IonList} from "@ionic/react"

export const EventList = ({props}) => {
    const {event} = props
    return (
        <IonList>
            <IonItem>
                <IonLabel >Registered</IonLabel>
                <IonBadge color="success">{event?.registered}</IonBadge>
            </IonItem>
            <IonItem>
                <IonLabel>Major</IonLabel>
                <IonBadge color="secondary">{event?.major}</IonBadge>
            </IonItem>
            <IonItem>
                <IonLabel>Days Remaining</IonLabel>
                <IonBadge color="tertiary">{event?.dayRemaining}</IonBadge>
            </IonItem>
        </IonList>
    )
}
