import React, { useState } from "react"
import { IonCard, IonCardContent, IonImg, IonAlert } from "@ionic/react"
import { CardHeader } from "./CardHeader"
import { RegisterButton } from "./RegisterButton"
import "./index.css"

export const EventCard = ({ event }) => {
    const [showAlert, setShowAlert] = useState(false)
    const [selectedYear, setSelectedYear] = useState("")
    const [buttonText, setButtonText] = useState("Register Now")
    const [buttonColor, setButtonColor] = useState("primary")

    const handleRegister = () => setShowAlert(true)
    const handleUserActivity = (value) => {
        setSelectedYear(value)
        setButtonText("Registered!")
        setButtonColor("success")
        setShowAlert(false)
        // Trigger button animation if needed
    }
const yearOptions = ["Freshman", "Sophomore", "Junior", "Senior"].map((year) => ({
        label: year,
        type: "radio",
        value: year
    }))

    const handleUserAcitivity = (value) => {
        setSelectedYear(value)
        setButtonText("Registered!")
        setShowAlert(false)
        animation.current?.play()
        setButtonColor("success")

    }

    return (
        <>
            <IonCard>
                <IonImg src={event.imageUrl}></IonImg>
                <CardHeader date={event.date} title={event.title} />
                <IonCardContent>
                    <p>{event.description}</p>
                    <RegisterButton
                        buttonText={buttonText}
                        buttonColor={buttonColor}
                        onClick={handleRegister}
                    />
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
            </IonCard>
        </>
    )
}
