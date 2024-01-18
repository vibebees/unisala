import React from "react"
import { IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon } from "@ionic/react"
import { calendarOutline } from "ionicons/icons"

export const EventCardHeader = ({props}) => {
    const {event} = props
    return ((
        <IonCardHeader>
        <IonCardSubtitle>
            <IonIcon icon={calendarOutline} size="medium"/> {event.date}
        </IonCardSubtitle>
        <IonCardTitle>{event.title}</IonCardTitle>
    </IonCardHeader>
    )
    )
}
