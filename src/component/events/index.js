import React, { lazy, Suspense } from "react"
import { SpaceRole } from "utils/lib/SpaceRoles"
import { IonCard, IonImg } from "@ionic/react"
import "./index.css"
import { getAllProps } from "./getAllProps.js"
import { EventCardBody } from "./organisms/cardBody"
import { EventCardHeader } from "./organisms/cardHeader"
const DeleteEvent = lazy(() => import("./atoms/DeleteEvent"))

export const EventCard = ({ data, role = null }) => {
  const props = getAllProps()
  const { event } = props

  const { images = [] } = data
  const [image] = images

  return (
    <>
      <IonCard id="events" className="relative">
        <IonImg
          className="h-64 object-cover w-full"
          src={
            "https://burst.shopifycdn.com/photos/grad-students-throwing-hats-in-the-air.jpg?width=1000&format=pjpg&exif=0&iptc=0"
          }
        ></IonImg>
        <EventCardHeader props={props} data={data} />
        <EventCardBody props={props} data={data} />
        {role === SpaceRole.ADMIN && <DeleteEvent id={data?._id} />}
      </IonCard>
    </>
  )
}
