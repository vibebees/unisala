import React, { useRef, useEffect } from "react"
import {
  IonAlert,
  IonBadge,
  IonButton,
  IonCardContent,
  IonItem,
  IonLabel,
  IonList,
  createAnimation
} from "@ionic/react"
import { EventList } from "../molecules/eventList"
import RegisterButton from "../atoms/RegisterButton"

export const EventCardBody = ({ props = {}, data }) => {
  const {
    event,
    showAlert,
    handleRegister,
    buttonColor,
    clickOptions,
    buttonState,
    buttonEl,
    animation,
    year,
    yearOptions,
    setShowAlert,
    activityOptions,
    currentOptions
  } = props

  useEffect(() => {
    animation.current = createAnimation()
      .addElement(buttonEl.current)
      .duration(1000)
      .iterations(2) // Run the animation twice
      .keyframes([
        { offset: 0, transform: "scale(1)", opacity: "1" },
        { offset: 0.5, transform: "scale(1.2)", opacity: "0.3" },
        { offset: 1, transform: "scale(1)", opacity: "1" }
      ])
  }, [])

  return (
    <IonCardContent id="up-coming-event">
      <p dangerouslySetInnerHTML={{ __html: data?.description }}></p>
      {/* <EventList props={props} data={data} /> */}
      <RegisterButton eventId={data?._id} />
      <IonAlert
        isOpen={showAlert}
        className="confirmation"
        trigger="present-alert"
        header={currentOptions?.header}
        buttons={clickOptions}
        inputs={currentOptions?.body}
        onDidDismiss={() => setShowAlert(false)}
      ></IonAlert>
    </IonCardContent>
  )
}
