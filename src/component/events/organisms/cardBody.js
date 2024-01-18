import React, { useRef, useEffect } from "react"
import { IonAlert, IonBadge, IonButton, IonCardContent, IonItem, IonLabel, IonList, createAnimation } from "@ionic/react"
import {EventList} from "../molecules/eventList"

export const EventCardBody = ({props = {}}) => {

    const {event, showAlert, handleRegister, buttonColor, handleUserAcitivity, buttonText, buttonEl, animation, year, yearOptions, setButtonColor, setButtonText, setShowAlert, setSelectedYear} = props

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
        <IonCardContent>
            <p>{event.description}</p>
            <EventList props={props} />
            <IonButton
                expand="block"
                color={buttonColor}
                onClick={handleRegister}
                ref={buttonEl}
            >

                {buttonText}
            </IonButton>
        <IonAlert
            isOpen={showAlert}
            className="confirmation"
            trigger="present-alert"
            header="Select your year in college "
            buttons={[
                {
                    text: "Cancel",
                    role: "cancel",
                    handler: () => {
                        setShowAlert(false)
                    }
                },
                {
                    text: "OK",
                    role: "confirm",
                    handler: (value) => handleUserAcitivity(value)
                }
            ]}
            inputs={yearOptions}
            onDidDismiss={() => setShowAlert(false)}

        ></IonAlert>
    </IonCardContent>
    )
}
