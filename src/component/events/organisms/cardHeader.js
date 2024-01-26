import React from "react"
import {
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon
} from "@ionic/react"
import { calendarOutline } from "ionicons/icons"
import ShareButton from "component/Share/atoms/ShareButton"

export const EventCardHeader = ({ props, data }) => {
  const { event } = props
  return (
    <IonCardHeader>
      <IonCardSubtitle>
        <IonIcon icon={calendarOutline} size="medium" />{" "}
        {new Date(data?.eventDate).toDateString()}
      </IonCardSubtitle>

      <IonCardTitle className=" flex items-center justify-start">
        {data.title} <div className="px-3"></div>
        <ShareButton
          allProps={{
            showAddList: false,
            link: "http://localhost:3000/space/nsas#events"
          }}
        />
      </IonCardTitle>
    </IonCardHeader>
  )
}
