import { IonAlert, IonCard, IonCardContent, IonImg } from "@ionic/react"
import { useState } from "react"
import RegisterButton from "../atoms/RegisterButton"
import { EventCardHeader } from "./cardHeader"
export const EventCard = ({ event }) => {
  const [showAlert, setShowAlert] = useState(false)
  const [selectedYear, setSelectedYear] = useState("")
  const [buttonText, setButtonText] = useState("Register Now")
  const [buttonColor, setButtonColor] = useState("primary")
  console.log({ event })
  const handleRegister = () => setShowAlert(true)
  const handleUserActivity = (value) => {
    setSelectedYear(value)
    setButtonText("Registered!")
    setButtonColor("success")
    setShowAlert(false)
    // Trigger button animation if needed
  }
  const yearOptions = ["Freshman", "Sophomore", "Junior", "Senior"].map(
    (year) => ({
      label: year,
      type: "radio",
      value: year
    })
  )

  const handleUserAcitivity = (value) => {
    setSelectedYear(value)
    setButtonText("Registered!")
    setShowAlert(false)
    setButtonColor("success")
  }

  return (
    <section>
      <IonCard>
        <IonImg src={event?.images[0] ?? ""}></IonImg>
        <EventCardHeader event={event} />
        <IonCardContent>
          <div dangerouslySetInnerHTML={{ __html: event?.description }} />
          <RegisterButton
            buttonText={buttonText}
            buttonColor={buttonColor}
            onClick={handleRegister}
            event={event}
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
    </section>
  )
}

