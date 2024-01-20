import React, { useEffect, useRef, useState } from "react"
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonIcon,
  IonAlert,
  IonImage,
  IonImg,
  createAnimation
} from "@ionic/react"
import { calendarOutline } from "ionicons/icons"
import "./index.css"
import { getAllProps } from "./getAllProps.js"
import { EventCardBody } from "./organisms/cardBody"
import { EventCardHeader } from "./organisms/cardHeader"

export const EventCard = () => {
  const props = getAllProps()
  const { event } = props

  return (
    <>
      <IonCard>
        <IonImg src={event.imageUrl}></IonImg>
        <EventCardHeader props={props} />
        <EventCardBody props={props} />
      </IonCard>
    </>
  )
}
