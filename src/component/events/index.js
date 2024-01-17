import React, {useState} from "react"
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonIcon, IonAlert, IonImage, IonImg } from "@ionic/react"
import {calendarOutline} from "ionicons/icons"

export const EventCard = () => {
  let event = {
    imageUrl: "https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-6/418947802_122122699298093982_4250882892682419291_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=3635dc&_nc_ohc=1vz-5Qp2XYwAX_vv3nU&_nc_ht=scontent-atl3-2.xx&oh=00_AfD4g5nQpU9EMTHo8StSziFa83IaF8LHn-vTLKHr9mNN2A&oe=65ABD8BE",
    date: "Saturday, January 27, 2024",
    title: "Computer Science Webinar with Alumni",
    description: "NSAS Student Association invites you to a webinar with distinguished alumni from our Computer Science department. Get insights into the industry, network with former students, and learn about the opportunities available to you after graduation. Food, games, and prizes await!"
  }
  const [showAlert, setShowAlert] = useState(false)

  const handleRegister = () => {
    setShowAlert(true)
  }
const confirmRegistration = () => {
    // Place your registration confirmation logic here
    console.log("User confirmed registration")
    setShowAlert(false)
}

return (
    <>
        <IonCard>
            <IonImg
                src={event.imageUrl}
            ></IonImg>
            <IonCardHeader>
                <IonCardSubtitle>
                    <IonIcon icon={calendarOutline} style={{verticalAlign: "bottom"}} /> {event.date}
                </IonCardSubtitle>
                <IonCardTitle>{event.title}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <p>{event.description}</p>
                <IonButton expand="block" color="primary" onClick={handleRegister}>Register Now</IonButton>
                <IonAlert
                    isOpen={showAlert}
                    className="confirmation"
                    trigger="present-alert"
                    header="Select your year in college "
                    buttons={["OK"]}
                    inputs={[
                        {
                            label: "Red",
                            type: "radio",
                            value: "red"
                        },
                        {
                            label: "Blue",
                            type: "radio",
                            value: "blue"
                        },
                        {
                            label: "Green",
                            type: "radio",
                            value: "green"
                        }
                    ]}
                    onDidDismiss={() => setShowAlert(false)}

                ></IonAlert>
            </IonCardContent>
        </IonCard>
    </>
  )
}
