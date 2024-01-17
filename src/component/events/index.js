import React from "react"
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton } from "@ionic/react"
export const EventCard = () => {
    let event = {
        url: "https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-6/417163474_911996316962759_3112905582576049338_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=d8d9c5&_nc_ohc=JKulCIZDeVwAX_Du8Ua&_nc_ht=scontent-atl3-2.xx&oh=00_AfCFTrE5cJ1JaJNjYeU3MWrDLyfrmWhmRVNA-d2n6KWBhw&oe=65AC8206",
        date: "2021-09-01",
        title: "Welcome Back",
        description: "Welcome back to campus! Come join us for a fun filled day of events and activities. We will have food, games, and prizes. We look forward to seeing you there!"
    }
  return (
    <IonCard>
      <img src={event?.url} alt={event.title} />

      <IonCardHeader>
        <IonCardSubtitle>{event.date}</IonCardSubtitle>
        <IonCardTitle>{event.title}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <p>{event.description}</p>
        <IonButton expand="block" onClick={() => registerForEvent(event.id)}>Register</IonButton>
      </IonCardContent>
    </IonCard>
  )
}
const registerForEvent = (eventId) => {
  // Function to handle event registration logic
  console.log(`Registering for event with ID: ${eventId}`)
  // Add your registration logic here
}
