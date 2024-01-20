import React from "react"
import SendInvitationAll from "./organism/SendInvitationAll"
import { IonCard } from "@ionic/react"
import SingleInvitation from "./organism/SingleInvitation"

const Index = () => {
  return (
    <IonCard className="h-fit shadow-none mt-1 ion-no-margin w-full">
      <SendInvitationAll />
      {/* <SingleInvitation /> */}
    </IonCard>
  )
}

export default Index
