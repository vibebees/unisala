import React from "react"
import { IonCard, IonImg } from "@ionic/react"
import "./index.css"
import { getAllProps } from "./getAllProps.js"
import { EventCardBody } from "./organisms/cardBody"
import { EventCardHeader } from "./organisms/cardHeader"

export const EventCard = ({ data }) => {
  const props = getAllProps()
  const { event } = props

  const { images = [] } = data
  const [image] = images

  return (
    <>
      <IonCard id="events">
        <IonImg className="h-64 object-cover w-full" src={image}></IonImg>
        <EventCardHeader props={props} data={data} />
        <EventCardBody props={props} data={data} />
      </IonCard>
    </>
  )
}
